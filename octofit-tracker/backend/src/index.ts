import express from 'express'
import mongoose from 'mongoose'

const app = express()
const PORT = process.env.PORT ?? '8000'
const MONGO_URL = process.env.MONGO_URL ?? 'mongodb://127.0.0.1:27017/octofit'

app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.get('/', (_req, res) => {
  res.send('OctoFit Tracker backend is running.')
})

mongoose.set('strictQuery', false)

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB:', MONGO_URL)
    app.listen(Number(PORT), '0.0.0.0', () => {
      console.log(`Backend listening on http://0.0.0.0:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  })
