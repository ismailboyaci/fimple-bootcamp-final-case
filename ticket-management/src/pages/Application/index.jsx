import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import withLoading from '~/hoc/withLoading';
import { status } from '~/constants';
import { ContentHeader } from '~/shared';
import { getTicketById } from '~/services';
import '~/styles/application.scss';
import { useTranslation } from 'react-i18next';

const Application = ({ setLoading, loading }) => {
  const { applicationId } = useParams();
  const [ticketData, setTicketData] = useState();
  const [hasData, setHasData] = useState(true);
  const { t } = useTranslation();
  useEffect(() => {
    setLoading(true);
    const getTicket = async () => {
      const result = await getTicketById(applicationId);
      if (result.status === 200) {
        setTicketData(result.data.data);
        setHasData(true);
      } else {
        setHasData(false);
      }
      setLoading(false);
    };
    getTicket();
  }, [applicationId]);

  return (
    <div className='application-wrapper'>
      <ContentHeader title={`${t('application_details')}`} prevPage='/' showPrevIcon={true} />
      <div className='application-container'>
        <div className='application-card'>
          <div className='application-card-header'>
            <div className='application-card-header-title'>{t('application')} - {applicationId}</div>
          </div>
          {!loading && (
            <div className='application-card-body'>
              {hasData ? (
                <>
                  <div className='application-info'>
                    <table>
                      <tbody>
                        <tr>
                          <td>{t('create_date')}:</td>
                          <td>{new Date(ticketData?.createdAt).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td>{t('last_update_date')}:</td>
                          <td>{new Date(ticketData?.updatedAt || ticketData?.createdAt).toLocaleString()}</td>
                        </tr>
                        <tr>
                          <td>{t('status')}:</td>
                          <td>{t(status.find((s) => s.id.toString() === ticketData?.status)?.name || 'N/A')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className='application-messages'>
                    <h3>{t('messages')}</h3>
                    {ticketData?.solutions.length ? (
                      <ul>
                      {ticketData?.solutions.map((message, index) => (
                        <li key={index}>{message}</li>
                      ))}
                    </ul>
                    ) : (
                      <div className='application-card-body-empty'>
                        <div className='application-card-body-empty-title'>
                          {t('no_message')}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className='application-card-body-empty'>
                  <div className='application-card-body-empty-title'>
                    {t('no_application')}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withLoading(Application);

