import { Navigate, json, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
import { useState } from "react";
import DefaultLayout from "../Layout/DefaultLayout";
import { AuthResponse, AuthResponseError } from "../types/types";
import { API_URL } from "../Auth/constants";
import { useTranslation } from "react-i18next";

export default function Signup() {
  const [nombre, setnombre] = useState("");
  const [rut, setrut] = useState("");
  const [email, setemail] = useState("");
  const [telefono, settelefono] = useState("");
  const [contraseña, setcontraseña] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const goTo = useNavigate();

  const [t] = useTranslation("global");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(nombre, rut, email, telefono, contraseña);

    try {
      const response = await fetch(`${API_URL}/Signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          rut,
          email,
          telefono,
          contraseña,
        }),
      });

      if (response.ok) {
        const json = (await response.json()) as AuthResponse;
        console.log(json);
        setnombre("");
        setrut("");
        setemail("");
        settelefono("");
        setcontraseña("");
        setErrorResponse("");
        goTo("/");
      } else {
        console.log("Someting went wrong");
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
        return;
      }
    } catch (error) {
      console.log(
        "Ocurrió un error durante el registro. Por favor, inténtalo de nuevo más tarde."
      );
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/Dashboard" />;
  }

  return (
    <DefaultLayout>
      <form className="form" onSubmit={handleSubmit}>
        <h1>{t("signup-form.title")}</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <label>{t("signup-form.name")}</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setnombre(e.target.value)}
        />

        <label>{t("signup-form.run")}</label>
        <input
          type="text"
          value={rut}
          onChange={(e) => setrut(e.target.value)}
        />

        <label>{t("signup-form.email")}</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />

        <label>{t("signup-form.phone")}</label>
        <input
          type="text"
          value={telefono}
          onChange={(e) => settelefono(e.target.value)}
        />

        <label>{t("signup-form.password")}</label>
        <input
          type="password"
          value={contraseña}
          onChange={(e) => setcontraseña(e.target.value)}
        />

        <button>{t("signup-form.button")}</button>
      </form>
    </DefaultLayout>
  );
}
