import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  generatePdf(): Observable<{ path: string }> {
    return this.http.get<{ path: string }>(`${this.url}generatepdf`);
  }

  retrievePdf(): Observable<Blob> {
    return this.http.get(`${this.url}retrieve`, {
      responseType: 'blob',
    });
  }
}
