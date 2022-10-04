import{axiosInstance} from "../helpers/axios-config";

const gettipoEquipos =() => {
    return axiosInstance.get("tipo-equipo", {

        headers: {
            "content-type": "aplication/json"
        }
    });

}


const creartipoEquipo=(data) => {
    return axiosInstance.post("tipo-equipo",data, {
        headers: {
            "content-type": "application/json"
        }
    });

}

const edittipoEquipo =(tipoequipoId,data) => {
    return axiosInstance.put(`tipo-equipo/${tipoequipoId}}`,data, {
        headers: {
            "content-type": "aplication/json"
        }
    });

}




export {
    gettipoEquipos, creartipoEquipo, edittipoEquipo
}