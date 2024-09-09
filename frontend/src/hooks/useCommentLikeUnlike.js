
export const useCommentLikeUnlike = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const likeAComment = async (commentId) => {
    try {
      const response = await fetch(`https://omigramapi.onrender.com/comments/like/${commentId}`, {
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


  const unlikeAComment = async (commentId) => {

    try {
      const response = await fetch(`https://omigramapi.onrender.com/comments/unlike/${commentId}`, {
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
  return { likeAComment, unlikeAComment };
};


