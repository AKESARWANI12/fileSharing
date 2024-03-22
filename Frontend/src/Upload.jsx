import React from 'react';
import { useState ,useEffect} from 'react';
import {ChatState} from "../Context/ChatProvider.jsx"
import { Box, Button, Input ,Center} from '@chakra-ui/react';
import axios from "axios";
import { pdfjs } from 'react-pdf';
import PdfComp from "./PdfComp.jsx";




const Upload = () => {
  const [title,settitle]=useState("");
  const {user}=ChatState();
const [file,setfile]=useState("");
const[allImage,setAllImage]=useState(null);
const[pdfFile,setPdfFile]=useState(null);

  const submitpdf=async (e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("title",title);
    formData.append("file",file);
   console.log(title,file);
   const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  console.log(config);
   const result=await axios.post("http://localhost:5000/upload-files",
  //  const result = await axios.post(
  //   `${process.env.REACT_APP_BACKEND_URL}/upload-files`,convert,config);

   formData,
   {
    headers:{"Content-Type":"multipart/form-data"},
    ...config,
   }
  )

  if (result.data.status == "ok") {
     alert("Uploaded Successfully!!!");
    console.log("uploaded successfully")
  }
  };


  return (
<div className="container-lg"> 
  <div className="row justify-content-center">
    <div className="col-md-8">
      <div className="rounded border p-4 my-4">
        <h1 className="text-center mb-5" style={{ fontSize: '3rem' }}>Upload Pdf in React</h1> 
        <form className="formStyle" onSubmit={submitpdf}>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Title" required onChange={(e) => settitle(e.target.value)} />
          </div>
          <br />
          <div className="form-group">
            <input type="file" className="form-control" accept="application/pdf" required onChange={(e) => setfile(e.target.files[0])} />
          </div>
          <div className="form-group text-center mt-4">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>



  
);
};

export default Upload;