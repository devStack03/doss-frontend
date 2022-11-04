// import IUser from "../types/user.type";
import Http from "./http.common";
class AuthService {
    apiUrl = '/auth';
    
    login(data: any) {
        return Http.post(this.apiUrl + '/login', data);
    }

    create(data: any) {
        return Http.post<any>(this.apiUrl + '/register', data);
    }
}

export default new AuthService();