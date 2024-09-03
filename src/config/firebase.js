// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
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

        // console.log("User UID:",user.uid);
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
            chatsData:[]
        })
    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async (email,password) => {
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = async () => {
    try {
        await signOut(auth)
        
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));

    }
}

const resetPass = async (email) => {
    if (!email) {
        toast.error("Enter Your Email..");
        return null;
    }
    try {
        const userRef = collection(db,'user');
        const q = query(userRef,where("email","==",email));
        const querySnap = await getDocs(q);
        if (!querySnap.empty) {
            await sendPasswordResetEmail(auth,email);
            toast.success("Reset Email Send")
        }
        else{
            toast.error("Email Doesn't Exist")
        }
    } catch (error) {
        console.error(error);
        toast.error(error.message)
    }
}

export {signup,login,logout,auth,db,resetPass}