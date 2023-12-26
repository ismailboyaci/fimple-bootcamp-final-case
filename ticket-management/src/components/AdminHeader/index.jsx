import React, { useEffect, useState } from 'react';
import '~/styles/admin-header.scss';
import { MdLogout } from 'react-icons/md';
import { FiUser } from 'react-icons/fi';
import { BiPlusCircle } from "react-icons/bi";


import { doc, getDoc } from 'firebase/firestore';
import { db } from '~/services';
import profileImage from '../../assets/profile-placeholder.png';
import { getAuth, signOut } from "firebase/auth";

const AdminHeader = ({ user }) => {
  const [userData, setUserData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error getting user data:', error);
      } finally {
        setIsLoaded(true);
        console.log('user data fetched');
      }
    };
    getUserData();
  }, [user]);

  const onLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('sign out successful');
      })
      .catch((error) => {
        // An error happened.
        console.log('sign out error', error);
      });
  };

  return (
    <div className='admin-header-wrapper'>
      <header className='header'>
        <div className="create-ticket-div">
          <button className="button">
            <BiPlusCircle size={24} />
            <span>Create Ticket</span>
          </button>
        </div>
        <div className='logout'>
          <button onClick={() => setOpenDropdown(!openDropdown)}>
            <img src={isLoaded ? userData?.profileImg || profileImage : profileImage} alt='user-profile-image' />
          </button>
        </div>
        {openDropdown && (
          <div className='dropdown'>
            <ul className='dropdown-content'>
              <li className='dropdown-item'>
                <p>{user.displayName || user.email}</p>
                <hr />
              </li>
              <li className='dropdown-item'>
                <button className='button w-100'>
                  <FiUser size={24} />
                  <p>View Profile</p>
                </button>
              </li>
              <li className='dropdown-item'>
                <button className='button w-100' onClick={onLogout}>
                  <MdLogout size={24} />
                  <p>Çıkış Yap</p>
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

