import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

export const useAppConfigUpdater = config => {
  const dispatch = useDispatch();
  const { oddFormat, timeFormat } = useSelector(
    ({ common, betslip }) => ({
      oddFormat: common.oddFormat,
      timeFormat: common.timeFormat,
    }),
    shallowEqual
  );

  useEffect(() => {
    // if (!timeFormat) {
    //   const initialTimeFormat = getTimeFormat();
    //   dispatch(setTimeFormat(initialTimeFormat));
    // }
    // if (!oddFormat) {
    //   const oddFormatsList = getOddFormats();
    //   dispatch(setOddFormat(config.globalSettings?.user.UserSetting.OddFormat || oddFormatsList[0].id));
    // }
    // if (isLoggedIn()) {
    //   dispatch(getUserBalance());
    //   const timeoutId = setInterval(() => {
    //     dispatch(getUserBalance());
    //   }, TIMEOUTS.USER_BALANCE);
    //   return () => {
    //     clearInterval(timeoutId);
    //   };
    // }
  }, []);
};
export default useAppConfigUpdater;
