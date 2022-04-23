import { User } from "./user";

export default class PublicUser {
    name: string;
    email: string;
    year: number;
    isAdmin: boolean;
    currentPuzzleId: string;

    fromUser(user: User) {
        this.name = user.name;
        this.email = user.email;
        this.year = user.year;
        this.isAdmin = user.isAdmin;
        this.currentPuzzleId = user.currentPuzzleId;
    }
}
