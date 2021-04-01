import React, { Component } from 'react'
import Grid from "../Utils/Grid";
import { standardActions } from "../Utils/Grid/StandardActions";
import Moment from "react-moment"

export class MisVentas extends Component {
    componentDidMount(){
        const {listar} = this.props
        listar()
    }
    render() {
        const {misVentas, loader} = this.props
        return (
            <div>
                <Grid
                    hover
                    striped
                    data={misVentas}
                    loading={loader}
                    //onPageChange={listar}
                    //onSortChange={onSortChange}
                >
                    <TableHeaderColumn 
                        isKey 
                        dataField="comprador" 
                        dataSort
                        dataFormat={cell=>{
                            return(
                                cell ? 
                                `${cell.user.first_name} ${cell.user.last_name}`                                
                                : `Usuario Anonimo`
                            )
                        }}
                        >
                        Cliente
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                        dataField="creado" 
                        dataSort
                        dataFormat={(cell)=>{
                            return(
                                <Moment locale="es-GB" fromNow>{cell}</Moment>
                            )
                        }}
                        >
                        Vendido el
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="email_contacto" dataSort>
                        Contacto
                    </TableHeaderColumn>
                </Grid>            
            </div>
        )
    }
}

export default MisVentas
