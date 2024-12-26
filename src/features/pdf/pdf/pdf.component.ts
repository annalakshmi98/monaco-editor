import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import domToImage from 'dom-to-image';
import { jsPDF, jsPDFOptions } from 'jspdf';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent {
  @ViewChild('dataToExport', { static: false }) public dataToExport!: ElementRef;
  @ViewChild('pdfName', { static: false }) pdfName!: ElementRef<HTMLInputElement>;

  public downloadAsPdf(): void {
    if (!this.dataToExport) {
      console.error('No content found to export.');
      return;
    }

    const width = this.dataToExport.nativeElement.clientWidth || 800; 
    const height = this.dataToExport.nativeElement.clientHeight + 40 || 600; 
    // const orientation = width > height ? 'l' : 'p';
    // const imageUnit = 'pt';

    domToImage
      .toPng(this.dataToExport.nativeElement, {
        width: width,
        height: height
      })
      .then((result: string) => {
        const jsPdfOptions: jsPDFOptions = {
          orientation: width > height ? 'landscape' : 'portrait', 
          unit: 'pt',
          format: [width + 100, height + 220]
        };

        const pdf = new jsPDF(jsPdfOptions);
        pdf.setFontSize(48);
        pdf.setTextColor('#2585fe');
        pdf.setFontSize(24);
        pdf.setTextColor('#131523'); 
        pdf.addImage(result, 'PNG', 50, 185, width, height);
        pdf.save('file_name.pdf');
      })
      .catch((error: any) => {
        console.error('Error generating PDF:', error);
      });
  }
}
