import { useEffect } from "react"
import { useSelector } from "react-redux"
import ChatArea from "../components/ChatArea"
import UserChatList from "../components/UserChatList"
import { useDispatch } from 'react-redux'
import { initializeChats, updateUnreadMessagesToRead } from "../reducers/chatReducer"
import { getAllMessages } from "../reducers/messageReducer"
import { io } from 'socket.io-client'
const socket = io('http://localhost:3001')

const Chat = () => {
  const user = useSelector(({ user }) => user)
	const chats = useSelector(({ chats }) => chats)
	console.log("These are users from Chat: ", user)
	const selectedChat = chats.selectedChat

	const dispatch = useDispatch()
	
	useEffect(() => {
		dispatch(initializeChats(user.id))
  }, [user, dispatch])

	useEffect(() => {
		//selectedChat && dispatch(getAllMessages(selectedChat.id))
		if (selectedChat && selectedChat.last_message_sender && selectedChat.last_message_sender !== user.id)
			dispatch(updateUnreadMessagesToRead(selectedChat.id))
		//receive message from server using socket
/* 		socket.on('receive-message', (message) => {
			dispatch(getAllMessages(selectedChat.id))
		}) */
  }, [selectedChat, dispatch, user])

	useEffect(() => {
		// join the room
		socket.emit('join-room', user.id)
/* 		//send message to recipient
		socket.emit('send-message', {text: 'Hello, how are you?', sender: user.id, recipient: 4})
		//receive message from recipient
		socket.on('receive-message', (data) => {
			console.log("data ", data)
		}) */
	}, [user])

/*    	useEffect(() => {
		if (selectedChat.last_message_sender !== user.id)
		{
			clearUnreadMessages()
		}
	}, [selectedChat]) */

  console.log("chat user is: ", user)
	//console.log("chat users: ", users)
	console.log("chat: ", selectedChat)

  return (
    <div className="h-screen w-screen">
			<div className="flex p-10 gap-5">
				<div className="w-96">
					<UserChatList />
				</div>
				<div className="w-full">
					{chats.selectedChat && <ChatArea socket={socket}/>}
					{/* <ChatArea loggedUser={user} messages={messages}/> */}
				</div>
			</div>
    </div>
  )
}

export default Chat