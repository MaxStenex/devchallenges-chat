import { FormWrapper } from "components/auth-pages";
import { TextField } from "components/ui";
import React, { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { register, handleSubmit } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async ({ email, password }) => {
    try {
      console.log(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormWrapper title="Welcome back!" linkHref="/register" linkText="Need an account?">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <TextField {...register("email")} label="Email" />
          <TextField {...register("password")} label="Password" />
        </div>
        <button className="btn-primary mt-8 block w-full">Login</button>
      </form>
    </FormWrapper>
  );
};

export default LoginPage;

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return page;
};
