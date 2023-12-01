import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, AppBar, Toolbar} from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import {useNavigate } from "react-router-dom"

function BusquedaPatente() {
  const [patente, setPatente] = useState('');
  const [resultados, setResultados] = useState(null);
  const [seleccionadas, setSeleccionadas] = useState({});
  const [costoTotal, setCostoTotal] = useState(0);

  const navigate = useNavigate()

  const buscarPatente = async () => {

    try {
      const response = await fetch(`http://localhost:4000/busqueda?patente=${patente}`);
      if (response.ok) {
        const data = await response.json();
        setResultados(data);
      } else {
        setResultados(null); // Puedes manejar errores aquí
      }
    } catch (error) {
      console.error(error);
      setResultados(null); // Puedes manejar errores aquí
    }// Realiza la solicitud fetch y actualiza los resultados
    
  }

  const toggleSeleccion = (infraccion) => {
    const nuevasSeleccionadas = { ...seleccionadas };
    nuevasSeleccionadas[infraccion.id] = !nuevasSeleccionadas[infraccion.id];
    //console.log("Nuevas Seleccionadas: ",nuevasSeleccionadas);
    setSeleccionadas(nuevasSeleccionadas);

    // Calcular el costo total
    let nuevoCostoTotal = 0;
    for (const key in nuevasSeleccionadas) {
      if (nuevasSeleccionadas[key]) {
        console.log(resultados.infracciones.find(infraccion => infraccion.id === parseInt(key)))
        nuevoCostoTotal += resultados.infracciones.find(infraccion => infraccion.id === parseInt(key)).costo;
      }
    }
    setCostoTotal(nuevoCostoTotal);
  }
  const pagar = () => {
    // Realizar el proceso de pago con los elementos seleccionados
  }

  return (
    <>
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static" color="transparent">
          <Container>
            <Toolbar>
              <div style={{ marginRight: '10px' }}>
                <Button variant="contained" color='secondary' onClick={() => navigate("/Login")}>
                  Login Administrador
                </Button>
              </div>
              <Typography variant='h6' sx={{flexGrow: 1, textAlign: 'center'}}>
                BUSCA TUS INFRACCIONES
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <Container maxWidth="sm" textalign="center">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          textAlign="left"
          m="0 auto"
          mt={2}
          p={2}
        >
          <TextField
            label="Ingrese la patente"
            variant='filled'
            value={patente}
            onChange={(e) => setPatente(e.target.value)}
            InputProps={{
              sx: { backgroundColor: 'white' },
            }}
          />
          <Button variant="filled" color="primary" onClick={buscarPatente}>
            Buscar
          </Button>

          {resultados && (
            <div>
              <Typography variant="h6">Resultados para la patente: {patente}</Typography>
              {resultados.infracciones.map((infraccion, index) => (
                <Card key={index} style={{ marginBottom: '10px', backgroundColor: '#1e272e' }}>
                  <CardContent style={{ display: "flex", justifyContent: "space-between"}}>
                    <div style={{color: 'white'}}>
                      <Typography variant="subtitle1">Infracción {index + 1}:</Typography>
                      <Typography>ID: {infraccion.id}</Typography>
                      <Typography>Fecha: {infraccion.fecha}</Typography>
                      <Typography>Lugar: {infraccion.lugar}</Typography>
                      <Typography>Infracción: {infraccion.infraccion}</Typography>
                      <Typography>Costo: ${infraccion.costo}</Typography>
                    </div>
                    <label>
                      <Checkbox
                        checked={seleccionadas[infraccion.infraccion] || false}
                        onChange={() => toggleSeleccion(infraccion)}
                      />
                      Pagar
                    </label>
                  </CardContent>
                </Card>
              ))}
              <Typography variant="h6">Costo Total: ${costoTotal}</Typography>
              <Button variant="contained" color="primary" onClick={pagar} sx={{color: 'white'}}>
                Pagar
              </Button>
            </div>
          )}
        </Box>
      </Container>
    </>
  );
}

export default BusquedaPatente;