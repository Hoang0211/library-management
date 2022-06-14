import express from 'express'
// import lusca from 'lusca' will be used later
import dotenv from 'dotenv'
import cors from 'cors'
import passport from 'passport'

import googleLoginRouter from './routers/google-login'
import bookRouter from './routers/book'
import authorRouter from './routers/author'
import userRouter from './routers/user'
import borrowRouter from './routers/borrow'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import loginWithGoogle from './passport/google'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)

// Global middleware
app.use(apiContentType)
app.use(express.json())
app.use(cors())

app.use(passport.initialize())
passport.use(loginWithGoogle())

// Set up routers
app.use('/google-login', googleLoginRouter)
app.use('/api/v1/books', bookRouter)
app.use('/api/v1/authors', authorRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/borrows', borrowRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
