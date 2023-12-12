const io = require('socket.io')(8900, {
    cors: {
        origin:'https://grab-arts.netlify.app'
    }
})


let users = []

const addUser = (userId,socketId) => {
    !users.some(u => u.userId === userId) &&
        users.push({userId,socketId})
}

const removeUser = (socketId) => {
    users=users.filter(u=>u.socketId!==socketId)
}

const findUser = (id) => {
    return users.find(u=>u.userId===id)
}


io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('addUser', userId => {
        addUser(userId,socket.id)
        io.emit('getUsers', users)
    })  

    socket.on("sendMessage", ({ sender, receiver, message }) => {
        const user = findUser(receiver)
        if (user)
        {
            io.to(user.userId).emit("getMessage", { sender: sender, message: message })
            console.log(user)
            console.log(' sender : '+sender,' message : '+message,)
      } else {
        console.log(`Receiver user ${receiver} not found.`)
      }
    })


    socket.on('disconnect', () => {
        removeUser(socket.id)
        io.emit('getUsers', users)
    })
})