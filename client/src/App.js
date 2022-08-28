import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Register from "./components/User/Register";
import Login from "./components/User/Login";
import Account from "./components/User/Account";
import Home from "./components/User/Home";
import Contact from "./components/User/Contact";
import Update from "./components/User/Update";
import NewNote from "./components/Note/NewNote";
import MyNotes from "./components/Note/MyNotes";
import Search from "./components/User/Search";
import ErrorPage from "./components/Util/ErrorPage";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Actions/UserAction";
import SingleUser from "./components/User/SingleUser";
import UpdateNote from "./components/Note/UpdateNote";

const App = ()=>{

  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(loadUser());
  }, [dispatch]);
  
  const {isAuthenticated} = useSelector(state=>state.user);

  return(
    <>
        <Header/>
        <div className="center">
            <Routes>
                <Route path="/register" element={<Register/>} />
                <Route path="/" element={isAuthenticated ? <Home/> : <Login/>} />
                <Route path="/users/:id" element={isAuthenticated ? <SingleUser/> : <Login/>} />
                <Route path="/search" element={isAuthenticated ? <Search/> : <Login/>} />
                <Route path="/account" element={isAuthenticated ? <Account/> : <Login/>} />
                <Route path="/contact" element={isAuthenticated ? <Contact/> : <Login/>} />
                <Route path="/update" element={isAuthenticated ? <Update/> : <Login/>} />

                <Route path="/new" element={isAuthenticated ? <NewNote/> : <Login/>} />
                <Route path="/mynotes" element={isAuthenticated ? <MyNotes/> : <Login/>} />
                <Route path="/update-note/:id" element={isAuthenticated ? <UpdateNote/> : <Login/>} />
                
                <Route path="*" element={<ErrorPage/>} />
            </Routes>

          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
    </>
  );
}

export default App;