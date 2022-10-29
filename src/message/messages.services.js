const messagesController = require('./messages.controllers')

const getAllMessages = (req, res) => {
    
}

const getMessagesById = (req, res) => {

}

const createMessages = (req, res) => {
    const messages = req.body.messages
    const userId = req.user.id

    console.log(messages)
    console.log(userId)
}

module.exports = {
    createMessages
}