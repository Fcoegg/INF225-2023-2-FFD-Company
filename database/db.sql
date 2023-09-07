CREATE DATABASE ProyectoSoft;

CREATE TABLE ingreso(
    id SERIAL PRIMARY KEY,
    inspector VARCHAR(60),
    fecha DATE,
    lugar VARCHAR(60),
    patente VARCHAR(6),
    infraccion VARCHAR(60),
    empadronado BOOLEAN NOT NULL,
    notificacion BYTEA
);