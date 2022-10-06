import React, { useState, useEffect } from "react";
import { getMarcas, crearMarca, editMarca } from "../../services/marcaService";

export const MarcaView = () => {
  const [valoresForm, setValoresForm] = useState({});
  const [marcaEdit, setMarcaEdit] = useState({});
  const [marcas, setMarcas] = useState({});
  const { nombre = "", estado = "" } = valoresForm;
  const [idMarcaEdit, setidMarcaEdit] = useState("");

  const listarMarcas = async () => {
    try {
      const resp = await getMarcas();
      console.log(resp.status);
      setMarcas(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarMarcas();
  }, []);

  const handleOnChage = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  };

  const handleEditOnChange = (e) => {
    setMarcaEdit({ ...marcaEdit, [e.target.name]: e.target.value });
  };

  const handleMostrarModal = (e) => {
    const marcaid = e.target.getAttribute("data-marcaid")
    setidMarcaEdit(marcaid);
  };

  const handleCrearMarca = async (e) => {
    e.preventDefault();
    console.log(valoresForm);

    try {
      const resp = await crearMarca(valoresForm);
      console.log(resp.data);
      setValoresForm({ nombre: "", estado: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTipo = async (e) => {
    e.preventDefault();
    try {
      const resp = await editMarca(idMarcaEdit, marcaEdit);
      console.log(resp.data);
      setMarcaEdit({ nombre: "", estado: "", _id: "" });
      const filteredMarcas = marcas.filter((marca) => {
        return marca._id !== resp.data._id;
      });
      setMarcas([...filteredMarcas, resp.data]);
      const closebutton = document.getElementById("modalCloseButton");
      closebutton.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <form onSubmit={(e) => handleCrearMarca(e)}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            required
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

        <button className="btn btn-primary">Submit</button>
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
          {marcas.length > 0 ? (
            marcas.map((marca, index) => {
              return (
                <tr key={index}>
                  <td>{marca.nombre}</td>
                  <td>{marca.estado}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-marcaid={marca._id}
                      onClick={(e) => handleMostrarModal(e)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr><td></td></tr>
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
                Actualizar Marca
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
              {marcas.length > 0 ? (
                marcas
                  .filter((marca) => marca._id === idMarcaEdit)
                  .map((marca, i) => {
                    return (
                      <>
                        <form onSubmit={(e) => handleEditTipo(e)}>
                          <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input
                              required
                              type="text"
                              name="nombre"
                              placeholder={marca.nombre}
                              className="form-control"
                              onChange={(e) => handleEditOnChange(e)}
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">estado</label>
                            <select
                              required
                              name="estado"
                              placeholder={marca.estado}
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
                              value={marca._id}
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
