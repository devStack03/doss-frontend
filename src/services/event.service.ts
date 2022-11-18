// import IUser from "../types/user.type";
import Http from "./http.common";
class EventService {
    apiUrl = '/events';
    
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

    attend(data: any, id: string) {
      return Http.patch<any>(`${this.apiUrl }/${id}/attend`, data);

    }

    cancelAttend(id: string) {
      return Http.patch<any>(`${this.apiUrl }/${id}/cancel_attend`);
    }
}

export default new EventService();