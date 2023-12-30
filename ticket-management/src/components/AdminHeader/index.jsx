import React, { useState } from 'react';
import '~/styles/admin-header.scss';
import { MdLogout } from 'react-icons/md';
import { BiPlusCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/context';
import { useTranslation } from 'react-i18next';

const AdminHeader = ({ user }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();
  const {logout} = useAuth();
  const { t } = useTranslation();

  const createTicket = () => {
    localStorage.setItem('history', '/admin');
    navigate('/create-application');
  };

  const onLogout = async () => {
    logout();
  };

  return (
    <div className='admin-header-wrapper'>
      <header className='header'>
        <div className='create-ticket-div'>
          <button className='button' onClick={createTicket}>
            <BiPlusCircle size={24} />
            <span>{t('create_application')}</span>
          </button>
        </div>
        <div className='logout'>
          <button onClick={() => setOpenDropdown(!openDropdown)}>
            <img src={user.profileImg} alt='user-profile-image' />
          </button>
        </div>
        {openDropdown && (
          <div className='dropdown'>
            <ul className='dropdown-content'>
              <li className='dropdown-item'>
                <p>{user.displayName || user.email}</p>
                <hr />
              </li>
              {/* <li className='dropdown-item'>
                <button className='button w-100'>
                  <FiUser size={24} />
                  <p>View Profile</p>
                </button>
              </li> */}
              <li className='dropdown-item'>
                <button className='button w-100' onClick={onLogout}>
                  <MdLogout size={24} />
                  <p>{t('logged_out')}</p>
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>
    </div>
  );
};

export default AdminHeader;

