const UserModel = require('../models/UserModel');

const completeGoogleSignup = async (req, res) => {

  const {userEmail} = req.body;
  // console.log('in controller');
  try {
    const userToEdit = await UserModel.findOne({ email: userEmail });
    if (!userToEdit) {
      return (res.status(404).json({error: 'User not found'}))
    } else {
      const userId = userToEdit.id;
      await UserModel.findByIdAndUpdate({ _id: userId }, { ...req.body });
      // console.log('user is:', userToEdit);
    }
    return (res.status(200).json({ user: userToEdit, message: 'User saved successfully.' }));
    
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = completeGoogleSignup;