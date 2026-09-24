const express = require("express")
const cors = require("cors")

//Funções e códigos auxiliares, tipo: autoIncrement, totais, cálculos...

//Controllers CRUD [create, read, update, delete]
const rotaInicial = (req, res) => {
    res.json("Back-end respondendo")
}

//Configurações do servidor
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const porta = 3000

//Rotas REST [post, get, put, patch, delete]
app.get('/', rotaInicial)

//Porta de entrada do servidor e saída do console
app.listen(porta, () => {
    console.log(`Servidor respondendo em: http://localhost:${porta}`)
})