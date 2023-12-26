import React, { useCallback } from 'react';
import { ContentHeader } from '~/shared';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db, storage } from '~/services';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import '~/styles/CreateApplication.scss';
import { useToastr } from '~/context';
import { useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone';

const schema = yup.object({
  firstName: yup.string().required('Bu alan zorunludur.'),
  lastName: yup.string().required('Bu alan zorunludur.'),
  email: yup.string().email().required('Bu alan zorunludur.'),
  tckn: yup.string().length(11, 'TCKN 11 haneli olmalıdır.').required('Bu alan zorunludur.'),
  adress: yup.string().required('Bu alan zorunludur.'),
  description: yup.string().min(60).required('Bu alan zorunludur.'),
  attachments: yup.array()
});

const CreateApplication = () => {
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
    append(
      acceptedFiles.map((files) => ({ files, name: files.name, size: files.size })),
    )};
      

  const onSubmit = async (data) => {
    console.log('Form Data:', data); // Form verilerini kontrol et
    console.log('Fields:', fields);
    const docId = new Date().getTime().toString();
    try {
      const uploadedUrls = await Promise.all(fields.map((item, index) => uploadAttachments(item, docId)));

      data.attachments = uploadedUrls;
      const docCollection = collection(db, 'applications');
      const docRef = doc(docCollection, docId);

      await setDoc(docRef, {
        applicationDescription: data.description,
        applicationSubject: '1',
        createdAt: Number(new Date()),
        updatedAt: Number(new Date()),
        email: data.email,
        firstName: data.firstName,
        id: docId,
        lastName: data.lastName,
        tckn: data.tckn,
        attachments: data.attachments,
        isSolved: false,
        solutionDescription: '',
      })
        .then(() => {
          showToastr('success', 'Başvuru başarıyla oluşturuldu.');
          navigate(`/application-success/${docId}`);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error('Hata:', error.message);
    }
  };

  const uploadAttachments = async (attachments, docId) => {
    console.log(attachments);
    const storageRef = ref(storage, `/${docId}/${attachments.name}`);
    const uploadTask = uploadBytesResumable(storageRef, attachments.files);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log('Upload is complete');
            resolve(url);
          });
        },
      );
    });
  };

  return (
    <div className='create-application-wrapper'>
      <ContentHeader title='Başvuru Oluştur' prevPage='/' showPrevIcon={true} />
      <div className='form-wrapper'>
        <form onSubmit={handleSubmit(onSubmit)} className='application-form'>
          <div className='form-name-group'>
            <div className='form-group'>
              <label>Ad</label>
              <input {...register('firstName')} />
              <p className='error-message'>{errors.firstName?.message}</p>
            </div>
            <div className='form-group'>
              <label>Soyad</label>
              <input {...register('lastName')} />
              <p className='error-message'>{errors.lastName?.message}</p>
            </div>
          </div>
          <div className='form-email-group'>
            <div className='form-group'>
              <label>Email</label>
              <input {...register('email')} />
              <p className='error-message'>{errors.email?.message}</p>
            </div>
            <div className='form-group'>
              <label>TCKN</label>
              <input {...register('tckn')} />
              <p className='error-message'>{errors.tckn?.message}</p>
            </div>
          </div>
          <div className='form-group'>
            <label>Adres</label>
            <textarea {...register('adress')} />
            <p className='error-message'>{errors.adress?.message}</p>
          </div>
          <div className='form-group'>
            <label>Açıklama</label>
            <textarea {...register('description')} rows={3} />
            <p className='error-message'>{errors.description?.message}</p>
          </div>
          <div className='form-group'>
            <label>Ek Dosyalar</label>
            <Dropzone onDrop={onDrop}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className='dropzone'>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              )}
            </Dropzone>
            <p className='error-message'>{errors.attachments?.message}</p>
            <ul>
              {fields.map((item, index) => (
                <li key={item.id}>
                  <span>{item.name}</span>
                  <button type='button' onClick={() => remove(index)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button className='button w-100 justify-content-center' type='submit'>
            Başvuru Oluştur
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateApplication;

