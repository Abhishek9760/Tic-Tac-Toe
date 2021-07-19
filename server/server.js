const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))

const socketio = require('socket.io')
const PORT = process.env.PORT || 3000
const expressServer = app.listen(PORT)

const io = socketio(expressServer, {
    cors: { origin: '*' },
})
io.on('connection', (socket) => {
    let roomName
    console.log('connected')
    socket.on('disconnect', () => {
        // console.log(
        //     'leaving room user',
        //     socket.handshake.query.name,
        //     'from room',
        //     roomName
        // )

        socket.leave(roomName)
        io.in(roomName).emit(
            'updated-users-count',
            updateUsersInRoom('/', roomName)
        )
    })

    socket.on('join-room', (roomCode) => {
        const userCount = updateUsersInRoom('/', roomCode)
        roomName = roomCode
        if (userCount <= 1) {
            socket.join(roomCode)
            socket.to(roomCode).emit('get-data')
        } else {
            console.log('Cannot join room')
        }
    })

    socket.on('marks-list', (marks) => {
        socket.to(roomName).emit('updated-marks', marks)
    })

    socket.on('result', (data) => {
        socket.to(roomName).emit('updated-result', data)
    })

    socket.on('get-player', (player) => {
        const newPlayer = {
            ...player,
            symbol: player.symbol,
            turn: true,
        }
        socket.to(roomName).emit('updated-player', newPlayer)
    })
    socket.on('winner', (player) => {
        socket.to(roomName).emit('get-winner', player)
    })

    socket.on('newgame', () => {
        socket.to(roomName).emit('reset-game')
    })

    socket.on('tie', () => {
        socket.to(roomName).emit('tie-game')
    })

    socket.on('get-name', (name) => io.in(roomName).emit('name', name))

    socket.on('get-users-count', () => {
        const members = updateUsersInRoom('/', roomName)
        io.in(roomName).emit('updated-users-count', members)
    })

    socket.on('newMessage', (msg) => {
        io.to(roomName).emit('messageFromServer', {
            ...msg,
            id: socket.id,
        })
    })

    socket.on('history', () => {
        socket.to(roomName).emit('getHis')
    })

    socket.on('messages', (m) => {
        socket.to(roomName).emit('getMsgs', m)
    })
})

const updateUsersInRoom = (namespace, roomToJoin) => {
    if (!io.of(namespace).adapter.rooms.get(roomToJoin)) {
        return 0
    }
    // roomCode
    // console.log(io.of('/').adapter.rooms.get(roomName))
    // console.log('rooms...', io.of(namespace).adapter.rooms)
    return io.of(namespace).adapter.rooms.get(roomToJoin).size
}
