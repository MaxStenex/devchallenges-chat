import { FormWrapper, RegisterForm } from "components/auth-pages";
import React, { ReactElement } from "react";

const RegisterPage = () => {
  return (
    <FormWrapper
      title="Create an account"
      linkHref="/login"
      linkText="Already have an account?"
    >
      <RegisterForm />
    </FormWrapper>
  );
};

export default RegisterPage;

RegisterPage.getLayout = function getLayout(page: ReactElement) {
  return page;
};
