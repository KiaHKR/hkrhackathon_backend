import {config} from "dotenv";
import jwt from "jsonwebtoken";
import {User} from "../../../src/models/user";
config();


describe('generateAuthToken', () => {
    it('should return a valid JWT', function () {
        const user = new User("name", "test@tester.com", "password", 1);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        expect(decoded).toMatchObject({ email: "test@tester.com" });
    });
});
