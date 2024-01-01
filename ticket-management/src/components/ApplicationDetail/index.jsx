import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '~/styles/application-detail.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { categories, status } from '~/constants';
import * as yup from 'yup';
import { updateTicket, getTicketById } from '~/services';
import { useAuth } from '~/context';
import { useTranslation } from 'react-i18next';
import { useToastr } from '~/context';

const schema = yup.object().shape({
  solution: yup.string().required(),
  status: yup.string().required(),
});

const ApplicationDetail = () => {
  const { t } = useTranslation();
  const showToastr = useToastr();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const applicationId = searchParams.get('applicationId');
  const [ticketData, setTicketData] = useState();

  useEffect(() => {
    const getTicketData = async () => {
      const response = await getTicketById(applicationId);
      if (response.status === 200) {
        setTicketData(response.data.data);
      }
    };
    getTicketData();
  }, [applicationId]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const params = {
      solutions: [...ticketData?.solutions, data.solution],
      status: data.status,
      lastreply: user.email,
      updatedAt: new Date(),
    };
    const response = await updateTicket(applicationId, params);
    if (response.status === 200) {
      navigate('tickets');
    }
  };

  return (
    <div className='application-detail-wrapper'>
      <div className='application-info'>
        <div className='description-wrapper'>
          <div className='description-group'>
            <h3>{t('description')}</h3>
            <p>{ticketData?.description}</p>
          </div>
          <div className='attachments-group'>
            <h3>{t('attachment_files')}</h3>
            <div className='attachments'>
              {ticketData?.attachments.map((attachment, index) => (
                <a href={attachment} key={index} target='blank'>
                  {t('attachment')} {index + 1}
                </a>
              ))}
              {ticketData?.attachments.length === 0 && <p>{t('no_attachment')}</p>}
            </div>
          </div>
        </div>
        <div className='information-wrapper'>
          <h3>{t('details_application')}</h3>
          <div className='info-group'>
            <table>
              <tbody>
                <tr>
                  <td>{t('number_of')}</td>
                  <td>{ticketData?._id}</td>
                </tr>
                <tr>
                  <td>{t('name')} </td>
                  <td>{ticketData?.firstname + ' ' + ticketData?.lastname}</td>
                </tr>
                <tr>
                  <td>{t('status')}</td>
                  <td>{t(status.find((status) => status.id == ticketData?.status)?.name)}</td>
                </tr>
                <tr>
                  <td>{t('category')}</td>
                  <td>{t(categories.find((category) => category.id == ticketData?.subject)?.name || 'N/A')}</td>
                </tr>
                <tr>
                  <td>{t('create_date')}</td>
                  <td>{new Date(ticketData?.createdAt).toLocaleString()}</td>
                </tr>
                <tr>
                  <td>{t('last_update')}</td>
                  <td>{new Date(ticketData?.updatedAt || ticketData?.createdAt).toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className='form-wrapper'>
        <div className='form-group'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='form-row'>
              <div className='solution-col'>
                <label htmlFor='solution'>{t('solution')}</label>
                <textarea {...register('solution')} rows={5} />
                <p>{errors.solution?.message}</p>
              </div>
              <div className='submit-col'>
                <div className='form-status'>
                  <label htmlFor='status'>{t('status')}</label>
                  <select {...register('status')}>
                    {status.map((status) => (
                      <option value={status.id} key={status.id}>
                        {t(status.name)}
                      </option>
                    ))}
                  </select>
                  <p>{errors.status?.message}</p>
                </div>
                <div className='submit'>
                  <button className='button' type='submit'>
                    {t('submit')}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;

