import React, { useState, useEffect } from "react";

import { getUsuarios } from "../../services/usuarioService";

import { getMarcas } from "../../services/marcaService";

import { gettipoEquipos } from "../../services/tipo-EquipoService";

import { getestadoEquipo } from "../../services/estado-EquipoService";

import {crearInventario} from "../../services/inventarioService";

import Swal  from "sweetalert2";



export const InventarioNew = ({ handleOpenModal }) => {

  const [usuarios, setUsuarios] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [estados, setEstados] = useState([]);
  const [valoresForm,setValoresForm ] = useState ({});
  const{ serial = "",modelo = "",descripcion = "",color = "",foto = "",
  fechaCompra = "",precio = "",  usuario, marca, tipo, estado } = valoresForm;

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

   const handleOnChage =({target}) => {
    const { name,value } =target;
    setValoresForm({ ... valoresForm, [name]: value }); // sprea

   }


   const handleonSubmit = async (e) => {
      e.preventDefault ();
     const inventario ={ serial, modelo, descripcion, color, foto, fechaCompra, precio, 
      usuario: {
        _id: usuario
      },

      marca: {
        _id: marca
      },

      tipoEquipo: {
        _id: tipo
      },

      estadoEquipo: {
        _id: estado
      }
     }


     console.log(inventario);

     try {

      Swal .fire ({
        allowOutsideClick: false,
        text: "Cargando..."

      });
      Swal.showLoading();

      const {data} = await crearInventario (inventario);
      console.log (data);
      Swal.close();

     } catch (error){
      console.log (error);
      Swal.close();
     }


   }


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
        <form onSubmit={(e) => handleonSubmit (e)}>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Serial</label>
                <input type="text" name="serial"
                required 
                value={serial} onChange ={ (e) => handleOnChage (e) }
                className="form-control" />
              </div>
            </div>

            <div className="col">
              <div className="mb-3">
                <label className="form-label">Modelo</label>
                <input type="text" name="modelo" 
                required 
                value={modelo} onChange ={ (e) => handleOnChage (e) } 
                className="form-control" />
              </div>
            </div>

            <div className="col">
              <div className="mb-3">
                <label className="form-label">Descripcion</label>
                <input
                  type="text"
                  name="descripcion" 
                  required 
                  value={descripcion} onChange ={ (e) => handleOnChage (e) }
                  className="form-control"
                />
              </div>
            </div>

            <div className="col">
              <div className="mb-3">
                <label className="form-label">Color</label>
                <input type="text" name="color"
                required 
                value={color} onChange ={ (e) => handleOnChage (e) }
                className="form-control" />
              </div>
            </div>
          </div>




          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Foto</label>
                <input type="url" name="foto" 
                required 
                value={foto} onChange ={ (e) => handleOnChage (e) }
                className="form-control" />
              </div>
            </div>

            <div className="col">
              <div className="mb-3">
                <label className="form-label">Fecha Compra</label>
                <input type="date"name="fechaCompra" 
                required 
                value={fechaCompra} onChange ={ (e) => handleOnChage (e) }
                  className="form-control"
                />
              </div>
            </div>

            <div className="col">
              <div className="mb-3">
                <label className="form-label">Precio</label>
                <input type="number" name="precio"
                required  
                value={precio} onChange ={ (e) => handleOnChage (e) }
                className="form-control" />
              </div>
            </div>


            <div className="col">
              <div className="mb-3">
                <label className="form-label">Usuario</label>
                <select className="form-select"
                onChange ={ (e) => handleOnChage (e) }
                name = "usuario"
                required 
                  value={usuario}>
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
                <select className="form-select"
                onChange ={ (e) => handleOnChage (e) }
                name = "marca"
                required 
                value={marca}>
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
                <select className="form-select"
                onChange ={ (e) => handleOnChage (e) }
                name = "tipo"
                required 
                value={tipo}>
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
                <select className="form-select"
                onChange ={ (e) => handleOnChage (e) }
                name = "estado"
                required 
                value={estado}>
                <option Value="">--Seleccione--</option> {

                  estados.map(({ _id,nombre }) => {
                    return <option key={_id} value={_id}>{nombre}</option>
                    
                })
              }
                </select>
              </div>
            </div> 
          </div>


           <div className = "row" >
           <div className = "col" >
           <button className="btn btn-success">Guardar</button>
           </div>
           </div>
        </form>
      </div>
    </div>
  );
};
