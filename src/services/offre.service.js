import http from "../http-common";

class OffreDataService {
    getAll() {
        return http.get(`/offres`);
    }

    getAllByUser(id) {
        return http.get(`/offres/Boss/${id}`);
    }

    get(id) {
        return http.get(`/offres/${id}`);
    }

    getTel(id) {
        return http.get(`/offres/tel/${id}`);
    }

    create(data) {
        return http.post("/offres", data);
    }

    update(id, data) {
        return http.put(`/offres/${id}`, data);
    }

    delete(id) {
        return http.delete(`/offres/${id}`);
    }

    deleteAll() {
        return http.delete(`/offres`);
    }

    findByTitle(title) {
        return http.get(`/offres?title=${title}`);
    }
}

export default new OffreDataService();