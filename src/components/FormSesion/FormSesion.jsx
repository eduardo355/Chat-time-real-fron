import { useNavigate } from "react-router-dom"

const FormSesion = () => {
    const navegacion = useNavigate()
    return (
        <section className=" flex items-center justify-center w-screen h-screen bg-slate-50">
            <form className=" flex flex-col bg-white shadow-md rounded-sm p-4 max-sm:w-4/5 max-md:w-1/2 max-lg:w-1/2 max-2xl:w-1/3">
                <label htmlFor="" className=" text-xl text-center mt-3 font-bold">Usuario</label>
                <input 
                type="text" 
                className=' border-b border-black focus:outline-none text-xl p-1' />
                <button
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