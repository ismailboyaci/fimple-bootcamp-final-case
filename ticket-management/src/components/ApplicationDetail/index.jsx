import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import '~/styles/application-detail.scss';
import { useApplications } from '~/hooks';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { categories, status } from '~/constants';
import * as yup from 'yup';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '~/services';
import { useAuth } from "~/context";

const schema = yup.object().shape({
  solution: yup.string().required(),
  status: yup.string().required(),
});

const ApplicationDetail = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const applicationId = searchParams.get('applicationId');

  const { ticketsData } = useApplications(applicationId);
  const [applicationData, setApplicationData] = useState(null);

  useEffect(() => {
    setApplicationData(ticketsData[0]);
    console.log(ticketsData[0]);
  }, [ticketsData]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const ticketRef = doc(db, "applications", applicationId);
    console.log(ticketRef)
    try {
      await updateDoc(ticketRef, {
        solutionDescription: applicationData.solutionDescription.concat(data.solution),
        status: data.status,
        isSolved: true,
        updatedAt: Number(new Date()),
        lastReplier: user.email
      });
    } catch (error) {
      console.log(error);
    }finally{
      console.log('finally');
  };
}

  return (
    <div className='application-detail-wrapper'>
      <div className='application-info'>
        <div className='description-wrapper'>
          <div className='description-group'>
            <h3>Description</h3>
            <p>{applicationData?.applicationDescription}</p>
          </div>
          <div className='attachments-group'>
            <h3>Attachments</h3>
            <div className='attachments'>
              {applicationData?.attachments.map((attachment, index) => (
                <a href={attachment} key={index} target='blank'>
                  Attachment {index + 1}
                </a>
              ))}
              {applicationData?.attachments.length === 0 && <p>No attachments</p>}
            </div>
          </div>
        </div>
        <div className='information-wrapper'>
          <h3>Applications Details</h3>
          <div className='info-group'>
            <table>
              <tbody>
                <tr>
                  <td>Application ID</td>
                  <td>{applicationData?.id}</td>
                </tr>
                <tr>
                  <td>Creator </td>
                  <td>{applicationData?.firstName + ' ' + applicationData?.lastName}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>{applicationData?.isSolved ? 'Solved' : 'Unsolved'}</td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td>{categories.find((category) => category.id == applicationData?.applicationSubject)?.name || 'N/A'}</td>
                </tr>
                <tr>
                  <td>Created Date</td>
                  <td>{new Date(applicationData?.createdAt).toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Last Update Date</td>
                  <td>{new Date(applicationData?.updatedAt).toLocaleString()}</td>
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
                <label htmlFor='solution'>Solution</label>
                <textarea {...register('solution')} rows={5} />
                <p>{errors.solution?.message}</p>
              </div>
              <div className='submit-col'>
                <div className='form-status'>
                  <label htmlFor='status'>Status</label>
                  <select {...register('status')}>
                    {status.map((status) => (
                      <option value={status.id} key={status.id}>
                        {status.name}
                      </option>
                    ))}
                  </select>
                  <p>{errors.status?.message}</p>
                </div>
                <div className='submit'>
                  <button className='button' type='submit'>
                    Submit
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
