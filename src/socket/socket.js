import io from 'socket.io-client'

const socket = io('https://chat-time-real-back-patient-paper-4336.fly.dev', {
    withCredentials: true,
    transports: ['websocket', 'polling'],
    auth: {
        serverOffset: 0
    },
})

export default socket