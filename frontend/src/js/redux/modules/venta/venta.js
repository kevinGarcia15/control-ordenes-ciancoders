import { api } from "api";
import { NotificationManager } from "react-notifications";
import { handleActions } from "redux-actions";
import { push } from "react-router-redux";

const GUARDAR_PRODUCTO = "GUARDAR_PRODUCTO";

const leer = (id) => (dispatch) => {
    api.get(`productos/${id}`)
        .then((response) => {
            dispatch({
                type: GUARDAR_PRODUCTO,
                producto: response,
            });
        })
        .catch((error) => {
            NotificationManager.error(error.detail, "ERROR", 0);
        })
        .finally(() => {});
};

const crearVenta = (data = {}) => (dispatch)=>{
    console.log(data)
    api.post("/ventas" , data)
        .then((response)=>{
            NotificationManager.success(
                "Usted a adquirido el producto exitosamente",
                "Exito",
                5000
            )
            const urlpush = localStorage.getItem('token')?"/vendedor":"/"
            dispatch(push(`${urlpush}`));
        })
        .catch((error)=>{
            NotificationManager.error(
                error.detail,
                "Error",
                0
            )
        })
}

export const actions = {
    leer,
    crearVenta
};

export const reducers = {
    [GUARDAR_PRODUCTO]: (state, { producto }) => {
        return {
            ...state,
            producto,
        };
    },
};

export const initialState = {
    loader: false,
    producto: {},
};

export default handleActions(reducers, initialState);
