import React, { useState,useEffect } from "react";
import {
  VStack,
  FormLabel,
  FormControl,
  Input,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../../Context/ChatProvider";

const Signup = () => {
  const [show, setShow] = useState(false);
   const[name1,setName1]=useState();
   const[email1,setEmail1]=useState();
  const[password1,setPassword1]=useState();
  const [confirmpassword1, setConfirmPassword1] = useState();
  const [signIt,setSignIt]=useState([]);
  const navigate = useNavigate();

  const toast = useToast();
  const { setPassword, setEmail, setName } = ChatState();
  const handleClick = () => {
    setShow(!show);
  };
 
  const submitHandler = async () => {
    if (!name1 || !email1 || !password1|| !confirmpassword1) {
      //sab kuch bhara hai ke nhi check karo
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    
      return;
    }
    if (password1 !== confirmpassword1) {
      // password nhi match hua dono
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
   
      return;
    }
    console.log(name1, email1, password1);
    setName(name1);
    setPassword(password1);
    setEmail(email1);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/user/sendotp",
        { email:email1 },
        config
      );
    //   const { data } = await axios.post(
    //     `${process.env.REACT_APP_BACKEND_URL}/api/user/sendotp`,
    //     { email: email1 },
    //     config
    // );
    
      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log("hanuman", data);
     
      setSignIt(data);
      console.log({signIt})
     
    } catch (error) {
      toast({
        title: "Error Occured!",
        // description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
     
    }
  };
  useEffect(()=>{
    navigate('/verification');
  },[signIt]);

  return (
    <VStack spacing="5px" color="black">
      <FormControl className="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
        value={name1}
          placeholder="Enter Your Name"
          onChange={(e) => setName1(e.target.value)}
        />
      </FormControl>
      <FormControl className="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
        value={email1}
          placeholder="Enter Your Email"
          onChange={(e) => setEmail1(e.target.value)}
        />
      </FormControl>

      <FormControl className="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
          value={password1}
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword1(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl className="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
          value={confirmpassword1}
            type={show ? "text" : "password"}
            placeholder="Confirm Your Password"
            onChange={(e) => setConfirmPassword1(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
         // uplaod hote waqt image me laoding wala symbol activate hoga aur after Loader signup button become active,,and whwn we click on this button subit handler fxn starts working
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
