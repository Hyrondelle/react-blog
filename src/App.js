import { useState } from "react";
import {BrowserRouter as Router, Routes,Route,Link} from "react-router-dom"
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {signOut} from "firebase/auth";
import { auth } from "./firebase.config";

function App() {
  const [isAuth,setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signOutUser = () =>{
    signOut(auth).then(()=>{
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "login";
    })
  }
  
  return (
    <Router>
      <nav>
        <Link to="react-blog/">Home</Link>
        
        {!isAuth?(<Link to="react-blog/login">Login</Link>):
        (<>
          <Link to="react-blog/post">Create Post</Link>
          <button onClick={signOutUser}>Log Out</button>
        </>)}
      </nav>
      <Routes>
        <Route path="react-blog/" element={<Home isAuth={isAuth}/>}/>
        <Route path="react-blog/login" element={<Login setIsAuth={setIsAuth}/>}/>
        <Route path="react-blog/post" element={<CreatePost isAuth={isAuth}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
