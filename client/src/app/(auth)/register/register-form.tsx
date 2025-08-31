"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
// import { z } from "zod";
import { RegisterBody, RegisterBodyType } from "@/schemaValidations/auth.schema";
// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// });

export default function RegisterForm() {
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterBodyType) {
    // console.log(values);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (!res.ok) {
      // throw new Error("Đăng ký thất bại");
      const errorMsg = data.errors?.[0]?.message || data.message || "Đăng ký thất bại!";
      toast.warning(errorMsg);
      return;
    }
    toast.success("Đăng ký thành công!");
  }

  return (
    <div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2" noValidate>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>

            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl >
                  <Input placeholder="email@example.com" {...field} type="email" />
                </FormControl>

                <FormMessage />
              </FormItem>

            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input placeholder="nhập mật khẩu" {...field} type="password" />
                </FormControl>

                <FormMessage />
              </FormItem>

            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Xác nhận mật khẩu</FormLabel>
                <FormControl>
                  <Input placeholder="nhập lại mật khẩu" {...field} type="password" />
                </FormControl>

                <FormMessage />
              </FormItem>

            )}
          />
          <Button type="submit" className="w-full mt-3">Đăng ký</Button>
        </form>
      </Form>
    </div>
  );
}
