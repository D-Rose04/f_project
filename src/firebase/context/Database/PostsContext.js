import { addDoc, collection, serverTimestamp } from "@firebase/firestore"
import { getUserByUID } from "./UserContext"

const POSTS_COLLECTION = 'posts' //cuando tengas que poner el nombre de la coleccion, usa esta constante

//este es solo un ejemplo
export async function addPost(uid, postBody, postImage) {
    const user = await getUserByUID(uid) //metodo en UserContext, no probado aun

    if (user == null) {
        return //si el usuario no existe, para la ejecucion, puedes poner lo que quieras aqui
    }

    const data = {
        user: {
            uid: uid,
            image: user.picture,
            name: `${user.name} ${user.lastName}`,
            time: serverTimestamp(), //metodo de firebase para obtener la fecha actual del servidor
            desc: null //realmente no se que poner aqui, era una idea
        },
        postBody: postBody,
        postImage: postImage,
        likes: 0,
        dislikes: 0,
        comments: []
    }

    const postCollectionRef = collection(db, POSTS_COLLECTION) //referencia a la coleccion de posts

    const newPost = await addDoc(postCollectionRef, data) //resultado de crear el nuevo post, con toda la data y el id
    return newPost
}