import React, { useState, useEffect } from "react";
import { getMarcas, crearMarca } from "../../services/marcaService";

export const MarcaView = () => {
  const [valoresForm, setValoresForm] = useState({});
  const [marcas, setMarcas] = useState({});
  const { nombre = "", estado = "" } = valoresForm;

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
          </tr>
        </thead>
        <tbody>
          {marcas.length > 0 ? (
            marcas.map((marca, index) => {
              return (
                <tr key={index}>
                  <td>{marca.nombre}</td>
                  <td>{marca.estado}</td>
                </tr>
              );
            })
          ) : (
            <tr><td></td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
