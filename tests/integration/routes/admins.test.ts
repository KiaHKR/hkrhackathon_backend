import request from 'supertest'
import { dbUser } from "../../../src/database/models/db_users";
import { User } from "../../../src/models/user";
import { populateDatabase } from "../databasePopulater";
import { depopulateDatabase } from "../databaseDepopulater";
let server;

describe('admin', () => {

    beforeAll(async () => {
        server = require('../../../src/index')
    })

    afterAll(async () => {
        server.close();
        await depopulateDatabase();
    });

    describe('DELETE /:email', () => {
        let email;
        let token;

        beforeEach(async () => {
            await populateDatabase();
            email = "test@example.com";
            const user = new User("test", "admin@email.com", "12345678", 1);
            user.isAdmin = true;
            token = user.generateAuthToken();
        });

        afterEach(async () => {
            await depopulateDatabase();
        })

        const exec = async () => {
            return await request(server)
                .delete('/admin/' + email)
                .set('x-auth-header', token)
                .send()
        };

        it('should return a 401 if no token is provided.', async function () {
            const res = await request(server)
                .get('/user')
                .set('x-auth-header', '')
                .send()

            expect(res.status).toBe(401);
        });

        it('should return 403 if not an admin token provided', async function () {
            token = new User("test", "test@email.com", "password", 3).generateAuthToken();
            const res = await exec();

            expect(res.status).toBe(403);
        });

        it('should return 400 if invalid token provided', async function () {
            token = 'a'
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 404 if no user found.', async function () {
            email = 'bonkers'
            const res = await exec();

            expect(res.status).toBe(404);
            expect(res.body.error).toMatch('not found')
        });

        it('should return 200 if user is found.', async function () {
            const res = await exec();

            expect(res.status).toBe(200);
        });

        it('should delete user if input is valid.', async function () {
            await exec();
            const userInDb = await dbUser.findOne({ email: email });

            expect(userInDb).toBeNull()
        });

        it('should return deleted user', async function () {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', 'test');
            expect(res.body).toHaveProperty('email');
            expect(res.body).toHaveProperty('year', 1);
        });

    });

});
