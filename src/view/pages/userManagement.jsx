import React, { useEffect, useState } from 'react';
import * as Components from '../components/common/userManagementComponents';
import { handleSignUp, handleSignIn } from '../../controller/userManagementController';
import { useNavigate } from 'react-router-dom';
import { validateForm } from '../components/common/functions/commonFunctions';
import LoadModal from '../components/common/modals/loadModal';
import { initialFormData } from '../../model/userManagementModel';
import ErrorModal from '../components/common/modals/errorModal';

const UserManagement = () => {
  const [signIn, toggle] = useState(true);
  const [loading, setLoading] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, [signIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignUpWrapper = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validationError = validateForm(formData, ['firstname', 'lastname', 'email', 'password']);
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }
    await handleSignUp(e, formData, navigate, setLoading, setDisplayError);
  };

  const handleSignInWrapper = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validationError = validateForm(formData, ['email', 'password']);
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }
    await handleSignIn(e, formData, navigate, setLoading, setDisplayError);
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      {loading && <LoadModal loading={loading} message={'Your EcoWatch journey is about to begin.'}/>}
      {displayError && <ErrorModal setDisplayError={setDisplayError} displayError={displayError} error={'User management error occured, please try again.'} />}
      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form onSubmit={handleSignUpWrapper}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input type='text' name='firstname' placeholder='First Name' value={formData.firstname} onChange={handleChange} />
            <Components.Input type='text' name='lastname' placeholder='Last Name' value={formData.lastname} onChange={handleChange} />
            <Components.Input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} />
            <Components.Input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} />
            {error && <div className='text-red-600 mb-2'>{error}</div>}
            <Components.Button disabled={loading} type='submit'>Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form onSubmit={handleSignInWrapper}>
            <Components.Title>Sign in</Components.Title>
            <Components.Input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} />
            <Components.Input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} />
            <Components.Anchor href='/forgotpassword'>Forgot your password?</Components.Anchor>
            {error && <div className='text-red-600 mb-2'>{error}</div>}
            <Components.Button disabled={loading} type='submit'>Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton disabled={loading} onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter your personal details and start journey with us
              </Components.Paragraph>
              <Components.GhostButton disabled={loading} onClick={() => toggle(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
}

export default UserManagement;
