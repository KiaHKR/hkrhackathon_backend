# hkrhackathon_backend

cake


## APIs
| **End Point**  | **HTTP Type** | **req.params** | **req.body**                              | **authGuard** | **return**                                      |
|----------------|---------------|----------------|-------------------------------------------|---------------|-------------------------------------------------|
| /login         | POST          |                | email, password                           |               | token                                           |
| /login/reset   | POST          |                | email                                     |               | error/status200                                 |
| /user          | GET           |                |                                           | token         | publicUser                                      |
| /user          | POST          |                | name, email, password, year               |               | error/publicUser & token                        |
| /user          | DELETE        |                |                                           | token         | error/publicUser                                |
| /user          | PUT           |                | name, year                                | token         | error/publicUser                                |
| /user          | GET           | /:puzzleId     |                                           | token         | error/{userInput: string}                       |
| /user/password | POST          |                | oldPassword, newPassword                  | token         | error/publicUser                                |
| /user/reset    | PUT           |                | password                                  | resetToken    | error/publicUser                                |
| /admin         | DELETE        | /:email        |                                           | adminToken    | error/publicUser                                |
| /admin         | PUT           | /:email        | name, year, isAdmin                       | adminToken    | error/publicUser                                |
| /admin         | GET           | /:email        |                                           | adminToken    | error/publicUser                                |
| /admin         | GET           |                |                                           | adminToken    | error/publicUser[]                              |
| /admin/puzzles | GET           |                |                                           | adminToken    | error/{puzzleid: string, visibility: boolean}[] |
| /admin/puzzles | POST          |                | {puzzleid: string, visibility: boolean}[] | adminToken    | error/{puzzleid: string, visibility: boolean}[] |
| /admin/update  | PUT           | /:email        | puzzles[], newPuzzleId                    | adminToken    | error/publicUser                                |
| /puzzles       | GET           |                |                                           | token         | puzzleObjects[]                                 |
| /puzzles       | POST          | /:puzzleId     | guess                                     | token         | error/{answer: boolean, information: string}    |


## CLI COMMANDS
|                     |                                          |
|---------------------|------------------------------------------|
| **npm test**        | Runs all the tests.                      |
| **npm run backend** | Runs the backend server in nodemon mode. |
| **npm start**       | Runs the backend server.                 |
