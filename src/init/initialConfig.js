import express from 'express';
import dotenv from 'dotenv';
import router from '../routes/index.js';
import { connectionDB } from '../mongo/connection.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from '../passport/jwt.passport.js';

export const AppInit = (app) => {
    dotenv.config();
    connectionDB();
    initializePassport();
    passport.initialize();
    app.use(cookieParser(process.env.SECRET));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.use('/', router);
}
