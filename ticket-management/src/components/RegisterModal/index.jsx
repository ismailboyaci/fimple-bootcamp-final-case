import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaUserPlus } from 'react-icons/fa6';
import '~/styles/register-modal.scss';
import { registerUser } from '~/services';

import { storage } from '~/services';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useTranslation } from 'react-i18next';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  isSuperAdmin: yup.boolean(),
  profileImg: yup.mixed().notRequired(),
});

const RegisterModal = ({ closeModal }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      if (data.profileImg && data.profileImg.length > 0) {
        const profileUrl = await uploadAttachments(data.profileImg[0], Number(new Date()));
        data.profileImg = profileUrl;
      }
      const result = await registerUser(data);
      if (result.status === 201) {
        closeModal(true);
      }
    } catch (error) {
      console.error('Hata:', error.message);
    }
  };

  const uploadAttachments = async (attachment, docId) => {
    const storageRef = ref(storage, `/${docId}/${attachment.name}`);
    const uploadTask = uploadBytesResumable(storageRef, attachment);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            resolve(url);
          });
        },
      );
    });
  };

  return (
    <div className='register-modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h2>{t('add_user')}</h2>
          <button className='close-button' onClick={closeModal}>
            &times;
          </button>
        </div>
        <div className='modal-body'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              {t('username')}:
              <input type='text' name='username' {...register('username')} />
              {errors.username && <p className='error-message'>{errors.username.message}</p>}
            </label>
            <label>
              {t('email')}:
              <input type='email' name='email' {...register('email')} />
              {errors.email && <p className='error-message'>{errors.email.message}</p>}
            </label>
            <label>
              {t('password')}:
              <input type='password' name='password' {...register('password')} />
              {errors.password && <p className='error-message'>{errors.password.message}</p>}
            </label>
            <label className='is-superadmin-label'>
              {t('is_superadmin')}:
              <input type='checkbox' name='isSuperAdmin' {...register('isSuperAdmin')}/>
            </label>
            <label>
              {t('profile_photo')}:
              <input type='file' accept='image/*' name='profileImg' {...register('profileImg')} />
              {errors.profileImg && <p className='error-message'>{errors.profileImg.message}</p>}
            </label>
            <button type='submit' className='button justify-content-center'>
              <FaUserPlus className='icon' />
              <span>
                {t('submit')}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;

