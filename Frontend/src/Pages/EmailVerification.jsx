import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import {ChatState} from "../../Context/ChatProvider.jsx"
import { useToast } from "@chakra-ui/react";
import axios from "axios"
import "./Emailverification.css"

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const {name,email,password}=ChatState();
  const toast = useToast();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // console.log(otp,"xssdxdfxddxfdxfxddxxdfxdfxfdxfdfxd")

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
    
      const { data } = await axios.post(
        "https://filesharing-w5du.onrender.com/api/user",
        {name,email,password,otp},
        config
      );
  
    localStorage.setItem("userInfo", JSON.stringify(data));
    
      navigate("/upload");
    } catch (error) {
      console.log("error",error)
     
    }
  };

  return (
    <div class="container">
    <div class="content">
      <h1 class="title">Verify Email</h1>
      <p class="subtitle">A verification code has been sent to you. Enter the code below</p>  
      <form onSubmit={handleFormSubmit}>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props) => (
            <input
              {...props}
              placeholder="-"
              class="otp-input"
            />
          )}
          containerStyle={{ justifyContent: "space-between", gap: "0 6px" }}
        />
        <button type="submit" class="verify-btn">Verify Email</button>
      </form>
  
      <div class="links">
        <button class="resend-btn">
          <RxCountdownTimer /> Resend it
        </button>
      </div>
    </div>
  </div>
  );
}

export default VerifyEmail;
