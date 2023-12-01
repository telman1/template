import { appConfig } from './helpers';

export const noop = () => {};

export const isLoggedIn = () => {
  const {
    globalSettings: { user },
  } = appConfig;
  return user.Id > 0;
};

export const openPage = url => {
  window.open(url, 'h2h', 'height=700,width=800,top=100,noopener');
};
