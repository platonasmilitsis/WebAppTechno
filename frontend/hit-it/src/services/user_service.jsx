
import axios from 'axios';


var fetchUserByUsername = (username) => `http://localhost:8080/users/username=${username}`;



const set_myUser=(username) =>{

    axios.get(fetchUserByUsername(username))
    .then(res => 
    {
        sessionStorage.removeItem("myUser");
        const users = res.data;
        sessionStorage.setItem("myUser",JSON.stringify(users));
        
    })



};

const get_myUser=() =>{
    return JSON.parse(sessionStorage.getItem("myUser"));
};

const get_id = () => {
    const user = JSON.parse(sessionStorage.getItem("myUser"));
    return user?.id;
};


const get_accepted = () => {
    const user = JSON.parse(sessionStorage.getItem("myUser"));
    return user?.accepted;
}

const get_admin = () => {
    const user = JSON.parse(sessionStorage.getItem("myUser"));
    return user?.admin;
}



const UserService = {
    set_myUser,
    get_myUser,
    get_id,
    get_accepted,
    get_admin,
};
export default UserService;