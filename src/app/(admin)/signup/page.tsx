"use client"

import { useRouter } from 'next/navigation';
import { Toast } from 'primereact/toast'
import React, { useRef, useState } from 'react'
import type { Field } from '../../../components/Form';
import Form from '../../../components/Form';

const SignUp = () => {

    const toast = useRef<Toast>(null);
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const fields: Field[] = [
        { name: "name", label: "Name", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "password", label: "Password", type: "password" },
      ];

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFormData({
            ...formData, 
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
        const response = await fetch('/api/register', {
            method : 'POST',
            headers : {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                password: formData.password
            })
        })

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
        setFormData({ name: "", email: "", password: "" }); // Clear form
        router.push("/");
      } else {
        toast.current?.show({
          severity: "error",
          detail: data.message || "error",
          summary: "error",
          life: 5000,
        });
      }
    }

  return (
    <>
        <Form
        title="Register"
        fields={fields}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Register"
        onRedirectText="Already a User? Login here"
        onRedirectClick={() => router.push('/login')}   
        toast={toast}
      />
    </>
  )
}

export default SignUp