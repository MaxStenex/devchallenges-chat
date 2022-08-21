import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "api/auth";
import { TextField } from "components/ui";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "state/user";
import { prepareUserData } from "utils/prepareUserData";
import { z } from "zod";

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

export type LoginFormInputs = z.infer<typeof validationSchema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(validationSchema),
  });

  const { setUser } = useUser();

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormInputs> = async ({ email, password }) => {
    try {
      const { data } = await login({ email, password });

      if (!data) return;

      setUser(prepareUserData(data));
      router.push("/");
    } catch (error) {
      if ((error as any)?.response?.status === 401) {
        const message = "Invalid email or password";

        setError("email", {
          message,
        });
        setError("password", {
          message,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <TextField
          {...register("email")}
          label="Email"
          error={errors.email?.message}
          data-testid="test-email"
        />
        <TextField
          {...register("password")}
          label="Password"
          error={errors.password?.message}
          type="password"
          data-testid="test-password"
        />
      </div>
      <button className="btn-primary mt-8 block w-full">Login</button>
    </form>
  );
};
