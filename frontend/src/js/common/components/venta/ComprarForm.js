import React, { Component } from "react";
import { renderField, renderNumber } from "../Utils/renderField/renderField";
import { validate, validators } from "validate-redux-form";
import { reduxForm, Field } from "redux-form";

class ComprarForm extends Component {
    render() {
        const { handleSubmit, ventaForm, precioProducto} = this.props;
        /**obtiene el valor del campo cantidad del formulario */
        const cantidadForm = ventaForm.values ? ventaForm.values.cantidad: 0;
        return (
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Cantidad</label>
                <Field name="cantidad" component={renderNumber}/>
                    <div>
                        <p className="text-success">Q. {cantidadForm * precioProducto}</p>
                    </div>
                <label htmlFor="">Correo de contacto</label>
                <Field name="email" component={renderField} />
                <button
                    className="btn btn-primary btn-block mt-3"
                    type="submit"
                >
                    Comprar
                </button>
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
