import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./comments.css"
import {ChatState} from "../Context/ChatProvider.jsx"

const FileDetails = () => {
    const [comments2, setComments2] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [error, setError] = useState('');
     const {files,setFiles,commentedpdf,user}=ChatState();
     const[pdfId,setpdfId]=useState(null);
// Make a GET request to fetch comments for the specific PDF file
const fetchData = async (e) => {
    try { 
      const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
    };   
const response = await axios.get(`https://filesharing-w5du.onrender.com/api/comments/${pdfId}`,config);    
        setComments2(response.data.comments); 
    } catch (error) {   
        console.error('Error fetching comments:', error);
    }
};
const handleSubmit = async (event) => {
         event.preventDefault();     
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };          
          
            // console.log(commentedpdf,commentText)
            const response =await axios.post('https://filesharing-w5du.onrender.com/api/comments', {  content: commentText,  filename: commentedpdf }, config);            
            // Fetch updated comments
            console.log(response.data)
            const pdfObjectId = response.data.pdf_file_id;
            setpdfId(pdfObjectId)
            fetchData();             
            // Reset comment text and error state
            setCommentText('');
            setError('');
            // Display success message
            alert('Comment submitted successfully!');
        } catch (error) {       
            console.error('Error submitting comment:', error);
            setError('An error occurred while submitting the comment');
        }
    };
    
    return (
        <div className="container">
            <div className="comments__container">
            <h2 className="comments-heading">Comments Here</h2>
            <form onSubmit={handleSubmit}>
            <div className="form__info">
            <input type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Add a short comment here" required className="input-text" />
            <input type="hidden" name="file" value={{commentedpdf}} />
            </div>
            <button type="submit" className="submit__btn">Submit</button>
            </form>
                {error && <p>{error}</p>}
                {comments2.map(comment => (
  <div key={comment._id} className="comment-container">
    <div className="comment-header">
      <span className="username">{comment.user.name}</span>
    </div>
    <div className="comment-content">
      <p>Comment: {comment.content}</p>
    </div>
    <div className="comment-footer">
      Posted {comment.created_at} ago
    </div>
  </div>
))}

            </div>
        </div>
    );
};

export default FileDetails;


