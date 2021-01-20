import React, { Component } from "react";
import OffreDataService from "../services/offre.service";
import {Link} from "react-router-dom";

export default class Offre extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getOffre = this.getOffre.bind(this);
        this.updateStocked = this.updateStocked.bind(this);
        this.updateOffre = this.updateOffre.bind(this);
        this.deleteOffre = this.deleteOffre.bind(this);

        this.state = {
            currentOffre: {
                id: null,
                title: "",
                description: "",
                stock: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getOffre(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function(prevState) {
            return {
                currentOffre: {
                    ...prevState.currentOffre,
                    title: title
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentOffre: {
                ...prevState.currentOffre,
                description: description
            }
        }));
    }

    getOffre(id) {
        OffreDataService.get(id)
            .then(response => {
                this.setState({
                    currentOffre: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateStocked(status) {
        var data = {
            id: this.state.currentOffre.id,
            title: this.state.currentOffre.title,
            description: this.state.currentOffre.description,
            stock: status
        };

        OffreDataService.update(this.state.currentOffre.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentOffre: {
                        ...prevState.currentOffre,
                        stock: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateOffre() {
        OffreDataService.update(
            this.state.currentOffre.id,
            this.state.currentOffre
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The offre was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });

    }

    deleteOffre() {
        OffreDataService.delete(this.state.currentOffre.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/mod')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentOffre } = this.state;

        return (
            <div>
                {currentOffre ? (
                    <div className="edit-form">
                        <h4>Offre</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentOffre.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentOffre.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentOffre.stock ? "En stock" : "Expiré"}
                            </div>
                        </form>

                        {currentOffre.stock ? (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updateStocked(false)}
                            >
                                Expiré
                            </button>
                        ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updateStocked(true)}
                            >
                                En stock
                            </button>
                        )}

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteOffre}
                        >
                            Supprimer
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateOffre}
                        >
                            Modifier
                        </button>
                        <p>{this.state.message}</p>
                        <br/>
                        <Link to={"/mod"} className="nav-link">
                            Retour au LambdaBoard
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Merci de cliquer sur une offre...</p>
                    </div>
                )}
            </div>
        );
    }
}