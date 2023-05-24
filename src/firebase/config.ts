// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4c4o_akEfx3iLudrXMDS6K7-0rFo1UZY",
  authDomain: "twitter-clone-5f03f.firebaseapp.com",
  projectId: "twitter-clone-5f03f",
  storageBucket: "twitter-clone-5f03f.appspot.com",
  messagingSenderId: "961773242244",
  appId: "1:961773242244:web:0c18c07250497b83183fd1"
};

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
    console.log(user)
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
  console.log(userRef)
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

  const inputSnapshot = await getDocs(inputsRef);
  const inputsArray: Array<any> = [];

  inputSnapshot.forEach((doc) => {
    if (doc.exists()) {
      const inputData = doc.data();
      inputsArray.push(inputData);
    }
  });

  return inputsArray;
};

export { auth, db, GoogleAuthProvider };