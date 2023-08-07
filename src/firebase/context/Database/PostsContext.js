import { addDoc, collection, serverTimestamp, getDocs, doc, updateDoc, increment, arrayUnion } from "@firebase/firestore"
import { getUserByUID } from "./UserContext"
import { db } from "../../config/config-firebase"
import { uploadPostPicture} from "../StorageContext";

export const POSTS_COLLECTION = 'posts'; //cuando tengas que poner el nombre de la coleccion, usa esta constante

//este es solo un ejemplo
export async function addPost(uid, postBody, image) {
    try{
    const user = await getUserByUID(uid) //metodo en UserContext, no probado aun

    if (user == null) {
        return //si el usuario no existe, para la ejecucion, puedes poner lo que quieras aqui
    }


    // subir img a firebase
    // let imgUrl = "";
    // if (postImage) {
    //   const imageRef = ref(storage);
    //   await uploadString(imageRef, postImage, "data_url");
    //   imgUrl = await getDownloadURL(imageRef);
    // }

    const postImage = await uploadPostPicture(uid, image, postBody)
    const data = {
        user: {
            uid: uid,
            image: user.imgUrl !== undefined? user.imgUrl : user.picture,
            name: `${user.name} ${user.lastName !== undefined? user.lastName : user.lastname}`,
            desc: null
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

export async function likePost(postId, uid) {
  const postRef = doc(db, POSTS_COLLECTION, postId);

  await updateDoc(postRef, {
    likes: increment(1), // Incrementar el contador de likes en 1
    likesBy: arrayUnion(uid), // Agregar el uid del usuario actual a la lista de likesBy
  });
}

export async function dislikePost(postId, uid) {
  const postRef = doc(db, POSTS_COLLECTION, postId);

  await updateDoc(postRef, {
    dislikes: increment(1), // Incrementar el contador de dislikes en 1
    dislikesBy: arrayUnion(uid), // Agregar el uid del usuario actual a la lista de dislikesBy
  });
}
