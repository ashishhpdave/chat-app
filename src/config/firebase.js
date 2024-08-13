// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyD4xt5XRWdq6E7m3Ku4xCOB0GSvsnStKlk",
  authDomain: "chat-app-6d4ae.firebaseapp.com",
  projectId: "chat-app-6d4ae",
  storageBucket: "chat-app-6d4ae.appspot.com",
  messagingSenderId: "302479371260",
  appId: "1:302479371260:web:14a71b9d95a91412e1a079"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username,email,password) => {
    
    try { 
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Hey, There i am useing chat app",
            lastSeen:Date.now()
        })
        await setDoc(doc(db,"chats",user.uid),{
            chatData:[]
        })
    } catch (error) {
        console.error(error)
        toast.error(error.code)
    }
}

export {signup}