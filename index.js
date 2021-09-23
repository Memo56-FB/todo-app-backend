const http = require('http')
const express = require('express')
require('./mongo')

const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')

const app = express()
const cors = require('cors')

const notFound = require('./middleware/404').notFound
const requestLogger = require('./middleware/requestLogger').requestLogger
const errorHandler = require('./middleware/errorHandler')

const { userRouter } = require('./controllers/users')
const { todoRouter } = require('./controllers/todos')

http.createServer(app)
app.use(cors())
app.use(express.json()) // De esta forma se puede leer el body del post
app.use(requestLogger)

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())

Sentry.init({
  dsn: 'https://10d3dba6349642a7be692adf6b84801a@o1004045.ingest.sentry.io/5965013',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app })
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

app.use('/api/todo', todoRouter)
app.use('/api/users', userRouter)

app.use(Sentry.Handlers.errorHandler())
app.use(errorHandler)
app.use(notFound)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT)
console.log(`Server running on http://localhost:${PORT} `)
module.exports = { app, server }
