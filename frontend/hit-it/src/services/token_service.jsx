const get_local_refresh_token=()=>{
    const user=JSON.parse(sessionStorage.getItem("user"));
    return user?.refresh_token;
};

const get_local_access_token=()=>{
    const user=JSON.parse(sessionStorage.getItem("user"));
    return user?.get_local_access_token;
};

const update_local_access_token=(token)=>{
    let user=JSON.parse(sessionStorage.getItem("user"));
    user.access_token=token;
    sessionStorage.setItem("user",JSON.stringify(user));
};

const get_user=()=>{
    return JSON.parse(sessionStorage.getItem("user"));
}

const set_user=(user) => {
    console.log(JSON.stringify(user));
    sessionStorage.setItem("user", JSON.stringify(user));
};

const remove_user=() => {
    sessionStorage.removeItem("user");
};


const TokenService = {
    get_local_refresh_token,
    get_local_access_token,
    update_local_access_token,
    get_user,
    set_user,
    remove_user,
};
export default TokenService;