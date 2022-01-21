const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

class Database {
    constructor(knex) {
        this.knex = knex;
    }

    async login(username, password) {
        let user = await this.knex
          .select("*")
          .from("users")
          .where({ username: username })
          .then((data) => data[0]);
    
        if (await bcrypt.compare(password, user.password)) {
          let payload = {
            id: user.id,
          };
    
          let token = jwt.sign(payload, config.jwtSecret);
          return token;
        }
      }

      async signup(username, password) {
        let hashedPassword = await bcrypt.hash(password, 10);
        password = hashedPassword;

        let userInfo = {
            username,
            password
          };

          let userId = await this.knex("users").insert(userInfo).returning("id");
          return userId;
      }

    userID (username) {
        return this.knex('users')
        .select('id')
        .where('username', username)
    }

    returnNotes (userID) {
        return this.knex('note')
        .select('id', 'note')
        .where('user', userID)
    }

    addNote (userID, note) {
        return this.knex('note')
        .returning('id')
		.insert({
			user: userID,
			note: note
		})
    }

    updateNote (userID, noteID, note) {
        return this.knex('note')
        .where('id', noteID)
        .andWhere('user', userID)
        .update({
            note: note
        })
    }

    deleteNote (noteID) {
        return this.knex('note')
        .where('id', noteID)
        .del()
    }

}

module.exports = Database;