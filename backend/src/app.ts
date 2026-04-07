import express from 'express'
import tasksRouter from './routes/task'
import {errorHandler} from './middlewares/errorHandler'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/api', tasksRouter)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})