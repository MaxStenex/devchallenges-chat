import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "components/ui";

const validationSchema = z.object({
  email: z
    .string()
    .min(1, "The email is required.")
    .max(255, "Max email length is 255.")
    .email("The email is invalid."),
  password: z
    .string()
    .min(1, "The password is required.")
    .max(255, "Max password length is 255."),
});

type FormInputs = z.infer<typeof validationSchema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async ({ email, password }) => {
    try {
      console.log(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <TextField {...register("email")} label="Email" error={errors.email?.message} />
        <TextField
          {...register("password")}
          label="Password"
          error={errors.password?.message}
        />
      </div>
      <button className="btn-primary mt-8 block w-full">Login</button>
    </form>
  );
};
