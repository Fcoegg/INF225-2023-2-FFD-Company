import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate } from "react-router-dom"
import {useState, useEffect} from 'react'

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://sanbenito.gob.ar">
        Municipalidad de San Benito
      </Link>{''}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
// TODO remove, this demo shouldn't need to reset the theme.

export default function SignIn() {
  const [log,setLog]=useState([])
  const [forma, setIngreso] = useState({
    email: '',
    password: ''
  })

  const loadLogin=(log,forma)=>{
    console.log("Hola")
    console.log(log)
    for (let i = 0; i < log.length; i++) {
      
      if (log[i].username === forma.email && log[i].contrasena ===forma.password) {
          navigate('/tasks')
          break;
      }
      else if (log[i].username ===forma.email){
        console.log('usuario coincide')
      }
      else if (log[i].contrasena ===forma.password){
        console.log('pass coincide')
      }
    }
    
    
  }
  const loadLogs = async()=>{
    const response =await fetch('http://localhost:4000/login')
    const data = await response.json()
    setLog(data)
  }

  const navigate = useNavigate()
  useEffect(()=>{
    loadLogs()
  },[]);
  const handleChange=(e)=>
      setIngreso({...forma,[e.target.name]:e.target.value});

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Usuario"
              name="email"
              onChange={handleChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              onChange={handleChange}
              label="Contrasena"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recuerdame"
            />
            <Button  
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => loadLogin(log,forma)}           
            >
              Log in
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
