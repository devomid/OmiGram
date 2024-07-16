import { useContext } from "react";
import { AuthContext } from '../contexts/AuthContext.js';

export const useSignup = () => {
  const { dispatch } = useContext(AuthContext);

  const signup = async function (username, email, password, firstName, lastName, birthDate, phoneNumber) {
    console.log('signup');
    
    try {
      const response = await fetch('http://localhost:3001/user/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, password, email, firstName, lastName, birthDate, phoneNumber})
      });
      console.log('this is the response: ', response);
      const json = await response.json();
      console.log('this is json: ', json);

      if (response.ok) {
        // Save the user to local storage
        localStorage.setItem('user', JSON.stringify(json));

        // Update the auth context
        dispatch({
          type: 'LOGIN',
          payload: json,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { signup };
};