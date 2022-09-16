const useGetUserByUsername = () => {
  const get_user=async(username)=>{
    const response=await fetch(`http://localhost:8080/users/username=${username}`);
    const data=await response.json();
    return data;
  }
  return get_user;
}

export default useGetUserByUsername