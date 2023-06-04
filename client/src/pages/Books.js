import React, {useEffect, useState} from 'react';
import {createBook, updateBook, deleteBook, fetchBooks} from "../http/libraryAPI";
import {Button, Image, Table} from "react-bootstrap";
import BookModal from "../components/modals/BookModal";
import "../style/style.css"

const Books = () => {
    const [books, setBooks] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({name: '', author: '', year: ''})
    const [isEditMode, setIsEditMode] = useState(false)
    const [file, setFile] = useState(null)

    useEffect(() => {
        fetchBooks().then(data => setBooks(data))
    }, [])

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (isEditMode) {
            const updatedBook = await updateBook(formData._id, formData)
            setBooks(prevBooks => {
                const bookIndex = prevBooks.findIndex((book) => book._id === formData._id)
                if (bookIndex < 0)
                    return prevBooks
                const updatedBooks = [...prevBooks]
                updatedBooks[bookIndex] = updatedBook
                return updatedBooks
            })
        } else {
            const formDataTemp = new FormData()
            formDataTemp.append('name', formData.name)
            formDataTemp.append('author', formData.author)
            formDataTemp.append('year', formData.year)
            formDataTemp.append('img', file)
            const newBook = await createBook(formData)
            setBooks(prevBooks => [...prevBooks, newBook]);
        }

        setFormData({name: '', author: '', year: ''})
        setIsEditMode(false)
        setShowModal(false)
    }

    const handleAddClick = () => {
        setIsEditMode(false);
        setFormData({name: '', author: '', year: ''});
        setShowModal(true);
    };

    const handleUpdateClick = (book) => {
        setIsEditMode(true)
        setFormData(book)
        setShowModal(true)
    }

    const handleDelete = async (id) => {
        await deleteBook(id);
        setBooks(books.filter((book) => book._id !== id))
    }

    const onFileChange = e => {
        console.log(typeof(e.target.files[0]))
        setFile(e.target.files[0])
    }

    return (
        <div className="text-center">
            <BookModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onSubmit={handleSubmit}
                onChange={handleInputChange}
                formData={formData}
                isEditMode={isEditMode}
                onFileChange={onFileChange}
            />
            <Table>
                <thead>
                <tr>
                    <th>Назва</th>
                    <th>Автор</th>
                    <th>Рік</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {books.map((book, i) => (
                    <tr key={book._id}>
                        <td>{book.name}</td>
                        <td>{book.author}</td>
                        <td>{book.year}</td>
                        <td>{book.image && <Image width={150} height={150} src={process.env.REACT_APP_API_URL + book.image}/>}</td>
                        <td>
                            <Button variant="primary" onClick={() => handleUpdateClick(book)}>Змінити</Button>{' '}
                            <Button variant="danger" onClick={() => handleDelete(book._id)}>Видалити</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Button variant="primary" className="mt-3" onClick={handleAddClick}>Додати книгу</Button>
        </div>
    );
};

export default Books;