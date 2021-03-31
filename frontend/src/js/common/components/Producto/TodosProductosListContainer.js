import TodosProductosList from './TodosProductosList'
import {actions} from '../../../redux/modules/producto/producto'
import {connect} from 'react-redux'

const ms2p = (state)=>{
    return{
        ...state.producto
    }
}

const md2p = {
    ...actions
}

export default connect(ms2p, md2p)(TodosProductosList)