// import IUser from "../types/user.type";
import Http from "./http.common";
class RestaurantService {
    apiUrl = '/restaurants';
    
    getAll() {
        return Http.get<any>(this.apiUrl)
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

    activate(data: any, id: string) {
      return Http.patch<any>(`${this.apiUrl }/${id}/activate`, data);
    }
}

export default new RestaurantService();