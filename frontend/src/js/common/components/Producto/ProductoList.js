import React, { Component } from "react";
import { Link } from "react-router-dom";

import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";

class ProductoList extends Component {
    componentDidMount(){
        const {listar} = this.props
        listar()
    }
    render() {
        const { data, loader } = this.props;
        return (
            <React.Fragment>
                <Link
                    to="/productos/crear"
                    className="btn btn-primary mt-4 mb-4"
                >
                    Ingresar Producto
                </Link>
                <Grid
                    hover
                    striped
                    data={data}
                    loading={loader}
                    //onPageChange={listar}
                    //onSortChange={onSortChange}
                >
                    <TableHeaderColumn isKey dataField="nombre" dataSort>
                        Nombre
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="precio" dataSort>
                        Precio
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="descripcion" dataSort>
                        Descripcion
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({
                            editar: "productos",
                            ver: "productos",
                            eliminar: () => {},
                        })}
                    >
                        Acciones
                    </TableHeaderColumn>
                </Grid>
            </React.Fragment>
        );
    }
}

export default ProductoList;
