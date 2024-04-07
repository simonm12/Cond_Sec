import { Link } from "react-router-dom";
import React, { MouseEvent } from "react";
import { useAuth } from "../Auth/AuthProvider";
import { API_URL } from "../Auth/constants";
import { useTranslation } from "react-i18next";

interface PortalLayoutProps {
  children?: React.ReactNode;
}
export default function PortalLayout({ children }: PortalLayoutProps) {
  const auth = useAuth();
  const [t, i18n] = useTranslation("global");

  const handlechangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  async function handleSignOut(e: MouseEvent) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getRefreshToken()}`,
        },
      });
      if (response.ok) {
        auth.signout();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <a>{auth.getUser()?.nombre ?? ""} </a>
            </li>
            <li>
              <Link to="/Profile">{t("portallayout.profile")}</Link>
            </li>
            <li>
              <Link to="/Dashboard">{t("portallayout.visitor-entry")}</Link>
            </li>
            <li style={{ float: "right", marginRight: "20px" }}>
              <a href="#" onClick={handleSignOut}>
                {t("portallayout.signoff")}
              </a>
            </li>
            <li style={{ float: "right", marginRight: "20px" }}>
              <button
                style={{
                  fontSize: "0.85em",
                  padding: "5px 10px",
                  margin: "0 5px",
                }}
                onClick={() => handlechangeLanguage("en")}
              >
                English
              </button>
            </li>
            <li style={{ float: "right", marginRight: "5px" }}>
              <button
                style={{
                  fontSize: "0.85em",
                  padding: "5px 10px",
                  margin: "0 5px",
                }}
                onClick={() => handlechangeLanguage("es")}
              >
                Español
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>
    </>
  );
}
