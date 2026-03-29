import axios from "axios";

const STOCK_URL = "http://localhost:9191/invent/stock";
const TRANS_URL = "http://localhost:9191/invent/trans";
const ID_URL = "http://localhost:9191/invent/trans-id";
const ANA_URL = 'http://localhost:9191/invent/analysis';

// Save transaction - should post to TRANS_URL, not STOCK_URL
export const saveTransaction = (transaction) => {
    return axios.post(TRANS_URL, transaction, {  // Changed from STOCK_URL to TRANS_URL
        withCredentials: true
    });
}

export const getTransactionById = (id) => {
    return axios.get(`${STOCK_URL}/${id}`, {
        withCredentials: true
    });
}

export const deleteTransactionById = (id) => {
    return axios.delete(`${STOCK_URL}/${id}`, {
        withCredentials: true
    });
}

export const transactionIdGenerate = (flag) => {
    return axios.get(`${ID_URL}/${flag}`, { 
        withCredentials: true
    });
}

export const getTransactionsByType = (type) => {
    return axios.get(`${TRANS_URL}/${type}`, {
        withCredentials: true
    });
}

export const getDemandByProduct = (id) =>{
		return axios.get(`${ANA_URL}/${id}`, {
            withCredentials : true
        });
	}
	
	export const getProductWiseTotalSale = ()=> {
		return axios.get(ANA_URL, {
            withCredentials : true
        });
	}