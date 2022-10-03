const request = require('supertest');
const db = require('../api/database/models');
const {app, server} = require('../index');

afterEach(() => {
    server.close();
});

afterAll(async () => {
    await db.sequelize.close();
})


describe('GET /', () => {
    test.skip('debo devolver status 200', async () => {
        
        const { statusCode } = await request(app).get('/');
        expect(statusCode).toBe(200);

    })
})

describe('POST /usuarios', () => {
    test.skip('debo recibir un status 200', async () => {

        const { statusCode } = await request(app).post('/usuarios');
        expect(statusCode).toBe(200);
    })
    test.skip('debo recibir el usuario creado', async () => {
        const data = {
            "nombre": "ayrton",
            "apellido": "dasilva",
            "fecha_de_nacimiento": "1997-08-19",
            "email": "ayrton@gmail.com",
            "contrasenia": "ayrton1234",
            "empleado": 0
        }
        
        const {body} = await request(app).post('/usuarios').send(data);
        expect(body).toBeInstanceOf(Object);
    })
})

describe('POST /login', () => {
    test.skip('debo recibir status 200', async() => {
        const { statusCode } = await request(app).post('/login');
        expect(statusCode).toBe(200);
    })

    test.skip('debo recibir el rol del usuario', async() => {
        const data = {
            "email": "ayrton@gmail.com",
            "contrasenia": "ayrton1234",
        }
        const {body} = await request(app).post('/login').send(data);
        expect(body.empleado).toBeDefined()
    })
})

describe('POST /depositar', () => {
    test.skip('debo recibir un status 400', async() => {
        const cantidad = 'hola'
        const { statusCode } = await request(app).post('/depositar').send(cantidad);
        expect(statusCode).toBe(400);
    })
    test.skip('debo recibir un status 200', async () => {
        const data = {cantidad: 200};
        const { statusCode } = await request(app).post('/depositar').send(data);
        expect(statusCode).toBe(200);
    })
    test.skip('debo recibir status 400', async() => {
        const data = {
            cantidad: 10000000
        }
        const { statusCode } = await request(app).post('/depositar').send(data);
        expect(statusCode).toBe(400);
    })
    test.skip('debo recibir el nuevo saldo de la cuenta', async () => {
        const data = {
            cantidad: 100,
            id: 1
        }
        const {balance} = await db.cuentas.findByPk(data.id)
        const nuevoBalance = balance + data.cantidad;
        const {body} = await request(app).post('/depositar').send(data)
        expect(body).toBe(nuevoBalance)
    })
})