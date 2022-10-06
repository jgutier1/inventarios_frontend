import { axiosInstance } from "../helpers/axios-config";

const getUsuarios = () => {
  return axiosInstance.get("usuario", {
    headers: {
      "content-type": "aplication/json",
    },
  });
};

const crearUsuario = (data) => {
  console.log(data);
  return axiosInstance.post("usuario", data, {
    headers: {
      "content-type": "application/json",
    },
  });
};

const editUsuario = async (usuarioId, data) => {
  return await axiosInstance.put(`usuario/${usuarioId}`, data, {
    headers: {
      "content-type": "application/json",
    },
  });
};

export { getUsuarios, crearUsuario, editUsuario };
