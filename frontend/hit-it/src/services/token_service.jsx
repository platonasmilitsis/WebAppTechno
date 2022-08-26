const get_local_refresh_token=()=>{
    const user=JSON.parse(sessionStorage.getItem("user"));
    return user?.refresh_token;
};

const get_local_access_token=()=>{
    const user=JSON.parse(sessionStorage.getItem("user"));
    return user?.access_token;
};

const update_local_access_token=(token)=>{
    let user=JSON.parse(sessionStorage.getItem("user"));
    user.access_token=token;
    sessionStorage.setItem("user",JSON.stringify(user));
};


const get_local_username=()=>{
    const user=JSON.parse(sessionStorage.getItem("user"));
    return user?.username;
};

const get_local_roles=()=>{
    const user=JSON.parse(sessionStorage.getItem("user"));
    return user?.roles;
};


const get_user=()=>{
    return JSON.parse(sessionStorage.getItem("user"));
}

const set_user=(user) => {
    // console.log(JSON.stringify(user));
    sessionStorage.setItem("user", JSON.stringify(user));
};

const remove_user=() => {
    sessionStorage.removeItem("user");
};


const TokenService = {
    get_local_refresh_token,
    get_local_access_token,
    get_local_username,
    get_local_roles,
    update_local_access_token,
    get_user,
    set_user,
    remove_user,
};
export default TokenService;