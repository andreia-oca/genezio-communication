import React, { useState } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import "./styles.css";
import { useNavigate } from 'react-router-dom';
import { AuthService } from '@genezio/auth';

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">{ loginLoading ? "Loading..." : "Login" } </button>
      { googleLoginLoading ? <>Loading...</> :  <GoogleLogin
        onSuccess={credentialResponse => {
          handleGoogleLogin(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />}
      <button onClick={() => navigate('/signup')}>Create an account</button>
      </form>
  );
};

export default Login;


