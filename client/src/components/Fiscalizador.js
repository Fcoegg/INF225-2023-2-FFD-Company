import {Button, Card, CardContent, Typography} from "@mui/material"
import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
import {AppBar, Box, Container, Toolbar} from "@mui/material"
import { Link } from "react-router-dom"



export default function TaskList() {
  const [tasks,setTasks]=useState([])
  const navigate=useNavigate()

  const loadTasks = async()=>{
    const response =await fetch('http://localhost:4000/task')
    const data = await response.json()
    setTasks(data)
  }
  const handleDelete=async (id) =>{
    try {
      await fetch(`http://localhost:4000/task/${id}`,{
      method: "DELETE",
    })
    setTasks(tasks.filter(task=>task.id!==id));
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(()=>{
    loadTasks()
  },[]);

  console.log("tasks:", tasks);
  
  return(
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
      <h1>Lista de infracciones</h1>
      {tasks.length > 0 ? tasks.map((task)=>(
          <Card style ={{
            marginBottom: ".7rem",
            backgroundColor: '#1e272e'
          }}key={task.id}>
            <CardContent style={{
              display: "flex",
              justifyContent: "space-between"
            }}>
              <div style={{color: 'white'}}>
                <Typography>{"inspector: "+task.inspector}</Typography>
                <Typography>{"fecha: "+task.fecha}</Typography>
                <Typography>{"lugar: "+task.lugar}</Typography>
                <Typography>{"patente: "+task.patente}</Typography>
                <Typography>{"infraccion: "+task.infraccion}</Typography>
                <Typography>{"empadronado: "+task.empadronado}</Typography>
                <Typography>{"notificación: "+task.notificacion}</Typography>
              </div>
              <div>
                <Button 
                  variant='contained' 
                  color='inherit' 
                  onClick={()=>navigate(`/tasks/${task.id}/edit`)}
                >
                  Edit
                </Button>
                <Button 
                  variant='contained' 
                  color='warning' 
                  onClick={()=>handleDelete(task.id)}
                  style= {{marginLeft: ".5rem"}}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
      )):null}
    </>
  );
}
