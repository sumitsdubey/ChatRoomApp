import { createContext, useContext, useState } from "react";



const ChatContext = createContext()

export const ChatProvider = ({ children }) => {


    const [roomId, setRoomId] = useState('')
    const [currentUser, setCurrentUser] = useState('')
    const [connected, setConnected] = useState(false);

    return (
        <ChatContext.Provider
            value={{ roomId, currentUser, connected, setConnected, setRoomId, setCurrentUser }}>
            {children}
        </ChatContext.Provider>);
};

const useChatContext = () => useContext(ChatContext);
export default useChatContext;