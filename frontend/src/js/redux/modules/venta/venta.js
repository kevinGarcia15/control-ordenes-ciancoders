import { api } from "api";
import { NotificationManager } from "react-notifications";
import { handleActions } from "redux-actions";
import { push } from "react-router-redux";

const GUARDAR_PRODUCTO = "GUARDAR_PRODUCTO";
const GUARDAR_LISTADO_MISVENTAS = "GUARDAR_LISTADO_MISVENTAS"
const GUARDAR_PAGINA = "GUARDAR_PAGINA"
const GUARDAR_LISTADO_DETALLE_VENTA = "GUARDAR_LISTADO_DETALLE_VENTA"

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
            /**Dependiendo si el usuario esta logeado lo lleva a su ruta */
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


const listar = (page = 1) => (dispatch, getStore) => {
    api.get("/ventas")
        .then((response) => {
            dispatch({ type: GUARDAR_LISTADO_MISVENTAS, misVentas: response });
            dispatch({ type: GUARDAR_PAGINA, page: page });
        })
        .catch((error) => {
            NotificationManager.error(
                "ocurrio un error al listar los productos",
                "ERROR",
                3000
            );
        });
};

const detalleVenta = (id_venta) => (dispatch, getStore) => {
    api.get("/ventas/detalle_venta", {id_venta})
        .then((response) => {
            const data ={
                results: response
            }
            dispatch({ type: GUARDAR_LISTADO_DETALLE_VENTA, detalleDeVenta: data });
        })
        .catch((error) => {
            NotificationManager.error(
                "ocurrio un error al listar los productos",
                "ERROR",
                3000
            );
        });
};

export const actions = {
    leer,
    crearVenta, 
    listar,
    detalleVenta
};

export const reducers = {
    [GUARDAR_PRODUCTO]: (state, { producto }) => {
        return {
            ...state,
            producto,
        };
    },
    [GUARDAR_LISTADO_MISVENTAS]: (state, { misVentas }) => {
        return {
            ...state,
            misVentas,
        };
    },
    [GUARDAR_PAGINA]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },
    [GUARDAR_LISTADO_DETALLE_VENTA]: (state, { detalleDeVenta }) => {
        return {
            ...state,
            detalleDeVenta,
        };
    },
};

export const initialState = {
    loader: false,
    producto: {},
    misVentas:{},
    detalleDeVenta:{},
};

export default handleActions(reducers, initialState);
