import React, { FC, memo } from 'react';
import { Breadcrumbs, BreadcrumbsProps, Typography } from '@mui/material';
import { LinkRouter } from './LinkRouter';

interface CustomBreadCrumbs extends BreadcrumbsProps {
  pathNames: string[];
}

// eslint-disable-next-line
const CustomBreadCrumbs: FC<CustomBreadCrumbs> = ({ pathNames, ...props }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb" color={props.color}>
      {pathNames.map((value, index) => {
        const isLast = index === pathNames.length - 1;
        const to = `/${pathNames.slice(0, index + 1).join('/')}`;
        const label = `${decodeURI(pathNames.at(index) as string)}`;

        return isLast ? (
          <Typography color="text.secondary" key={to}>
            {label}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {label}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
};

export default memo(CustomBreadCrumbs);
