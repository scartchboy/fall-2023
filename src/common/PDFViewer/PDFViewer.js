import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './PDFViewer.css';

const data = {
    title: "Dummy PDF Title",
    author: "William Fakespear",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
}

const PdfViewer = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    // useEffect(() => {
    //     pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    // })

    return (
        <div className="pdf-viewer-container">
            <div className="metadata-container">
                <h2>PDF Metadata</h2>
                <div>
                    <p>Title: {data.title}</p>
                    <p>Author: {data.author}</p>
                </div>
            </div>

            <div className="pdf-preview-container">
                <iframe src="https://research.google.com/pubs/archive/44678.pdf"
                    width="100%" height="100%"/>
            </div>
        </div>
    );
};

export default PdfViewer;
