import React from 'react';
import { Navbar } from '~/components';
import { MdOutlineInfo, MdCreateNewFolder } from 'react-icons/md';
import { BiSupport } from 'react-icons/bi';

import '~/styles/homePage.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/context';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const gotoPage = (path) => {
    navigate(`/${path}`);
  };

  return (
    <div className='home-wrapper'>
      <Navbar />
      <div className='home-container'>
        <div className='home-card'>
          <div className='img-box'>
            <BiSupport className='icon' size={64} />
            <p>{t('welcome_message')}</p>
          </div>
          <div className='home-button-wrapper'>
            <div className='create-app-box'>
              <button className='button'>
                <MdCreateNewFolder className='icon' size={24} />
                <span className='text' onClick={() => gotoPage('create-application')}>
                  {t('create_application')}
                </span>
              </button>
            </div>
            <div className='query-app-box'>
              <button className='button' onClick={() => gotoPage('query-application')}>
                <MdOutlineInfo className='icon' size={24} />
                <span className='text'>
                  {t('query_application')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
