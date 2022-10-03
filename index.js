const express = require('express');
const db = require('./api/database/models');
const app = express();
require('dotenv').config();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json()
})


app.post('/usuarios', async (req, res) => {
    let usuario = req.body;
    await db.usuarios.create(usuario)
    res.status(200).json(usuario)
})

const server = app.listen(8080, async () => {
});

app.post('/login', async(req, res) => {
    let {email, contrasenia} = req.body
    let persona = await db.usuarios.findOne({where: {email: email, contrasenia: contrasenia}, attributes: ['empleado']})
    res.status(200).json(persona);
})

app.post('/depositar', async(req, res) => {
    let {cantidad, id} = req.body;
    if(typeof cantidad == 'number' && cantidad <= 1000000) {
        const saldoViejo = await db.cuentas.findByPk(id);
        let saldoNuevo = cantidad + saldoViejo.balance
        await db.cuentas.update({balance: saldoNuevo},{where: {id: id}})
        const newSaldo = await db.cuentas.findByPk(id);
        res.status(200).json(newSaldo.balance)
    } else {
        res.status(400).json()
    }
})

module.exports = {app, server};