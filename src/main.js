import express from "express";
import session from "express-session";
import passport from "passport";

import MongoStore from "connect-mongo";
import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";
import cluster from "cluster";
import os  from 'os';

import authWebRouter from "./routers/web/auth.js";
import homeWebRouter from "./routers/web/home.js";
import infoWebRouter from "./routers/web/info.js";
import { logRequests,logError,logNotFound } from "./routers/middleware/loggermw.js";
import productosApiRouter from "./routers/api/productos.js";
import mensajesApiRouter from "./routers/api/mensajes.js";

import addProductosHandlers from "./routers/ws/productos.js";
import addMensajesHandlers from "./routers/ws/mensajes.js";

import { conectarDB } from "./controllerdb.js";
import config from "./config.js";
import dotenv from "dotenv";
import randomApiRouter from "./routers/api/randoms.js";
//--------------------------------------------
// instancio servidor, socket y api

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

dotenv.config();

//--------------------------------------------
// configuro el socket

io.on("connection", async (socket) => {
  console.log("========== Cliente conectado ==========");
  await addProductosHandlers(socket, io.sockets);
  await addMensajesHandlers(socket, io.sockets);
});

//--------------------------------------------
// configuro el servidor

app.use(logRequests);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(
  session({
    store: MongoStore.create(config.mongoRemote),
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//--------------------------------------------
// rutas del servidor API REST
app.use("/", productosApiRouter);
app.use("/", mensajesApiRouter);
//--------------------------------------------
// rutas del servidor web
app.use("/", homeWebRouter);
app.use("/", authWebRouter);
app.use("/", infoWebRouter);
app.use("/api", randomApiRouter);
app.use(logError);
app.use(logNotFound);
//--------------------------------------------
// inicio el servidor

const tipoInicio = process.argv[2] || 'fork'
const PORT = parseInt(process.argv[3]) || process.env.PORT || 8080;

if(tipoInicio == 'cluster'){
  if (cluster.isPrimary) {
    const numCpu = os.cpus().length;
    console.log(numCpu);
    console.log(`PID MASTER ${process.pid}`);
  
    for(let i=0; i< numCpu; i++) {
        cluster.fork()
    }
  
    cluster.on('exit', worker => {
       console.log(`Worker ${worker.process.pid} died`);
       cluster.fork();
    });
  } else {
    iniciarServer();
  }
} else {
  iniciarServer();
}

function iniciarServer(){
  conectarDB(config.mongoRemote.mongoUrl, (err) => {
    if (err) return console.log("error bdd");
    console.log("Base de datos conectada");

    const connectedServer = httpServer.listen(PORT, () => {
      console.log(
        `Servidor http escuchando en el puerto ${
          connectedServer.address().port
        }`
      );
    });
    connectedServer.on("error", (error) =>
      console.log(`Error en servidor ${error}`)
    );
  });
}