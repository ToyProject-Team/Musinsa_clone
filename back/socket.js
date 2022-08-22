const SocketIO = require('socket.io')

module.exports = (server) => {
    console.log("dasdads")
    const io = SocketIO(server, { path: '/socket.io' });
    
    io.on('connection', (socket) => {
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        console.log('새로운 클라이언트 접속', ip, socket.id, req.id)
        socket.on('disconnect', () => {
            console.log('클라이언트 접속 해체', ip);
            clearInterval(socket.interval)
        })    
        socket.on('error', (error) => {
                console.error(error);
        })
        
        socket.on('reply', (data) => {
            console.log(data)
        })

        socket.interval = setInterval(() => { 
            socket.emit('news', 'Hello Socket.io')
        }, 3000)
    })
}