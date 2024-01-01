import { ContentHeader } from '~/shared';
import Dropzone from 'react-dropzone';
import { useToastr } from '~/context';

import { categories } from '~/constants';

import { createTicket } from '~/services';
import { storage } from '~/services';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '~/styles/create-application.scss';
import withLoading from '~/hoc/withLoading';

const schema = yup.object({
  firstname: yup.string().required('required_field'),
  lastname: yup.string().required('required_field'),
  email: yup.string().email().required('required_field'),
  tckn: yup.string().length(11, 'tckn_must_11').required('required_field'),
  subject: yup.string().required('required_field'),
  description: yup.string().min(60, 'required_min_60').required('required_field'),
  attachments: yup.array(),
});

const CreateApplication = ({setLoading}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const showToastr = useToastr();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'attachments',
  });
  const onDrop = (acceptedFiles) => {
    append(acceptedFiles.map((files) => ({ files, name: files.name, size: files.size })));
  };

  const onSubmit = async (data) => {
    const docId = new Date().getTime().toString();
    try {
      const uploadedUrls = await Promise.all(fields.map((item, index) => uploadAttachments(item, docId)));

      data.attachments = uploadedUrls;
      const result = await createTicket(data);
      if(result.status === 201) {
        const ticketId = result.data.data._id;
        showToastr('success', t('success_application'));
        navigate(`/application-success/${ticketId}`);
      }
    } catch (error) {
      console.error('Hata:', error.message);
    }finally{
      setLoading(false);
    }
  };

  const uploadAttachments = async (attachments, docId) => {
    setLoading(true);
    const storageRef = ref(storage, `/${docId}/${attachments.name}`);
    const uploadTask = uploadBytesResumable(storageRef, attachments.files);

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
    <div className='create-application-wrapper'>
      <ContentHeader title={t('create_application')} prevPage='/' showPrevIcon={true} />
      <div className='form-wrapper'>
        <form onSubmit={handleSubmit(onSubmit)} className='application-form'>
          <div className='form-name-group'>
            <div className='form-group'>
              <label>{t('name')}</label>
              <input {...register('firstname')} />
              <p className='error-message'>{t(errors.firstname?.message)}</p>
            </div>
            <div className='form-group'>
              <label>{t('surname')}</label>
              <input {...register('lastname')} />
              <p className='error-message'>{t(errors.lastname?.message)}</p>
            </div>
          </div>
          <div className='form-email-group'>
            <div className='form-group'>
              <label>{t('email')}</label>
              <input {...register('email')} />
              <p className='error-message'>{t(errors.email?.message)}</p>
            </div>
            <div className='form-group'>
              <label>{t('tckn')}</label>
              <input {...register('tckn')} />
              <p className='error-message'>{t(errors.tckn?.message)}</p>
            </div>
          </div>
          <div className='form-group'>
            <label>{t('subject')}</label>
            <select {...register('subject')}>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {t(item.name)}
                </option>
              ))}
            </select>
            <p className='error-message'>{t(errors.subject?.message)}</p>
          </div>
          <div className='form-group'>
            <label>{t('description')}</label>
            <textarea {...register('description')} rows={3} />
            <p className='error-message'>{t(errors.description?.message)}</p>
          </div>
          <div className='form-group'>
            <label>{t('attachment_files')}</label>
            <Dropzone onDrop={onDrop}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className='dropzone'>
                  <input {...getInputProps()} />
                  <p>{t('drag_drop')}</p>
                </div>
              )}
            </Dropzone>
            <p className='error-message'>{t(errors.attachments?.message)}</p>
            <ul>
              {fields.map((item, index) => (
                <li key={item.id}>
                  <span>{item.name}</span>
                  <button type='button' onClick={() => remove(index)}>
                    {t('delete')}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button className='button w-100 justify-content-center' type='submit'>
            {t('create_application')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default withLoading(CreateApplication);

