CREATE DATABASE ProyectoSoft;

CREATE TABLE ingreso(
    id SERIAL PRIMARY KEY,
    inspector VARCHAR(60),
    fecha DATE,
    lugar VARCHAR(60),
    patente VARCHAR(6),
    infraccion VARCHAR(60),
    empadronado BOOLEAN ,
    notificacion BYTEA
);

CREATE TABLE usuarios(
    id SERIAL PRIMARY KEY, 
    username VARCHAR(50), 
    contrasena VARCHAR(100));

CREATE TABLE sectores(
    id SERIAL PRIMARY KEY, 
    nombre_sector VARCHAR(50),
    coordenada_x NUMERIC(10, 7),
    coordenada_y NUMERIC(10, 7));

    
CREATE TABLE registropago(
    idinfraccion INTEGER PRIMARY KEY,
    fecha DATE,
    pago integer
);

CREATE TABLE infracciones(
    id SERIAL PRIMARY KEY,
    infraccion VARCHAR(100),
    costo INTEGER
);