import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SesionPost } from "./SesionPost" 

const FormSesion = () => {
    const navegacion = useNavigate()
    const [user, setUser] = useState('')

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }


    const handleSesion = async () => {
        if(user) {
            try {
                const Sesion = await SesionPost(user)
                if ( Sesion.result < 1) {
                    console.log('Dentro de if ' + Sesion.fail)
                } else {
                    navegacion('/Chat', { state: { name: Sesion.name } })
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <section className=" flex items-center justify-center w-screen h-screen bg-slate-50 dark:bg-black">
            <form className=" flex flex-col bg-white shadow-md rounded-sm p-4 max-sm:w-4/5 max-md:w-1/2 max-lg:w-1/2 max-2xl:w-1/3" onSubmit={(e) => { e.preventDefault(); handleSesion(); }}>
                <label htmlFor="" className=" text-xl text-center mt-3 font-bold">Usuario</label>
                <input 
                type="text" 
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className=' border-b border-black focus:outline-none text-xl p-1' />
                <button
                type="submit"
                className=' text-xl mt-3 bg-blue-400 text-white p-1 hover:bg-blue-500 font-bold'>
                    INICIAR SESION
                </button>
                <button
                className=' text-xl mt-3 bg-blue-400 text-white p-1 hover:bg-blue-500 font-bold'
                type="button"
                onClick={() => navegacion('/')}>
                    REGISTRARTE
                </button>  
            </form>
        </section>
    )
}


export default FormSesion