const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

/* const { Server } = require("socket.io");
const io = new Server(server); */

const io = require('socket.io')(server, {
	cors: {
		origin: 'http://localhost:3000'
	}
})

let onlineUsers = []
// check the socket connection form client
io.on('connection', (socket) => {
	socket.on('join-room', (userId) => {
		console.log("usder joined room", userId)
		socket.join(userId)
	})
	// send message only to users who are in the current chat
	socket.on('send-message', (message) => {
		console.log('amedeo was here', message)
		io.to(message.user1).to(message.user2).emit('receive-message', message)
	})

	socket.on('clear-unread-messages', (data) => {
		io.to(data.user1).to(data.user2).emit('unread-messages-cleared', data)
	})

/* 	socket.on('is-online', (userId) => {
		if(!onlineUsers.includes(userId)) {
			onlineUsers.push(userId)
		}
		console.log("In online users ", onlineUsers)
		io.emit('online-users', onlineUsers)
	}) */
})

const PORT = config.PORT || 3001

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
