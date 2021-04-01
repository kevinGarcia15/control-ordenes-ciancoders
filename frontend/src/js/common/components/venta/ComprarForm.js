import React, { Component } from "react";
import { renderField, renderNumber } from "../Utils/renderField/renderField";
import { validate, validators } from "validate-redux-form";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";

class ComprarForm extends Component {
    render() {
        const { handleSubmit, ventaForm, precioProducto } = this.props;
        /**obtiene el valor del campo cantidad del formulario */
        const cantidadForm = ventaForm.values ? ventaForm.values.cantidad : 0;
        const isTokenExist = localStorage.getItem('token')
        const returnUrl = isTokenExist ? "/vendedor":"/"
        return (
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Cantidad</label>
                <Field name="cantidad" component={renderNumber} />
                <div>
                    <p className="text-success">
                        Q. {cantidadForm * precioProducto}
                    </p>
                </div>
                {!isTokenExist?
                <React.Fragment>
                    <label htmlFor="">Correo de contacto</label>
                    <Field name="email" component={renderField} />
                </React.Fragment>
                
                :null}
                <button
                    className="btn btn-primary btn-block mt-3"
                    type="submit"
                >
                    Comprar
                </button>
                <Link 
                className="btn btn-secondary btn-block mt-3"
                to={returnUrl}
                >Cancelar</Link>
            </form>
        );
    }
}
export default reduxForm({
    form: "ventaForm",
    validate: (data) => {
        return validate(data, {
            email: validators.exists()("Este campo es requerido"),
            cantidad: validators.exists()("Este campo es requerido"),
        });
    },
})(ComprarForm);
