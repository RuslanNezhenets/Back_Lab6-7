import React from 'react';
import {Modal, Form, FormGroup, Button} from 'react-bootstrap';

const ReaderModal = ({show, onHide, onSubmit, onChange, isEditMode, formData}) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditMode ? 'Оновлення даних' : 'Додати читача'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <FormGroup>
                        <Form.Label>Фамілія</Form.Label>
                        <Form.Control
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={onChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Ім'я</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={onChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>По-батькові</Form.Label>
                        <Form.Control
                            type="text"
                            name="patronymic"
                            value={formData.patronymic}
                            onChange={onChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Адреса</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={onChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Телефон</Form.Label>
                        <Form.Control
                            type="text"
                            name="telephone"
                            value={formData.telephone}
                            onChange={onChange}
                            required
                        />
                    </FormGroup>
                    <Button variant="primary" type="submit"
                            className="mt-3"> {isEditMode ? 'Зберегти' : 'Додати'}</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ReaderModal;
