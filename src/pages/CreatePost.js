import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({isAuth}) => {
    const [title,setTitle] = useState("");
    const [post,setPost] = useState("");
    const postCollectioRef = collection(db,"posts");
    const navigate = useNavigate();

    const sendPost = async () => {
        await addDoc(postCollectioRef,{title,post,author:{name:auth.currentUser.displayName, id: auth.currentUser.uid}})
        .then(()=>{
            window.location.pathname = "react-blog";
            navigate("/");
        })
    }
    useEffect(()=>{
        if(!isAuth){
            navigate("/login");
        }
    },[])

    return (
        <div className='createPostPage'>
            <div className='container'>
                <h1>Créer un post</h1>
                <div className='imputs'>
                    <label>Titre:</label>
                    <input placeholder='titre...'
                    onChange={(e)=>setTitle(e.target.value)}></input>
                </div>
                <div className='imputs'>
                    <label>Post:</label>
                    <textarea placeholder='message...'
                    onChange={(e)=>setPost(e.target.value)}></textarea>
                </div>
                <button onClick={sendPost}>Envoyez</button>
            </div>
        </div>
    );
};

export default CreatePost;