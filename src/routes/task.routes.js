const { Router } = require('express');
const { obtener, obteneruna, postinfra, borrarinfra, actualizarinfra } = require('../controllers/task.controller')

const router = Router();

router.get('/task', obtener)

router.get('/task/:id', obteneruna)

router.post('/task', postinfra)

router.delete('/task/:id',borrarinfra)

router.put('/task',actualizarinfra)



module.exports = router;