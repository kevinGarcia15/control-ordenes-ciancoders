import ComprarModoInvitado from './ComprarModoInvitado'
import {actions} from '../../../redux/modules/venta/venta'
import {connect} from 'react-redux'

const ms2p = (state)=>{
    return{
        ...state.venta,
        ...state.form,
    }
}

const md2p = {
    ...actions
}

export default connect(ms2p, md2p)(ComprarModoInvitado)