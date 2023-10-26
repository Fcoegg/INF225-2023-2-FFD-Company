import {Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import {useState, useEffect} from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import {AppBar, Box, Container, Toolbar} from "@mui/material"
import { Link } from "react-router-dom"

export default function Taskform() {
        const [forma, setIngreso] = useState({
           inspector: '',
           Fecha: '',
           Lugar: '',
           Patente: '',
           infraccion: '',
           empadronado: '',
           notificacion: ''

         })

        const [loading, setloading] = useState(false);
        const [editing,setEditing]=useState(false);

        const navigate = useNavigate()
        const params = useParams()
      
      const handlesubmit = async (e) => {
        e.preventDefault();
        setloading(true);

        if(editing){
          await fetch(`http://localhost:4000/task/${params.id}`,{
            method: "PUT",
            headers:{
              "Content-Type":"application/json",
            },
            body: JSON.stringify(forma),
          });
        }else{
        await fetch(`http://localhost:4000/task`,{
          method: 'POST',
          body: JSON.stringify(forma),
          headers: { "Content-Type": "application/json"}
        });
        }
        setloading(false)
        navigate('/tasks');
    };

      const handleChange=(e)=>
      setIngreso({...forma,[e.target.name]:e.target.value});

    const loadTask = async(id)=>{
      const res = await fetch(`http://localhost:4000/task/${id}`)
      const data = await res.json()
      setIngreso({inspector: data.inspector,Fecha:data.fecha,Lugar: data.lugar,Patente: data.patente,infraccion: data.infraccion,empadronado: data.empadronado, notificacion: data.notificacion})
      setEditing(true)
    };
    
    useEffect(()=>{
      if(params.id){
        loadTask(params.id);
      }
    },[params.id])
    return (
      <>
         <Box sx={{flexGrow: 1}}>
        <AppBar position="static" color="transparent">
          <Container>
            <Toolbar>
              <Typography variant='h6' sx={{flexGrow: 1}}>
                <Link to='/tasks' style={{textDecoration: 'none', color: '#eee'}}> PERN STACK PROYECTO</Link>
              </Typography>
              <Button variant="contained" color='secondary' onClick={() => navigate("/tasks/new")}>
                Nuevo Ingreso
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
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
              {editing ? "Editar Infracción": "Ingresar Infracción"}
            </Typography>
            <CardContent>
              <form onSubmit={handlesubmit}>
                <TextField
                  variant='filled'
                  label='Nombre_inspector'
                  sx={{
                    display: 'block',
                    margin: '.5rem 0'
                  }}
                  name = "inspector"
                  value={forma.inspector}
                  onChange={handleChange}
                  inputProps={{style: {color: "white"}}}
                  InputLabelProps={{style: {color: "white"}}}
                />
                <TextField
                  variant='filled'
                  label='Fecha'
                  sx={{
                    display: 'block',
                    margin: '.5rem 0'
                  }}
                  name = "Fecha"
                  value={forma.Fecha}
                  onChange={handleChange}
                  inputProps={{style: {color: "white"}}}
                  InputLabelProps={{style: {color: "white"}}}
                />
                <TextField
                  variant='filled'
                  label='Lugar'
                  sx={{
                    display: 'block',
                    margin: '.5rem 0'
                  }}
                  name = "Lugar"
                  value={forma.Lugar}
                  onChange={handleChange}
                  inputProps={{style: {color: "white"}}}
                  InputLabelProps={{style: {color: "white"}}}
                />
                <TextField
                  variant='filled'
                  label='Patente'
                  sx={{
                    display: 'block',
                    margin: '.5rem 0'
                  }}
                  name = "Patente"
                  value={forma.Patente}
                  onChange={handleChange}
                  inputProps={{style: {color: "white"}}}
                  InputLabelProps={{style: {color: "white"}}}
                />
                <TextField
                  variant='filled'
                  label='Infraccion'
                  sx={{
                    display: 'block',
                    margin: '.5rem 0'
                  }}
                  name = "infraccion"
                  value={forma.infraccion}
                  onChange={handleChange}
                  inputProps={{style: {color: "white"}}}
                  InputLabelProps={{style: {color: "white"}}}
                />
                <TextField
                  variant='filled'
                  label='empadronado'
                  sx={{
                    display: 'block',
                    margin: '.5rem 0'
                  }}
                  name = "empadronado"
                  value={forma.empadronado}
                  onChange={handleChange}
                  inputProps={{style: {color: "white"}}}
                  InputLabelProps={{style: {color: "white"}}}
                />
                <TextField
                  variant='filled'
                  label='notificacion'
                  sx={{
                    display: 'block',
                    margin: '.5rem 0'
                  }}
                  name = "notificacion"
                  value={forma.notificacion}
                  onChange={handleChange}
                  inputProps={{style: {color: "white"}}}
                  InputLabelProps={{style: {color: "white"}}}
                />
                <Button 
                variant='contained'
                color='primary'
                type='submit'
                disabled = {!forma.inspector || !forma.Fecha || !forma.Lugar || !forma.Patente || !forma.empadronado || !forma.infraccion || !forma.notificacion}>
                  {loading? (
                  <CircularProgress 
                    color='inherit' size={24}/> 
                    ):(
                      'Guardar'
                    )}
                </Button>

              </form>
            </CardContent>
          </Card>

        </Grid>
      </Grid>
      </>
       
    )
  }