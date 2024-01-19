import express from 'express'
import { engine } from 'express-handlebars'
import { PORT } from './config/config.js'
import { apiRouter } from './routers/api/apiRouter.js'
import { webRouter } from './routers/web/webRouter.js'
import { connectDb } from './db/mongodb.js'
import { passportInitialize } from './middlewares/authentication.js'
import { cookies } from './middlewares/cookies.js'


await connectDb()

export const app = express()

app.engine('handlebars', engine())

app.listen(PORT, () => {
  console.log(`servidor escuchando peticiones en puerto: ${PORT}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookies)
app.use(passportInitialize)

app.use('/static', express.static('./static'))

app.use('/api', apiRouter)
app.use('/', webRouter)

