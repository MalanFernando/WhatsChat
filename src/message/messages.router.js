const Messages = require('../models/message.models')
const uuid = require('uuid');

const getAllMessages = async () => {
    const data = await Messages.findAll()
    return data
}

const getMessagesById = async (id) => {
    const data = await Messages.findOne({
        where: {
            id
        }
    })
    return data
}

const createMessages = async (data) => {
    const newMessages = await Messages.create({
        id: uuid.v4(),
        senderId: data.senderId,
        conversationId: data.conversationId,
        message: data.message,
    })
    return newMessages
}

module.exports = {
    getAllMessages,
    getMessagesById,
    createMessages
}