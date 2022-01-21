class ApiRouter {
    constructor(express, service, auth) {
        this.Database = service;
        this.express = express;
        this.auth = auth;
    }

    router() {
        let router = this.express.Router();
        router.get(`/todo`, this.auth.authenticate(), this.get.bind(this));
        router.post(`/todo`, this.auth.authenticate(), this.post.bind(this));
        router.put(`/todo`, this.auth.authenticate(), this.put.bind(this));
        router.delete(`/todo`, this.auth.authenticate(), this.delete.bind(this));
        router.post(`/signup`, this.signup.bind(this));
        router.post(`/login`, this.login.bind(this));
        return router;
    }

    get(req, res) {
        this.Database.returnNotes(req.user.id)
            .then((notes) => {
                res.send(notes);
            })
            .catch(err => console.error(err));
    }

    post(req, res) {
        this.Database.addNote(req.user.id, req.body.note)
            .then((id) => {
                res.send(id)
            })
            .catch(err => console.error(err));
    }

    put(req, res) {
        this.Database.updateNote(req.body.id, req.body.note)
            .then(() => {
                res.sendStatus(200);
            })
            .catch(err => console.error(err));
    }

    delete(req, res) {
        this.Database.deleteNote(req.body.id)
            .then(() => {
                res.sendStatus(200);
            })
            .catch(err => console.error(err));
    }

    async signup(req, res) {
        if (req.body.username && req.body.password) {
            var username = req.body.username;
            var password = req.body.password;

            try {
                let [userId] = await this.Database.signup(username, password)
                res.send(userId);
            } catch (err) {
                res.sendStatus(409);
            }

        } else {
            res.sendStatus(400);
        }
    }

    login(req, res) {
        return this.Database
            .login(req.body.username, req.body.password)
            .then((token) => (token ? res.json(token) : res.sendStatus(401)));
    }
}

module.exports = ApiRouter;