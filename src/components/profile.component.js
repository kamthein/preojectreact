import React, { Component } from "react";
import AuthService from "../services/auth.service";
import {Link} from "react-router-dom";

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                dejaBoss: user.roles.includes("ROLE_BOSS"),
            });
        }
    }

    render() {
        const { currentUser, dejaBoss } = this.state;

        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>{currentUser.username}</strong>
                    </h3>
                </header>
                <p>
                    <strong>Token:</strong>{" "}
                    {currentUser.accessToken.substring(0, 20)} ...{" "}
                    {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                </p>
                <p>
                    <strong>Identifiant Unique:</strong>{" "}
                    {currentUser.id}
                </p>
                <p>
                    <strong>E-mail:</strong>{" "}
                    {currentUser.email}
                </p>
                <p>
                    <strong>Tel:</strong>{" "}
                    {currentUser.tel}
                </p>
                <strong>Rôle(s):</strong>
                <ul>
                    {currentUser.roles &&
                    currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                </ul>

                {!dejaBoss && (
                        <p><br/>NB : Pour évoluer en Boss, envoyer un sms au 06 72 54 41 29 (pseudo + identifiant unique)</p>
                )}
            </div>
        );
    }
}