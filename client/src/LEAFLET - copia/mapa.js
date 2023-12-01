import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from "../reuso/Navbar";
import '../LEAFLET - copia/mapa.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const Mapa = () => {
    const [sectores,setSect]=useState([])
    const mapRef = useRef(null);
    const loadSect = async()=>{
        const response =await fetch('http://localhost:4000/sect')
        const data = await response.json()
        setSect(data)
      }
    const handleSelectChange = (e) => {
    if (e.target.value !== "-1") {
        const coords = e.target.value.split(",");
        mapRef.current.flyTo(coords, 17);
    }
    };

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map('map').setView([-31.7840516, -60.4386062], 15);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(mapRef.current);
            delete L.Icon.Default.prototype._getIconUrl;

            L.Icon.Default.mergeOptions({
                iconRetinaUrl: icon,
                iconUrl: icon,
                shadowUrl: iconShadow,
            });
            loadSect()
        }
        
        if (sectores.length > 0) {
            sectores.forEach(sector => {
              const { coordenada_x, coordenada_y, nombre_sector } = sector;
              const marker = L.marker([parseFloat(coordenada_x), parseFloat(coordenada_y)]).addTo(mapRef.current);
              marker.bindPopup(`<b>Nº de Infracciones!</b><br>${nombre_sector}`);
            });
          }
        
    }, [sectores]);
    console.log("sectores:", sectores);
    return (
        <div>
            <Navbar/>
            <h2>Revisa los sectores de San Benito</h2>
            {sectores.length > 0 && (
                    <select 
                        name="select-location" 
                        id="select-location"
                        style={{
                            fontSize: '16px',
                            padding: '10px',
                            width: '30%',
                            borderRadius: '5px',
                            backgroundColor: '#f2f2f2',
                            color: '#333',
                            marginBottom: '10px',
                        }}
                        onChange={handleSelectChange}
                        >
                        <option value="-1">Seleccione un lugar</option>
                        {sectores.map((sector) => (
                            <option key={sector.id} value={`${sector.coordenada_x},${sector.coordenada_y}`}>
                                {sector.nombre_sector}
                            </option>
                        ))}
                    </select>
            )}
            <div id="map"></div>
        </div>
    );
};

export default Mapa;
