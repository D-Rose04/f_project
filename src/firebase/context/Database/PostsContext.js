import { addDoc, collection, serverTimestamp, getDocs } from "@firebase/firestore"
import { getUserByUID } from "./UserContext"
import { db } from "../../config/config-firebase"

const POSTS_COLLECTION = 'posts' //cuando tengas que poner el nombre de la coleccion, usa esta constante

//este es solo un ejemplo
export async function addPost(uid, postBody, postImage) {
    try{
    const user = await getUserByUID(uid) //metodo en UserContext, no probado aun

    if (user == null) {
        return //si el usuario no existe, para la ejecucion, puedes poner lo que quieras aqui
    }

    const data = {
        user: {
            uid: uid,
            image: user.picture,
            name: `${user.name} ${user.lastName}`,
            desc: null //realmente no se que poner aqui, era una idea
        },
        time: serverTimestamp(), //metodo de firebase para obtener la fecha actual del servidor
        postBody: postBody,
        postImage: postImage,
        likes: 0,
        dislikes: 0,
        comments: []
    }

    const postCollectionRef = collection(db, POSTS_COLLECTION) //referencia a la coleccion de posts

    const newPost = await addDoc(postCollectionRef, data) //resultado de crear el nuevo post, con toda la data y el id
    console.log("Publicación agregada correctamente");
    return newPost
    
  } catch (error) {
    console.error("Error al agregar la publicación:", error);
    // Maneja el error de forma adecuada en tu aplicación
  }
}

export async function getPosts() {
  const postsCollectionRef = collection(db, POSTS_COLLECTION);
  const query = await getDocs(postsCollectionRef);

  const posts = [];
  query.forEach((doc) => {
    const post = doc.data();
    post.id = doc.id;
    posts.push(post);
  });

  return posts;
}