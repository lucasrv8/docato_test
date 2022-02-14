(async () => {
    const http = require('http')
    const express = require('express')

    const app = express()

    const bodyParser = require('body-parser')
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    //Connect to database
    const database = require('./infra/database');
    const User = require('./model/User');

    try {
        const resultado = await database.sync();
        // Execute db: Create user admim
        await bootStrap()
    } catch (error) {
        console.log('Error when creating/updating database');
        console.log(error);
    }

    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });

    // Import routes
    app.use('/', require('./route/authRoute'))
    app.use('/', require('./route/userRoute'))
    app.use('/', require('./route/crawlerRoute'))
    
    app.use("/", (req, res, next) => {
        res.status("404").json({status_code: 404, message: "Not found" })
    })

    // Run server
    const server = http.createServer(app)
    const port = 3000
    server.listen(port)
    console.log("Server running port " + port);
})();


async function bootStrap() {
    // Import service
    const userService = require('./service/userService')
    try {
        let userCount = await userService.getAllUsers();
        if (userCount.users.length == 0) {
            let defaultUser = await userService.createUser({
                name: 'admin',
                email: 'admin@email.com',
                username: 'admin',
                password: 'admin',
                cpf: '11111111111'
            })

            if (defaultUser.status_code == 201) {
                console.log('User created successfully');
            } else {
                console.log('Error create user')
            }
        }

    } catch (error) {
        console.log('Error create user')
    }

}