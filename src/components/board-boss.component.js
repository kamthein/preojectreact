import React, { Component } from "react";
import OffreDataService from "../services/offre.service";
import AuthService from "../services/auth.service";
import {Link} from "react-router-dom";


export default class AddOffre extends Component {


    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveOffre = this.saveOffre.bind(this);
        this.newOffre = this.newOffre.bind(this);
        this.retrieveOffresByUser = this.retrieveOffresByUser.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveOffre = this.setActiveOffre.bind(this);
        this.removeAllOffres = this.removeAllOffres.bind(this);

        this.state = {
            id: null,
            title: "",
            description: "",
            stock: true,
            userId: AuthService.getCurrentUser(),
            offres: [],
            currentOffre: null,
            currentIndex: -1,
            searchTitle: "",

            submitted: false
        };

    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    saveOffre() {
        const data = {
            title: this.state.title,
            description: this.state.description,
            stock: true,
            userId: AuthService.getCurrentUser().id,
        };
        console.log(data);
        OffreDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    stock: true,
                    userId: AuthService.getCurrentUser().id,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newOffre() {
        this.setState({
            id: null,
            title: "",
            description: "",
            stock: true,
            userId: AuthService.getCurrentUser().id,

            submitted: false
        });

        this.refreshList();
    }

    componentDidMount() {
        this.retrieveOffresByUser();
    }

    retrieveOffresByUser() {
        const userId = AuthService.getCurrentUser().id;
        OffreDataService.getAllByUser(userId)
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

    refreshList() {
        this.retrieveOffresByUser();
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


    render() {
        const {  offres, currentOffre, currentIndex } = this.state;
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Votre offre est publiée!</h4>
                        <button className="btn btn-success" onClick={this.newOffre}>
                            Créer une autre offre
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Mots clés</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                name="title"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                name="description"
                            />
                        </div>

                        <button onClick={this.saveOffre} className="btn btn-success">
                            Créer une offre
                        </button>


                        <p>
                            <br/>
                            <br/>
                            <h4>Mes offres</h4>
                            <div className="list row">
                                <div className="col-md-6">
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
                                            <Link
                                                to={"/offres/" + currentOffre.id}
                                                className="badge badge-warning"
                                            >
                                                Edit
                                            </Link>
                                        </div>
                                    ) : (
                                        <div>
                                            <br />
                                            <p>Merci de cliquer sur une offre...</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </p>



                    </div>
                )}
            </div>
        );
    }
}