import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
/**
 * Http service to call api
 */
@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  constructor(private http: HttpClient) { }
  /**
   * Build full host more endpoint call
   * @param host api host server
   * @param endPoint api endpoint
   * @param version api version endpoint
   */
  private buildPath(host: string, endPoint: string, version: string = ''): string {
    let path;
    if (version === '') {
      path = `${host}/${endPoint}`;
    } else {
      path = `${host}/${version}/${endPoint}`;
    }
    console.log(path);
    return path;
  }
  /**
   * GET call
   * @param host api host server
   * @param version api version
   * @param endPoint endpoint name
   */
  get<T>(host: string, version: string, endPoint: string): Observable<any> {
    return this.http.get<T>(this.buildPath(host, endPoint, version)).pipe(
      tap(res => console.log('Get: ', JSON.stringify(res))),
      catchError(this.handleError)
    );
    // return of(data);
  }
  /**
   * Create record
   * @param host api host server
   * @param version api version
   * @param endPoint endpoint name
   * @param data post data
   */
  post(host: string, version: string, endPoint: string, data: object): Observable<any> {
    return this.http.post(this.buildPath(host, endPoint, version), data).pipe(
      tap(res => console.log('POST: ', JSON.stringify(res))),
      catchError(this.handleError)
    );
  }
  /**
   * update record
   * @param host api host server
   * @param version api version
   * @param endPoint endpoint name
   * @param data data to update
   */
  put(host: string, version: string, endPoint: string, data: object): Observable<any> {
    return this.http.put(this.buildPath(host, endPoint, version), data).pipe(
      tap(res => console.log('POST: ', JSON.stringify(res))),
      catchError(this.handleError)
    );
  }
  /**
   * Delete record
   * @param host api host server
   * @param version api version
   * @param endPoint endpoint name
   */
  delete(host: string, version: string, endPoint: string): Observable<any> {
    return this.http.delete(this.buildPath(host, endPoint, version)).pipe(
      tap(res => console.log('POST: ', JSON.stringify(res))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error ocurred ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log();
    return throwError(errorMessage);
  }
}
