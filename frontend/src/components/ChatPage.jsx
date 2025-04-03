import React, { useEffect, useRef, useState } from 'react'
import { MdAttachFile, MdSend } from 'react-icons/md'
import useChatContext from '../context/ChatContext'
import { useNavigate } from 'react-router';
import SockJS from 'sockjs-client';
import { baseUrl } from '../config/AxiosHelper';
import { Stomp } from '@stomp/stompjs';
import toast from 'react-hot-toast';
import { getMessages } from '../services/RoomServices';

export const ChatPage = () => {


    const { roomId, currentUser, connected, setConnected, setRoomId, setCurrentUser } = useChatContext();

    const navigate = useNavigate();

    useEffect(() => { if (!connected) { navigate("/") } }, [connected, roomId, currentUser])

    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")

    const inputRef = useRef(null)
    const chatBoxRef = useRef(null)

    const [stompClient, setStompClient] = useState(null)

    //PAGE INIT
    // MASSAGE LOAD 
    useEffect(() => {
        async function loadMessages() {
            try {
                const responseMsg = await getMessages(roomId)
                console.log(responseMsg);
                setMessages(responseMsg);
            } catch (error) {
                console.log(error);

            }
        }
        if (connected) {
            loadMessages();
        }
        console.log("Message Loaded");
    }, [])
    //STOMP CLIENT LOAD

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    }

    //SCROLL DOWN 
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scroll({
                top: chatBoxRef.current.scrollHeight,
                behavior: 'smooth'
            })
        }
    }, [messages])


    useEffect(() => {

        const connectWebSocket = () => {
            //SOCKJS OBJECT 
            const sock = new SockJS(`${baseUrl}/chat`)

            const client = Stomp.over(sock)

            client.connect({}, () => {

                setStompClient(client)
                toast.success("Connected")
                client.subscribe(`/topic/room/${roomId}`, (message) => {
                    console.log(message);
                    const newMessage = JSON.parse(message.body);
                    setMessages((prev) => [...prev, newMessage])

                })
            });
        }

        if (connected) {
            connectWebSocket()
        }
    }, [roomId])
    //SUBSCRIBE
    //SEND MESSAGE HANDLE
    const sendMessage = async () => {
        if (stompClient && connected && input.trim()) {
            console.log(input);

            const message = {
                sender: currentUser,
                content: input,
                roomId: roomId
            }
            stompClient.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify(message));
            setInput("")
        }
    }

    //HANDLE LOGOUT

    function handleLogout() {
        stompClient.disconnect();
        setConnected(false)
        setRoomId("");
        setCurrentUser("")
        navigate("/")
        toast.success("Leaved")
    }

    return (
        <>

            <div>
                <header className='flex justify-evenly shadow  dark:border-gray-500 items-center py-5 dark:bg-gray-900 fixed w-full h-20'>
                    <div>
                        {/* room name container */}
                        <h1 className='text-xl font-semibold'>
                            Room : <span>{roomId}</span>
                        </h1>
                    </div>
                    <div>
                        {/* container */}
                        <h1 className='text-xl font-semibold'>
                            Username : <span>{currentUser}</span>
                        </h1>
                    </div>
                    <div>
                        {/* leaev room */}
                        <button onClick={handleLogout} className='dark:bg-red-500 dark:hover:bg-red-700 px-5 py-2 rounded-full'>Leave Room</button>
                    </div>
                </header>


                <main ref={chatBoxRef} className='py-20 w-2/3 mx-auto h-screen overflow-auto dark:bg-slate-800 mb-20'>
                    <div className='message-container'>
                        {messages.map((message, index) => (
                            <div key={index} className={`flex ${message.sender === currentUser ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex gap-2 m-2 max-w-xs rounded ${message.sender === currentUser ? 'bg-gray-900' : 'bg-purple-900'} px-3 py-2`}>
                                    <div>
                                        <img className='h-10' src="https://avatar.iran.liara.run/public/41" alt="" />
                                    </div>
                                    <div>
                                        <p className='text-s font-bold  mb-1 '>{message.sender}</p>
                                        <p>{message.content}</p>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </main>
                {/* input message container  */}

                <div className='fixed bottom-2 w-full h-16 '>
                    <div className='h-full w-2/3 mx-auto bg-gray-900 rounded flex justify-between'>
                        <input
                            onKeyDown={handleKeyDown}
                            value={input} onChange={(e) => {
                                setInput(e.target.value)
                            }} type="text" placeholder='Type Your Text Here ...' className='w-full sdark:bg-gray-900 px-4 py-2 outline-none dark:border-gray-600 rounded-lg h-full' />
                        <button className='dark:bg-purple-600 px-3 py-2 rounded-full w-15 h-15 flex justify-center items-center mx-2'><MdAttachFile size={25} /></button>
                        <button onClick={sendMessage} className='dark:bg-green-600 px-3 py-2 rounded-full w-15 h-15 flex justify-center items-center'><MdSend size={25} /></button>
                    </div>
                </div>


            </div>

        </>
    )
}
