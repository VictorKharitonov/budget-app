import { Location } from 'react-router-dom';

export const fcLatter = (str: string): string => str.replace(str[0], str[0].toUpperCase());

export const getPathNames = (location: Location): string[] => {
  return location.pathname.split('/').filter(path => path);
};
