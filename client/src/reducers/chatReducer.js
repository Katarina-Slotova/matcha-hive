import { createSlice } from '@reduxjs/toolkit'
import chatService from '../services/chats'
import toast from 'react-hot-toast'

const chatSlice = createSlice({
  name: 'chats',
  initialState: {
    allChats: [],
    selectedChat: null,
  },
  reducers: {
		setChats: (state, action) => {
			state.allChats = action.payload
		},
/*     setChats(state, action) {
			return (state.allChats = action.payload)
    }, */
    setSelectedChat: (state, action) => {
     state.selectedChat = action.payload
    },
    setNewChat(state, action) {
      return (state = action.payload)
    },
  },
})

export const createChat = (newChat) => {
  return async (dispatch) => {
		const response = await chatService.createNewChat(newChat)
    if (response.status === 201) {
			toast.success('Matched!')
			dispatch(setNewChat(response.data))
		}
    else
      console.log('chat creation failed, status: ', response.status)
  }
}

export const initializeChats = (userId) => {
  return async (dispatch) => {
		const response = await chatService.getAllChats(userId)
		if (response.status === 200) {
			dispatch(setChats(response.data.chats))
		} else
			console.log('chat init failed, status: ', response.status) 
  }
}

export const selectOneChat = (openedChatId) => {
  return async (dispatch) => {
    const response = await chatService.getSelectedChat(openedChatId)
		if (response.status === 200) {
			dispatch(setSelectedChat(response.data.chats))
		} else
			console.log('chat init failed, status: ', response.status) 
  }
}

export const updateUnreadMessagesToRead = (chatId) => {
  return async (dispatch) => {
    const response = await chatService.updateUnreadChatMessages(chatId)
    if (response.status === 200) {
/*			dispatch(setChats(response.updatedChat))
       const updatedChats = chatSlice.getState().allChats.map((chat) => {
        if (chat.id === chatId) return response.data
        return chat
      })
      dispatch(setChats(updatedChats)) */
/* 			console.log("RESPONSE DATA FROM CHAT REDUCER", response.data)
			dispatch(setSelectedChat(response.data)) */
    }
		else
			console.log('updatimg messages failed, status: ', response.status) 
  }
}

export const { setChats, setSelectedChat, setNewChat } = chatSlice.actions

export default chatSlice.reducer