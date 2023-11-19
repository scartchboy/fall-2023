import React, { useEffect, useState } from 'react';
import { ArrowDownwardOutlined} from '@material-ui/icons';
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
                    <p><u><b>Author:</b></u> {card?._source?.author}</p>
                    <p><u><b>Program:</b></u> {card?._source?.program}</p>
                    <p><u><b>Degree:</b></u> {card?._source?.degree}</p>
                    <p><u><b>Abstract:</b></u> {card?._source?.text}</p>
                    <div><a href={DownloadPath + card?._source?.pdf} target="_blank">Download PDF <ArrowDownwardOutlined/></a></div>
                </div>
            </div>

        </div>
    );
};

export default PdfViewer;
