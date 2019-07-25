/**
 * router.js : Plugin for Grouping Routes
 * Name : Eshant Sahu
 * Date : 26 Jan 2018
 */

var express = require("express");
var router = express.Router();
var methods = {};
var multer = require('multer');
methods.group = function (prefix, fn, middleware) {
    if(!this.parent)
        this.parent= [];
    if(!this.middleware)
        this.middleware = [];
    this.middleware.push(middleware);
    this.parent.push(prefix);
    fn();
    this.parent.pop();
    this.middleware.pop();
}

methods.getMidArray = function(middlewares, current ){

    let midArr = [];
    middlewares.forEach(element => {
        
        if(!element || typeof element == "undefined")
            return;
        if(typeof element == "function")
            midArr.push(element)
        if(Array.isArray(element))
            midArr = midArr.concat(element);
    });
    if(typeof current == "function")
        midArr.push(current);
    else if(Array.isArray(current))
        midArr = midArr.concat(current);
    
    return midArr;

}
methods.get = function (path, callback, middleware) {

    
    let urlPath = this.parent.join("") + path;
    if(this.version)
        urlPath = "/"+this.version + urlPath
    let midArr = methods.getMidArray(this.middleware, middleware);
    router.get(urlPath,midArr, callback);
    
}

methods.post = function (path, callback, middleware) {

    let midArr = methods.getMidArray(this.middleware, middleware);
    let urlPath = this.parent.join("") + path;
    if(this.version)
        urlPath = "/"+this.version + urlPath
    router.post(urlPath,midArr, callback);
}

methods.formpost = function (path, callback) {
    router.post(this.parent.join("") + path, multer().any(), callback);
}

methods.put = function (path, callback, middleware) {
    
    let urlPath = this.parent.join("") + path;
    let midArr = methods.getMidArray(this.middleware, middleware);
    if(this.version)
        urlPath = "/"+this.version + urlPath
    router.put(urlPath, midArr, callback);
}

methods.delete = function (path, callback, middleware) {

    let midArr = methods.getMidArray(this.middleware, middleware);
    let urlPath = this.parent.join("") + path;

    if(this.version)
        urlPath = "/"+this.version + urlPath
    router.delete(urlPath,midArr, callback);
}

methods.postXml = function (path,xmlParser, callback) {
    router.post(this.parent.join("") + path,xmlParser, callback);
}

methods.router = router;
module.exports = methods;

