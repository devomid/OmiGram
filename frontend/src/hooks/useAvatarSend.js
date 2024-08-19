import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useAvatarSend = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const avatarSend = async (formData) => {
    try {
      const response = await fetch('https://omigramapi.onrender.com/user/auth/signup/avatar', {
        method: 'POST',
        body: formData
      });
      const jsonRes = await response.json()
      console.log('user with avatar', jsonRes);
      if (jsonRes.ok) {
        const user = jsonRes.user
        localStorage.setItem('userAvatar', JSON.stringify(user));
        dispatch({
          type: 'UPDATE_USER',
          payload: user
        });

        navigate('/')
        console.log('user in avatar hook:', user);
      } else {
        console.log('no');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return { avatarSend };
};






