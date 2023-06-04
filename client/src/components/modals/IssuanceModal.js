import React, {useEffect, useState} from 'react';
import {Modal, Form, FormGroup, Button} from 'react-bootstrap';
import {fetchBooks, fetchReaders} from "../../http/libraryAPI";

const IssuanceModal = ({show, onHide, onSubmit, onChange, isEditMode, formData}) => {
    const [books, setBooks] = useState([])
    const [readers, setReaders] = useState([])

    useEffect(() => {
        fetchBooks().then(data => setBooks(data))
        fetchReaders().then(data => setReaders(data))
    }, []);

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditMode ? 'Оновлення даних' : 'Видати книгу'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <FormGroup>
                        <Form.Label>Дата повернення</Form.Label>
                        <Form.Control
                            type="date"
                            name="returnDate"
                            value={formData.returnDate ? formData.returnDate : ''}
                            onChange={onChange}
                        />
                    </FormGroup>
                    {isEditMode &&
                        <FormGroup>
                            <Form.Label>Повернено</Form.Label>
                            <Form.Control
                                as="select"
                                name="returned"
                                value={formData.returned}
                                onChange={onChange}
                                required
                            >
                                <option value={true}>Так</option>
                                <option value={false}>Ні</option>
                            </Form.Control>
                        </FormGroup>
                    }
                    <FormGroup>
                        <Form.Label>Читач</Form.Label>
                        <Form.Control
                            as="select"
                            name="readerId"
                            value={formData.readerId}
                            onChange={onChange}
                            required
                        >
                            <option value="" hidden></option>
                            {readers.map(reader => (
                                <option key={reader._id} value={reader._id}>
                                    {`${reader.surname} ${reader.name.charAt(0)}. ${reader.patronymic.charAt(0)}.`}
                                </option>
                            ))}
                        </Form.Control>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Книга</Form.Label>
                        <Form.Control
                            as="select"
                            name="bookId"
                            value={formData.bookId}
                            onChange={onChange}
                            required
                        >
                            <option value="" disabled hidden></option>
                            {books.map(book => (
                                <option key={book._id} value={book._id}>{book.name}</option>
                            ))}
                        </Form.Control>
                    </FormGroup>

                    <Button variant="primary" type="submit"
                            className="mt-3"> {isEditMode ? 'Зберегти' : 'Видати'}</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default IssuanceModal;
