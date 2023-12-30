import '~/styles/navbar.scss';
import { BiSupport } from "react-icons/bi";
import Dropdown from 'react-bootstrap/Dropdown';
import { TR, US } from 'country-flag-icons/react/3x2'
import { RiAdminFill } from "react-icons/ri";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminModal } from '~/components';
import { useTranslation } from 'react-i18next';
const options = [
  { text: 'Option 2', value: 'tr-TR', icon: <TR style={{width:'26px'}} />  },
    { text: 'Option 1', value: 'en-US', icon: <US style={{width:'26px'}} /> }
  ];

const Navbar = () => {
    const { t, i18n } = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(options.find((option) => option.value === i18n.language));
    const [openLanguageDropdown, setOpenLanguageDropdown] = useState(false);
    const navigate = useNavigate();

    const handleAdminLogin = () => {
        navigate('/admin');
      };

    const openAdminModal = (open) => {
        setIsModalOpen(open);
      };

      const handleSelect = async (selectedOption) => {
        setSelectedLanguage(selectedOption);
        await i18n.changeLanguage(selectedOption.value);
      };

  return (
    <div className='navbar-wrapper'>
      <div className="top-nav">
      <div className="buttons">
      <button className='navbar-button' onClick={() => openAdminModal(true)}>
                <RiAdminFill />
                <span className='button-text'>{t('admin_login')}</span>
                </button>
               <div className={`language-dropdown ${openLanguageDropdown? 'open': ''}`} 
               onClick={() => setOpenLanguageDropdown(!openLanguageDropdown)}>
                <div className="selected-language">
                {options.find((option) => option.value === i18n.language)?.icon}
                </div>
                <ul className={`language-options ${openLanguageDropdown? 'open': ''}`} >
              {options.map((option) => (
                <li key={option.value} onClick={() => handleSelect(option)}>
                  {option.icon}
                  <span>{option.label}</span>
                </li>
              ))}
            </ul>
               </div>
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

