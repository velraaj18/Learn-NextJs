import { useRouter } from 'next/navigation'
import { Toast } from 'primereact/toast';
import React, { useRef } from 'react'
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

export type Field = {
    name: string,
    label : string,
    type : "text" | "password" | "email";
}

export interface FormProps {
        title: string,
        fields: Field[],
        formData : Record<string, string>
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
        submitLabel? : string,
        onRedirectText? : string,
        onRedirectClick? : () => void;
        toast: React.Ref<Toast>;
    }

const Form = ({
    title, fields, formData, onChange, onSubmit, submitLabel = "submit", onRedirectText, onRedirectClick, toast
}: FormProps) => {
    return (
      <>
        <Toast ref={toast} position="bottom-right" />
        <div className="flex items-center justify-center h-screen bg-blue-100">
          <Card title={title} className="mx-auto w-1/4 max-md:w-full">
            <form className="p-fluid" onSubmit={onSubmit}>
              {fields.map((field) => (
                <div className="field mb-3" key={field.name}>
                  <label htmlFor={field.name}>{field.label}</label>
                  {field.type === "password" ? (
                    <Password
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={onChange}
                      toggleMask
                      feedback={false}
                    />                  
                  ) : (
                    <InputText
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      value={formData[field.name] || ""}
                      onChange={onChange}
                    />
                  )}
                  <br />                  
                </div>
              ))}

              <Button type="submit" label={submitLabel} className="mt-3" />
              <br />
              <br />
              {onRedirectClick && onRedirectText && (
                <p className="text-teal-500 cursor-pointer underline" onClick={onRedirectClick}>
                  {onRedirectText}{" "}                 
                </p>
              )}
            </form>
          </Card>
        </div>
      </>
    );
}

export default Form