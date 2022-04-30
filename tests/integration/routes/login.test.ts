import request from 'supertest'
import {dbUser} from "../../../src/database/models/db_users";
import { populateDatabase } from "../databasePopulater";
import {depopulateDatabase} from "../databaseDepopulater";

let server;

describe('/login', () => {
    let email;
    let password;

    beforeEach(async () => {
        server = require('../../../src/index')
        await populateDatabase();
        email = "test@example.com";
        password = "12345678";
    });

    afterEach(async () => {
        server.close();
        await depopulateDatabase();
    });

    const exec = async () => {
        return await request(server)
            .post('/login')
            .send({
                email,
                password
            })
    };

    it('should return a 400 when invalid req.body', async function () {
        email = '';
        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return a 400 when email not found', async function () {
        email = 'wrong@example.com';
        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return a 400 when password is wrong', async function () {
        password = 'wrongPassword';
        const res = await exec();

        expect(res.status).toBe(402);
    });

    it('should return a 200 and token if valid login', async function () {
        const res = await exec();

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
    });
});
