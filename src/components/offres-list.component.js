import React, { Component } from "react";
import OffreDataService from "../services/offre.service";
import { Link } from "react-router-dom";

export default class OffresList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveOffres = this.retrieveOffres.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveOffre = this.setActiveOffre.bind(this);
        this.removeAllOffres = this.removeAllOffres.bind(this);
        this.searchTitle = this.searchTitle.bind(this);
        this.displayTel = this.displayTel.bind(this);

        this.state = {
            offres: [],
            currentOffre: null,
            currentIndex: -1,
            searchTitle: "",
            tel: null,
        };
    }

    componentDidMount() {
        this.retrieveOffres();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrieveOffres() {
        OffreDataService.getAll()
            .then(response => {
                this.setState({
                    offres: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    displayTel(id){
       // console.log("test");
        OffreDataService.getTel(id)
            .then(response => {
                this.setState({
                    tel: response.data,
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }


    refreshList() {
        this.retrieveOffres();
        this.setState({
            currentOffre: null,
            currentIndex: -1
        });
    }

    setActiveOffre(offre, index) {
        this.setState({
            currentOffre: offre,
            currentIndex: index
        });
    }

    removeAllOffres() {
        OffreDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchTitle() {
        OffreDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    offres: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { tel, searchTitle, offres, currentOffre, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Recherche par mots clés"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}
                            >
                                Chercher
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Offres des boss</h4>

                    <ul className="list-group">
                        {offres &&
                        offres.map((offre, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveOffre(offre, index)}
                                key={index}
                            >
                                {offre.title}
                            </li>
                        ))}
                    </ul>

                </div>
                <div className="col-md-6">
                    {currentOffre ? (
                        <div>
                            <br/>
                            <h4>Détails de l'offre</h4>
                            <div>
                                <label>
                                    <strong>Mots clés:</strong>
                                </label>{" "}
                                {currentOffre.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentOffre.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentOffre.stock ? "En stock" : "Expiré"}
                            </div>
                            <button
                                id="myLink"
                                type="submit"
                                className="badge badge-success"
                                //onClick={this.displayTel(currentOffre.id)}
                            >
                                Contact Boss
                            </button>

                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Merci de cliquer sur une offre...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}