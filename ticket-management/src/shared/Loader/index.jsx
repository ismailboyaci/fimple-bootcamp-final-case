import React, { useState, useEffect } from 'react';
import '~/styles/loader.scss';

const Loader = () => {
  const [dotSize, setDotSize] = useState(10);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDotSize((prevSize) => (prevSize === 10 ? 15 : 10));
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='loader-overlay'>
      <div className='loader'>
        <div className='dot' style={{ width: dotSize, height: dotSize }}></div>
        <div className='dot' style={{ width: dotSize, height: dotSize }}></div>
        <div className='dot' style={{ width: dotSize, height: dotSize }}></div>
      </div>
    </div>
  );
};

export default Loader;

