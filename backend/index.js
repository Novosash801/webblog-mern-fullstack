import express from "express";
import multer from 'multer';
import mongoose from "mongoose";
import cors from 'cors';
import {db_user,db_pass} from './utils/index.js'

import { registerValidation, loginValidation, postCreateValidation } from "./validations.js";

import { handleVadlidationErrors, checkAuth } from './utils/index.js';

import { register, login, getMe,
         createOne, getAll, getLastTags, getOne, removeOne, updateOne } from './controllers/index.js';


const app = express();
const db = `mongodb+srv://${db_user}:${db_pass}@cluster0.y8ryn19.mongodb.net/blog?retryWrites=true&w=majority`;
mongoose
    .connect(db)
    .then((res) => console.log('Connected to DB'))
    .catch((error) => console.log('Connected Error', error));


const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });


app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation, handleVadlidationErrors, login);
app.post('/auth/register', registerValidation, handleVadlidationErrors, register);  
app.get('/auth/me', checkAuth, getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});


app.get('/tags', getLastTags);

app.get('/posts', getAll);
app.get('/posts/tags', getLastTags);
app.get('/posts/:id', getOne);
app.post('/posts', checkAuth, postCreateValidation, handleVadlidationErrors, createOne);
app.delete('/posts/:id', checkAuth, removeOne);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleVadlidationErrors, updateOne);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    } else {
        console.log('Server is running');
    }
});