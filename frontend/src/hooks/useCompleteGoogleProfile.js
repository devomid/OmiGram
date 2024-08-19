import { useContext } from "react";
import { AuthContext } from '../contexts/AuthContext.js';


export const useGoogleCompleteProfile = () => {
  const { dispatch, user } = useContext(AuthContext);
  // console.log(user.user.email);

  const googleComplete = async function (username, birthDate, phoneNumber, password) {
    // console.log('siginup');
    const userEmail = user.user.email

    try {
      const response = await fetch('https://omigramapi.onrender.com/user/auth/google/googleComplete', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          Accept:
            'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ userEmail, username, birthDate, phoneNumber, password })
      })
      const json = await response.json();
      console.log(json);

      const newResponse = await fetch('https://omigramapi.onrender.com/user/auth/google/success', {
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
      const data = await newResponse.json();
      localStorage.setItem('user', JSON.stringify(data));
      dispatch({
        type: 'UPDATE_USER',
        payload: data
      });

    } catch (error) {
      console.log(error);
    }
  }

  return { googleComplete };
};