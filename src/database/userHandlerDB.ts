import { dbUser } from "./models/db_users"
import { User } from "../models/user"
import { UserPuzzle } from "../models/userPuzzle";
import { dbpuzzleStorage } from "./models/db_puzzleStorage";
import { not } from "joi";
import { dbPuzzle } from "./models/db_puzzles";


/** Class for handling all db interactions */
export class UserHandlerDB {
    // Upon creating the class, the boot method connects to the db.

    userDeconstruct(user: User) {
        return new dbUser({ name: user.name, email: user.email, password: user.password, year: user.year, currentPuzzleId: user.currentPuzzleId, userPuzzles: user.userPuzzles, isAdmin: user.isAdmin })
    }

    userReconstruct(dbuser) {
        const uObject = new User(
            dbuser.name,
            dbuser.email,
            dbuser.password,
            dbuser.year
        )
        Object.keys(dbuser.userPuzzles).forEach(key => {
            const userPuzzle = new UserPuzzle(
                dbuser.userPuzzles[key]._id,
                dbuser.userPuzzles[key]._userInput,
                dbuser.userPuzzles[key]._answer,
            );
            userPuzzle.numberOfWrongSubmissions = dbuser.userPuzzles[key]._numberOfWrongSubmissions;
            userPuzzle.completionTime = dbuser.userPuzzles[key]._completionTime
            userPuzzle.completed = dbuser.userPuzzles[key]._completed
            uObject.addPuzzle(userPuzzle);
        });
        uObject.currentPuzzleId = dbuser.currentPuzzleId;
        uObject.isAdmin = dbuser.isAdmin

        return uObject
    }


    async saveUserObject(user: User): Promise<User | { error: string; }> {
        // saves a user to the database.
        const newUser = this.userDeconstruct(user)
        await newUser.save();
        return this.userReconstruct(newUser)
    }

    async getActiveList(): Promise<string[] | { error: string; }> {
        const puzzleIds = []
        for (let i of await dbpuzzleStorage.find()[0].storage) {
            if (i.visibility == true) { puzzleIds.push(i.puzzleid) }
        }
        if (puzzleIds.length == 0) return { error: "Active list empty" }
        return puzzleIds
    }

    async getFullList(): Promise<any[] | { error: string; }> {
        const puzzleIds = []
        for (let i of await dbpuzzleStorage.find()[0].storage) {
            puzzleIds.push(i)
        }
        if (puzzleIds.length == 0) return { error: "Order list empty" }
        return puzzleIds
    }

    async getUserObject(email): Promise<User | { error: string; }> {
        // fetches a single user from the database and sends an object back.
        const user = await dbUser.findOne({ email: email })
        if (!user) return { error: "User not found." }
        const activeList = await this.getActiveList()
        if (!Array.isArray(activeList)) return { error: "Active list empty" }
        if (activeList.includes(user.currentPuzzleId)) {
            return this.userReconstruct(user)
        }
        const fullList = await this.getFullList()
        if (!Array.isArray(fullList)) return { error: "Order list empty" }
        for (let i of fullList.slice(fullList.indexOf(user.currentPuzzleId))) {
            if (i.visibility == true) {
                user.currentPuzzleId == i.puzzleid;
                break
            }
        }
        await this.updateUserObject(this.userReconstruct(user));
        return this.userReconstruct(user)
    }

    async getAllUserObject(): Promise<User[] | { error: string }> {
        // returns an array of all users in the database.
        const users = await dbUser.find();
        let userList = []
        if (users.length == 0) {
            return { error: "No users in database." }
        }
        else {
            for (let i of users) {
                userList.push(this.userReconstruct(i))
            } return userList
        }

    }

    async deleteUserObject(email): Promise<User | { error: string; }> {
        // deletes user from the database.
        const user = await dbUser.findOne({ email: email })
        if (user) {
            await dbUser.deleteOne({ email: email })
            return this.userReconstruct(user)
        } else {
            return { error: 'User not found.' }
        }
    }

    async updateUserObject(user): Promise<User | { error: string; }> {
        // updates a user in the database.
        const userInfo = this.userDeconstruct(user)
        const res = await dbUser.findOneAndUpdate(
            { email: userInfo.email },
            {
                name: userInfo.name,
                email: userInfo.email,
                password: userInfo.password,
                year: userInfo.year, currentPuzzleId:
                    userInfo.currentPuzzleId,
                userPuzzles: userInfo.userPuzzles,
                isAdmin: userInfo.isAdmin
            },
            { new: true });
        if (res) {
            return this.userReconstruct(res);
        } else {
            return { error: "User update failed, user not found." }
        }
    }
}
