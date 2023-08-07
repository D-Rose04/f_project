import React, { useEffect, useState } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import Post from '../../components/app/Post/Post'
import AddPostPage from '../Social/CRUD/AddPost/AddPost'
import { addPosts, getPosts} from '../../firebase/context/Database/PostsContext'
import { Button } from 'react-bootstrap'
import PostSidebar from '../../components/app/Post/PostSidebar'

function Social() {
  const [setTitle, setSidebar, setSidebarCols]=useOutletContext()
  const navigate= useNavigate()
  const [post, setPost] = useState([]);

  useEffect(() => {
    setTitle("Social")
    setSidebarCols(2)
    setSidebar(<PostSidebar />)
    
    const fetchPosts = async () => {
      const getpost = await getPosts();
      setPost(getpost);
    };

    fetchPosts();
  }, []);

  return post.map(p => <Post key={p.id} post={p} />)
}

export default Social