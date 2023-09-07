const pool = require('../db')

const obtener =  async (req,res) =>{

    try {
        const infracciones = await pool.query('SELECT * FROM ingreso');
        res.json(infracciones.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const obteneruna = async (req,res) =>{
    try {
        const {id} = req.params

        const result = await pool.query('SELECT * FROM ingreso WHERE id = $1', [id])

        if (result.rows.length == 0) 
            return res.status(404).json({
                message: "tarea no encontrda",
            });

        return res.json(result.rows[0]);
        
    } catch (error) {
        console.log(error.message);
    }
}

const postinfra = async (req,res) =>{
    const { inspector, fecha, lugar, patente, infraccion, empadronado, notificacion} = req.body

    try {
        const result = await pool.query("INSERT INTO ingreso (inspector, fecha, lugar, patente, infraccion, empadronado, notificacion) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",[
            inspector,
            fecha,
            lugar,
            patente,
            infraccion,
            empadronado,
            notificacion
        ]);
        res.json(result.rows[0]);
        
    } catch (error) {
        console.log(error.message);
        res.json({error : error.message});
    }
}

const borrarinfra = async (req,res) =>{

    const {id} = req.params;

    const result = await pool.query('DELETE FROM ingreso WHERE id = $1', [id]);

    if (result.rowCount === 0) 
        return res.status(404).json({
            message: "tarea no encontrda",
        });
    return res.sendStatus(204);

}

const actualizarinfra = (req,res) =>{
    res.send('actualizando infraccion');
}

module.exports = {
    obtener,
    obteneruna,
    postinfra,
    borrarinfra,
    actualizarinfra
}