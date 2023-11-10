import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Fiscalizador from './components/Fiscalizador'
import Taskform from './components/Taskform'
import {Container} from '@mui/material'
import SignIn from './components/login'
import Infractor from './components/Infractor'
import Sectorizador from './components/Sectorizador'
import Mapa from './LEAFLET - copia/mapa'

export default function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path='/'element={<Infractor/>}/>
          <Route path='/mapa'element={<Mapa/>}/>
          <Route path='/tasks/new' element={<Taskform/>}/>
          <Route path='/Login' element={<SignIn/>}/>
          <Route path='/tasks/:id/edit' element={<Taskform/>}/>
          <Route path='/tasks' element={<Fiscalizador/>}/>
          <Route path='/tasks/sect' element={<Sectorizador/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
  )
}


