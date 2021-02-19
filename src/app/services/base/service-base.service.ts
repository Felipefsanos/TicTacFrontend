import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class BaseService {

    protected baseUrl = environment.api;

    constructor(protected http: HttpClient) {
    }

    protected get(url: string, params?: any): Observable<any> {
        return this.http.get(this.baseUrl + url,
            { params: new HttpParams(params) });
    }

    protected post(url: string, body?: any, params?: any): Observable<any> {
        return this.http.post(this.baseUrl + url, body,
            {  params: new HttpParams(params) });
    }

    protected put(url: string, body?: any, params?: any): Observable<any> {
        return this.http.put(this.baseUrl + url, body,
            {  params: new HttpParams(params) });
    }

    protected delete(url: string, params?: any): Observable<any> {
        return this.http.delete(this.baseUrl + url,
            {  params: new HttpParams(params) });
    }
}