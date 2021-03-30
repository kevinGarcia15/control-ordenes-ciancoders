import React, { Component } from "react";
import ProductoForm from "./ProductoForm";

class ProductoCrear extends Component {
    state = {
        crear: true,
        titulo: "Crear",
        imagen: null,
    };
    componentDidMount(){
        const {leer, match} = this.props
        const id = match.params.id
        if(id){
            leer(id)
            this.setState({
                crear:false,
                titulo:"Ver"
            })
        }
    }
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
        const { producto } = this.props;
        const funcionEnvio = this.crear;
        return (
            <div className="container mt-3">
                <ProductoForm
                    onSubmit={funcionEnvio}
                    crear={this.state.crear}
                    titulo={this.state.titulo}
                    producto={producto}
                    setArchivo={this.setArchivo}
                />
            </div>
        );
    }
}

export default ProductoCrear;
