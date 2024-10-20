import React, { useContext, useEffect, useState } from 'react';
import './Chat.css';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import ChatBox from '../../components/ChatBox/ChatBox';
import RightSidebar from '../../components/RightSidebar/RightSidebar';
import { AppContext } from '../../context/AppContext';

const Chat = () => {
  const { chatData, userData } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("chatData:", chatData);
    console.log("userData:", userData);
    
    if (chatData && userData) {
      setLoading(false);
    }

    const timer = setTimeout(() => {
      if (!chatData || !userData) {
        setLoading(false); // Fallback after 5 seconds
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [chatData, userData]);

  return (
    <div className='chat'>
      {
        loading
          ? <p className='loading'>Loading...</p>
          : <div className="chat-container">
              <LeftSidebar />
              <ChatBox /> 
              <RightSidebar />
            </div>
      }
    </div>
  );
}

export default Chat;
