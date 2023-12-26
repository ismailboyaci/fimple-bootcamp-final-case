import '~/styles/navbar.scss';
import { BiSupport } from "react-icons/bi";
import { Dropdown } from '~/shared';
import { TR, US } from 'country-flag-icons/react/3x2'
import { RiAdminFill } from "react-icons/ri";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminModal } from '~/components';
const options = [
    { text: 'Option 1', value: 'option1', icon: <US style={{width:'26px'}} /> },
    { text: 'Option 2', value: 'option2', icon: <TR style={{width:'26px'}} />  }
  ];

const Navbar = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleAdminLogin = () => {
        navigate('/admin');
      };
    const openAdminModal = (open) => {
        setIsModalOpen(open);
      };
    const handleSelect = (selectedOption) => {
        console.log('Selected Option:', selectedOption);
      };
  return (
    <div className='navbar-wrapper'>
      <div className="top-nav">
      <div className="buttons">
      <button className='navbar-button' onClick={() => openAdminModal(true)}>
                <RiAdminFill />
                <span className='button-text'>Admin Login</span>
                </button>
            <Dropdown options={options} onSelect={handleSelect}  />
          </div>
      </div>
      <div className='navbar'>
        <div className="navbar-brand">
        <h2>Help Desk For You</h2>
        </div>
      </div>
      {isModalOpen && (
        <AdminModal
          onClose={() => setIsModalOpen(false)}
          onLogin={handleAdminLogin}
        />
      )}
    </div>
  );
};

export default Navbar;

