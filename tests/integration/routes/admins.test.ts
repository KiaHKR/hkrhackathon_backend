import request from 'supertest'
import { dbUser } from "../../../src/database/models/db_users";
import { User } from "../../../src/models/user";
import { populateDatabase } from "../databasePopulater";
import { depopulateDatabase } from "../databaseDepopulater";
import { dbpuzzleStorage } from "../../../src/database/models/db_puzzleStorage";
import app from '../../../src/index';

let server;

describe('/admin', () => {

    describe('DELETE /:email', () => {
        let email;
        let token;

        beforeEach(async () => {
            server = app;
            await populateDatabase();
            email = "test@example.com";
            const user = new User("test", "admin@email.com", "12345678", 1);
            user.isAdmin = true;
            token = user.generateAuthToken();
        });

        afterEach(async () => {
            server.close();
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

    describe('PUT /:email', () => {
        let email;
        let token;
        let name;
        let year;
        let isAdmin;

        beforeEach(async () => {
            server = app;
            await populateDatabase();
            email = "test@example.com";
            const user = new User("test", "admin@email.com", "12345678", 1);
            user.isAdmin = true;
            token = user.generateAuthToken();
            name = "updatedName";
            year = 3;
            isAdmin = true;
        });

        afterEach(async () => {
            server.close();
            await depopulateDatabase();
        })

        const exec = async () => {
            return await request(server)
                .put('/admin/' + email)
                .set('x-auth-header', token)
                .send({
                    name,
                    year,
                    isAdmin
                })
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

        it('should return 400 with invalid name input', async function () {
            name = 'a';
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.error).toMatch('name');
        });

        it('should return 400 with invalid year input', async function () {
            year = 'a';
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.error).toMatch('year');
        });

        it('should return 400 with invalid year input', async function () {
            year = 5;
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.error).toMatch('year');
        });

        it('should return 400 with invalid isAdmin input', async function () {
            isAdmin = 5;
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.error).toMatch('isAdmin');
        });

        it('should return 404 if no user found.', async function () {
            email = 'bonkers'
            const res = await exec();

            expect(res.status).toBe(404);
            expect(res.body.error).toMatch('not found')
        });

        it('should update the user if valid inputs', async function () {
            await exec();

            const updatedUser = await dbUser.findOne({ email });

            expect(updatedUser.isAdmin).toBeTruthy()
            expect(updatedUser.name).toMatch('updatedName')
            expect(updatedUser.year).toBe(3)
        });

        it('should return updatedUser with valid input', async function () {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).not.toHaveProperty('password');
            expect(res.body).toHaveProperty('currentPuzzleId');
        });
    });

    describe('GET /:email', function () {
        let email;
        let token;

        beforeEach(async () => {
            server = app;
            await populateDatabase();
            email = "test@example.com";
            const user = new User("test", "admin@email.com", "12345678", 1);
            user.isAdmin = true;
            token = user.generateAuthToken();
        });

        afterEach(async () => {
            server.close();
            await depopulateDatabase();
        })

        const exec = async () => {
            return await request(server)
                .get('/admin/' + email)
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

        it('should return the user with valid inputs', async function () {
            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', 'test');
            expect(res.body).toHaveProperty('year', 1);
            expect(res.body).toHaveProperty('email', 'test@example.com');
        });
    })

    describe('GET /', () => {
        let token;

        beforeEach(async () => {
            server = app;
            await populateDatabase();
            const user = new User("test", "admin@email.com", "12345678", 1);
            user.isAdmin = true;
            token = user.generateAuthToken();
        });

        afterEach(async () => {
            server.close();
            await depopulateDatabase();
        })

        const exec = async () => {
            return await request(server)
                .get('/admin/')
                .set('x-auth-header', token)
                .send()
        };

        it('should return a 401 if no token is provided.', async function () {
            const res = await request(server)
                .get('/admin')
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

        it('should return 404 if no users in the db', async function () {
            await dbUser.deleteMany();

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should return an array of USERS with valid input', async function () {
            const res = await exec();

            expect(res.body.length).toBe(3);
            expect(res.status).toBe(200);
        });
    });

    describe('GET /get/puzzles', () => {
        let token;

        beforeEach(async () => {
            server = app;
            await populateDatabase();
            const user = new User("test", "test@example.com", "12345678", 1);
            user.isAdmin = true;
            token = user.generateAuthToken();
        });

        afterEach(async () => {
            server.close();
            await depopulateDatabase();
        })

        const exec = async () => {
            return await request(server)
                .get('/admin/get/puzzles')
                .set('x-auth-header', token)
                .send()
        };

        it('should return 404 if no orderArray found', async function () {
            await dbpuzzleStorage.deleteMany();

            const res = await exec();

            expect(res.status).toBe(404);
            expect(res.body.error).toMatch('found');
        });

        it('should return 200 and an array in order', async function () {
            const res = await exec();

            const orderArray = [
                { puzzleid: "secondTestPuzzle", visibility: true },
                { puzzleid: "firstTestPuzzle", visibility: true },
                { puzzleid: "thirdTestPuzzle", visibility: false },
                { puzzleid: "lastTestPuzzle", visibility: true },
            ]

            expect(res.status).toBe(200);
            expect(res.body).toEqual(orderArray);
        });
    })

    describe('POST /save/puzzles', () => {
        let token;
        let orderArray;

        beforeEach(async () => {
            server = app;
            await populateDatabase();
            const user = new User("test", "test@example.com", "12345678", 1);
            user.isAdmin = true;
            token = user.generateAuthToken();
            orderArray = [
                { puzzleid: "firstTestPuzzle", visibility: true },
                { puzzleid: "secondTestPuzzle", visibility: true },
                { puzzleid: "thirdTestPuzzle", visibility: false },
                { puzzleid: "lastTestPuzzle", visibility: true },
            ]
        });

        afterEach(async () => {
            server.close();
            await depopulateDatabase();
        })

        const exec = async () => {
            return await request(server)
                .post('/admin/save/puzzles')
                .set('x-auth-header', token)
                .send({
                    orderArray
                })
        };

        it('should return 400 if no array is passed', async function () {
            orderArray = '';
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.error).toMatch('be an array');
        });

        it('should return 400 if an empty array is passed', async function () {
            orderArray = [];
            const res = await exec();

            expect(res.status).toBe(400);
            expect(res.body.error).toMatch('at least 1');
        });

        it('should return 200 with valid input', async function () {
            orderArray = [
                { puzzleid: "lastTestPuzzle", visibility: true },
                { puzzleid: "firstTestPuzzle", visibility: true },
            ]

            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toEqual(orderArray);
        });

        it('should return 400 if none of the items are marked visible', async function () {
            orderArray = [
                { puzzleid: "firstTestPuzzle", visibility: false },
                { puzzleid: "secondTestPuzzle", visibility: false },
                { puzzleid: "thirdTestPuzzle", visibility: false },
                { puzzleid: "lastTestPuzzle", visibility: false },
            ]
            const res = await exec();

            expect(res.body.error).toMatch('visible');
            expect(res.status).toBe(400);
        })
    });

    describe('PUT /update/:email', () => {
        let token;
        let puzzles;
        let newPuzzleId;
        let email;

        beforeEach(async () => {
            server = app;
            await populateDatabase();
            const user = new User("test", "test@example.com", "12345678", 1);
            user.isAdmin = true;
            token = user.generateAuthToken();
            puzzles = ["firstTestPuzzle", "secondTestPuzzle"];
            newPuzzleId = "secondTestPuzzle";
            email = "test2@example.com";
        });

        afterEach(async () => {
            server.close();
            await depopulateDatabase();
        })

        const exec = async () => {
            return await request(server)
                .put('/admin/update/' + email)
                .set('x-auth-header', token)
                .send({
                    puzzles,
                    newPuzzleId
                })
        };

        it('should return 400 if puzzles is not an array', async function () {
            puzzles = '';
            const res = await exec();

            expect(res.body.error).toMatch('an array');
            expect(res.status).toBe(400);
        });

        it('should return 400 if puzzles is empty', async function () {
            puzzles = [];
            const res = await exec();

            expect(res.body.error).toMatch('at least 1');
            expect(res.status).toBe(400);
        });

        it('should return 404 if email is not found', async function () {
            email = "wrong@example.com";
            const res = await exec();

            expect(res.body.error).toMatch('not found');
            expect(res.status).toBe(404);
        });

        it('should return 400 if last puzzle in the list does not match the new puzzle id', async function () {
            newPuzzleId = "lastTestPuzzle";
            const res = await exec();

            expect(res.body.error).toMatch('not match');
            expect(res.status).toBe(400);
        });

        it('should return a public user object with valid input', async function () {
            const res = await exec();

            expect(res.body).toHaveProperty('currentPuzzleId', "secondTestPuzzle");
            expect(res.status).toBe(200);
        });
    });
});
