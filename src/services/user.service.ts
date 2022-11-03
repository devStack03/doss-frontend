// import IUser from "../types/user.type";
import Http from "./http.common";
class UserService {
    apiUrl = '/users';
    
    getAll() {
        return Http.get<Array<any>>(this.apiUrl)
    }

    create(data: any) {
        return Http.post<any>(this.apiUrl + '/create', data);
    }

    getById(id: any) {
        return Http.get<any>(this.apiUrl + `/${id}`);
    }
}

export default new UserService();