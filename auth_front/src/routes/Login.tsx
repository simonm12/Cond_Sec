import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
import DefaultLayout from "../Layout/DefaultLayout";
import { useState } from "react";
import type { AuthResponse, AuthResponseError } from "../types/types";
import { useTranslation } from "react-i18next";

export default function Login() {
  const [nombre, setnombre] = useState("");
  const [contraseña, setcontraseña] = useState("");
  const auth = useAuth();
  const [errorResponse, setErrorResponse] = useState("");
  const goTo = useNavigate();
  const [t] = useTranslation("global");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3200/api/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          contraseña,
        }),
      });

      if (response.ok) {
        console.log("Login successful");
        setErrorResponse("");

        const json = (await response.json()) as AuthResponse;

        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);
          goTo("/Profile");
        }
      } else {
        console.log("Someting went wrong");
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/Profile" />;
  }
  return (
    <DefaultLayout>
      <form className="form" onSubmit={handleSubmit}>
        <h1>{t("login-form.title")}</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <label>{t("login-form.name")}</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setnombre(e.target.value)}
        />

        <label>{t("login-form.password")}</label>
        <input
          type="password"
          value={contraseña}
          onChange={(e) => setcontraseña(e.target.value)}
        />
        <button>{t("login-form.button")}</button>
      </form>
    </DefaultLayout>
  );
}
