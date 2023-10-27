const pool = require('../db')

const obtener =  async (req,res,next) =>{

    try {
        const infracciones = await pool.query('SELECT * FROM ingreso');
        res.json(infracciones.rows);
    } catch (error) {
        next(error)
    }
}

const obteneruna = async (req,res,next) =>{
    try {
        const {id} = req.params

        const result = await pool.query('SELECT * FROM ingreso WHERE id = $1', [id])

        if (result.rows.length == 0) 
            return res.status(404).json({
                message: "tarea no encontrda",
            });

        return res.json(result.rows[0]);
        
    } catch (error) {
        next(error)
    }
}

const postinfra = async (req,res,next) =>{
    const { inspector, Fecha, Lugar, Patente, infraccion, empadronado, notificacion} = req.body
    console.log(req)
    try {
        const result = await pool.query("INSERT INTO ingreso (inspector, fecha, lugar, patente, infraccion, empadronado, notificacion) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",[
            inspector,
            Fecha,
            Lugar,
            Patente,
            infraccion,
            empadronado,
            notificacion
        ]);
        res.json(result.rows[0]);
        
    } catch (error) {
        next(error)
    }
}

const borrarinfra = async (req,res,next) =>{
    const {id} = req.params;

    try {
        const result = await pool.query('DELETE FROM ingreso WHERE id = $1', [id]);

        if (result.rowCount === 0) 
            return res.status(404).json({
                message: "tarea no encontrda",
            });
        return res.sendStatus(204);

    } catch (error) {
        next(error)
    }

}

const actualizarinfra = async (req,res,next) =>{

    try {
        const {id} = req.params;
        const {inspector, Fecha, Lugar, Patente, infraccion, empadronado, notificacion} = req.body;

        const result = await pool.query('UPDATE ingreso SET inspector = $1, fecha = $2, lugar = $3, patente = $4, infraccion = $5, empadronado = $6, notificacion = $7 WHERE id = $8 RETURNING *',
        [inspector, Fecha, Lugar, Patente, infraccion, empadronado, notificacion, id]
        );

        if(result.rows.length === 0)
            return res.status(404).json({
                message: "infraccion no encontrada",
            });
        return res.json(result.rows[0]);
        
    } catch (error) {
        next(error)
    }
}

const obtenerlogin =  async (req,res,next) =>{

    try {
        const infracciones = await pool.query('SELECT * FROM usuarios');
        res.json(infracciones.rows);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    obtener,
    obteneruna,
    postinfra,
    borrarinfra,
    actualizarinfra,
    obtenerlogin
}
