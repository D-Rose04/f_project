import React, { useState } from 'react'
import { addDoc, collection, serverTimestamp, getDocs, doc, updateDoc, increment, arrayUnion, arrayRemove, Timestamp, getDoc, orderBy, query } from "@firebase/firestore"
import { getUserByUID } from "./UserContext"
import { db } from "../../config/config-firebase"
import { uploadPostPicture } from "../StorageContext";


export const POSTS_COLLECTION = 'posts'; //cuando tengas que poner el nombre de la coleccion, usa esta constante

//este es solo un ejemplo
export async function addPost(uid, postBody, image) {
  try {
    const user = await getUserByUID(uid) //metodo en UserContext, no probado aun

    if (user == null) {
      return //si el usuario no existe, para la ejecucion, puedes poner lo que quieras aqui
    }

    const postImage = await uploadPostPicture(uid, image)
    const data = {
      user: {
        uid: uid,
        image: user.imgUrl !== undefined ? user.imgUrl : user.picture,
        name: `${user.name} ${user.lastName !== undefined ? user.lastName : user.lastname}`,
        desc: null
      },
      time: serverTimestamp(),
      postBody: postBody,
      postImage: postImage,
      likesBy: [],
      dislikesBy: [],
      comments: []
    }

    const postCollectionRef = collection(db, POSTS_COLLECTION) //referencia a la coleccion de posts

    const newPost = await addDoc(postCollectionRef, data) //resultado de crear el nuevo post, con toda la data y el id
    console.log("Publicación agregada correctamente");
    return newPost

  } catch (error) {
    console.error("Error al agregar la publicación:", error);
  }
}

export async function addPostWithoutImage(uid, postBody) {
  try {
    const user = await getUserByUID(uid) //metodo en UserContext, no probado aun

    if (user == null) {
      return //si el usuario no existe, para la ejecucion, puedes poner lo que quieras aqui
    }

    const data = {
      user: {
        uid: uid,
        image: user.imgUrl !== undefined ? user.imgUrl : user.picture,
        name: `${user.name} ${user.lastName !== undefined ? user.lastName : user.lastname}`,
        desc: null
      },
      time: serverTimestamp(),
      postBody: postBody,
      likesBy: [],
      dislikesBy: [],
      comments: []
    }

    const postCollectionRef = collection(db, POSTS_COLLECTION) //referencia a la coleccion de posts

    const newPost = await addDoc(postCollectionRef, data) //resultado de crear el nuevo post, con toda la data y el id
    console.log("Publicación agregada correctamente");
    return newPost

  } catch (error) {
    console.error("Error al agregar la publicación:", error);
  }
}

export async function addPostWithoutText(uid, image) {
  console.log('no text')
  try {
    const user = await getUserByUID(uid) //metodo en UserContext, no probado aun

    if (user == null) {
      return //si el usuario no existe, para la ejecucion, puedes poner lo que quieras aqui
    }

    const postImage = await uploadPostPicture(uid, image)
    const data = {
      user: {
        uid: uid,
        image: user.imgUrl !== undefined ? user.imgUrl : user.picture,
        name: `${user.name} ${user.lastName !== undefined ? user.lastName : user.lastname}`,
        desc: null
      },
      time: serverTimestamp(),
      postImage: postImage,
      likesBy: [],
      dislikesBy: [],
      comments: []
    }

    const postCollectionRef = collection(db, POSTS_COLLECTION) //referencia a la coleccion de posts

    const newPost = await addDoc(postCollectionRef, data) //resultado de crear el nuevo post, con toda la data y el id
    console.log("Publicación agregada correctamente");
    return newPost

  } catch (error) {
    console.error("Error al agregar la publicación:", error);
  }
}

export async function getPosts() {
  const postsCollectionRef = collection(db, POSTS_COLLECTION);
  const postsQuery = query(postsCollectionRef, orderBy('time', 'desc'));
  const postsSnap = await getDocs(postsQuery)

  const posts = [];
  postsSnap.forEach((doc) => {
    const post = doc.data();
    post.id = doc.id;
    posts.push(post);
  });

  return posts;
}

export async function getComments(postId) {
  const postRef = doc(db, POSTS_COLLECTION, postId);
  const postSnap = await getDoc(postRef);

  if (!postSnap.exists()) {
    return []
  }

  const postData = postSnap.data()
  return postData.comments;
}

export async function likePost(postId, uid) {
  const postRef = doc(db, POSTS_COLLECTION, postId);

  //una peque;a modificacion
  const postSnap = await getDoc(postRef)
  if (!postSnap.exists()) {
    return
  }

  const postData = postSnap.data()
  if (postData.likesBy.includes(uid)) {
    await updateDoc(postRef, {//ya no se va a usar contador directo, solo el count de likesBy
      likesBy: arrayRemove(uid), // Remover el uid del usuario actual de la lista de likesBy
    });

    return -1
  } else {
    await updateDoc(postRef, {
      likesBy: arrayUnion(uid), // Agregar el uid del usuario actual a la lista de likesBy
    });

    return 1
  }
}

export async function dislikePost(postId, uid) {
  const postRef = doc(db, POSTS_COLLECTION, postId);

  //una peque;a modificacion
  const postSnap = await getDoc(postRef)
  if (!postSnap.exists()) {
    return
  }

  const postData = postSnap.data()
  if (postData.dislikesBy.includes(uid)) {
    await updateDoc(postRef, {//ya no se va a usar contador directo, solo el count de dislikesBy
      dislikesBy: arrayRemove(uid), // Remover el uid del usuario actual de la lista de dislikesBy
    });

    return -1
  } else {
    await updateDoc(postRef, {
      dislikesBy: arrayUnion(uid), // Agregar el uid del usuario actual a la lista de dislikesBy
    });

    return 1
  }
}

export async function addCommentToPost(postId, commentData) {
  try {
    const postRef = doc(db, POSTS_COLLECTION, postId);

    const timestamp = Timestamp.now();
    console.log(commentData)
    await updateDoc(postRef, {
      comments: arrayUnion({
        ...commentData,
        time: timestamp
      }),
    });

    console.log('Comentario agregado correctamente');
  } catch (error) {
    console.error('Error al agregar el comentario:', error);
  }
}




