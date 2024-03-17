import { useState } from 'react'
import { PostRegiser } from './PostRegister'
import { useNavigate } from 'react-router-dom'

const FormRegistro = () => {
    const navegacion = useNavigate()
    const [name, setName] = useState('')
    const [apellido, setApellido] = useState('')
    const [user, setUser] = useState('')
    const [error, setError] = useState(false)


    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }

    const handleSubmit = async () => {
        if (name && apellido && user) {
            try {
                const usuario = await PostRegiser(name, apellido, user)
                if(usuario.id_user) {
                    setName('')
                    setApellido('')
                    setUser('')
                    navegacion('/Chat', { state: { name: usuario.name } })
                } else {
                    setError(true)
                }
            } catch (error) {
                console.error('Error:', error)
            }
        } else {
            console.log('Completa todos los campos antes de enviar.')
        }
    }
    

    return (
        <section 
        className='flex h-screen items-center justify-center w-screen bg-slate-50 dark:bg-black '>
            <form className=' font-mono flex flex-col bg-white shadow-md rounded-sm p-4 w-96 max-sm:w-4/5 max-md:w-1/2 max-lg:w-1/2 max-2xl:w-1/3' onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <h1 className=' text-center text-2xl font-bold text-blue-400 '>CHAT EN TIEMPO REAL</h1>
                <label className=' text-xl text-center mt-3 font-bold' htmlFor="name">Nombre</label>
                <input 
                className=' border-b border-black focus:outline-none text-xl p-1' 
                type="text" 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} />
                
                <label className=' text-xl text-center mt-3 font-bold' htmlFor="apellido">Apellido</label>
                <input 
                className=' border-b border-black focus:outline-none text-xl p-1' 
                type="text" id="apellido" 
                value={apellido} 
                onChange={(e) => setApellido(e.target.value)} />
                
                <label className=' text-xl text-center mt-3 font-bold' htmlFor="user">Usuario</label>
                <input 
                className=' border-b border-black focus:outline-none text-xl p-1' 
                type="text" 
                id="user" 
                value={user} 
                onChange={(e) => setUser(e.target.value)} />
                {error && <span className='text-red-500 font-bold text-lg'>Error, usuario ya existe.</span>}
                <button className=' text-xl mt-3 bg-blue-400 text-white p-1 hover:bg-blue-500 font-bold' type="submit">REGISTRAR</button>
                <button 
                className=' text-xl mt-3 bg-blue-400 text-white p-1 hover:bg-blue-500 font-bold' 
                onClick={() => navegacion('/Sesion')}
                type='button'>
                    INICIAR SESION
                </button>
            </form>
        </section>
    )
}

export default FormRegistro
