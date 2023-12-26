import React from 'react';
import { Navbar } from '~/components';
import { MdOutlineInfo, MdCreateNewFolder } from 'react-icons/md';
import { BiSupport } from 'react-icons/bi';
import { useAuth } from '~/context';

import '~/styles/homePage.scss';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { user } = useAuth();
  console.log(user, 'Home page');

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
            <p>Hoş geldiniz! IT desteği için başvuru oluşturabilir veya mevcut başvurularınızı sorgulayabilirsiniz.</p>
          </div>
          <div className='home-button-wrapper'>
            <div className='create-app-box'>
              <button className='button'>
                <MdCreateNewFolder className='icon' size={24} />
                <span className='text' onClick={() => gotoPage('create-application')}>
                  Başvuru Oluştur
                </span>
              </button>
            </div>
            <div className='query-app-box'>
              <button className='button' onClick={() => gotoPage('query-application')}>
                <MdOutlineInfo className='icon' size={24} />
                <span className='text'>Başvuru Sorgula</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
