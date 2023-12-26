import React, { useState } from 'react';
import { useAuth } from '~/context';
import '~/styles/admin-modal.scss';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from "react-router-dom"

const AdminModal = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useAuth();
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Burada admin girişi kontrolü yapılabilir.
    // Örneğin, sabit bir kullanıcı adı ve şifre kontrolü:
    // try {
    //   await login(username, password);
    //   onLogin();
    //   onClose();
    // } catch (error) {
    //   console.error('Login error:', error.message);
    //   alert('Invalid credentials. Please try again.');
    // }
    signInWithEmailAndPassword(auth, username, password)
      .then((user) => {
        // Success...
        console.log(user);
        navigate('/admin');
        //...
      })
      .catch((error) => {
        // Error
        console.log(error);
      });
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>Admin Login</h2>
        <label>
          Username:
          <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button onClick={handleLogin}>Login</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AdminModal;

