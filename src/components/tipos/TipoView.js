import React, { useState, useEffect } from "react";
import {
  creartipoEquipo,
  edittipoEquipo,
  gettipoEquipos,
} from "../../services/tipo-EquipoService";

export const TipoView = () => {
  const [valoresForm, setValoresForm] = useState({});
  const [tipoEdit, settipoEdit] = useState({});
  const [tipos, settipos] = useState({});
  const { nombre = "", estado = "" } = valoresForm;
  const [idtipoEdit, setidtipoEdit] = useState("");

  const listartipos = async () => {
    try {
      const resp = await gettipoEquipos();
      console.log(resp.status);
      settipos(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listartipos();
  }, []);

  const handleOnChage = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  };

  const handleEditOnChange = (e) => {
    settipoEdit({ ...tipoEdit, [e.target.name]: e.target.value });
  };

  const handleMostrarModal = (e) => {
    const estadoid = e.target.getAttribute("data-estadoid")
    setidtipoEdit(estadoid);
  };

  const handleCrearTipo = async (e) => {
    e.preventDefault();

    try {
      const resp = await creartipoEquipo(valoresForm);
      console.log(resp.data);
      setValoresForm({ nombre: "", estado: "" });
      settipos([...tipos, resp.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTipo = async (e) => {
    e.preventDefault();
    try {
      console.log(tipoEdit);
      const resp = await edittipoEquipo(idtipoEdit, tipoEdit);
      console.log(resp.data);
      settipoEdit({ nombre: "", estado: "", _id: "" });
      const filteredTipos = tipos.filter((tipo) => {
        return tipo._id !== resp.data._id;
      });
      settipos([...filteredTipos, resp.data]);
      const closebutton = document.getElementById("modalCloseButton");
      closebutton.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <form onSubmit={(e) => handleCrearTipo(e)}>
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
          {tipos.length > 0 ? (
            tipos.map((estado, index) => {
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
              {tipos.length > 0 ? (
                tipos
                  .filter((estado) => estado._id === idtipoEdit)
                  .map((estado, i) => {
                    return (
                      <>
                        <form onSubmit={(e) => handleEditTipo(e)}>
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
