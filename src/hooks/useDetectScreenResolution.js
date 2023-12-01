import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setIsMobile } from '../slices/commonSlice';
import { MOBILE_SIZE } from '../utils/constants';

const useDetectScreenResolution = () => {
  const dispatch = useDispatch();

  const onResize = () => {
    let screenWidth = document.documentElement.clientWidth;
    const isMobile = screenWidth < MOBILE_SIZE;
    dispatch(setIsMobile(isMobile));
  };

  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  return () => {};
};

export default useDetectScreenResolution;
