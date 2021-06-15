import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private url = 'http://localhost:8080/uploadfile/form1';
  private fileTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
  private fileSize = 20 * 1024 * 1024; // bytes

  constructor(private http: HttpClient) { }

  get maxSize(): number {
    return this.fileSize;
  }

  checkName(file: File): boolean {
    return !this.validateName(file.name);
  }

  checkType(file: File): boolean {
    return !this.fileTypes.includes(file.type);
  }

  checkSize(file: File): boolean {
    return file.size > this.fileSize;
  }

  postUploadFile(formData: FormData): Observable<any> {
    const req = new HttpRequest('POST', this.url, formData, {
      reportProgress: true
    });

    // The `HttpClient.request` API produces a raw event stream
    // which includes start (sent), progress, and response events.
    return this.http.request(req).pipe(
      map(event => this.getEventMessage(event, formData.get('file') as File)),
      tap(message => this.showProgress(message)),
      // last(), // return last (completed) message to caller
      catchError(this.handleError)
    );
  }

  /** Return distinct message for sent, upload progress, & response events */
  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;

      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        const percentDone = Math.round(100 * event.loaded / event.total);
        // console.log(`Msg:: File "${file.name}" is ${percentDone}% uploaded.`);
        return { status: 'progress', message: percentDone };

      case HttpEventType.Response:
        // console.log(`Msg:: File "${file.name}" was completely uploaded!`);
        return event.body;

      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }

  private showProgress(message: any) {
    console.log('message:', message);
  }

  private validateName(name: string): boolean {
    // format: Service_Fee_Upload_yyyymmdd
    const formatName = /^(Service_Fee_Upload_)\d{4}(0?[1-9]|1[012])(0?[1-9]|[12][0-9]|3[01])(.xlsx)$/;
    // Match the date format through regular expression
    if (formatName.test(name)) {

      const dd = Number(name.substring(25, 27));
      const mm = Number(name.substring(23, 25));
      const yy = Number(name.substring(19, 23));
      // Create list of days of a month [assume there is no leap year by default]
      const listOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      // update month 02: February
      if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
        listOfDays[1] = 29;
      }

      if (dd > listOfDays[mm - 1]) {
        // alert('Invalid date format!');
        return false;
      }

      return true;
    } else {
      // alert("Invalid date format or File Type!");
      return false;
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }

}