import React, { useEffect, useState } from 'react';
import './PDFViewer.css'

const DownloadPath = "http://localhost:5000/static/"

const PdfViewer = () => {
    const [card, setCard] = useState({});

    useEffect(() => {
        const cardItem = JSON.parse(localStorage.getItem("CARD_ITEM"));
        console.log(cardItem)
        setCard(cardItem)
    }, [])

    return (
        <div className="pdf-viewer-container">
            <div className="metadata-container">
                <h2>PDF Metadata</h2>
                <div>
                    <p>Author: {card?._source?.author}</p>
                    <p>Program: {card?._source?.program}</p>
                    <p>Degree: {card?._source?.degree}</p>
                    <p>Abstract: {card?._source?.abstract}</p>
                    <a href={DownloadPath + card?._source?.pdf} target="_blank">Download PDF</a>
                </div>
            </div>

        </div>
    );
};

export default PdfViewer;
