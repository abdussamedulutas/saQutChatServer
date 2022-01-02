import {resolve} from "node:path";
import server from "./https.js"
import express from "express";
import compression from "compression";
import session from "express-session";
import mysqlsession from "express-mysql-session";;

let MySQLStore = mysqlsession(session);


let app = express();
app.use(express.static(resolve("Build/"),{index:"index.html",etag:true}));


var sessionStore = new MySQLStore({
	host: 'localhost',
	port: 3306,
	user: 'saqut',
	password: '123456Kc',
	database: 'saqutchat'
});

app.use(express.json());

sessionStore.createDatabaseTable();

app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));



import {route} from "./Controller/index.js";

server(app);
route(app);