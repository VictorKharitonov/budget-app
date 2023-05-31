import Link, {LinkProps} from "@mui/material/Link";
import {Link as RouterLink} from "react-router-dom";
import React, {FC} from "react";

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

export const LinkRouter: FC<LinkRouterProps> = ({ ...props }) => {
  return <Link {...props} component={RouterLink as any} />;
}