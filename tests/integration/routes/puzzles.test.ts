import request from 'supertest'
import { populateDatabase } from "../databasePopulater";
import { depopulateDatabase } from "../databaseDepopulater";
import {User} from "../../../src/models/user";

let server;

describe('/puzzle', () => {

    beforeEach(async () => {
        server = require('../../../src/index')
        await populateDatabase();
    });

    afterEach(async () => {
        server.close();
        await depopulateDatabase();
    });

    const exec = async () => {
        const token = new User("test", "test@example.com", "12345678", 1).generateAuthToken();
        return await request(server)
            .get('/puzzle')
            .set('x-auth-header', token)
            .send()
    };

    describe('GET', () => {

        it('should return a 401 if client is not logged in.', async function () {
            const res = await request(server)
                .get('/user')
                .set('x-auth-header', '')
                .send()
            expect(res.status).toBe(401);
        });

        it('should return 404 if no puzzles in the db', async function () {
            await depopulateDatabase();
            const res = await exec();

            expect(res.status).toBe(404);
        });
    })


});
