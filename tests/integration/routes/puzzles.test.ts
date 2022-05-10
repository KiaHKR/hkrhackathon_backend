import request from 'supertest'
import { populateDatabase } from "../databasePopulater";
import { depopulateDatabase } from "../databaseDepopulater";
import {User} from "../../../src/models/user";
import {dbPuzzle} from "../../../src/database/models/db_puzzles";
import {dbUser} from "../../../src/database/models/db_users";
import {PuzzleHandlerDB} from "../../../src/database/puzzleHandlerDB";
import app from '../../../src/index';
import {Puzzle} from "../../../src/models/puzzle";

let server;

describe('/puzzle', () => {

    describe('GET', () => {

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
            expect(res.body.length).toBe(3);
        });
    });

    describe('POST /:puzzleId', () => {
        let guess;
        let puzzleId;
        let token;

        beforeEach(async () => {
            server = app;
            await populateDatabase();
            guess = "2"
            puzzleId = "secondTestPuzzle"
            token = new User("test", "test@example.com", "12345678", 1).generateAuthToken();
        });

        afterEach(async () => {
            server.close();
            await depopulateDatabase();
        });

        const exec = async () => {
            return await request(server)
                .post('/puzzles/' + puzzleId)
                .set('x-auth-header', token)
                .send({
                    guess
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

         it('should return 200 and and results without altering data when puzzle already completed', async function () {
             const user = await dbUser.findOne({ email: "test@example.com" })
             guess = "1"
             puzzleId = "firstTestPuzzle";
             const res = await exec();

             const number = user.userPuzzles[puzzleId]._completionTime;

             expect(res.status).toBe(200);
             expect(res.body.answer).toBeTruthy();
             expect(number).toBeNull();
         });

        it('should alter fields if guess is correct', async function () {
            await exec();
            const user = await dbUser.findOne({ email: "test@example.com" });
            const puzzle = await dbPuzzle.findOne({ id: puzzleId });

            expect(user.userPuzzles[puzzleId]._completed).toBeTruthy();
            expect(user.userPuzzles[puzzleId]._completionTime).not.toBeUndefined();

            expect(puzzle.timesCompleted).toBe(3);

        });

        it('should return 404 if no next puzzleID found while answering correctly', async function () {
            jest
                .spyOn(PuzzleHandlerDB.prototype, "getNextPuzzleId")
                .mockImplementation(() => {
                    return new Promise((resolve) => {
                        resolve({ error: "Error while browsing Puzzles." })
                    })
                })

            const res = await exec();

            expect(res.status).toBe(404)
        });

        it('should alter fields if guess is incorrect', async function () {
            guess = "erm";
            await exec();
            const user = await dbUser.findOne({ email: "test@example.com" });
            const puzzle: Puzzle = await dbPuzzle.findOne({ id: puzzleId });

            expect(user.userPuzzles[puzzleId]._completed).toBeFalsy();
            expect(user.userPuzzles[puzzleId]._completionTime).toBeDefined();
            expect(user.userPuzzles[puzzleId]._numberOfWrongSubmissions).toEqual(1);

            expect(puzzle.wrongSubmissions).toBe(3);
        });

    });
});
