
export const useReplyLikeAndUnlike = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const likeAReply = async (replyId) => {
    try {
      const response = await fetch(`https://omigramapi.onrender.com/comments/reply/like/${replyId}`, {
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


  const unlikeAReply = async (replyId) => {

    try {
      const response = await fetch(`https://omigramapi.onrender.com/comments/reply/unlike/${replyId}`, {
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
  return { likeAReply, unlikeAReply };
};


