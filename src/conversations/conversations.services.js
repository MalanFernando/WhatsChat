const conversationsController = require('./conversations.controllers')

const getAllConversations = (req, res) => {
    conversationsController.getAllConversations()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(400).json({msg: err.message})
        })
}

const getConversationsById = (req, res) => {
    const id = req.params.id
        conversationsController.getConversationsById(id)
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                res.status(400).json({msg: err.message})
            })
}

//? Creación de una nueva conversación
const createConversation = (req, res) => {
    const userId = req.user.id
    const { message, title } = req.body
    // return console.log({message}, {title})
    if (message) {
        conversationsController.createConversation({ userId ,message, title })
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
                res.status(400).json({msg: err.message})
            })
    } else {
        //? Error cuando el message viene bacío
        res.status(400).json({msg: 'Favor de colocar un mensaje', field: {
            message: 'String'
        }})
    }
}

const patchConversation = (req, res) => {
    const id = req.params.id
    const { message } = req.body
        conversationsController.updateConversation(id, {message})
            .then(data => {
                if (data[0]){
                    res.status(200).json({msg: 'Conversación editada correctamente'})
                } else {
                    res.status(400).json({msg: 'ID Invalido'})
                }
            })
            .catch(err => {
                res.status(400).json({msg: err.message})
            })
}

const deleteConcesation = (req, res) => {
    const id = req.params.id
        conversationsController.deleteConversation(id)
            .then((data) => {
                if (data) {
                    res.status(204).json()
                } else {
                    res.status(400).json({msg: 'ID invalido'})
                }
                res.status(204).json()
            })
            .catch(err => { 
                res.status(400).json({msg: err.message})
            })
}

module.exports = {
    getAllConversations,
    getConversationsById,
    createConversation,
    patchConversation,
    deleteConcesation
}