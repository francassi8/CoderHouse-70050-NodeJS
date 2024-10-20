import express from 'express';
import {__dirname} from '../utils.js'
import dotenv from 'dotenv';
import router from '../routes/index.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from '../passport/jwt.passport.js';
import mongoose from 'mongoose';

import handlebars from 'express-handlebars'
dotenv.config();

const connectionDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_STRING ,{ dbName: process.env.USE_DB });
        console.log('BBDD conectada')
    } catch (e) {
        console.log('Error al conectarse a la bbdd');
    }
}

export const AppInit = (app) => {
    connectionDB();
    initializePassport();
    passport.initialize();
    app.use(cookieParser(process.env.SECRET));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(__dirname + '/public')); 
    
    app.use('/', router);
    app.engine('handlebars', handlebars.engine());
    app.set('views', __dirname + '/views');
    app.set('view engine', 'handlebars');
}
