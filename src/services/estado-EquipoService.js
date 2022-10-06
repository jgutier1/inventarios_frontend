import { axiosInstance } from "../helpers/axios-config";

const getestadoEquipo = () => {
  return axiosInstance.get("estado-Equipo", {
    headers: {
      "content-type": "application/json",
    },
  });
};

const crearestadoEquipo = (data) => {
  return axiosInstance.post("estado-Equipo", data, {
    headers: {
      "content-type": "application/json",
    },
  });
};

const editestadoEquipo = (estadoEquipoId, data) => {
  return axiosInstance.put(`estado-Equipo/${estadoEquipoId}`, data, {
    headers: {
      "content-type": "application/json",
    },
  });
};

export { getestadoEquipo, crearestadoEquipo, editestadoEquipo };
