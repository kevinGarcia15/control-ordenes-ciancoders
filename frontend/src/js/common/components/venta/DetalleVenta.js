import React, { Component } from 'react'
import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";
import Moment from "react-moment"
export class DetalleVenta extends Component {
    componentDidMount(){
        const {detalleVenta, match} = this.props
        detalleVenta(match.params.id)
    }
    render() {
        const {detalleDeVenta, loader} = this.props
        console.log(detalleDeVenta)
        return (
            <div>
                <Grid
                    hover
                    striped
                    data={detalleDeVenta}
                    loading={loader}
                    pagination={false}
                    //onPageChange={listar}
                    //onSortChange={onSortChange}
                >
                    <TableHeaderColumn 
                        isKey 
                        dataField="producto" 
                        dataSort
                        dataFormat={cell=>{
                            return(
                                `${cell.nombre}`                                
                            )
                        }}
                        >
                        Producto
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                        dataField="venta" 
                        dataSort
                        dataFormat={cell=>{
                            return(
                                cell.comprador?
                                `${cell.comprador.user.first_name}`
                                :`Comprador Anonimo`                                
                            )
                        }}
                        >
                        Comprador
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                        dataField="venta" 
                        dataSort
                        dataFormat={cell=>{
                            return(
                                `${cell.email_contacto}`                                
                            )
                        }}
                        >
                        Contacto
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                        dataField="venta" 
                        dataSort
                        dataFormat={(cell)=>{
                            return(
                                <Moment locale="es-GB" fromNow>{cell.creado}</Moment>
                            )
                        }}
                        >
                        Vendido 
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="cantidad" dataSort>
                        Cantidad
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                        dataField="producto" 
                        dataSort
                        dataFormat={(cell, col)=>{
                            let total = cell.precio * col.cantidad 
                            return `Q. ${total}`
                        }}
                        >
                        Total
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                        dataField="producto" 
                        dataSort
                        dataFormat={(cell)=>{
                            return(
                                <img src={cell.imagen} style={{width:"40px"}}/>
                            )
                        }}
                        >
                        Imagen
                    </TableHeaderColumn>
                </Grid> 
            </div>
        )
    }
}

export default DetalleVenta
