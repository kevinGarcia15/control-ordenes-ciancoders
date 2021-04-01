import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile, Registro} from './common/components/LoginRegister';
import Demo from './common/components/Demo/Demo';
import ProtectedRoute from './ProtectedRoute';
import Examples from './common/components/Examples/Basic';
import NotFound from './common/components/layout/NotFound/NotFound';

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
require('../style/index.css');
import 'bootstrap/dist/css/bootstrap.min.css';

import Grids from "./common/components/Examples/Grids";
import Notificaciones from './common/components/Examples/Notificaciones';
import ExampleTabs from './common/components/Examples/Tabs/Tabs';
import ProductoListContainer from './common/components/Producto/ProductoListContainer'
import ProductoCrearContainer from './common/components/Producto/ProductoCrearContainer'
import TotodsProductosListContainer from './common/components/Producto/TodosProductosListContainer'
import ComprarContainer from './common/components/venta/ComprarContainer'
import ProductosListModoInvitado from './common/components/Producto/ProductosListModoInvitado'
import ComprarModoInvitadoContainer from './common/components/venta/ComprarModoInvitadoContainer'
import MisVentasContainer from './common/components/venta/MisVentasContainer'
import DetalleVentaContainer from './common/components/venta/DetalleVentaContainer'

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                <Route exact path="/" component={ProductosListModoInvitado} />
                <ProtectedRoute exact path="/user-profile" component={Profile} />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute exact path="/notifications" component={Notificaciones} />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />

                <ProtectedRoute exact path="/productos" component={ProductoListContainer} />
                <ProtectedRoute exact path="/productos/crear" component={ProductoCrearContainer} />
                <ProtectedRoute exact path="/productos/:id/" component={ProductoCrearContainer} />
                <ProtectedRoute exact path="/productos/:id/editar" component={ProductoCrearContainer} />
                <ProtectedRoute exact path="/vendedor/" component={TotodsProductosListContainer} />

                <ProtectedRoute exact path="/comprar/:id" component={ComprarContainer} />
                <ProtectedRoute exact path="/misventas" component={MisVentasContainer} />
                <ProtectedRoute exact path="/misventas/detalle/:id" component={DetalleVentaContainer} />
                <Route exact path="/adquirir/:id" component={ComprarModoInvitadoContainer} />
                
                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
