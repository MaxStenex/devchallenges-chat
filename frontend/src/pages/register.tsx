import { FormWrapper } from "components/auth-pages";
import { TextField } from "components/ui";
import React, { ReactElement } from "react";

const RegisterPage = () => {
  return (
    <FormWrapper
      title="Create an account"
      linkHref="/login"
      linkText="Already have an account?"
    >
      <form>
        <div className="space-y-4">
          <TextField label="Email" />
          <TextField label="Username" />
          <TextField label="Password" />
          <TextField label="Confirm password" />
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
