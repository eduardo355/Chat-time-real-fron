import socket from "../../socket/socket"

export const SesionPost = async (user) => {
    return  new Promise((resolve, reject) => {
        socket.emit('Sesion', user)

        socket.on('Sesion Correcto', (id, name, apellido, user) => {
            const DATA = {
                id_user: id,
                name: name,
                apellido: apellido,
                user: user
            }
        
            resolve(DATA)
        })

        socket.on('Sesion Fail', (fail, result) => {
            const DATA = {
                fail: fail,
                result: result,
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