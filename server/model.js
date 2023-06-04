const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {type: String, required: true},
    author: {type: String, required: true},
    year: {type: Number, required: true},
    image: {type: String}
});

const readerSchema = new mongoose.Schema({
    surname: {type: String, required: true},
    name: {type: String, required: true},
    patronymic: {type: String, required: true},
    address: {type: String, required: true},
    telephone: {type: String, required: true},
});

const issuanceSchema = new mongoose.Schema({
    issueDate: {type: Date, required: true},
    returnDate: {type: Date, required: false},
    returned: {type: Boolean, required: true},
    readerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Reader', required: true},
    bookId: {type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true},
});


const Book = mongoose.model('Book', bookSchema);
const Reader = mongoose.model('Reader', readerSchema);
const Issuance = mongoose.model('Issuance', issuanceSchema);

module.exports = {
    Book,
    Reader,
    Issuance
};
