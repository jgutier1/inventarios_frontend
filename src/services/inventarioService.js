import{axiosInstance} from "../helpers/axios-config";

const getInventarios =() => {
    return axiosInstance.get("inventario", {
        headers: {
            "content-type": "aplication/json"
        }
    });

}


const crearInventario =(data) => {
    return axiosInstance.post("inventario",data, {
        headers: {
            "content-type": "application/json"
        }
    });

}

const editInventario =(inventarioId,data) => {
    return axiosInstance.put(`inventario/${inventarioId}`,data, {
        headers: {
            "content-type": "aplication/json"
        }
    });

}

export{
    getInventarios,crearInventario,editInventario
}