import { Link } from "react-router-dom";
import React from "react";
import { useTranslation } from "react-i18next";

interface DefaultLayoutProps {
  children?: React.ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const [t, i18n] = useTranslation("global");

  const handlechangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">{t("deflayout.login")}</Link>
            </li>
            <li>
              <Link to="/Signup">{t("deflayout.signup")}</Link>
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
