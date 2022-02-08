import { resolve } from 'path'
import express from 'express'
import cors from 'cors'
import { config } from 'dotenv'
import { connect, serveHelper } from './helpers'
import { errorMiddleware } from './middleware'
import apiRouter from './routes'
import { LOCAL_PORT } from './shared/constants'

config()
const port: string | number = process.env.PORT || LOCAL_PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', apiRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(resolve('client', 'build')))
  app.get('*', serveHelper)
}

app.use(errorMiddleware)

const bootstrap = async () => {
  try {
    await connect(() =>
      app.listen(port, () => console.log(`Server started on port ${port}`))
    )
  } catch (e) {
    console.log(`Server error: ${e.message}`)
    process.exit(1)
  }
}

bootstrap().then()
