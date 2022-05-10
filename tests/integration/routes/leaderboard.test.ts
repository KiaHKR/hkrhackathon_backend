import request from 'supertest'
import { populateDatabase } from "../databasePopulater";
import { depopulateDatabase } from "../databaseDepopulater";

import app from '../../../src/index';
import {User} from "../../../src/models/user";

let server;

describe('/leaderboard', () => {
    beforeEach(async () => {
        server = app;
        await populateDatabase();
    });

    afterEach(async () => {
        server.close();
        await depopulateDatabase();
    });

    const exec = async () => {
        const token = new User("test", "test@example.com", "12345678", 1).generateAuthToken();
        return await request(server)
            .get('/leaderboard')
            .set('x-auth-header', token)
            .send()
    };

    it('should return a 401 if client is not logged in.', async function () {
        const res = await request(server)
            .get('/leaderboard')
            .set('x-auth-header', '')
            .send()

        expect(res.status).toBe(401);
    });

    it('should return a 404 if leaderboard was not generated in db.', async function () {
        await depopulateDatabase();

        const res = await exec();

        expect(res.status).toBe(404);
    });

    it('should return a 200 if leaderboard was generated in db.', async function () {
        const res = await exec();

        expect(res.status).toBe(200);
    });

    it('should return correct data in  the leaderboard.', async function () {
        const res = await exec();

        expect(res.body[0]).toHaveProperty('title', "SECOND Test Title");
        expect(res.body[0]).toHaveProperty('completed', 2);
        expect(res.body[0]).toHaveProperty('failed', 2);
        expect(res.body[0]).toHaveProperty('firstCompletedAt');
        expect(res.body[0]).toHaveProperty('firstCompletedBy', "test2");

        expect(res.body[2]).toHaveProperty('title', "LAST Test Title");
        expect(res.body[2]).toHaveProperty('completed', 0);
        expect(res.body[2]).toHaveProperty('failed', 0);
        expect(res.body[2]).toHaveProperty('firstCompletedAt', undefined);
        expect(res.body[2]).toHaveProperty('firstCompletedBy', undefined);
    });



});
