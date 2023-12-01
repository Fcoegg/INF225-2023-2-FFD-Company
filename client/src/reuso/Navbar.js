import {AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"

export default function Navbar() {
      const navigate = useNavigate()
    return (
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static" color="transparent">
          <Container>
            <Toolbar>
              <Typography variant='h6' sx={{flexGrow: 1}}>
                <Link to='/tasks' style={{textDecoration: 'none', color: '#eee'}}> PERN STACK PROYECTO</Link>
              </Typography>
              <div style={{ marginRight: '10px' }}>
                <Button variant="contained" color='secondary' onClick={() => navigate("/tasks/sect")}>
                  Analizar
                </Button>
              </div>
              <div>
                <Button variant="contained" color='secondary' onClick={() => navigate("/tasks/new")}>
                  Nuevo Ingreso
                </Button>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    )
  }

  /**
   * GLOSARIO
   * % 'sx' detalla los estilos de dicha Box;
   * % 'flexGrow' detalla la capacidad de crecer si hay espacio adicional disponible
   * % 'position' donde se ubica el contenido
   */