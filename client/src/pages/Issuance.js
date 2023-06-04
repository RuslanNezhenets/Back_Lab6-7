import React, {useEffect, useState} from 'react';
import {
    createIssuance,
    fetchIssuance,
    updateIssuance,
    deleteIssuance,
    fetchOneBook,
    fetchOneReader
} from "../http/libraryAPI";
import {Button, Table} from "react-bootstrap";
import "../style/style.css"
import IssuanceModal from "../components/modals/IssuanceModal";

const Issuance = () => {
    const [issuance, setIssuance] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState(
        {returnDate: '', returned: false, readerId: '', bookId: ''}
    )
    const [isEditMode, setIsEditMode] = useState(false)

    useEffect(() => {
            fetchIssuance().then(data => fixed(data).then(data => setIssuance(data)))
        }, []
    );

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setFormData({...formData, [name]: value})
    }

    function fixed(data) {
        return new Promise((resolve, reject) => {
            const processedDataPromises = data.map(item => {
                const processedItem = {
                    ...item,
                    issueDate: new Date(item.issueDate).toISOString().slice(0, 10),
                    returnDate: item.returnDate ? new Date(item.returnDate).toISOString().slice(0, 10) : null,
                };
                const bookPromise = fetchOneBook(item.bookId)
                const readerPromise = fetchOneReader(item.readerId)
                return Promise.all([bookPromise, readerPromise]).then(([book, reader]) => {
                    processedItem.book = book
                    processedItem.reader = reader
                    return processedItem
                })
            })
            Promise.all(processedDataPromises).then(processedData => {
                resolve(processedData)
            }).catch(error => {
                reject(error)
            })
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const inputData = {...formData, issueDate: new Date().toISOString().slice(0, 10)}

        if (isEditMode) {
            await updateIssuance(inputData._id, inputData)
            fetchIssuance().then(data => fixed(data).then(data => setIssuance(data)))
        } else {
            const newIssuance = await createIssuance(inputData)
            fixed([...issuance, newIssuance]).then(data => setIssuance(data))
        }

        setFormData({returnDate: '', returned: false, readerId: '', bookId: ''})
        setIsEditMode(false)
        setShowModal(false)
    }

    const handleAddClick = () => {
        setIsEditMode(false);
        setFormData({returnDate: '', returned: false, readerId: '', bookId: ''});
        setShowModal(true);
    }

    const handleUpdateClick = (issuance) => {
        setIsEditMode(true)
        setFormData(issuance)
        setShowModal(true)
    }

    const handleDelete = async (id) => {
        await deleteIssuance(id);
        setIssuance(issuance.filter((issuance) => issuance._id !== id))
    }

    return (
        <div className="text-center">
            <IssuanceModal
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
                    <th>Дата видачі</th>
                    <th>Дата повернення</th>
                    <th>Повернено</th>
                    <th>Читач</th>
                    <th>Книга</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {issuance?.map(issuance => (
                    <tr key={issuance._id}>
                        <td>{issuance.issueDate}</td>
                        <td>{issuance.returnDate ? issuance.returnDate : ''}</td>
                        <td>{issuance.returned ? 'Так' : 'Ні'}</td>
                        <td>{issuance.reader.surname} {issuance.reader.name.charAt(0)}.
                            {issuance.reader.patronymic.charAt(0)}.
                        </td>
                        <td>{issuance.book.name}</td>
                        <td>
                            <Button variant="primary" onClick={() => handleUpdateClick(issuance)}>Змінити</Button>{' '}
                            <Button variant="danger" onClick={() => handleDelete(issuance._id)}>Видалити</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Button variant="primary" className="m-md-4" onClick={handleAddClick}>Видати книгу</Button>
        </div>
    );
};

export default Issuance;