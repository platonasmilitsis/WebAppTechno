import axios from "../api/axios"
import useAuth from "./useAuth"

const useRefreshToken = () => {
    const {auth,setAuth} = useAuth();


    const refresh_token = localStorage.getItem("refresh_token");
    const refresh = async () =>{

        console.log("YO",auth?.refresh_token);

        const response = await axios.get('/refresh',{
            headers:{
                "Content-Type" : "application/json",
                "Authorization": 'Bearer ' + refresh_token,
            },

        });


        await localStorage.setItem("access_token",response.data.access_token);
        
        setAuth(prev => {
            console.log(JSON.stringify(response.data));
            console.log(prev);
            
            
            
            
            return {...prev,
                username:response.data.username,
                access_token: response.data.access_token,
                roles: response.data.roles};
        });
        return response.data.access_token;
    }


    return refresh;
}

export default useRefreshToken