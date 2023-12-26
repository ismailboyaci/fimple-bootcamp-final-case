import React from 'react'
import { BsCheckCircle } from "react-icons/bs";
import { BsExclamationCircleFill } from "react-icons/bs";

import '~/styles/toastr.scss';

const Toastr = (
  {
    type,
    message,
    onClose
  }
) => {
  console.log(type, message)

  const toastrClass = type === 'success' ? 'toastr-success' : 'toastr-error';
  const icon = type === 'success' ? <BsCheckCircle /> : <BsExclamationCircleFill />;

  return (
    <div className='toastr-wrapper'>
      <div className={`toastr ${toastrClass}`} onClick={onClose}>
        <p>
          {icon}
          <span>
            {message}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Toastr;