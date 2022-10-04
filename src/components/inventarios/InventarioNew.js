import React, { useState, useEffect } from "react";

import { getUsuarios } from "../../services/usuarioService";

import { getMarcas } from "../../services/marcaService";

import { gettipoEquipos } from "../../services/tipo-EquipoService";

import { getestadoEquipo } from "../../services/estado-EquipoService";

export const InventarioNew = ({ handleOpenModal }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [estados, setEstados] = useState([]);

  const listarUsuarios = async () => {
    try {
      const { data } = await getUsuarios();
      setUsuarios(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    listarUsuarios();
  }, []);

  const listarMarcas = async () => {
    try {
      const { data } = await getMarcas();
      setMarcas(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    listarMarcas();
  }, []);

  const listarTipos = async () => {
    try {
      const { data } = await gettipoEquipos();
      setTipos(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    listarTipos();
  }, []);

  const listarEstados = async () => {
    try {
      const { data } = await getestadoEquipo();
      setEstados(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    listarEstados();
  }, []);

  return (
    <div className="sidebar">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="sidebar-header">
              <h3>Nuevo inventario</h3>
              <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
            </div>
          </div>
        </div>



        <div className="row">
          <div className="col">
            <hr />
          </div>
        </div>
        <form>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Serial</label>
                <input type="text" name="serial" className="form-control" />
              </div>
            </div>

            <div className="col">
              <div className="mb-3">
                <label className="form-label">Modelo</label>
                <input type="text" name="modelo" className="form-control" />
              </div>
            </div>

            <div className="col">
              <div className="mb-3">
                <label className="form-label">Descripcio</label>
                <input
                  type="text"
                  name="descriipcion"
                  className="form-control"
                />
              </div>
            </div>

            <div className="col">
              <div className="mb-3">
                <label className="form-label">Color</label>
                <input type="text" name="color" className="form-control" />
              </div>
            </div>
          </div>




          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Foto</label>
                <input type="text" name="foto" className="form-control" />
              </div>
            </div>

            <div className="col">
              <div className="mb-3">
                <label className="form-label">Fecha Compra</label>
                <input
                  type="date"
                  name="fechaCompra"
                  className="form-control"
                />
              </div>
            </div>

            <div className="col">
              <div className="mb-3">
                <label className="form-label">Precio</label>
                <input type="number" name="precio" className="form-control" />
              </div>
            </div>

            <div className="col">
              <div className="mb-3">
                <label className="form-label">Usuario</label>
                <select className="form-select">
                  <option defaultValue>--Seleccione--</option>
                  {usuarios.length > 0 ? (
                    usuarios.map((usuario) => {
                      return (
                        <option key={usuario._id} value={usuario._id}>{usuario.nombre}</option>
                      );
                    })
                  ) : (
                    <option value=""></option>
                  )}
                </select>
              </div>
            </div>
          </div>



          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Marca</label>
                <select className="form-select">
                <option Value="">--Seleccione--</option> {

                  marcas.map(({ _id,nombre }) => {
                    return <option key={_id} value={_id}>{nombre}</option>
                    
                })
              }
                </select>
              </div>
            </div>

            <div className="col">
              <div className="mb-3">
                <label className="form-label">Tipo Equipo</label>
                <select className="form-select">
                <option Value="">--Seleccione--</option> {

                  tipos.map(({ _id,nombre }) => {
                    return <option key={_id} value={_id}>{nombre}</option>
                    
                })
              }
                </select>
              </div>
            </div>

            <div className="col">
              <div className="mb-3">
                <label className="form-label">Estado Equipo</label>
                <select className="form-select">
                <option Value="">--Seleccione--</option> {

                  estados.map(({ _id,nombre }) => {
                    return <option key={_id} value={_id}>{nombre}</option>
                    
                })
              }
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
