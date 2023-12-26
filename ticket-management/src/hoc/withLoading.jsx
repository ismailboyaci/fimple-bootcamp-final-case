import { useState } from 'react';
import {Loader} from '~/shared';

const withLoading = (WrappedComponent) => {
  return props => {
    const [loading, setLoading] = useState(false);
    return (
      <>
        {loading && (
          <Loader />
        )}
        <div className={loading ? 'blurred' : ''}>
          <WrappedComponent setLoading={setLoading} loading={loading} {...props} />
        </div>
      </>
    );
  }
};

export default withLoading;