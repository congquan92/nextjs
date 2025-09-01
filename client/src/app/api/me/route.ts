import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("sessionToken")?.value;

  if (!token) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}account/me`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `sessionToken=${token}`, // gắn token vào backend
      },
    });

    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return Response.json({ message: "Proxy error" }, { status: 500 });
  }
}
