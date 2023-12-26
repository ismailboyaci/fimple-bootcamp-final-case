import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { ContentHeader } from '~/shared'
import '~/styles/query-application.scss'

const QueryApplication = () => {
    const [applicationId, setApplicationId] = useState('')
    const navigate = useNavigate();

    const gotoAppllication = () => {
        navigate('/application/' + applicationId);
    }

    const handleChange = (e) => {
        setApplicationId(e.target.value)
    }
  return (
    <div className='query-application-rapper'>
        <ContentHeader title='Başvuru Sorgula'  prevPage="/" showPrevIcon={true}/>
        <div className='query-application-container'>
            <div className='query-application-card'>
                <div className='query-application-card-header'>
                    <div className='query-application-card-header-title'>
                        Başvuru Sorgula
                    </div>
                </div>
                <div className='query-application-card-body'>
                    <div className='query-application-card-body-title'>
                        Başvuru Numarası
                    </div>
                    <div className='query-application-card-body-input'>
                        <input type='text' placeholder='Başvuru numarasını giriniz' onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className='query-application-card-body-button'>
                        <button className='button' onClick={gotoAppllication}>Sorgula</button>
                    </div>
                </div>
            </div>
            </div>
    </div>
  )
}

export default QueryApplication