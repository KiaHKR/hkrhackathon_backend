# hkrhackathon_backend

cake


## APIs

| End Point | HTTP Type | req.params | req.body                    | authGuard  | return             |
|-----------|-----------|------------|-----------------------------|------------|--------------------|
| /login    | POST      |            | email, password             |            | token              |
| /user     | GET       |            |                             | token      | user               |
| /user     | POST      |            | name, email, password, year |            | error/userObject   |
| /user     | DELETE    |            |                             | token      | error/userObject   |
| /user     | PUT       |            | name, year                  | token      | error/userObject   |
| /admin    | DELETE    | /:email    |                             | adminToken | error/userObject   |
| /admin    | PUT       | /:email    | name, year, isAdmin         | adminToken | error/userObject   |
| /admin    | GET       | /:email    |                             | adminToken | error/userObject   |
| /admin    | GET       |            |                             | adminToken | error/userObject[] |
