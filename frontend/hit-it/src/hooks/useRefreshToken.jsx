const useRefreshToken = () => {

    const refresh_token = localStorage.getItem("refresh_token");
    const refresh = async () =>{

        const response = await fetch('http://localhost:8080/refresh',{
            headers:{
                "Content-Type" : "application/json",
                "Authorization": 'Bearer ' + refresh_token,
            },

        });
        const data=await response.json();
        localStorage.setItem("access_token",data.access_token);
        console.log(data.access_token);
        return data.access_token;
    }


    return refresh;
}

export default useRefreshToken