import React, { useContext, useState } from 'react'
import './ChatBox.css'
import assets from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const ChatBox = () => {

  const { userData, messagesId, chatUser, messages, setMessages } = useContext(AppContext)

  const [input,setInput] = useState("");


  return chatUser ? (
    <div className='chat-box'>
      <div className="chat-user">
        <img src={chatUser.userData.avatar} alt="" />
        <p>{chatUser.userData.name}<img className='dot' src={assets.green_dot} alt="" /></p>
        <img src={assets.help_icon} alt="" className='help' />
      </div>


      <div className="chat-msg">
        <div className="s-msg">
          <p className="msg">Lorem ipsum is placeholder text commonly used in..</p>
          <div>
            <img src={assets.profile_img} alt="" />
            <p>2:30 PM</p>
          </div>
        </div>
        <div className="s-msg">
          <img className='msg-img' src={assets.pic1} alt="" />
          <div>
            <img src={assets.profile_img} alt="" />
            <p>2:30 PM</p>
          </div>
        </div>

        <div className="r-msg">
          <p className="msg">Lorem ipsum is placeholder text commonly used in..</p>
          <div>
            <img src={assets.profile_img} alt="" />
            <p>2:30 PM</p>
          </div>
        </div>
      </div>


      <div className="chat-input">
        <input type="text" placeholder='Send a message' />
        <input type="file" id="image" accept='image/png, image/jpeg' hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="" />
        </label>
        <img src={assets.send_button} alt="" />
      </div>
    </div>
  )
  :<div className='chat-welcome'>
    <img src={assets.logo_icon} alt="" />
    <p>Chat Anytime, anywhere</p>
  </div>
}

export default ChatBox
