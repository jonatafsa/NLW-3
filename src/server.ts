import express from 'express'
import 'express-async-errors'
import path from 'path'
import routes from './routes'
import './database/connection'
import errorHandler from './errors/handler'
import cors from 'cors'


//Req e Res - Porta 3333
const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler)

//Rota = Conjunto
//Recurso = usuário

//Métodos Http -> GET, POST, PUT, DELETE

//Parâmetros - QUERY / ROUTE/ BODY

// app.post('/users/:id', (request, response) => {
//     console.log(request.query)
//     console.log(request.params)
//     console.log(request.body)

//     return response.send({"message": "Hello Word!!"})
// })


app.listen(3333)