import React from 'react'
import { GrPrevious } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';

import '~/styles/contentHeader.scss';

const ContentHeader = (
    {title, prevPage, showPrevIcon }
) => {

    const navigate = useNavigate();

    const gotoPrevPage = () => {
        navigate(prevPage);
    }
  return (
    <div className='content-header-wrapper'>
        <div className="content-header">
            {showPrevIcon && 
            <div className="content-header-button">
                <button onClick={gotoPrevPage}>
                <GrPrevious className='icon' size={20}/>
                </button>
            </div>
            }
            <div className="content-header-title">
                {title}
            </div>
        </div>

    </div>
  )
}

export default ContentHeader