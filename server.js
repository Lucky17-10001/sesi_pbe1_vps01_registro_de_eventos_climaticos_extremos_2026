const express = require("express")
const cors = require("cors")
const eventos = require("./dados.json")

function autoIncrement() {
    return Number(eventos[eventos.length - 1].id) + 1
}

const mostrarEventos = (req, res) => {
    res.send(eventos)
}

const cadastrarEvento = (req, res) => {
    if (req.body) {
        res.send("Evento cadastrado com sucesso")
        eventos.push(req.body)
    } else {
        res.status(400).send("Erro ao cadastrar evento")
    }
}

const rotaInicial = (req, res) => {
    res.json("Back-end respondendo")
}

const readEvento = (req, res) => {
    avaliaEventos()
    res.json(eventos)
}

const buscaEvento = (req, res) => {
    avaliaEventos()
    const evento = eventos.find(e => e.id == Number(req.params.id))
    if (evento) res.json(evento)
    else res.status(404).json("Id não encontrado")
}

const updateEvento = (req, res) => {
    const id = req.params.id
    const dados = req.body
    dados.id = Number(id)
    let status = 0

    eventos.forEach((evento, indice) => {
        if (evento.id == id) {
            eventos[indice] = dados
            status = 1
        }
    })

    if (status == 1) {
        res.status(202).json(dados)
    } else {
        res.status(404).send("Evento não encontrado")
    }
}

const deleteEvento = (req, res) => {
    const id = req.params.id
    let status = 0

    eventos.forEach((evento, indice) => {
        if (evento.id == id) {
            eventos.splice(indice, 1)
            status = 1
        }
    })

    if (status == 1) {
        res.json("Evento excluido com sucesso")
    } else {
        res.status(404).send("Evento não encontrado")
    }
}

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const porta = 3000

app.get('/', rotaInicial)
app.post('/eventos', cadastrarEvento)
app.get('/eventos', readEvento)
app.get('/eventos/:id', buscaEvento)
app.put('/eventos/:id', updateEvento)
app.delete('/eventos/:id', deleteEvento)

app.listen(porta, () => {
    console.log(`Servidor respondendo em: http://localhost:${porta}`)
})