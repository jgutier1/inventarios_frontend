import React, { useState, useEffect } from "react";
import {
  getestadoEquipo,
  crearestadoEquipo,
  editestadoEquipo,
} from "../../services/estado-EquipoService";

export const EstadoView = () => {
  const [valoresForm, setValoresForm] = useState({});
  const [estadoEdit, setestadoEdit] = useState({});
  const [estados, setestados] = useState({});
  const { nombre = "", estado = "" } = valoresForm;
  const [idestadoEdit, setidestadoEdit] = useState("");

  const listarestados = async () => {
    try {
      const resp = await getestadoEquipo();
      console.log(resp.status);
      setestados(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarestados();
  }, []);

  const handleOnChage = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  };

  const handleEditOnChange = (e) => {
    setestadoEdit({ ...estadoEdit, [e.target.name]: e.target.value });
  };

  const handleMostrarModal = (e) => {
    const estadoId = e.target.getAttribute("data-estadoid")
    setidestadoEdit(estadoId);
  };

  const handleCrearEstado = async (e) => {
    e.preventDefault();

    try {
      const resp = await crearestadoEquipo(valoresForm);
      console.log(resp.data);
      setValoresForm({ nombre: "", estado: "" });
      setestados([...estados, resp.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditEstado = async (e) => {
    e.preventDefault();
    try {
      console.log(estadoEdit);
      const resp = await editestadoEquipo(idestadoEdit, estadoEdit);
      console.log(resp.data);
      setestadoEdit({ nombre: "", estado: "", _id: "" });
      const filteredEstados = estados.filter((estado) => {
        return estado._id !== resp.data._id;
      });
      setestados([...filteredEstados, resp.data]);
      const closebutton = document.getElementById("modalCloseButton");
      closebutton.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <form onSubmit={(e) => handleCrearEstado(e)}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            required
            type="text"
            name="nombre"
            value={nombre}
            className="form-control"
            onChange={(e) => handleOnChage(e)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">estado</label>
          <select
            required
            name="estado"
            value={estado}
            className="form-select"
            onChange={(e) => handleOnChage(e)}
          >
            <option defaultValue>--SELECCIONE--</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        <button className="btn btn-primary">Registrar</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {estados.length > 0 ? (
            estados.map((estado, index) => {
              return (
                <tr key={index}>
                  <td>{estado.nombre}</td>
                  <td>{estado.estado}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-estadoid={estado._id}
                      onClick={(e) => handleMostrarModal(e)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Actualizar Estado Equipo
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="modalCloseButton"
              ></button>
            </div>

            <div className="modal-body">
              {estados.length > 0 ? (
                estados
                  .filter((estado) => estado._id === idestadoEdit)
                  .map((estado, i) => {
                    return (
                      <>
                        <form onSubmit={(e) => handleEditEstado(e)}>
                          <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input
                              required
                              type="text"
                              name="nombre"
                              placeholder={estado.nombre}
                              className="form-control"
                              onChange={(e) => handleEditOnChange(e)}
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">estado</label>
                            <select
                              required
                              name="estado"
                              placeholder={estado.estado}
                              className="form-select"
                              onChange={(e) => handleEditOnChange(e)}
                            >
                              <option defaultValue>--SELECCIONE--</option>
                              <option value="Activo">Activo</option>
                              <option value="Inactivo">Inactivo</option>
                            </select>
                          </div>
                          <div className="mb-3">
                            <input
                              required
                              type="hidden"
                              name="_id"
                              value={estado._id}
                              className="form-control"
                            />
                          </div>

                          <button className="btn btn-primary">guardar</button>
                        </form>
                      </>
                    );
                  })
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
