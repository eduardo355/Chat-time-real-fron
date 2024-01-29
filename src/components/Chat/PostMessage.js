import { io } from "socket.io-client"

export const PostMessage = (message, dateNow, name) => {
    return new Promise((resolve, reject) => {

        const socket = io('http://localhost:3000', {
            withCredentials: true,
            transports: ['websocket', 'polling'],
            auth: {
                name: name ?? 'anonymus',
                serverOffset: 0
            },
        })

        socket.emit('Guardar Mensaje', message, dateNow)
        
        let newArray = []
        socket.on('Enviar Mensaje', (message, id, dateNow, name) => {
            const Array = {
                message: message,
                id: id,
                dateNow: dateNow,
                name: name
            }
            
            newArray.push(Array)
            resolve(newArray)
        })
        socket.on('Registro error', (error) => {
            reject(error)
        })
    })
}