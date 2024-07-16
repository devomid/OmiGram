import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../contexts/AuthContext'

const Success = () => {
  const [user, setUser] = useState(null);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const getUser = async () => {
    const response = await fetch('http://localhost:3001/user/auth/google/success', {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        Accept:
          'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
      }
    });
    const data = await response.json();
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
    // console.log(data);
    dispatch({
      type: 'LOGIN',
      payload: data
    })
  };

  useEffect(() => {
    getUser();
  });



  useEffect(() => {
     if (user !== null) {
       if (user.user.phoneNumber === 999999999) {
         navigate('/user/auth/google/googleComplete');
       }
       else if (user.user.phoneNumber !== 999999999) {
         navigate('/');
       }
     }
   }, [user, navigate]);
}
 
export default Success;