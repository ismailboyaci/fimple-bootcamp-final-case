import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { ContentHeader } from '~/shared';
import { doc, getDoc } from "firebase/firestore";
import { db } from '~/services';
import '~/styles/SuccessApplication.scss';

const SuccessApplication =  () => {
  const { applicationId } = useParams();
  const [applicationData, setApplicationData] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "applications", applicationId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setApplicationData(docSnap.data());
        setIsDataLoaded(true);
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <ContentHeader title="Success Application" prevPage="/create-application" showPrevIcon={true} />
      {isDataLoaded && (
        <div className="success-page-wrapper">
        <div className="success-page">
          <h2>Teşekkürler!</h2>
          <p>
            Başvurunuz başarıyla alındı. Başvuru detayları aşağıda yer almaktadır.
          </p>
          <ul>
            <li>
              <strong>Adı:</strong> {applicationData?.firstName}
            </li>
            <li>
              <strong>Soyadı:</strong> {applicationData?.lastName}
            </li>
            <li>
              <strong>Başvuru Tarihi:</strong> {new Date(applicationData?.createdAt).toLocaleDateString()}
            </li>
            <li>
              <strong>Başvuru Numarası:</strong> {applicationId}
            </li>
          </ul>
          <div className="note-section">
            <p>
              Not: Başvurularınızı bu numara ile takip edebilirsiniz. Lütfen bu numarayı not ediniz.
            </p>
          </div>
        </div>
      </div>)}
    </div>
  );
};

export default SuccessApplication;
