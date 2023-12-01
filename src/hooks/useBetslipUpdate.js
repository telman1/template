import { useEffect, useLayoutEffect } from 'react';
import { clearUserBalance, getUserBalance, setBetslipData } from '../slices/sidebarSlice';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { betslipMethods } from '../utils/betslip';
import { isLoggedIn } from '../utils/common';
import { PAGE_TYPES, TIMEOUTS } from '../utils/constants';

export const useBetslipUpdate = starter => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isMobile, isMediumResolution, oddFormat, timeFormat, userBalance } = useSelector(
    ({ betslip, common }) => ({
      isMobile: common.isMobile,
      isMediumResolution: common.isMediumResolution,
      oddFormat: common.oddFormat,
      timeFormat: common.timeFormat,
      userBalance: betslip.userBalance,
    }),
    shallowEqual
  );

  const updateBetslip = betslipData => {
    dispatch(setBetslipData(betslipData));
  };

  useEffect(() => {
    betslipMethods.updateOddFormat(oddFormat);
  }, [oddFormat]);

  useEffect(() => {
    betslipMethods.updateTimeFormat(timeFormat);
  }, [timeFormat]);

  useEffect(() => {
    if (isMobile) {
      betslipMethods.changePageMode(PAGE_TYPES.MOBILE);
    } else {
      betslipMethods.changePageMode(PAGE_TYPES.DESKTOP);
    }
  }, [isMobile, isMediumResolution]);

  useLayoutEffect(() => {
    starter.addEventListener('betSlipUpdate', ({ data }) => {
      updateBetslip(data.betSlip);
    });
  }, []);

  useEffect(() => {
    starter.addEventListener('navigateToEvent', ({ data }) => {
      const {
        id,
        isLive,
        sportId,
        champId,
        countryId,
        isSuperTip,
        eventName,
        sportName,
        tournamentName,
        eventDate,
        team1,
        team2,
      } = data;
      // history.push({
      //   pathname: NEW_ROUTES.EVENT_DETAILS,
      //   search: `sport=${sportId}&country=${countryId}&champ=${champId}&event=${id}&supertip=${isSuperTip}&isLive=${isLive}`,
      //   queryAdditionalData: {
      //     eventName,
      //     sportName,
      //     tournamentName,
      //     eventDate,
      //     team1,
      //     team2,
      //   },
      // });
    });
    starter.addEventListener('openBetHistory', () => {
      // history.push(NEW_ROUTES.BET_HISTORY);
      starter.dispatchEvent('closeBetSlip');
    });
  }, []);

  useEffect(() => {
    starter.addEventListener('placeBetSuccess', () => {
      dispatch(getUserBalance());
    });
  }, []);

  useEffect(() => {
    let timeoutId = null;
    if (isLoggedIn() && userBalance) {
      betslipMethods.updateUserBalance(userBalance);
      timeoutId = setTimeout(() => {
        dispatch(getUserBalance());
        clearTimeout(timeoutId);
      }, TIMEOUTS.USER_BALANCE);
    } else if (!isLoggedIn() && userBalance) {
      dispatch(clearUserBalance());
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoggedIn, userBalance]);
};

export default useBetslipUpdate;
