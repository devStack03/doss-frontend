// import IUser from "../types/user.type";
import Http from "./http.common";
class CouponService {
    apiUrl = '/coupon';
    
    validate(data: any) {
        return Http.post(this.apiUrl + '/validate', data);
    }

    create(data: any) {
        return Http.post<any>(this.apiUrl + '/register', data);
    }
}

export default new CouponService();