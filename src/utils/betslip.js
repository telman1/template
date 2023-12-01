import { noop } from './common';

export const betslipMethods = {
  chequeRedactOrder: noop,
  loadBookedBet: noop,
  loadExpressOfTheDay: noop,
  repeatTheBet: noop,
  setSportTournamentMode: noop,
  toggleStake: noop,
  openSystemCalculator: noop,
  updateDateFormat: noop,
  updateOddFormat: noop,
  updateTimeFormat: noop,
  updateUserBalance: noop,
  bookBet: noop,
  clearBetSlip: noop,
};

export const generateBetslipListeners = starter => {
  const generatedMethods = {
    updateUserBalance: userBalance => {
      starter.dispatchEvent('updateUserBalance', userBalance);
    },
    loadExpressOfTheDay: expressId => {
      starter.dispatchEvent('loadExpressOfTheDay', expressId);
    },
    toggleStake: stakeData => {
      starter.dispatchEvent('toggleStake', stakeData);
    },
    openSystemCalculator: () => {
      starter.dispatchEvent('openSystemCalculator');
    },
    chequeRedactOrder: orderId => {
      starter.dispatchEvent('chequeRedactOrder', orderId);
    },
    repeatTheBet: (betNumber, gameType) => {
      starter.dispatchEvent('repeatTheBet', { betnumber: betNumber, gameType });
    },
    bookBet: bookingNumber => {
      starter.dispatchEvent('bookBet', bookingNumber);
    },
    clearBetSlip: () => {
      starter.dispatchEvent('clearBetSlip');
    },
    openBetSlip: () => {
      starter.dispatchEvent('openBetSlip');
    },
    closeBetSlip: () => {
      starter.dispatchEvent('closeBetSlip');
    },
    changePageMode: type => {
      starter.dispatchEvent('changePageMode', type);
    },
    updateOddFormat: oddFormat => {
      starter.dispatchEvent('updateOddFormat', oddFormat);
    },
    updateTimeFormat: timeFormat => {
      starter.dispatchEvent('updateTimeFormat', timeFormat);
    },
    toggleBetSlipVisibility: isHidden => {
      starter.dispatchEvent('toggleBetSlipVisibility', isHidden);
    },
  };

  Object.assign(betslipMethods, generatedMethods);
};
