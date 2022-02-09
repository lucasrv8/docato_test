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
        // console.log(resultado);
    } catch (error) {
        console.log('Error when creating/updating database');
        console.log(error);
    }




    // Import routes
    app.use('/', require('./route/authRoute'))
    app.use('/', require('./route/userRoute'))



    const server = http.createServer(app)
    const port = 3000
    server.listen(port)
    console.log("Server running port " + port);
})();