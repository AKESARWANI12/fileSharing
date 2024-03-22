import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Upload from "./Upload";
import Users from "./Users";
import VerifyEmail from "./Pages/EmailVerification";
import Dashboard from "./Dashboard";
import Navbar from "./Pages/Navbar";
import PdfViewer from "./PdfViewer";

function App() {
  return (
    <>
    <Navbar />
    <div className="container">
      <Routes>
        <Route exact path="/" element={<HomePage />}></Route>
        <Route exact path="/upload" element={<Upload />}></Route>
        <Route exact path="/users" element={<Users />}></Route>
        <Route exact path="/search" element={<Dashboard />}></Route>
        <Route exact path="/pdf-viewer/:pdfFileName" element={<PdfViewer />}></Route>
        <Route exact path="/verification" element={<VerifyEmail />}></Route>
      </Routes>
      </div>
    </>
  );
}

export default App;
