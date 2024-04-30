import { Component, OnInit } from '@angular/core';
import { PdfService } from '../shared/services/pdf.service';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';

@Component({
  selector: 'app-pdf',
  standalone: true,
  imports: [],
  templateUrl: './pdf.component.html',
  styleUrl: './pdf.component.scss',
})
export class PdfComponent implements OnInit {
  pdfUrl!: SafeResourceUrl;
  constructor(
    private pdfService: PdfService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.pdfService.retrievePdf().subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }
}
