import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Tasklist from './components/Tasklist'
import Taskform from './components/Taskform'
import {Container} from '@mui/material'
import SignIn from './components/login'
export default function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path='/'element={<SignIn/>}/>
          <Route path='/tasks/new' element={<Taskform/>}/>
          <Route path='/tasks/:id/edit' element={<Taskform/>}/>
          <Route path='/tasks' element={<Tasklist/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
  )
}


