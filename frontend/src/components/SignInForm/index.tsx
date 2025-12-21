import { useAppContext } from "../../contexts/AppContext/context";
import { apiClient } from "../../core/apiClient";
import { UserAuthSchema } from "../../core/schemas";
import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


interface props {
  className: string;
  successRedirectTo?: string;
  successCallback?: () => void;
}

export const SignInForm = ({ className, successRedirectTo, successCallback }: props) => {
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const { setUserData } = useAppContext();

  const authorizeUser = useMutation({
    mutationFn: apiClient.signIn,
    onSuccess: () => {
      setUserData();
      if (successCallback !== undefined) {
        successCallback();
      }
      if (successRedirectTo !== undefined) {
        navigate(successRedirectTo);
      }
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={withZodSchema(UserAuthSchema) as (v: unknown) => object}
      onSubmit={async (values) => {
        setError(null);
        await authorizeUser.mutateAsync(values);
      }}
    >
      <Form className={className}>
        <div className={"email-block"}>
          <label className={"email-label"} htmlFor="email">
            Email
          </label>
          <Field className={"email-input"} name="email" type="email" />
          <ErrorMessage className={"email-error"} component="span" name="email" />
        </div>

        <div className={"password-block"}>
          <label className={"password-label"} htmlFor="password">
            Пароль
          </label>
          <Field className={"password-input"} name="password" type="password" />
          <ErrorMessage className={"password-error"} component="span" name="password" />
        </div>
        {error && <div className={"errors"}>{error}</div>}
        <button className={"submit-btn"} type="submit">
          Войти
        </button>
      </Form>
    </Formik>
  );
};
