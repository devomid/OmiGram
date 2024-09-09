import { useAuthContext } from "./useAuthContext";

export const useSendNewPost = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const sendNewPost = async (formData) => {
    try {
      const response = await fetch('https://omigramapi.onrender.com/posts/', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        const jsonRes = await response.json()
      } else {
        return
      }
    } catch (error) {
      console.log(error);
    }
  }
  return { sendNewPost };
};
