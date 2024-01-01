import React from 'react';
import { GrPrevious } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

import '~/styles/content-header.scss';

const ContentHeader = ({ title, prevPage, showPrevIcon }) => {
  const navigate = useNavigate();

  const gotoPrevPage = () => {
    const history = localStorage.getItem('history');
    localStorage.removeItem('history');
    navigate(history || prevPage);
  };
  return (
    <div className='content-header-wrapper'>
      <div className='content-header'>
        {showPrevIcon && (
          <div className='content-header-button'>
            <button onClick={gotoPrevPage}>
              <GrPrevious className='icon' size={20} />
            </button>
          </div>
        )}
        <div className='content-header-title'>{title}</div>
      </div>
    </div>
  );
};

export default ContentHeader;
