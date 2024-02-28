import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'


dotenv.config()

const app = express()
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3000'],
  })
)

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/PharmaEase'

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch(() => {
    console.log('error mongodb')
  })


app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message })
  next()
})

const PORT = parseInt((process.env.PORT || '5000') , 10)
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
