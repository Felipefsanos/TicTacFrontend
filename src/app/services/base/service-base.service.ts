import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class BaseService {

    protected baseUrl = environment.api;

    constructor(protected http: HttpClient) {
    }

    protected get(url: string, parameters?: any, dontShowLoading?: boolean): Observable<any> {
        return this.http.get(this.baseUrl + url,
            { params: parameters, headers: this.getSpinnerHeader(dontShowLoading) });
    }

    protected post(url: string, body?: any, parameters?: any, dontShowLoading?: boolean): Observable<any> {
        return this.http.post(this.baseUrl + url, body,
            {  params: parameters, headers: this.getSpinnerHeader(dontShowLoading) });
    }

    protected put(url: string, body?: any, parameters?: any, dontShowLoading?: boolean): Observable<any> {
        return this.http.put(this.baseUrl + url, body,
            {  params: parameters, headers: this.getSpinnerHeader(dontShowLoading) });
    }

    protected delete(url: string, parameters?: any, dontShowLoading?: boolean): Observable<any> {
        return this.http.delete(this.baseUrl + url,
            {  params: parameters, headers: this.getSpinnerHeader(dontShowLoading) });
    }

    private getSpinnerHeader(dontShowLoading?: boolean): HttpHeaders | undefined {
        if (!dontShowLoading) {
            return undefined;
        }
        return new HttpHeaders().set('dontShowLoading', 'true');
    }
}
