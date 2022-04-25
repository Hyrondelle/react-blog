import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase.config';

const Home = () => {
    const [postsList,setPostsList] = useState([]);
    const postCollectionRef = collection(db,"posts");

    useEffect(()=>{
        const getPostList = async () => {
            const data = await getDocs(postCollectionRef);
            setPostsList(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
        }
        getPostList();
    },[])
    
    return (
        <div className='home'>
            {postsList.map((post)=>{return(
                <div key={post.id} className='post-container'>
                    <div>
                        <h3>{post.title}</h3>
                        <button><i class="fas fa-trash-alt"></i></button>
                    </div>
                    <p>{post.post}</p>
                    <h4>@{post.author.name}</h4>
                </div>)
            })}
        </div>
    );
};

export default Home;