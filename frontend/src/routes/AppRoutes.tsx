import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register.tsx";
import ForgotPassword from "../pages/ForgotPassword.tsx";
import Layout from "../components/Layout.tsx";
import Home from "../pages/Home.tsx";
import Document from "../pages/Document.tsx";
import AddDocument from "../pages/AddDocument.tsx";
import StudyGroup from "../pages/StudyGroup.tsx";
import Setting from "../pages/Setting.tsx";
import Help from "../pages/Help.tsx";
import DocDetails from "../pages/DocDetails.tsx";

function AppRoutes() {
    const handleFileUpload = (file: File | null) => {
        console.log('Uploaded file:', file);
        // Add your logic here to handle the uploaded file (e.g., send it to a server)
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' >
                    {/*<Route path='' element={<Home/>} />*/}
                    <Route path='' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route path='forgotpassword' element={<ForgotPassword />} />
                </Route>

                <Route path="/home" element={<Layout />}>
                    <Route index element={<Home/>} />
                    <Route path='document' element={<Document />} />
                    <Route path="addDocument" element={<AddDocument onFileUpload={handleFileUpload}/>} />
                    <Route path='studygroup' element={<StudyGroup />} />
                    <Route path='myaccount' element={<Document />} />
                    <Route path='setting' element={<Setting />} />
                    <Route path='help' element={<Help />} />
                </Route>

                <Route path="/item-details/:id" element={<DocDetails/>} />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;