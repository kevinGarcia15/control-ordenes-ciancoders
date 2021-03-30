import { api } from "api";
import { handleActions } from "redux-actions";
import { NotificationManager } from "react-notifications";
import { push } from "react-router-redux";
import { initialize as initializeForm } from "redux-form";

const GUARDAR_LISTADO_MISPRODUCTOS = "GUARDAR_LISTADO_MISPRODUCTOS";
const GUARDAR_PAGINA = "GUARDAR_PAGINA";

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

export const actions = {
    listar,
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
};

export const initialState = {
    loader: false,
    data: {},
    page: 1,
};

export default handleActions(reducers, initialState);
