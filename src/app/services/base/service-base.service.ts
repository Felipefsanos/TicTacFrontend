import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class BaseService {

    protected baseUrl = environment.api;

    constructor(protected http: HttpClient) {
    }

    protected get(url: string, parameters?: any): Observable<any> {
        return this.http.get(this.baseUrl + url,
            { params: parameters });
    }

    protected post(url: string, body?: any, parameters?: any): Observable<any> {
        return this.http.post(this.baseUrl + url, body,
            {  params: parameters });
    }

    protected put(url: string, body?: any, parameters?: any): Observable<any> {
        return this.http.put(this.baseUrl + url, body,
            {  params: parameters });
    }

    protected delete(url: string, parameters?: any): Observable<any> {
        return this.http.delete(this.baseUrl + url,
            {  params: parameters });
    }
}