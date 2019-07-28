# @forkjs/group-router

<blockquote> Group Router for <code>express.js</code> </blockquote>

### What is @forkjs/group-router

<code>@forkjs/group-router</code> gives you flexibility to writer your express.js routes in group format which is easy to write and maintain. It also provides you support for group level middlewares.

See the Quick start guide for more details.



### Initialize Router

var app = require("express-group-router");

### To Specify the API Version, this will add prefix to the routes if specified
app.version = "v3";


### To Group Routes with a prefix

app.group("/users", function(){

    app.post("/create", userController.create);
    app.post("/login", userController.login);
    app.get("/get", userController.get);

});

### To Add a middileware to a group, supprts Array of Middlewares / Signle

app.group("/users", function(){

    app.post("/create", userController.create);
    app.get("/get", userController.get);

}, Middlewares.Auth);

### Middlewares can be added to specific routes as well
app.post("/updateTasks", taskController.update, Middlewares.Auth);




### Installation

`npm install @forkjs/group-router`

### Important

Don't forget to return app.router from your route file.

module.exports = app.router;

### Contributors

 - Eshant Sahu

## Sample Application

Sample Application implented with <code>@forkjs/group-router</code> can be found at <a href="https://github.com/eshantsahu/forkjs-group-router-example">here</a>
