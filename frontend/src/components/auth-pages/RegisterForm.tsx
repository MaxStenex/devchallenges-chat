import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "components/ui";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const validationSchema = z
  .object({
    email: z
      .string()
      .min(1, "The email is required.")
      .max(255, "Max email length is 255.")
      .email("The email is invalid."),
    username: z
      .string()
      .min(1, "Username is required.")
      .max(50, "Max username length is 50."),
    password: z
      .string()
      .min(6, "Min password length is 6.")
      .max(255, "Max password length is 255."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormInputs = z.infer<typeof validationSchema>;

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async ({
    email,
    username,
    password,
    confirmPassword,
  }) => {
    try {
      console.log(email, username, password, confirmPassword);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <TextField error={errors.email?.message} {...register("email")} label="Email" />
        <TextField
          error={errors.username?.message}
          {...register("username")}
          label="Username"
        />
        <TextField
          error={errors.password?.message}
          {...register("password")}
          label="Password"
        />
        <TextField
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
          label="Confirm password"
        />
      </div>
      <button className="btn-primary mt-8 block w-full">Confirm</button>
    </form>
  );
};
