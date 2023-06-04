import React from 'react';
import {Modal, Form, FormGroup, Button} from 'react-bootstrap';

const BookModal = ({show, onHide, onSubmit, onChange, isEditMode, onFileChange, formData}) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditMode ? 'Оновлення даних' : 'Додати книгу'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <FormGroup>
                        <Form.Label>Назва</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={onChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Автор</Form.Label>
                        <Form.Control
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={onChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Рік</Form.Label>
                        <Form.Control
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={onChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Зображення</Form.Label>
                        <Form.Control type="file" onChange={onFileChange}/>
                    </FormGroup>
                    <Button variant="primary" type="submit"
                            className="mt-3"> {isEditMode ? 'Зберегти' : 'Додати'}</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default BookModal;
