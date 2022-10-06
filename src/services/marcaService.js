import { axiosInstance } from "../helpers/axios-config";

const getMarcas = () => {
  return axiosInstance.get("marca", {
    headers: {
      "content-type": "application/json",
    },
  });
};

const crearMarca = (data) => {
  return axiosInstance.post("marca", data, {
    headers: {
      "content-type": "application/json",
    },
  });
};

const editMarca = (marcaId, data) => {
  return axiosInstance.put(`marca/${marcaId}`, data, {
    headers: {
      "content-type": "application/json",
    },
  });
};

export { getMarcas, crearMarca, editMarca };
