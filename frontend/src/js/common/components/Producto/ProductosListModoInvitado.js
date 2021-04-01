import React, { Component } from "react";
import Navbar from "../layout/Navbar/Navbar";
import TodosProductosListContainer from "./TodosProductosListContainer";

export class ProductosListModoInvitado extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleOpen: true,
        };
    }
    navToggle = () => {
        this.setState({toggleOpen: !this.state.toggleOpen });
    };

    render() {
        return (
            <React.Fragment>
                <main className="main-content p-0 col-sm-12 col-md-9 offset-md-3 col-lg-10 offset-lg-1">
                    <div className="main-navbar bg-white sticky-top">
                        <div className="p-0 container">
                            <Navbar
                                navToggle={this.navToggle}
                            />
                        </div>
                    </div>
                    <div className="main-content-container px-4 container-fluid">
                        <TodosProductosListContainer />
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default ProductosListModoInvitado;
