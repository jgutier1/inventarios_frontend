import{axiosInstance} from "../helpers/axios-config";

const getUsuarios =() => {
    return axiosInstance.get("usuario", {

        headers: {
            "content-type": "aplication/json"
        }
    });

}


const crearUsuario=(data) => {
    return axiosInstance.post("usuario",data, {
        headers: {
            "content-type": "application/json"
        }
    });

}

const editUsuario =(usuarioId,data) => {
    return axiosInstance.put(`usuario/${usuarioId}}`,data, {
        headers: {
            "content-type": "aplication/json"
        }
    });

}



export {
    getUsuarios, crearUsuario, editUsuario
}