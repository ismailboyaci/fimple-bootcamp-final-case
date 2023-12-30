import React from 'react'
import { BsCheckCircle } from "react-icons/bs";
import { BsExclamationCircleFill } from "react-icons/bs";

import '~/styles/toastr.scss';
import { useTranslation } from 'react-i18next';

const Toastr = (
  {
    type,
    message,
    onClose
  }
) => {
  const { t } = useTranslation();

  const toastrClass = type === 'success' ? 'toastr-success' : 'toastr-error';
  const icon = type === 'success' ? <BsCheckCircle /> : <BsExclamationCircleFill />;

  return (
    <div className='toastr-wrapper'>
      <div className={`toastr ${toastrClass}`} onClick={onClose}>
        <p>
          {icon}
          <span>
            {t(message)}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Toastr;