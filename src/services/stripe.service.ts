import Http from "./http.common";
class StripeService {
    apiUrl = '/charge';
    
    getSecretKey(data: any) {
        return Http.post(this.apiUrl + '/secret', data);
    }

    create(data: any) {
        return Http.post<any>(this.apiUrl + '/register', data);
    }
}

export default new StripeService();