import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register.tsx";
import ForgotPassword from "../pages/ForgotPassword.tsx";
import Layout from "../components/Layout.tsx";
import Home from "../pages/Home.tsx";
import Document from "../pages/Document.tsx";
import UploadDocument from "../pages/UploadDocument.tsx";
import StudyGroup from "../pages/StudyGroup.tsx";
import Setting from "../pages/Setting.tsx";
import Help from "../pages/Help.tsx";
import DocumentDetail from "../pages/DocumentDetail.tsx";
import Account from "../pages/Account.tsx";
import FolderDetail from "../pages/FolderDetail.tsx";
import Search from "../pages/Search.tsx";

function AppRoutes() {
      return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/">
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="forgot-password" element={<ForgotPassword />}/>
                </Route>

                <Route path="/" element={<Layout />}>
                    <Route path="home" element={<Home />} />
                    <Route path="document" element={<Document />} />
                    <Route path="upload-document" element={<UploadDocument/>}/>
                    <Route path="document/:id" element={<DocumentDetail />} />
                    <Route path="study-group" element={<StudyGroup />} />
                    <Route path="my-account" element={<Account />} />
                    <Route path="setting" element={<Setting />} />
                    <Route path="help" element={<Help />} />
                    <Route path="folder-details/:id" element={<FolderDetail />}/>
                    <Route path="/search" element={<Search />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
