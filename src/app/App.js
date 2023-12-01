import React, { memo, Suspense, useEffect } from 'react';
import useDetectScreenResolution from '../hooks/useDetectScreenResolution';
import 'react-loading-skeleton/dist/skeleton.css';
import './../assets/styles/sidebar.css';
import './../assets/styles/main.css';
import { Route } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import Loading from '../components/Loading';
import { getData } from '../slices/commonSlice';
import { useDispatch, useSelector } from 'react-redux';

const Home = React.lazy(() => import('../features/home/Home'));
const Sidebar = React.lazy(() => import('../features/sidebar/Sidebar'));

const App = ({ config = null }) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.common.loading);
  useEffect(() => {
    dispatch(getData());
  }, []);

  useDetectScreenResolution();

  if (loading) {
    return (
      <div style={{ background: 'gray' }}>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <Suspense fallback={<Loading height={30} count={5} />}>
        <Sidebar />
        <Route exact path={[ROUTES.HOME]} render={props => <Home {...props} />} />
      </Suspense>
    </div>
  );
};

export default memo(App);
