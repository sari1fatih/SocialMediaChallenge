import path from 'path'
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import bodyParser from 'body-parser' 
import userRoutes from './routes/userRoutes.js'
import followRoutes from './routes/followRouter.js'
import postRouter from './routes/postRouter.js'
import likeRouter from './routes/likeRouter.js'
import { NODE_ENV_DEVELOPMENT, NODE_ENV_PRODUCTION } from './consts/generals.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

var app = express();

app.set('etag', false);

if (process.env.NODE_ENV == NODE_ENV_DEVELOPMENT) {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use('/user', userRoutes); 
app.use('/follow', followRoutes); 
app.use('/post', postRouter); 
app.use('/like', likeRouter); 

const __dirname = path.resolve()
if (process.env.NODE_ENV == NODE_ENV_PRODUCTION) {

} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

app.use(notFound)
app.use(errorHandler)
/*
app.listen(
    process.env.PORT || 5000,
    console.log('Server Starting...')
)*/

export default app