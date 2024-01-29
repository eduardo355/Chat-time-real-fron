import io from 'socket.io-client'

export const PostRegiser = (name, apellido, user) => {
    return new Promise((resolve, reject) => {
        const socket = io('https://chat-time-real-back-patient-paper-4336.fly.dev', {
            withCredentials: true,
            transports: ['websocket', 'polling'],
            auth: {
                serverOffset: 0,
            },
        })
        socket.emit('Registro', name, apellido, user)

        socket.on('Registro correcto', (id, name, apellido, user) => {
            const DATA = {
                id_user: id,
                name: name,
                apellido: apellido,
                user: user
            };
            console.log('Desde Post ' + DATA.id_user)
            resolve(DATA)
        })
        

        socket.on('Registro error', (error) => {
            reject(error);
        })
        
        return () => {
            socket.off('Enviar Mensaje')
        }
    })
}
