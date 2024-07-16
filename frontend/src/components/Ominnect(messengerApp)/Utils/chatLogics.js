export const getSender = (user, users) => {
  if(user){
    return users[0]._id === user.user._id ? users[1].username : users[0].username;
  }
};
export const getSenderFull = (user, users) => {
  if(user) {
    return users[0]._id === user.user._id ? users[1] : users[0];
  }
};

export const isSameSender = (msgs, msg, index, userId) => {
  return (
    index < msgs.length - 1 &&
    (msgs[index + 1].sender._id !== msg.sender._id ||
      msgs[index + 1].sender._id === undefined) &&
    msgs[index].sender._id !== userId
  );
};

export const isLastMsg = (msgs, index, userId) => {
  return (
    index === msgs.length - 1 &&
    msgs[msgs.length - 1].sender._id !== userId &&
    msgs[msgs.length - 1].sender._id
  );
};

export const isSameSenderMargin = (msgs, msg, index, userId) => {
  // console.log(i === msgs.length - 1);

  if (
    index < msgs.length - 1 &&
    msgs[index + 1].sender._id === msg.sender._id &&
    msgs[index].sender._id !== userId
  ) { return 50; }
  else if (
    (index < msgs.length - 1 &&
      msgs[index + 1].sender._id !== msg.sender._id &&
      msgs[index].sender._id !== userId) ||
    (index === msgs.length - 1 && msgs[index].sender._id !== userId)
  ) { return 1; }
  else return 'auto';
};

export const isSameUser = (msgs, msg, index) => {
  return index > 0 && msgs[index - 1].sender._id === msg.sender._id;
};