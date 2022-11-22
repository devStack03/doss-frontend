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

    get() {
      return Http.get<any>('/')
    }

    createSubscription(data: any) {
        return Http.post<any>(this.apiUrl + '/create-subscription', data);
    }

    createCustomerPortal(data: any) {
        return Http.post<any>(this.apiUrl + '/create-customer-portal-session', data);
    }

    getCustomerDetail() {
        return Http.get<any>(this.apiUrl + `/subscription-detail`);
    }

    renewSubscription() {
        return Http.post<any>(this.apiUrl + `/subscription/renew`);
    }

    priceList() {
        return Http.get<any>(this.apiUrl + `/price-list`);
    }

    update(data: any) {
        return Http.patch<any>(this.apiUrl + `/update`, data);
    }
}

export default new UserService();