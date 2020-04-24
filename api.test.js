const request = require('supertest');
const app = require('./api/server');

// describe('Register Test Success', () => {
//     it('Should expect proper response for succesfull registration', async () => {
//         const res = await request(app)
//         .post('/api/auth/register')
//         .send({username: 'test 3', password: 'test 3'});
//         expect(res.statusCode).toEqual(201);
//     });
// });

describe('Register Test Failure', () => {
    it('Should expect proper response for invalid form', async () => {
        const res = await request(app)
        .post('/api/auth/register')
        .send({username: 'Test'}); //intentionally leaving out password field
        expect(res.statusCode).toEqual(400);
    });
});

describe('Login Test Success', () => {
    it('Should expect proper response for succesfull login', async () => {
        const res = await request(app)
        .post('/api/auth/login')
        .send({username: "test", password: "test"});
        expect(res.statusCode).toEqual(200);
    });
});

describe('Login Test Failure', () => {
    it('Should expect proper response for failed login', async () => {
        const res = await request(app)
        .post('/api/auth/login')
        .send({username: "test", password: "Test"});
        expect(res.statusCode).toEqual(400);
    });
});

describe('Authentication Success', () => {
    it('Should expect proper response for succesfull authentication', async () => {
        const res = await request(app)
        .get('/api/jokes/')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODc3NDIwMzgsImV4cCI6MTU4Nzc2MDAzOH0.sErLAaqg8y-s7NB6LKhLMgkasiomJM8i7NvqnNyXmLU'); //dev token
        expect(res.statusCode).toEqual(200);
    });
});

describe('Authentication Failure - Invalid Token', () => {
    it('Should expect proper response for failed authentication', async () => {
        const res = await request(app)
        .get('/api/jokes')
        .set('Authorization', 'Not_a_valid_token');
        expect(res.statusCode).toEqual(401);
    });
});

describe('Authentication Failure - Missing Token', () => {
    it('Should expect proper response for missing token', async () => {
        const res = await request(app)
        .get('/api/jokes');
        //intentionally not setting token
        expect(res.statusCode).toEqual(400);
    });
});