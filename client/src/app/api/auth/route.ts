import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received data:", body);

    const { data } = body;

    if (data && data.token) {
      const cookieStore = await cookies();
      cookieStore.set({
        name: "sessionToken",
        value: data.token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return Response.json({
        success: true,
        message: "Cookie set successfully",
      });
    } else {
      return Response.json(
        { success: false, message: "No token provided" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error setting cookie:", error);
    return Response.json(
      { success: false, message: "Failed to set cookie" },
      { status: 500 }
    );
  }
}