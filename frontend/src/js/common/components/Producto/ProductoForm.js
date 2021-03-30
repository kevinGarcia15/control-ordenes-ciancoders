import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import {
    renderField,
    renderNumber,
    renderTextArea,
    renderFilePicker,
} from ".././Utils/renderField/renderField";
import { validate, validators } from "validate-redux-form";

export class ProductoForm extends Component {
    render() {
        const { titulo, crear, handleSubmit, setArchivo, producto } = this.props;
        let editar = window.location.href.includes("editar");
        let disabled = false;
        crear == false && editar == false
        ? (disabled = true)
        : (disabled = false);
        return (
            <form className="row" onSubmit={handleSubmit}>
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-4">
                                    <h5 className="card-title">
                                        {titulo} producto
                                    </h5>
                                </div>
                                <div className="col-8">
                                    <div className="mb-2">
                                        <label>Nombre del producto</label>
                                        <Field
                                            name="nombre"
                                            component={renderField}
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Precio</label>
                                        <Field
                                            decimalScale={2}
                                            name="precio"
                                            placeholder="Precio"
                                            disabled={disabled}
                                            component={renderNumber}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label>Descripcion</label>
                                        <Field
                                            name="descripcion"
                                            component={renderTextArea}
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="avatar">Imagen</label>
                                        <Field
                                            photo={producto.imagen ? producto.imagen : null}
                                            name="imagen"
                                            setFile={setArchivo}
                                            disabled={disabled}
                                            component={renderFilePicker}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {disabled == false ? (
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row justify-content-end">
                                    <div className="col-3">
                                        <Link
                                            to={"/productos"}
                                            className="btn btn-secondary mr-2"
                                        >
                                            Cancelar
                                        </Link>
                                        <button
                                            className="btn btn-primary"
                                            type="submit"
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row justify-content-end">
                                    <Link
                                        to={"/productos"}
                                        className="btn btn-secondary mr-2"
                                    >
                                        Aceptar
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        );
    }
}
export default reduxForm({
    form: "productoForm",
    validate: (data) => {
        return validate(data, {
            nombre: validators.exists()("Este campo es requerido"),
            precio: validators.exists()("Este campo es requerido"),
        });
    },
})(ProductoForm);
