import React, { useRef, useState } from 'react'
import { MdAttachFile, MdSend } from 'react-icons/md'

export const ChatPage = () => {

    const [messages, setMessages] = useState([
        {
            content: "Hello sdgsdgsd!",
            sender: "Sumit"
        },
        {
            content: "Hello gfdgsdgd!",
            sender: "Amit"
        },
        {
            content: "Hellodfgsdgdsfggfdsgffs !",
            sender: "Sumit"
        }
    ])
    const [input, setInput] = useState("")

    const inputRef = useRef(null)
    const chatBoxRef = useRef(null)

    const [stompClient, setStompClient] = useState(null)
    const [roomId, setRoomId] = useState("")

    const [username, setUsername] = useState("Sumit")

    return (
        <>

            <div>
                <header className='flex justify-evenly shadow  dark:border-gray-500 items-center py-5 dark:bg-gray-900 fixed w-full h-20'>
                    <div>
                        {/* room name container */}
                        <h1 className='text-xl font-semibold'>
                            Room : <span>Room Id</span>
                        </h1>
                    </div>
                    <div>
                        {/* container */}
                        <h1 className='text-xl font-semibold'>
                            Username : <span>Name</span>
                        </h1>
                    </div>
                    <div>
                        {/* leaev room */}
                        <button className='dark:bg-red-500 dark:hover:bg-red-700 px-5 py-2 rounded-full'>Leave Room</button>
                    </div>
                </header>


                <main className='py-20 w-2/3 mx-auto h-screen overflow-auto dark:bg-slate-800 mb-20'>
                    <div className='message-container'>
                        {messages.map((message, index) => (
                            <div key={index} className={`flex ${message.sender === username ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex gap-2 m-2 max-w-xs rounded ${message.sender === username ? 'bg-gray-900' : 'bg-purple-900'} px-3 py-2`}>
                                    <div>
                                        <img className='h-16' src="https://avatar.iran.liara.run/public/41" alt="" />
                                    </div>
                                    <div>
                                        <p className='text-s font-bold  mb-2 '>{message.sender}</p>
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
                        <input type="text" placeholder='Type Your Text Here ...' className='w-full sdark:bg-gray-900 px-4 py-2 outline-none dark:border-gray-600 rounded-lg h-full' />
                        <button className='dark:bg-purple-600 px-3 py-2 rounded-full w-15 h-15 flex justify-center items-center mx-2'><MdAttachFile size={25} /></button>
                        <button className='dark:bg-green-600 px-3 py-2 rounded-full w-15 h-15 flex justify-center items-center'><MdSend size={25} /></button>
                    </div>
                </div>


            </div>

        </>
    )
}
