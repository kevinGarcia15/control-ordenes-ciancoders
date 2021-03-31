import React, { Component } from "react";
import {Link} from 'react-router-dom'

export class TodosProductosList extends Component {
    componentDidMount() {
        const { listarProductosVenta } = this.props;
        listarProductosVenta();
    }
    render() {
        const { productosVenta } = this.props;
        return (
            <div className="mt-4 mr-2 ml-2">
                <div className="row">
                    {productosVenta.results
                        ? productosVenta.results.map((item) => {
                              return (
                                  <div key={item.id} className="col-3">
                                      <div
                                          className="card"
                                          style={{ width: "350px" }}
                                      >
                                          <img
                                              className="card-img-top"
                                              src={item.imagen}
                                              alt="Card image"
                                          />
                                          <div className="card-body">
                                              <h4 className="card-title">
                                                  {item.nombre}
                                              </h4>
                                              <p className="card-text">
                                                  Q {item.precio}
                                              </p>
                                              <p className="card-text">
                                                  {item.descripcion}
                                              </p>
                                              <Link
                                                  to={`chekout/${item.id}`}
                                                  className="btn btn-primary"
                                              >
                                                  comprar
                                              </Link>
                                          </div>
                                      </div>
                                  </div>
                              );
                          })
                        : null}
                </div>
            </div>
        );
    }
}

export default TodosProductosList;
