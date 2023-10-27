import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Fiscalizador from './components/Fiscalizador'
import Taskform from './components/Taskform'
import {Container} from '@mui/material'
import SignIn from './components/login'
import Infractor from './components/Infractor'


export default function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path='/'element={<SignIn/>}/>
          <Route path='/tasks/new' element={<Taskform/>}/>
          <Route path='/tasks/:id/edit' element={<Taskform/>}/>
          <Route path='/tasks' element={<Fiscalizador/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
  )
}
