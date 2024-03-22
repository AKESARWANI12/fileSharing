
import {createContext,useContext,useEffect,useState} from "react"

import {useNavigate} from "react-router-dom";
const ChatContext=createContext();

const ChatProvider=({children})=>
{
    const[user,setUser]=useState();
    const [files, setFiles] = useState([]);
    const[bhez,bhezo]=useState(null);
    const[commentedpdf,setcommentedpdf]=useState(null);

    const[name,setName]=useState();
    const[email,setEmail]=useState();
    const[password,setPassword]=useState();


    let navigate=useNavigate();
    useEffect(()=>{
    const userInfo=JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if(!userInfo){
        navigate("/")
    }
   },[navigate]);
//   if (!userInfo) { navigate("/"); }: Checks whether userInfo is falsy (e.g., null, undefined, or an empty object). If userInfo is falsy, it means that there is no user information in the localStorage. In this case, the code uses the navigate function to redirect the user to the root URL ("/"). 
   
    return (
        <ChatContext.Provider  value={{user,setUser,bhez,bhezo,files,setFiles,commentedpdf,setcommentedpdf,name,setName,email,setEmail,password,setPassword}}>
            {children}
        </ChatContext.Provider>
    )
};

export const ChatState=()=>{
    return useContext(ChatContext);
};
export default ChatProvider;