const express = require('express')
const uuid = require('uuid')
const port = 4000
const app = express()
app.use(express.json())

const users = []

const checkUserId = (request, response, next) => {
    const {id} = request.params
    const index = users.findIndex(user => user.id === id)
    if(index < 0){
        return response.status(404).json({message: "User not found"})
    }
    request.userIndex = index
    request.userId = id

    next()
}

app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {
    const {name, age} = request.body
    const user = {id: uuid.v4(), name, age}
    users.push(user)
    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex
    const id = request.userId
    const {name, age} = request.body
    const updatedUser = {id, name, age}
    
    users[index] = updatedUser
    return response.json(updatedUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex
    users.splice(index , 1)
    return response.status(204).json(users)
})










app.listen(port, () =>{
    console.log(`🌍 Server started on port ${port} 🌍`)
})


































/*
        - Query params => meu site.com/users?name=rodolfo&age=28   // Filtros
        - Route params => /users/2      //BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
        - Request Body => { "name": "Rodolfo", "age":}

        find busca as infomações no array
        findIndex busca e mostra a posição que o usuario está no array
*/

