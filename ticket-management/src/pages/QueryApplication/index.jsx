import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContentHeader } from '~/shared';
import '~/styles/query-application.scss';
import { useTranslation } from 'react-i18next';

const QueryApplication = () => {
  const { t } = useTranslation();
  const [applicationId, setApplicationId] = useState('');
  const navigate = useNavigate();

  const gotoAppllication = () => {
    navigate('/application/' + applicationId);
  };

  const handleChange = (e) => {
    setApplicationId(e.target.value);
  };
  return (
    <div className='query-application-rapper'>
      <ContentHeader title={t('query_application')} prevPage='/' showPrevIcon={true} />
      <div className='query-application-container'>
        <div className='query-application-card'>
          <div className='query-application-card-header'>
            <div className='query-application-card-header-title'>{t('query_application')}</div>
          </div>
          <div className='query-application-card-body'>
            <div className='query-application-card-body-title'>{t('number_of')}</div>
            <div className='query-application-card-body-input'>
              <input type='text' placeholder={t('enter_application_number')} onChange={(e) => handleChange(e)} />
            </div>
            <div className='query-application-card-body-button'>
              <button className='button' onClick={gotoAppllication}>
                {t('query')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryApplication;
