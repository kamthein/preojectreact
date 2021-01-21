import React, { Component } from "react";
import OffreDataService from "../services/offre.service";
import {Link} from "react-router-dom";

export default class Tel extends Component {
    constructor(props) {
        super(props);
        this.getTel = this.getTel.bind(this);

        this.state = {
            currentUser: {
                id: null,
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getTel(this.props.match.params.id);
    }

    getTel(id) {
        OffreDataService.getTel(id)
            .then(response => {
                this.setState({
                    currentUser: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }


    render() {
        const { currentUser } = this.state;

        return (
            <div>
                <p>{currentUser.username} : {currentUser.tel}</p>
                <Link to={"/home"} className="badge badge-default mr-2">
                    Retour au offres
                </Link>

            </div>
        );
    }
}