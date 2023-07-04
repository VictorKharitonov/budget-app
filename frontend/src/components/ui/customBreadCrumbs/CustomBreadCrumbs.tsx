import React, {FC} from 'react';
import {useLocation} from 'react-router-dom';
import Typography from "@mui/material/Typography";
import {Breadcrumbs, BreadcrumbsProps} from "@mui/material";
import {LinkRouter} from "./LinkRouter";

interface CustomBreadCrumbs extends BreadcrumbsProps{
  pathNames: string[]
}

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

export default CustomBreadCrumbs;