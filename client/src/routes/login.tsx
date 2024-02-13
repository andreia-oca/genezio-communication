import React, { useState } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import "./styles.css";
import { useNavigate } from 'react-router-dom';
import { AuthService } from '@genezio/auth';
import { Button } from 'react-bootstrap';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginLoading, setLoginLoading] = useState(false);
  const [googleLoginLoading, setGoogleLoginLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoginLoading(true);

    try {
        await AuthService.getInstance().login(email, password)
        navigate("/");
    } catch (error) {
        console.log('Login Failed', error);
        alert('Login Failed');
    }
    setLoginLoading(false);
}

const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
  console.log(credentialResponse);
  setGoogleLoginLoading(true);

  try {
      await AuthService.getInstance().googleRegistration(credentialResponse.credential!)

      console.log('Login Success');
      navigate('/');
  } catch(error) {
      console.log('Login Failed', error);
      alert('Login Failed');
  }
  setGoogleLoginLoading(false);
};

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit" variant="primary" disabled={loginLoading}>
        {loginLoading ? 'Loading...' : 'Login'}
      </Button>
      <Button type="submit" variant="primary" onClick={() => navigate('/signup')}>
        Create an account
      </Button>

      OR

      { googleLoginLoading ? <>Loading...</> :  <GoogleLogin
        onSuccess={credentialResponse => {
          handleGoogleLogin(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />}

    </form>
  );
};

export default Login;


