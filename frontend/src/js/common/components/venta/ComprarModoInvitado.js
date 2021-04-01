import React, { Component } from "react";
import Navbar from "../layout/Navbar/Navbar";
import ComprarForm from "./ComprarForm";

export class ComprarModoInvitado extends Component {
    componentDidMount() {
        const { leer, match } = this.props;
        const id = match.params.id;
        leer(id);
    }

    formularioEnvio = (data) => {
        const { crearVenta, match } = this.props;
        const id = match.params.id;
        crearVenta({ ...data, id });
    };
    render() {
        const { producto, ventaForm } = this.props;
        const IsVentaForm = ventaForm ? ventaForm : {}
        return (
            <React.Fragment>
                <main className="main-content p-0 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-1">
                    <div className="main-navbar bg-white sticky-top">
                        <div className="p-0 container">
                            <Navbar navToggle={this.navToggle} />
                        </div>
                    </div>
                    <div className="main-content-container px-4 container-fluid">
                        <div className="container mt-4">
                            <div className="row">
                                <div className="card">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-6">
                                                <img
                                                    src={producto.imagen}
                                                    alt={producto.nombre}
                                                    style={{ width: "400px" }}
                                                />
                                            </div>
                                            <div className="col-6 p-4 d-flex flex-column justify-content-between">
                                                <div>
                                                    <h3>{producto.nombre}</h3>
                                                    <p>
                                                        {producto.descripcion}
                                                    </p>
                                                    <h5>{`Q. ${producto.precio}`}</h5>
                                                </div>
                                                <ComprarForm
                                                    onSubmit={
                                                        this.formularioEnvio
                                                    }
                                                    precioProducto={
                                                        producto.precio
                                                    }
                                                    ventaForm={IsVentaForm}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default ComprarModoInvitado;
