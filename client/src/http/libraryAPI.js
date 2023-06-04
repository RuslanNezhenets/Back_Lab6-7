import {$host} from "./index";

// ========== Books ==========

export const createBook = async (book) => {
    const {data} = await $host.post('api/books', book)
    return data
}

export const fetchBooks = async () => {
    const {data} = await $host.get('api/books')
    return data
}

export const fetchOneBook = async (id) => {
    const {data} = await $host.get('api/books/' + id)
    return data
}

export const updateBook = async (id, book) => {
    const {data} = await $host.put('api/books/' + id, book)
    return data
}

export const deleteBook = async (id) => {
    const {data} = await $host.delete('api/books/' + id)
    return data
}

// ========== Readers ==========

export const createReader = async (reader) => {
    const {data} = await $host.post('api/readers', reader)
    return data
}

export const fetchReaders = async () => {
    const {data} = await $host.get('api/readers')
    return data
}

export const fetchOneReader = async (id) => {
    const {data} = await $host.get('api/readers/' + id)
    return data
}

export const updateReader = async (id, reader) => {
    const {data} = await $host.put('api/readers/' + id, reader)
    return data
}

export const deleteReader = async (id) => {
    const {data} = await $host.delete('api/readers/' + id)
    return data
}

// ========== Issuance ==========

export const createIssuance = async (issuance) => {
    const {data} = await $host.post('api/issuance', issuance)
    return data
}

export const fetchIssuance = async () => {
    const {data} = await $host.get('api/issuance')
    return data
}

export const updateIssuance = async (id, issuance) => {
    const {data} = await $host.put('api/issuance/' + id, issuance)
    return data
}

export const deleteIssuance = async (id) => {
    const {data} = await $host.delete('api/issuance/' + id)
    return data
}