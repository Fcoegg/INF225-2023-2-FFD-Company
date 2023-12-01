const { Router } = require('express');
const { obtener, obteneruna, postinfra, borrarinfra, actualizarinfra,obtenersectores, obtenerlogin, postsectores, busquedausuario} = require('../controllers/task.controller')

const router = Router();

router.get('/task', obtener)

router.get('/task/:id', obteneruna)

router.post('/task', postinfra)

router.delete('/task/:id',borrarinfra)

router.put('/task/:id',actualizarinfra)

router.get('/login',obtenerlogin )

router.get('/sect',obtenersectores)

router.post('/sect', postsectores)

router.get('/busqueda', busquedausuario)

module.exports = router;