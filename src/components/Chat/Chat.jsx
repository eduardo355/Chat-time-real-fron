import { useState, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import socket from "../../socket/socket"

const Chat = () => {
    const [message, setMessage] = useState('')
    const [rowsMessage, setRowsMessage] = useState([])
    const [loading, setLoading] = useState(true)
    const [userName, setUserName] = useState('anonymus')
    const [online, setOnline] = useState(0)
    const chatContainerRef = useRef(null)
    const location = useLocation()

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
    
    useEffect(() => {
        if (location.state) {
            const { name } = location.state
            setUserName(name)
        }
    }, [])

    const serverOffset = 0
    useEffect(() => {
        const fetchData = async () => {
            try {
                socket.off("Enviar Mensaje")
                socket.on("Enviar Mensaje", (message, id, dateNow, name) => {
                    let ParseFecha = new Date(dateNow)
                    let hora = ParseFecha.getHours()
                    let min = ParseFecha.getMinutes()
                    setRowsMessage((prevRows) => [
                        ...prevRows,
                        { message, id, hora, min, name },
                    ])
                })
                socket.auth.serverOffset = serverOffset
                socket.off("UserConnection")
                socket.on("UserConnection", (conected) => {
                    setOnline(conected)
                })
                setLoading(false)
            } catch (error) {
                console.error(error)
                setLoading(false)
            }
        }
        fetchData()
        return () => {
            socket.off("Enviar Mensaje")
            socket.off("UserConnection")
        }
    }, [userName])
    

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
    }, [rowsMessage])


    const handleSubmit = (e) => {
        e.preventDefault()
        const dateNow = new Date()
        socket.emit("Guardar Mensaje", message, dateNow, userName)
        setMessage('')
    }
    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <section className="h-screen p-8 dark:bg-slate-800 max-sm:p-0">
            <div className="flex flex-col w-full h-full shadow-md rounded-md max-sm:w-full">
                <div className="flex bg-blue-400 rounded-t text-white justify-between p-2 text-xl font-bold">
                    <span>Chat</span>
                    <span>{userName || "anoymus"}</span>
                    <span className="text-green-500 dark:text-red-700">Online {online}</span>
                </div>
                <ul
                    ref={chatContainerRef}
                    className="h-full bg-slate-50 p-5 overflow-y-scroll scroll-smooth dark:bg-slate-900"
                >
                    {rowsMessage.map((messageOutp) => (
                        <li key={messageOutp.id} className="bg-white p-2 mt-3 shadow-md dark:bg-slate-800">
                            <span className="text-blue-400 text-xl font-bold">
                                {messageOutp.name}
                            </span>
                            <p className="text-lg dark:text-white">{messageOutp.message}</p>
                            <small className="text-slate-500">
                                {messageOutp.hora} : {messageOutp.min}{messageOutp.hora > 12 ? 'PM' : 'AM'}
                            </small>
                        </li>
                    ))}
                </ul>
                <form
                    onSubmit={handleSubmit}
                    className="bg-blue-400 flex gap-2 p-3 rounded-b"
                >
                    <input
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        className="flex-1 p-2 rounded-md focus:outline-none text-xl dark:bg-slate-800 dark:text-white"
                        type="text"
                        placeholder="Type of message"
                    />
                    <button className="bg-green-500 p-2 text-xl text-white hover:bg-green-600 dark:bg-red-700 hover:dark:bg-red-800">
                        Enviar
                    </button>
                    
                </form>
            </div>
        </section>
    )
}

export default Chat
