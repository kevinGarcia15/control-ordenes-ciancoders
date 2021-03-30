import React, { Component } from "react";
import ProductoForm from "./ProductoForm";

class ProductoCrear extends Component {
    state = {
        crear: true,
        titulo: "Crear",
        imagen: null,
    };
    setArchivo = (imagen) => {
        this.setState({ imagen: imagen });
    };
    crear = (data) => {
        const { crear } = this.props;
        crear({ ...data, imagen: null }, [
            { file: this.state.imagen, name: "imagen" },
        ]);
    };
    render() {
        const { crear } = this.props;
        const funcionEnvio = this.crear;
        return (
            <div className="container mt-3">
                <ProductoForm
                    onSubmit={funcionEnvio}
                    crear={this.state.crear}
                    titulo={this.state.titulo}
                    setArchivo={this.setArchivo}
                />
            </div>
        );
    }
}

export default ProductoCrear;
