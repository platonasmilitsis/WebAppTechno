import axios from "../api/axios"
import useAuth from "./useAuth"

const useRefreshToken = () => {
    const {auth,setAuth} = useAuth();

  
    const refresh = async () =>{
        const response = await axios.get('/refresh',{
            headers:{
                Authorization: 'Bearer ' + auth?.refresh_token,
            }
        });
        setAuth(prev => {
            return {...prev, access_token: response.data.access_token};
        });
        return response.data.access_token;
    }


    return refresh;
}

export default useRefreshToken