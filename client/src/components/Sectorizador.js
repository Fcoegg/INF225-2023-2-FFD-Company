import Navbar from "../reuso/Navbar";
import {useState} from 'react'
import {Card, CardContent, Grid, TextField, Typography,Button } from '@mui/material';
import { useNavigate } from "react-router-dom";



export default function TaskList() {
  const navigate=useNavigate()
    const [sectores, setSector] = useState({
        coordenada_x: '',
        coordenada_y:'',
        nombre_sector:''
      })
    const handlesubmit = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:4000/sect`,{
          method: 'POST',
          body: JSON.stringify(sectores),
          headers: { "Content-Type": "application/json"}
        });
        console.log(sectores)
    };
    const handleChange=(e)=>{
        setSector({...sectores,[e.target.name]:e.target.value})};
    return(
        <>
        <Navbar/>
        <Grid 
      container 
      direction='column' 
      alignItems='center' 
      justifyContent='center'>
        <Grid item xs={3}>
          <Card 
          sx={{mt: 5}} 
          style={{
            backgroundColor: '#1e272e',
            padding: '1rem'
          }}
          >
            <Typography variant='5' textAlign='center' color='white'>
              Ingresar Sector
            </Typography>
            <CardContent>
              <form onSubmit={handlesubmit}>
                <TextField
                  variant='filled'
                  label='Coordenada X'
                  sx={{
                    display: 'block',
                    margin: '.5rem 0'
                  }}
                  name = "coordenada_x"
                  onChange={handleChange}
                  inputProps={{style: {color: "white"}}}
                  InputLabelProps={{style: {color: "white"}}}
                />
                <TextField
                  variant='filled'
                  label='Coordenada Y'
                  sx={{
                    display: 'block',
                    margin: '.5rem 0'
                  }}
                  name = "coordenada_y"
                  onChange={handleChange}
                  inputProps={{style: {color: "white"}}}
                  InputLabelProps={{style: {color: "white"}}}
                />
                <TextField
                  variant='filled'
                  label='Nombre Sector'
                  sx={{
                    display: 'block',
                    margin: '.5rem 0'
                  }}
                  name = "nombre_sector"
                  onChange={handleChange}
                  inputProps={{style: {color: "white"}}}
                  InputLabelProps={{style: {color: "white"}}}
                />
                <Button
                variant='contained'
                color='primary'
                type='submit'
                > 
                'Guardar'
                </Button>
                </form>
                <div style={{ marginTop: '10px' }} />
                <Button
                variant='contained'
                color='secondary'
                type='submit'
                onClick={()=>navigate('/mapa')}
                > 
                'mirar mapa'
                </Button>
                
                </CardContent>
                </Card>
                </Grid>
                </Grid>
        </>
    );
}