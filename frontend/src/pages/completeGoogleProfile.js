import { socialCompletionValidation } from '../validation/yupUserSchema.js';
import { useGoogleCompleteProfile } from '../hooks/useCompleteGoogleProfile.js';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.js';

const CompletionForm = () => {
  const { googleComplete } = useGoogleCompleteProfile();
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);

  const onSubmit = async (values, actions) => {
    try {
      await googleComplete(values.username, values.birthDate, values.phoneNumber, values.password);
      const updatedUser = {
        username: values.username,
        birthDate: values.birthDate,
        phoneNumber: values.phoneNumber,
        password: values.password
      };
      updateUser(updatedUser);
      actions.resetForm();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const { values, errors, touched, isSubmitting, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues: {
      username: '',
      birthDate: '',
      phoneNumber: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: socialCompletionValidation,
    onSubmit
  });

  if (!isSubmitting) {
    return (
      
    <form onSubmit={handleSubmit}>
      <h3>You need to update these information to continue.</h3>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        placeholder="username"
        value={values.username}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.username && touched.username ? 'input-error' : ''}
      />
      {errors.username && touched.username && <p className="error">{errors.username}</p>}
        
      <label htmlFor="birthDate">date of birth</label>
      <input
        id="birthDate"
        type="date"
        placeholder="birthDate"
        value={values.birthDate}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.birthDate && touched.birthDate ? 'input-error' : ''}
      />
      {errors.birthDate && touched.birthDate && <p className="error">{errors.birthDate}</p>}
      
      <label htmlFor="phoneNumber">phone number</label>
      <input
        id="phoneNumber"
        type="tel"
        placeholder="phoneNumber"
        value={values.phoneNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.phoneNumber && touched.phoneNumber ? 'input-error' : ''}
      />
      {errors.phoneNumber && touched.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
      
      <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.password && touched.password ? 'input-error' : ''}
        />
        {errors.password && touched.password && <p className="error">{errors.password}</p>}

        <label htmlFor="passwordConfirmation">confirm password</label>
        <input
          id="passwordConfirmation"
          type="password"
          placeholder="passwordConfirmation"
          value={values.passwordConfirmation}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.passwordConfirmation && touched.passwordConfirmation ? 'input-error' : ''}
        />
        {errors.passwordConfirmation && touched.passwordConfirmation && <p className="error">{errors.passwordConfirmation}</p>}

      
      <button type="submit">Finish</button>
    </form>
    )
  }

  if (isSubmitting) {
    return (
      <div className="loading">
        <h1>Finishing Up</h1>
      </div>
    )
  }
}

export default CompletionForm;