import request from 'supertest'
import { populateDatabase } from "../databasePopulater";
import { depopulateDatabase } from "../databaseDepopulater";
import {User} from "../../../src/models/user";
import {dbPuzzle} from "../../../src/database/models/db_puzzles";
import {dbUser} from "../../../src/database/models/db_users";

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

    describe('GET', () => {

        const exec = async () => {
            const token = new User("test", "test@example.com", "12345678", 1).generateAuthToken();
            return await request(server)
                .get('/puzzles')
                .set('x-auth-header', token)
                .send()
        };

        it('should return a 401 if client is not logged in.', async function () {
            const res = await request(server)
                .get('/puzzles')
                .set('x-auth-header', '')
                .send()
            expect(res.status).toBe(401);
        });

        it('should return 404 if no puzzles in the db', async function () {
            await depopulateDatabase();
            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should return 200 with valid auth', async function () {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
        });
    });


    describe('POST /:puzzleId', () => {
        let answer;
        let puzzleId;
        let token;

        beforeEach(() => {
            answer = "1"
            puzzleId = "firstTestPuzzle"
            token = new User("test", "test@example.com", "12345678", 1).generateAuthToken();
        })

        const exec = async () => {
            return await request(server)
                .post('/puzzles/' + puzzleId)
                .set('x-auth-header', token)
                .send({
                    answer
                })
        };

        it('should return a 401 if no token is provided.', async function () {
            const res = await request(server)
                .get('/admin')
                .set('x-auth-header', '')
                .send()

            expect(res.status).toBe(401);
        });

        it('should return 400 if invalid token provided', async function () {
            token = 'a'
            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 404 if email is not found', async function () {
            token = new User("test", "wrong@example.com", "12345678", 1).generateAuthToken();
            const res = await exec();

            expect(res.status).toBe(404);
            expect(res.body.error).toMatch('not found');
        });

        it('should return 404 if puzzle is not found', async function () {
            puzzleId = "wrong"
            const res = await exec();

            expect(res.status).toBe(404);
            expect(res.body.error).toMatch('puzzle');
        });

        it('should return 404 if puzzle is not found', async function () {
            puzzleId = "wrong"
            const res = await exec();

            expect(res.status).toBe(404);
            expect(res.body.error).toMatch('puzzle');
        });

        // it('should return 200 and result object', async function () {
        //     const user = dbUser.findOne({ email: "test@example.com" })
        //     user.userPuzzles
        // });
    });

});
