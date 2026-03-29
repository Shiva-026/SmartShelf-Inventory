import axios from 'axios';


const SKU_URL='http://localhost:9191/invent/sku';
//const ID_URL='http://localhost:9191/invent/sku-id';
const CAT_URL='http://localhost:9191/invent/sku-cat';



    export const saveSKU = (sku) => {
		return axios.post(SKU_URL, sku, {
            withCredentials : true
        });

	}

	export const getAllSKUs =()=> {
		return axios.get(SKU_URL, {
            withCredentials : true
        });
	}

	export const getSKUById =(id)=> {
		return axios.get(`${SKU_URL}/${id}`, {  
           withCredentials: true  
       });
		
	}

	
	export const deleteSKUById = (id) => {
		return axios.delete(`${SKU_URL}/${id}`, {  
           withCredentials: true  
       });

	}
	
	
	export const updateSKU =(sku)=> {
		return axios.put(SKU_URL, sku, {
            withCredentials : true
        });

	}
	
	
	// export const  getAllSkuIds =() =>{
	// 	return axios.post(ID_URL, {
    //         withCredentials : true
    //     });

	
	// }

export const getAllCategories=()=>{
	return axios.get(CAT_URL,  {
	withCredentials : true
});
}

export const getSkuIdByCategory=(category)=>{
	return axios.get(`${CAT_URL}/${category}`,  {
	withCredentials : true
});
}

