import React, { useState, useEffect } from "react";
import { API_URL } from "../Auth/constants";
import PortalLayout from "../Layout/PortalLayout";
import { Vehiculo } from "../types/types";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const [nombre, setNombre] = useState("");
  const [unidad, setUnidad] = useState("");
  const [razon, setRazon] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [vieneEnAuto, setVieneEnAuto] = useState(false);
  const [vehiculo, setVehiculo] = useState<Vehiculo>({
    placa: "",
    marca: "",
    modelo: "",
    color: "",
  });
  const [t] = useTranslation("global");

  useEffect(() => {
    const obtenerFechaActual = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return {
        fecha: `${year}-${month}-${day}`,
        hora: `${hours}:${minutes}:${seconds}`,
      };
    };

    const { fecha, hora } = obtenerFechaActual();
    setFecha(fecha);
    setHora(hora);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
    const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;

    await fetch(`${API_URL}/formulario-visitas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        unidad,
        razon,
        fecha: formattedDate,
        hora: formattedTime,
        vieneEnAuto,
        vehiculo, // Se incluye el estado del vehículo en los datos enviados al backend
      }),
    });

    setNombre("");
    setUnidad("");
    setRazon("");
    setVieneEnAuto(false);
    setVehiculo({
      placa: "",
      marca: "",
      modelo: "",
      color: "",
    });
  }

  return (
    <PortalLayout>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Registro Visitas</h1>
        <label>
          Nombre del visitante:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>
        <br />
        <label>
          Unidad que visita:
          <input
            type="text"
            value={unidad}
            onChange={(e) => setUnidad(e.target.value)}
          />
        </label>
        <br />
        <label>
          Razón de la visita:
          <input
            type="text"
            value={razon}
            onChange={(e) => setRazon(e.target.value)}
          />
        </label>
        <br />
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ marginRight: "10px" }}> ¿Viene en auto? </label>
          <input
            type="checkbox"
            checked={vieneEnAuto}
            onChange={(e) => setVieneEnAuto(e.target.checked)}
          />
        </div>
        {vieneEnAuto && (
          <>
            <br />
            <label>
              Placa del vehículo:
              <input
                type="text"
                value={vehiculo.placa}
                onChange={(e) =>
                  setVehiculo({ ...vehiculo, placa: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Marca del vehículo:
              <input
                type="text"
                value={vehiculo.marca}
                onChange={(e) =>
                  setVehiculo({ ...vehiculo, marca: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Modelo del vehículo:
              <input
                type="text"
                value={vehiculo.modelo}
                onChange={(e) =>
                  setVehiculo({ ...vehiculo, modelo: e.target.value })
                }
              />
            </label>
            <br />
            <label>
              Color del vehículo:
              <input
                type="text"
                value={vehiculo.color}
                onChange={(e) =>
                  setVehiculo({ ...vehiculo, color: e.target.value })
                }
              />
            </label>
          </>
        )}
        <br />
        <label>
          Fecha de ingreso:
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            disabled
          />
        </label>
        <br />
        <label>
          <input
            type="hidden"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            disabled
          />
        </label>
        <br />
        <button type="submit">Registrar visita</button>
      </form>
    </PortalLayout>
  );
}
