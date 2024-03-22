// PdfViewer.js
import React from "react";
import PdfComp from "./PdfComp";
import {ChatState} from "../Context/ChatProvider.jsx"
import Comments2 from "./Comments2.jsx"
import "./pdfviewer.css"

const PdfViewer = ({ pdf }) => {
    const {bhez}=ChatState();
  return (
    <div className="pdf-viewer-container">
    <div className="pdf-container">
      <h1 className="pdf-title">PDF Viewer</h1>
      <PdfComp pdfFile={bhez} />
    </div>
    <div className="comments-container">
      <h1 className="comments-title">Comments</h1>
      <Comments2 />
    </div>
  </div>
  );
};
export default PdfViewer;
