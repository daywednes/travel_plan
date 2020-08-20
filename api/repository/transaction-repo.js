const mongoose = require('mongoose');

/**
 * Product model schema.
 */
const transactionSchema = new mongoose.Schema({
  publicKey: { type: String, required: true },
  userID: { type: String, required: true },
  email: { type: String, required: false },
  country: { type: String, required: false },
  status: { type: String, required: true }, // open | finish
  faceImages: { type: Array, required: true },
  frontIDImages: { type: Array, required: true },
  backIDImages: { type: Array, required: true },
  createdDate: { type: Date, required: true },
  expiredTime: { type: Date, required: true },
  videos: { type: Array, required: true },
});
const collection = mongoose.model('transaction', transactionSchema)

function createTransaction(transaction) {
    transaction.status = "open"
    transaction.createdDate = new Date()
    return collection.create(transaction)
}

function getTransaction(id) {
    return collection.find({_id: id})
}

module.exports = {
    collection,
    createTransaction,
    getTransaction
}