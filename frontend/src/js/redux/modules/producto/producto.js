import { api } from "api";
import { handleActions } from "redux-actions";
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";
import { initialize as initializeForm } from "redux-form";

const GUARDAR_LISTADO_MISPRODUCTOS = "GUARDAR_LISTADO_MISPRODUCTOS";
const GUARDAR_PAGINA = "GUARDAR_PAGINA";
const LOADER = "LOADER";
const GUARDAR_PRODUCTO = "GUARDAR_PRODUCTO";

export const setLoader = (loader) => ({
    type: LOADER,
    loader,
});

const listar = (page = 1) => (dispatch, getStore) => {
    api.get("/productos/misproductos")
        .then((response) => {
            dispatch({ type: GUARDAR_LISTADO_MISPRODUCTOS, data: response });
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

const crear = (data = {}, attachments = []) => (dispatch, getStore) => {
    dispatch(setLoader(true));
    console.log(attachments);
    api.postAttachments("/productos", data, attachments)
        .then((response) => {
            NotificationManager.success(
                "Producto creado exitosamente",
                "Exito",
                2000
            );
            dispatch(push("/productos"));
        })
        .catch((error) => {
            NotificationManager.error(
                "Ha ocurrido un error al subir el producto",
                "Error",
                3000
            );
        })
        .finally(() => {
            dispatch(setLoader(false));
        });
};

const leer = (id) => (dispatch) => {
    api.get(`productos/${id}`)
        .then((response) => {
            dispatch(initializeForm("productoForm", response));
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

const actualizar = (data = {}, attachments = []) => (dispatch) => {
    dispatch(setLoader(true));
    api.putAttachments(`productos/${data.id}`, data, attachments)
        .then((response) => {
            NotificationManager.success(
                "Datos actualizados exitosamente",
                "Exito",
                1000
            );
            dispatch(push(`/productos`));
        })
        .catch(() => {
            NotificationManager.error(
                "Ha ocurrido un error al actualizar los datos",
                "ERROR",
                5000
            );
        })
        .finally(() => {
            dispatch(setLoader(false));
        });
};
export const actions = {
    listar,
    crear,
    leer,
    actualizar
};

export const reducers = {
    [GUARDAR_LISTADO_MISPRODUCTOS]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [GUARDAR_PAGINA]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },
    [GUARDAR_PRODUCTO]: (state, { producto }) => {
        return {
            ...state,
            producto,
        };
    },
};

export const initialState = {
    loader: false,
    data: {},
    page: 1,
    producto: {},
};

export default handleActions(reducers, initialState);
