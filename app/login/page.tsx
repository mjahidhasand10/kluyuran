"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

const { Title } = Typography;

export default function Login() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const redirect = searchParams.get("redirect");

  const onFinish = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    console.log("Login attempt", { email, password });
    if (!email || !password) {
      message.error("Email and password are required");
      return;
    }
    setLoading(true);

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      message.success("Logged in successfully!");
    } catch (err: any) {
      console.error("Firebase login error", err);
      if (err.code === "auth/invalid-credential") {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          message.success("Account created & logged in!");
        } catch (createErr: any) {
          message.error(createErr.message || "Account creation failed");
          setLoading(false);
          return;
        }
      } else if (err.code === "auth/wrong-password") {
        message.error("Incorrect password.");
        setLoading(false);
        return;
      } else if (err.code === "auth/invalid-email") {
        message.error("Invalid email format.");
        setLoading(false);
        return;
      } else {
        message.error(err.message || "Login failed");
        setLoading(false);
        return;
      }
    }

    const decodedRedirect = redirect ? decodeURIComponent(redirect) : "/";
    router.push(decodedRedirect);
    setLoading(false);
  };

  return (
    <main className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-[400px] shadow-lg rounded-2xl">
        <Title level={3} className="text-center">
          Login or Sign Up
        </Title>
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ email: "", password: "" }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Email address" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Continue
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </main>
  );
}
