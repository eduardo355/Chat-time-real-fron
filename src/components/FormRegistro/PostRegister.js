
import socket from "../../socket/socket"

export const PostRegiser = async (name, apellido, user) => {

    
        return new Promise((resolve, reject) => {

        socket.emit('Registro', name, apellido, user)

        socket.on('Registro correcto', (id, name, apellido, user) => {
            const DATA = {
                id_user: id,
                name: name,
                apellido: apellido,
                user: user
            }
        
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
