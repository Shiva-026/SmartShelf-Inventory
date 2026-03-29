import axios from 'axios';

const PROD_URL = "http://localhost:9191/invent/product";
const ID_URL = "http://localhost:9191/invent/id-gen";
const VEND_URL = "http://localhost:9191/invent/vendor";


export const getAllProducts = () => {
    return axios.get(PROD_URL, {
        withCredentials: true
    });
}

export const saveNewProduct = (product) => {
    return axios.post(PROD_URL, product, {
        withCredentials: true
    });
}

export const getProductById = (id) => {
    return axios.get(`${PROD_URL}/${id}`, {
        withCredentials: true
    });
}


export const deleteProductById = (id) => {
    return axios.delete(`${PROD_URL}/${id}`, {
        withCredentials: true
    });
}


export const editProductStock = (product, qty, flag) => {
    return axios.put(`${PROD_URL}/${qty}/${flag}`, product, {
        withCredentials: true
    });
}

export const editProductPrice = (product) => {
    return axios.put(PROD_URL, product, {
        withCredentials: true
    });
}


export const productIdGenerator = () => {
    return axios.get(ID_URL, {
        withCredentials: true
    });
}


export const getProductByAVendor = () => {
    return axios.get(VEND_URL, {
        withCredentials: true
    });
}


export const getProductByVendor = (id) => {
    return axios.get(`${VEND_URL}/${id}`, {
        withCredentials: true
    });


}