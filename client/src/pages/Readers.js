import React, {useEffect, useState} from 'react';
import {createReader, fetchReaders, updateReader, deleteReader} from "../http/libraryAPI";
import {Button, Table} from "react-bootstrap";
import "../style/style.css"
import ReaderModal from "../components/modals/ReaderModal";

const Readers = () => {
    const [readers, setReaders] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({surname: '', name: '', patronymic: '', address: '', telephone: ''})
    const [isEditMode, setIsEditMode] = useState(false)

    useEffect(() => {
        fetchReaders().then(data => setReaders(data))
    }, [])

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (isEditMode) {
            const updatedReader = await updateReader(formData._id, formData)
            setReaders(prevReaders => {
                const readerIndex = prevReaders.findIndex((reader) => reader._id === formData._id)
                if (readerIndex < 0)
                    return prevReaders
                const updatedReaders = [...prevReaders]
                updatedReaders[readerIndex] = updatedReader
                return updatedReaders
            })
        } else {
            const newReader = await createReader(formData)
            setReaders(prevReaders => [...prevReaders, newReader]);
        }

        setFormData({surname: '', name: '', patronymic: '', address: '', telephone: ''})
        setIsEditMode(false)
        setShowModal(false)
    }

    const handleAddClick = () => {
        setIsEditMode(false);
        setFormData({surname: '', name: '', patronymic: '', address: '', telephone: ''});
        setShowModal(true);
    };

    const handleUpdateClick = (reader) => {
        setIsEditMode(true)
        setFormData(reader)
        setShowModal(true)
    }

    const handleDelete = async (id) => {
        await deleteReader(id);
        setReaders(readers.filter((reader) => reader._id !== id))
    }

    return (
        <div className="text-center">
            <ReaderModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onSubmit={handleSubmit}
                onChange={handleInputChange}
                formData={formData}
                isEditMode={isEditMode}
            />
            <Table>
                <thead>
                <tr>
                    <th>Фамілія</th>
                    <th>Ім'я</th>
                    <th>По-батькові</th>
                    <th>Адреса</th>
                    <th>Телефон</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {readers.map((reader, i) => (
                    <tr key={reader._id}>
                        <td>{reader.surname}</td>
                        <td>{reader.name}</td>
                        <td>{reader.patronymic}</td>
                        <td>{reader.address}</td>
                        <td>{reader.telephone}</td>
                        <td>
                            <Button variant="primary" onClick={() => handleUpdateClick(reader)}>Змінити</Button>{' '}
                            <Button variant="danger" onClick={() => handleDelete(reader._id)}>Видалити</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Button variant="primary" className="mt-3" onClick={handleAddClick}>Додати читача</Button>
        </div>
    );
};

export default Readers;