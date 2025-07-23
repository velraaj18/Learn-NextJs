"use client";

import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRef } from "react";
import Form from "../../../components/Form";
import type { Field } from "@/components/Form";

const Login = () => {
  const router = useRouter();
  const toast = useRef<Toast>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const fields: Field[] = [
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const goToRegister = () => {
    router.push("/signup");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log(data);
      // localStorage.setItem("token", response.data.jwtToken);
      if (data.isSuccess) {
        toast.current?.show({
          severity: "success",
          detail: data.message || "Logged in successfully",
          summary: "success",
          life: 5000,
        });
        setFormData({ email: "", password: "" }); // Clear form
        router.push("/");
      } else {
        toast.current?.show({
          severity: "error",
          detail: data.message || "error",
          summary: "error",
          life: 5000,
        });
      }
    } catch (error: any) {
      toast.current?.show({
        severity: "error",
        detail: error.response?.data?.message || "Something went wrong",
        summary: "error",
        life: 5000,
      });
      console.log(error.response?.data?.message);
    }
  };

  return (
    <>
      <Form
        title="Login"
        fields={fields}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Login"
        onRedirectText="New User? SignUp here"
        onRedirectClick={goToRegister}
        toast={toast}
      />
    </>
  );
};

export default Login;
