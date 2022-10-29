const Conversations = require('../models/conversations.models');
const uuid = require('uuid');

const getAllConversations = async () => {
    const data = await Conversations.findAll()
    return data
}

const getConversationsById = async (id) => {
    const data = await Conversations.findOne({ 
        where: {
            id
        }
    })
    return data
}

const createConversation = async (data) => {
    
    const newConversation = await Conversations.create({ 
        id: uuid.v4(),
        title: data.title,
        imagenUrl: data.imagenUrl,
        userId: data.userId,
    })
    return newConversation
}

const updateConversation = async (id, data) => {
    const result = await Conversations.update(data,{
        where: {
            id
        }
    })
    return result
}

const deleteConversation = async (id) => {
    const data = await Conversations.destroy({
        where: {
            id
        }
    })
    return data
}

module.exports = {
    getAllConversations,
    getConversationsById,
    createConversation,
    updateConversation,
    deleteConversation
}