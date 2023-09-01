// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs, updateDoc, arrayRemove, arrayUnion, query, orderBy } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import firebaseConfig from './firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    // it returns the data related to the sign in session, user data included
    const result = await signInWithPopup(auth, provider);

    const { user } = result;
    // we could destructrue some other data like login token, telephone, account's joining data.. but we do not need it right now 
    const { displayName, photoURL, email, uid, metadata } = user;

    const {creationTime} = metadata;
    const creationDataSplit: any = creationTime?.split(' ')
    const creationData: string = creationDataSplit[2] + ' ' + creationDataSplit[3];

    // displayName contiene el nombre del usuario
    // photoURL contiene la URL de la foto de perfil
    // email contiene el correo electrónico del usuario (si está disponible)
    // uid es el id asignado por firebase al usuario a google loggeado


    return { displayName, photoURL, email, uid, creationData }; // Devolver los datos del usuario
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const createUserInFirestore = async (user: any) => {
  const userRef = doc(db, "users", user.email.split('@')[0]);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    await setDoc(userRef, {
      name: user.displayName,
      profilImg: user.photoURL,
      coverImg: "",
      inputs: [],
      username: user.email.split('@')[0],
      bio: "",
      following: [],
      followers: [],
      email: user.email || "",
      creationData: user.creationData,
    });
  }
};


export const checkUsers = async (gotUser: any) => {
  const usersRef = collection(db, "users");
  const querySnapshot = await getDocs(usersRef);

 let foundUser = undefined; // Inicializar con valor undefined

  querySnapshot.forEach((doc) => {
    const user = doc.data();
    if (user.username === gotUser) {
      // La variable coincide con el username de este usuario
      const { bio, name, profilImg, username, following, followers } = user;
      foundUser = { bio, name, profilImg, username, following, followers }; // Asignar el valor encontrado
    }
  });

  return foundUser; // Retornar el valor encontrado (puede ser undefined si no se encontró ningún usuario)
};

export const loadUserData = async (uid: any) => {
  const userRef = doc(db, "users", uid);

  const userSnapshot = await getDoc(userRef);
  if (userSnapshot.exists()) {
    const userData = userSnapshot.data();
    
    return userData
    // Realiza acciones adicionales con los datos del usuario cargados desde la base de datos
  }
};


export const loadInputs = async () => {
  const inputsRef = collection(db, "inputs");

  // it creates the query and sorts by the "date" property in descending order
  const queryRef = query(inputsRef, orderBy("fecha", "desc"));
  const querySnapshot = await getDocs(queryRef);

  const inputsArray: Array<any> = [];

  querySnapshot.forEach((doc) => {
    if (doc.exists()) {
      const inputData = doc.data();
      const inputId = doc.id;
      inputData.inputId = inputId; // Añadir inputId al objeto inputData
      inputsArray.push(inputData);
    }
  });

  return inputsArray;
};

export const uploadCoverImage = async (uid: string | undefined, coverImgFile: File) => {
  const storage = getStorage(); // Puedes omitir el parámetro "app" si ya has inicializado Firebase

  // Crear una referencia al archivo en el almacenamiento de Firebase
  if(uid !== undefined){
    const coverImgRef = ref(storage, `cover/${uid}`);

    try {
      // Subir el archivo al almacenamiento de Firebase
      await uploadBytes(coverImgRef, coverImgFile);
      console.log('Imagen de portada actualizada correctamente');

      // Obtén la URL de descarga del archivo subido
      const downloadURL = await getDownloadURL(coverImgRef);
      
      // Devuelve la URL de descarga
      return downloadURL;

    } catch (error) {
      console.error('Error al actualizar la imagen de portada:', error);
    }
  }
};


export const updateUserCoverImg = async (username: string | undefined, coverImg: string | undefined) => {
  if (username) {
    const userRef = doc(db, "users", username);
    try {
      await updateDoc(userRef, {
        coverImg: coverImg,
      });
      console.log("Imagen de portada actualizada en la base de datos correctamente");
    } catch (error) {
      console.error("Error al actualizar la imagen de portada en la base de datos:", error);
    }
  }
};

export const uploadProfileImage = async (uid: string | undefined, profileImgFile: File) => {
  const storage = getStorage(); // Puedes omitir el parámetro "app" si ya has inicializado Firebase

  // Crear una referencia al archivo en el almacenamiento de Firebase
  if(uid !== undefined){
    const profileImgRef = ref(storage, `profile/${uid}`);

    try {
      // Subir el archivo al almacenamiento de Firebase
      await uploadBytes(profileImgRef, profileImgFile);
      console.log('Imagen de perfil actualizada correctamente');

      // Obtén la URL de descarga del archivo subido
      const downloadURL = await getDownloadURL(profileImgRef);
      
      // Devuelve la URL de descarga
      return downloadURL;

    } catch (error) {
      console.error('Error al actualizar la imagen de perfil:', error);
    }
  }
};


export const updateUserProfileImg = async (username: string | undefined, profileImg: string | undefined) => {
  if (username) {
    const userRef = doc(db, "users", username);
    try {
      await updateDoc(userRef, {
        profilImg: profileImg,
      });
      console.log("Imagen de perfil actualizada en la base de datos correctamente");
    } catch (error) {
      console.error("Error al actualizar la imagen de perfil en la base de datos:", error);
    }
  }
};


export const updateUserProfile = async (
  usernameId: string | undefined, 
  name: string | undefined, 
  bio: string | undefined
) => {
  if (usernameId && /*username &&*/ name && bio) {    //  username && name && bio no pueden ser null, '' o undefined
    const userRef = doc(db, "users", usernameId);
    try {
      await updateDoc(userRef, {
        // username: username,
        name: name,
        bio: bio,
      });
      console.log("Actualizado en la base de datos correctamente");
    } catch (error) {
      console.error("Error al actualizar el perfil en la base de datos:", error);
    }
  }
}

  
export const updateFollowers = async (
  user: string | undefined, 
  followingUser: string | undefined, 
  operation: string | undefined,  //operation can be add or remove
) => {   
  if( user && followingUser && operation){
    const userRef = doc(db, "users", user);
    const followingUserRef = doc(db, "users", followingUser);
    
    try {
      if (operation === "add") {
        await updateDoc(userRef, { following: arrayUnion(followingUser) });
        await updateDoc(followingUserRef, { followers: arrayUnion(user) });
        console.log("Actualizado en la base de datos correctamente - usuario ++");
      } else if (operation === "remove") {
        await updateDoc(userRef, { following: arrayRemove(followingUser) });
        await updateDoc(followingUserRef, { followers: arrayRemove(user) });
        console.log("Usuarios eliminados de la base de datos correctamente - usuario --");
      } else {
        console.error("Operación no válida");
      }
    } catch (error) {
      console.error("Error al actualizar el perfil en la base de datos:", error);
    }
  }
}



export { auth, db, GoogleAuthProvider };