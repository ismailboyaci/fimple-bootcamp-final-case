import { useState, useEffect } from 'react';
import '~/styles/user-panel.scss';
import { FaUserPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { RegisterModal } from '..';
import { deleteUser, getUsers } from '~/services';
import { useTranslation } from 'react-i18next';

const UserPanel = () => {
  const [showModal, setShowModal] = useState(false);
  const [userTable, setUserTable ] = useState([]);
  const [totalUserRecord, setTotalUserRecord] = useState(0);
  const { t } = useTranslation();

  const fetchUsers = async () => {
    const result = await getUsers();
    if(result.status === 200) {
      setUserTable(result.data.users);
      setTotalUserRecord(result.data.total);
      console.log(result.data.users[0].isSuperAdmin)
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = (type) => {
    if(type) {
      fetchUsers();
    }
    setShowModal(false);
  };

  const handleDelete = async (userId) => {
    const response = await deleteUser(userId);
    if(response.status === 200) {
      fetchUsers();
    }
  };

  return (
    <div className='user-panel-wrapper'>
      <div className='add-user-div'>
        <button className='button' onClick={openModal}>
          <FaUserPlus className='icon' />
          <span>{t('add_user')}</span>
        </button>
      </div>
      <div className='user-table'>
        <table>
          <thead>
            <tr>
              <th>{t('profile_photo')}</th>
              <th>{t('username')}</th>
              <th>{t('email')}</th>
              <th>{t('is_superadmin')}</th>
              <th>{t('create_date')}</th>
              <th>{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {userTable.map((user, index) => (
              <tr key={index}>
                <td>
                  <img src={user.profileImg} alt="user-pprofile-img" width={32} />
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isSuperAdmin ? t('yes'): t('no')}</td>
                <td>{new Date(user.date).toLocaleString()}</td>
                <td>
                  <button className='table-button user-delete-button' onClick={() => handleDelete(user._id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className='modal-overlay'>
          <RegisterModal closeModal={closeModal} />
        </div>
      )}
    </div>
  );
};

export default UserPanel;
