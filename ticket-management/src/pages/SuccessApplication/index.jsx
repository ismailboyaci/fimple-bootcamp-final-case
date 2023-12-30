import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { ContentHeader } from '~/shared';
import { getTicketById } from '~/services';
import '~/styles/successApplication.scss';
import withLoading from '~/hoc/withLoading';
import { useTranslation } from 'react-i18next';
const SuccessApplication =  ({setLoading}) => {
  const { applicationId } = useParams();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [applicationData, setApplicationData] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
    const getTicket = async () => {
      const result = await getTicketById(applicationId);
      if(result.status === 200) {
        setApplicationData(result.data.data);
      }
      setLoading(false);
      setIsDataLoaded(true);
    }
    getTicket();
  }, []);


  return (
    <div>
      <ContentHeader title={t('success_application_title')} prevPage="/" showPrevIcon={true} />
      {isDataLoaded && (
        <div className="success-page-wrapper">
        <div className="success-page">
          <h2>{t('thanks')}</h2>
          <p>
            {t('thanks_message')}
          </p>
          <ul>
            <li className='margin-top-15 margin-bottom-15'>
              <strong>{t('name_of')}:</strong> {applicationData?.firstname}
            </li>
            <li>
              <strong>{t('surname_of')}:</strong> {applicationData?.lastname}
            </li>
            <li>
              <strong>{t('date_of')}:</strong> {new Date(applicationData?.createdAt).toLocaleDateString()}
            </li>
            <li>
              <strong>{t('number_of')}:</strong> {applicationId}
            </li>
          </ul>
          <div className="note-section">
            <p>
              {t('ps')}: {t('ps_message')}
            </p>
          </div>
        </div>
      </div>)}
    </div>
  );
};

export default withLoading(SuccessApplication);
