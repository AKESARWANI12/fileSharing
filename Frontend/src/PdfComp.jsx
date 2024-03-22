import { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from 'react-pdf';
import "./pdfcomp.css"
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function PdfComp(props) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  return (
    <div className="pdf-div">
    <p>
      Page {numPages > 0 ? pageNumber : "-"} of {numPages}
    </p>
    <div className="pdf-container">
      <Document file={props.pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="pdf-page"
          />
        ))}
      </Document>
    </div>
  </div>
  );
}
export default PdfComp;