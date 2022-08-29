import axios from "../api/axios"

const useRefreshToken = () => {

    const refresh_token = localStorage.getItem("refresh_token");
    const refresh = async () =>{

        const response = await axios.get('/refresh',{
            headers:{
                "Content-Type" : "application/json",
                "Authorization": 'Bearer ' + refresh_token,
            },

        });


        localStorage.setItem("access_token",response.data.access_token);
        return response.data.access_token;
    }


    return refresh;
}

export default useRefreshToken