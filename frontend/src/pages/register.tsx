import { FormWrapper } from "components/auth-pages";
import { TextField } from "components/ui";
import React, { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const { register, handleSubmit } = useForm<FormInputs>();

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
    <FormWrapper
      title="Create an account"
      linkHref="/login"
      linkText="Already have an account?"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <TextField register={{ ...register("email") }} label="Email" />
          <TextField register={{ ...register("username") }} label="Username" />
          <TextField register={{ ...register("password") }} label="Password" />
          <TextField
            register={{ ...register("confirmPassword") }}
            label="Confirm password"
          />
        </div>
        <button className="btn-primary mt-8 block w-full">Confirm</button>
      </form>
    </FormWrapper>
  );
};

export default RegisterPage;

RegisterPage.getLayout = function getLayout(page: ReactElement) {
  return page;
};
