import React, { useState, useEffect } from "react";
import {
  getUsuarios,
  crearUsuario,
  editUsuario,
} from "../../services/usuarioService";

export const UsuarioView = () => {
  const [valoresForm, setValoresForm] = useState({});
  const [usuarioEdit, setUsuarioEdit] = useState({});
  const [usuarios, setUsuarios] = useState({});
  const { nombre = "", email = "", estado = "" } = valoresForm;
  const [idUsuarioEdit, setIdUsuarioEdit] = useState("");

  const listarUsuarios = async () => {
    try {
      const resp = await getUsuarios();
      console.log(resp.status);
      setUsuarios(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarUsuarios();
  }, []);

  const handleOnChage = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  };

  const handleEditOnChange = (e) => {
    setUsuarioEdit({ ...usuarioEdit, [e.target.name]: e.target.value });
  };

  const handleMostrarModal = (e) => {
    const usuarioid = e.target.getAttribute("data-userid");
    setIdUsuarioEdit(usuarioid);
  };

  const handleCrearUsuario = async (e) => {
    e.preventDefault();

    try {
      const resp = await crearUsuario(valoresForm);
      console.log(resp.data);
      setValoresForm({ nombre: "", email: "", estado: "" });
      setUsuarios([...usuarios, resp.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditUsuario = async (e) => {
    e.preventDefault();
    try {
      console.log(usuarioEdit);
      const resp = await editUsuario(idUsuarioEdit, usuarioEdit);
      console.log(resp.data);
      setUsuarioEdit({ nombre: "", email: "", estado: "", _id: "" });
      const filteredusuarios = usuarios.filter((usuario) => {
        return usuario._id !== resp.data._id;
      });
      setUsuarios([...filteredusuarios, resp.data]);
      const closebutton = document.getElementById("modalCloseButton");
      closebutton.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <form onSubmit={(e) => handleCrearUsuario(e)}>
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
          <label className="form-label">Email</label>
          <input
            required
            type="email"
            name="email"
            value={email}
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
            <th scope="col">Email</th>
            <th scope="col">Estado</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario, index) => {
              return (
                <tr key={index}>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.estado}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-userid={usuario._id}
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
                Actualizar Usuario
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
              {usuarios.length > 0 ? (
                usuarios
                  .filter((usuario) => usuario._id === idUsuarioEdit)
                  .map((usuario, i) => {
                    return (
                      <>
                        <form onSubmit={(e) => handleEditUsuario(e)}>
                          <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input
                              required
                              type="text"
                              name="nombre"
                              placeholder={usuario.nombre}
                              className="form-control"
                              onChange={(e) => handleEditOnChange(e)}
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                              required
                              type="email"
                              name="email"
                              placeholder={usuario.email}
                              className="form-control"
                              onChange={(e) => handleEditOnChange(e)}
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">estado</label>
                            <select
                              required
                              name="estado"
                              placeholder={usuario.estado}
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
                              value={usuario._id}
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
