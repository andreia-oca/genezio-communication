import React, { useState } from 'react';
import "./styles.css";
import { useNavigate } from 'react-router-dom';
import { AuthService } from '@genezio/auth';
import { Button } from 'react-bootstrap';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
        const response = await AuthService.getInstance().register(email, password, name);
        console.log('Register Success', response);

        navigate('/login');
    } catch (error) {
        console.log(error);
        alert("An error has occured")
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
      <Button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Loading...' : 'Sign Up'}
      </Button>
      <Button className="btn btn-primary" onClick={() => navigate('/login')}>
        Go to login
      </Button>
    </form>
  );
};

export default Signup;


