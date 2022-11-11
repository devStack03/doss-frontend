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

    get(data: any) {
      return Http.post<any>('/', data)
    }

    createSubscription(data: any) {
        return Http.post<any>(this.apiUrl + '/create-subscription', data);
    }

    createCustomerPortal(data: any) {
        return Http.post<any>(this.apiUrl + '/create-customer-portal-session', data);
    }
}

export default new UserService();