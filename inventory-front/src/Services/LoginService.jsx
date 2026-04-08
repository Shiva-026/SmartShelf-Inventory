import axios from 'axios';
 
const LOGIN_URL='http://localhost:9191/invent/login';
const ROLE_URL  = 'http://localhost:9191/invent/users/role'; // for list
const SINGLE_ROLE_URL = 'http://localhost:9191/invent/role';
const LOGOUT_URL = 'http://localhost:9191/invent/logout';
const USR_URL = 'http://localhost:9191/invent/user';


    export const registerNewUser = (user) =>{
		return axios.post(LOGIN_URL, user, {
            withCredentials : true
        });
	};
	
	
	export const validateUser=(userId,password)=> {
        return axios.get(`${LOGIN_URL}/${userId}/${password}`, {  
           withCredentials: true  
       });
    };
	
    export const getUserDetails=()=>{
    return axios.get(LOGIN_URL,{
        withCredentials: true
    });
    };


	export const getRole = () => {
		return axios.get(SINGLE_ROLE_URL, {
            withCredentials : true
        });
	};

	export const getUserId =()=> {
		 return axios.get(USR_URL, {
            withCredentials : true
         });
	 };

    export const getUsersByRole = (role) => {
        return axios.get(`${ROLE_URL}/${role}`, {
            withCredentials : true
        });
    };  
	

	 export const logoutUser = () => {
	        return axios.post(LOGOUT_URL, {
                withCredentials : true
            })
	    };

        export const getAllUsers = () =>{
            return axios.get('http://localhost:9191/invent/users', {
                 withCredentials: true 
                });
        };
