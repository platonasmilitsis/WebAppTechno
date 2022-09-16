const useGetUserByID = () => {
  const get_user=async(id)=>{
    const response=await fetch(`http://localhost:8080/users/${id}`);
    const data=await response.json();
    return data;
  }
  return get_user;
}

export default useGetUserByID