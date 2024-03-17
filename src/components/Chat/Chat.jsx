import { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import socket from "../../socket/socket"

const Chat = () => {
    const [message, setMessage] = useState('')
    const [rowsMessage, setRowsMessage] = useState([])
    const [userName, setUserName] = useState('anonymus')
    const [online, setOnline] = useState(0)
    const chatContainerRef = useRef(null)
    const location = useLocation()
    const navegacion = useNavigate()

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
    
    useEffect(() => {
        if (location.state) {
            const { name } = location.state
            setUserName(name)
        } else {
            navegacion('/')
        }
    }, [])

    const isFirstRender = useRef(true)
    useEffect(() => {
        if (isFirstRender.current) {
            socket.emit('recovered')  
            isFirstRender.current = false
        }
        return () => {
            socket.off("recovered")
        }
    }, [])
    
    const serverOffset = 0
    useEffect(() => {
            try {
                socket.on("Enviar Mensaje", (message, id, dateNow, name) => {
                    let ParseFecha = new Date(dateNow)
                    let hora = ParseFecha.getHours()
                    let min = ParseFecha.getMinutes()
                    setRowsMessage((prevRows) => [
                        ...prevRows,
                        { message, id, hora, min, name },
                    ])
                    console.log('entre');
                })
                socket.auth.serverOffset = serverOffset
                socket.on("UserConnection", (conected) => {
                    setOnline(conected)
                })
            } catch (error) {
                console.error(error)
            }
        return () => {
            socket.off("Enviar Mensaje")
            socket.off("UserConnection")
        }
    }, [])
    
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }, [rowsMessage])


    const handleSubmit = (e) => {
        e.preventDefault()
        if (message) {
            const dateNow = new Date()
            socket.emit("Guardar Mensaje", message, dateNow, userName)
            setMessage('')
        } else {
            setMessage('Ingresa un mensaje')

            setTimeout(() => {
                setMessage('')
            }, 3000)
        }
    }

    return (
        <section className=" flex items-center justify-center h-screen p-8 bg-slate-100 dark:bg-slate-800 max-sm:p-0">
            <div className="flex flex-col w-2/3 h-full shadow-md rounded-md max-sm:w-full">
                <div className="flex bg-blue-400 rounded-t-sm text-white justify-between p-2 text-xl font-bold font-mono">
                    <button className="text-red-700 max-sm:text-sm" onClick={() => navegacion('/')}>Cerrar Sesion</button>
                    <span className="max-sm:text-sm">{userName}</span>
                    <span className="text-red-700 max-sm:text-sm">Online {online}</span>
                </div>
                <ul
                    ref={chatContainerRef}
                    className="h-full bg-slate-50 p-5 overflow-y-scroll scroll-smooth dark:bg-slate-900"
                >
                    {rowsMessage.map((messageOutp) => (
                        <li key={messageOutp.id} className="bg-white font-mono p-2 mt-3 shadow-md dark:bg-slate-800">
                            <span className="text-blue-400 text-xl font-bold max-sm:text-sm">
                                {messageOutp.name}
                            </span>
                            <p className="text-lg dark:text-white max-sm:text-sm">{messageOutp.message}</p>
                            <small className="text-slate-500 max-sm:text-sm">
                                {messageOutp.hora} : {messageOutp.min}{messageOutp.hora > 12 ? 'PM' : 'AM'}
                            </small>
                        </li>
                    ))}
                </ul>
                <form
                    onSubmit={handleSubmit}
                    className="bg-blue-400 flex gap-2 p-3 rounded-b-sm"
                >
                    <input
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        className="flex-1 font-mono p-2 rounded-md max-sm:text-sm focus:outline-none text-xl dark:bg-slate-800 dark:text-white"
                        type="text"
                        placeholder="Aa"
                    />
                    <button className="bg-green-500 font-mono p-2 text-xl text-white hover:bg-green-600 dark:bg-red-700 hover:dark:bg-red-800 max-sm:text-sm">
                        Enviar
                    </button>
                    
                </form>
            </div>
        </section>
    )
}

export default Chat
