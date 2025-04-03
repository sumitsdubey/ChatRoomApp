import React, { useState } from 'react'
import chatIcon from '../assets/speak.png'
import { createRoom, joinRoom } from '../services/RoomServices'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'
import useChatContext from '../context/ChatContext'
const JoinCreateChat = () => {


    const [detail, setDetail] = useState({
        roomId: "",
        userName: ""
    })

    const { roomId, currentUser, connected, setConnected, setRoomId, setCurrentUser } = useChatContext();

    const navigate = useNavigate()

    function handleFormInputChange(event) {
        setDetail(
            {
                ...detail,
                [event.target.name]: event.target.value,
            }
        )
    }

    function validateForm() {
        if (detail.roomId === "" || detail.userName === "") {
            toast.error("Invalid Input")
            return false;
        }
        return true;
    }

    async function joinChat() {
        if (validateForm()) {

            try {
                const response = await joinRoom(detail.roomId)
                setCurrentUser(detail.userName)
                setRoomId(response.roomId)
                setConnected(true)
                toast.success("Joined Success")
                navigate('/chat')


            } catch (error) {
                toast.error("Can Not Join Room");
                console.log(error);

            }
        }
    }

    async function createNewRoom() {
        if (validateForm()) {
            console.log(detail);

            //call api to create room
            try {
                const response = await createRoom(detail.roomId)
                console.log(response);

                toast.success("Room Created")
                setCurrentUser(detail.userName)
                setRoomId(detail.roomId)
                setConnected(true)
                navigate('/chat')

            } catch (error) {
                toast.error("Room Creation Failed")
                console.log(error);
            }
        }
    }

    return (
        <>

            <div className='min-h-screen flex items-center justify-center'>

                <div className='p-8 w-full flex flex-col gap-5 max-w-md rounded dark:bg-gray-900 shadow'>
                    <div>
                        <img src={chatIcon} alt="" className='w-24 mx-auto' />
                    </div>
                    <h1 className='text-2xl font-semibold text-center'>Join Room / Create Room</h1>
                    <div>
                        <label htmlFor="name" className='block font-medium mb-2'>Your Name</label>
                        <input onChange={handleFormInputChange} value={detail.userName} name='userName' placeholder='Ener Name' type="text" id='name' className='w-full dark:bg-gray-600 px-4 py-2 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />

                    </div>
                    <div>
                        <label htmlFor="name" className='block font-medium mb-2'>Room Id</label>
                        <input onChange={handleFormInputChange} value={detail.roomId} name='roomId' placeholder='Ener Name' type="text" id='name' className='w-full dark:bg-gray-600 px-4 py-2 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />

                    </div>

                    <div className='flex justify-center gap-5 mt-4'>
                        <button onClick={joinChat} className='px-3 py-2 dark:bg-blue-500 hover:dark:bg-blue-800 rounded-full '>Join Room</button>
                        <button onClick={createNewRoom} className='px-3 py-2 dark:bg-orange-500 hover:dark:bg-orange-800 rounded-full '>Create Room</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default JoinCreateChat