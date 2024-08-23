import React, { useContext, useReducer, useState } from 'react'
import './LeftSidebar.css'
import assets from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import {  arrayUnion, collection,  doc,  getDoc,  getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'

const LeftSidebar = () => {

  const navigate = useNavigate();
  const { userData, chatData } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const inputHandler = async (e) => {
    try {
      const input = e.target.value;
      if (input) {
        setShowSearch(true);
        const userRef = collection(db, 'users');
        const q = query(userRef, where("username", "==", input.toLowerCase()));
        const querySnap = await getDocs(q);
        if (!querySnap.empty && querySnap.docs[0].data().id !== userData.id) {
          let userExist = false;
          chatData.map((user)=>{
            if (user.rId === querySnap.docs[0].data().id) {
              userExist = true;
            }
          })
          if (!userExist) {
            console.log((querySnap.docs[0].data()));
            
          }
        }
        else{
          setUser(null);
        }
      }
      else{
        setShowSearch(false);
      }

    } catch (error) {

    }
  }

// -------------------------------

    const addChat = async () =>{
      const messageRef = collection(db,"messages");
      const chatsRef = collection(db,"chats");


      try {
        const newMessageRef = doc(messageRef);

        await setDoc(newMessageRef,{
          createAt:serverTimestamp(),
          messages:[]
        })

        await setDoc(doc(chatsRef,user.id),{
          chatsData:arrayUnion({
            messageId:newMessageRef.id,
            lastMessage:"",
            rId:userData.id,
            updatedAt:Date.now(),
            messageSeen:true
          })
        })
      
        await setDoc(doc(chatsRef,userData.id),{
          chatsData:arrayUnion({
            messageId:newMessageRef.id,
            lastMessage:"",
            rId:user.id,
            updatedAt:Date.now(),
            messageSeen:true
          })
        })

      } catch (error) {
        toast.error(error.message);
        console.error(error);
        
      }
    }

    // const addChat = async () => {
    //   const messageRef = collection(db, "messages");
    //   const chatsRef = collection(db, "chats");
    
    //   try {
    //     const newMessageRef = doc(messageRef);
    
    //     await setDoc(newMessageRef, {
    //       createAt: serverTimestamp(),
    //       messages: []
    //     });
    
    //     // Update for the other user's chat document
    //     const userChatDocRef = doc(chatsRef, user.id);
    //     const userChatDocSnap = await getDoc(userChatDocRef);
    
    //     if (!userChatDocSnap.exists()) {
    //       await setDoc(userChatDocRef, {
    //         chatsData: []
    //       });
    //     }
    
    //     await updateDoc(userChatDocRef, {
    //       chatsData: arrayUnion({
    //         messageId: newMessageRef.id,
    //         lastMessage: "",
    //         rId: userData.id,
    //         updatedAt: Date.now(),
    //         messageSeen: true
    //       })
    //     });
    
    //     // Update for the current user's chat document
    //     const userDataChatDocRef = doc(chatsRef, userData.id);
    //     const userDataChatDocSnap = await getDoc(userDataChatDocRef);
    
    //     if (!userDataChatDocSnap.exists()) {
    //       await setDoc(userDataChatDocRef, {
    //         chatsData: []
    //       });
    //     }
    
    //     await updateDoc(userDataChatDocRef, {
    //       chatsData: arrayUnion({
    //         messageId: newMessageRef.id,
    //         lastMessage: "",
    //         rId: user.id,
    //         updatedAt: Date.now(),
    //         messageSeen: true
    //       })
    //     });
    
    //   } catch (error) {
    //     toast.error(error.message);
    //     console.error("Error creating chat or message: ", error);
    //   }
    // }
    

  return (
    <div className='ls'>
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} alt="" className='logo' />
          <div className="menu">
            <img src={assets.menu_icon} alt="" />
            <div className="sub-menu">
              <p onClick={() => navigate('/profile')}>Edit Profile</p>
              <hr />
              <p>Logout</p>
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="" />
          <input onChange={inputHandler} type="text" placeholder='Search here...' />
        </div>
      </div>
      <div className="ls-list">
        {showSearch  && user 
        ? <div onClick={addChat} className="friends add-user">
          <img src={user.avatar} alt="" />
          <p>{user.name}</p>
        </div>
        :Array(12).fill("").map((item, index) => (
          <div key={index} className="friends">
            <img src={assets.profile_img} alt="" />
            <div>
              <p>Jon Herray</p>
              <span>Hello, How are you?</span>
            </div>
          </div>
        ))
        }

      </div>
    </div>
  )
}

export default LeftSidebar
