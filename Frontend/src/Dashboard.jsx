import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PdfComp from './PdfComp'; // Import PdfComp
import { useNavigate } from 'react-router-dom';
import "./Dashboard.css"
import {ChatState} from "../Context/ChatProvider.jsx"
import PdfViewer from './PdfViewer';
const Dashboard = () => {

  const [loading, setLoading] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [pdfFile, setPdfFile] = useState(null); // State to hold PDF file URL
  const [sharedWithEmail, setSharedWithEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 
  const {bhez,bhezo,files,setFiles,setcommentedpdf,commentedpdf}=ChatState();

const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('https://filesharing-w5du.onrender.com/api/pdf-files');
      setFiles(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleShare = (fileId) => {
    setSelectedFileId(fileId);
    setShowShareModal(true);
 
  };

  const shareFile = async () => {
    try {
      // console.log("om",selectedFileId,sharedWithEmail)
       const response = await axios.post('https://filesharing-w5du.onrender.com/api/share', { file: selectedFileId, email: sharedWithEmail });
      setMessage(response.data.message);
      setShowShareModal(false);
      setSharedWithEmail('');
    } catch (error) {
      setMessage(error.response.data);
    }
  };
  const showPdf = (pdf) => {
    setcommentedpdf(pdf)
      bhezo(`http://localhost:5000/files/${pdf}`);
     navigate(`/pdf-viewer/${pdf}`);

  };
  return (
    <div className="container mt-5">
  <h1 className="text-center mb-0" style={{ fontSize: '3rem' }}>🔍 Display All PDF Files</h1>
      {loading ? (
        <div>Loading...</div>
      ) : files.length > 0 ? (
        <div className="table-responsive mt-5 table-scroll">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>FileName</th>
                <th>Uploaded By</th>
                <th>Uploaded At</th>
                <th>Share PDF</th>
              </tr>
            </thead>
            <tbody>
              {files.map((filex, index) => (
                <tr key={filex.id}>
                  <td>{index + 1}</td>
                  <td>
                    <button onClick={() => showPdf(filex.file)} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>{filex.file}</button>
                  </td>
                  <td>{filex.uploaded_by && filex.uploaded_by.name}</td>
                  <td>{filex.uploaded_at}</td>
                  <td>
                    <button
                      onClick={() => handleShare(filex.file)}
                      type="button"
                      className="btn btn-primary"
                    >
                      Share
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No files found.</div>
      )}
      
    
      
      {showShareModal && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={() => setShowShareModal(false)}>&times;</span>
      <h1 className="enter-email">Enter Email and Share PDF</h1> {/* Apply enter-email styling */}
      <input
        type="text"
        placeholder="Enter Email"
        value={sharedWithEmail}
        onChange={(e) => setSharedWithEmail(e.target.value)}
        className="input-area" // Apply input area styling
      />
      <button onClick={shareFile} className="share-button">Share</button> {/* Apply share button styling */}
      <p>{message}</p>
    </div>
  </div>
)}


    </div>
  );
};

export default Dashboard;

