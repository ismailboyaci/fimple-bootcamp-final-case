import { useState } from 'react';
import { useAuth } from '~/context';
import { useNavigate } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import { useToastr } from '~/context';

import '~/styles/admin-modal.scss';

const AdminModal = ({ onClose, onLogin }) => {
  const { t } = useTranslation();
  const showToastr = useToastr();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login(username, password)
    .then((res) => {
      if(res === 200){
        showToastr('success', 'success_login');
        navigate('/admin')
      }else {
        showToastr('error', res.data.message);
      }
    })
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>{t('admin_login')}</h2>
        <label>
          {t('username_email')}:
          <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          {t('password')}:
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
       <div className="admin-modal-buttons">
       <button className="button" onClick={handleLogin}>{t('login')}</button>
        <button className="button" onClick={onClose}>{t('close')}</button>
       </div>
      </div>
    </div>
  );
};

export default AdminModal;

