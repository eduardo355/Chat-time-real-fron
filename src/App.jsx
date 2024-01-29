import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FormRegistro from './components/FormRegistro/FormRegistro'
import Chat from './components/Chat/Chat'
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<FormRegistro />} />
        <Route path='/Chat' element={<Chat />} />
      </Routes>
    </Router>
  )
}

export default App
