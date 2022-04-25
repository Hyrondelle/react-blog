import { collection, getDocs,deleteDoc,doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db,auth } from '../firebase.config';

const Home = ({isAuth}) => {
    const [postsList,setPostsList] = useState([]);
    const postCollectionRef = collection(db,"posts");

    useEffect(()=>{
        const getPostList = async () => {
            const data = await getDocs(postCollectionRef);
            setPostsList(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
        }
        getPostList();
    },[postsList])

    const deletePost = async(postId) => {
        const docToDelete = doc(db,"posts",postId)
        await deleteDoc(docToDelete);
    }
    
    return (
        <div className='home'>
            {postsList.map((post)=>{return(
                <div key={post.id} className='post-container'>
                    <div>
                        <h3>{post.title}</h3>
                        {isAuth&&auth.currentUser.displayName===post.author.name&&
                        <button onClick={()=>{deletePost(post.id)}}><i class="fas fa-trash-alt"></i></button>}
                    </div>
                    <p>{post.post}</p>
                    <h4>@{post.author.name}</h4>
                </div>)
            })}
        </div>
    );
};

export default Home;