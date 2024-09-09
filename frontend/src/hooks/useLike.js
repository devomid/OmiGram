
export const useLike = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const likeAPost = async (postId) => {
    console.log(user);
    try {
      const response = await fetch(`https://omigramapi.onrender.com/posts/like/${postId}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(user.user)
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
  return { likeAPost };
};
