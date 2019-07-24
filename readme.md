# Initialize Router

var app = require("express-group-router");

# To Specify the API Version, this will add prefix to the routes if specified
app.version = "v3";


# To Group Routes with a prefix

app.group("/users", function(){

    app.post("/create", userController.create);
    app.post("/login", userController.login);
    app.get("/get", userController.get);

});

# To Add a middileware to a group, supprts Array of Middlewares / Signle

app.group("/users", function(){

    app.post("/create", userController.create);
    app.get("/get", userController.get);

}, Middlewares.Auth);

# Middlewares can be added to specific routes as well
app.post("/updateTasks", taskController.update, Middlewares.Auth);




## Installation

`npm install express-group-router`

## Important

Don't forget to return app.router from your route file.

module.exports = app.router;

## Contributors

 - Eshant Sahu

## MIT Licenced

## Update in version 2.0.1

Support for nested grouping