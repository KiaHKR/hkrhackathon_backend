import request from 'supertest'
import {dbUser} from "../../../src/database/models/db_users";
let server;

describe('/login', () => {
    let user;
    let email;
    let password;

    beforeEach(async () => {
        server = require('../../../src/index')
        user = new dbUser({
            name: "test",
            email: "test@example.com",
            password: "$2b$10$kPLid/ALLlbf27PW6l19GuG.oNZdL3gyFA9abXU4zj58yKMLjwIGW",
            year: 1,
            currentPuzzleId: "firstTestPuzzle"
        });
        await user.save();
        email = "test@example.com";
        password = "12345678";
    });

    afterEach(async () => {
        server.close();
        await dbUser.remove();
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
