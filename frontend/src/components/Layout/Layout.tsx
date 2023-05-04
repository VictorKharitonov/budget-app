import React, {FC, PropsWithChildren} from 'react';
import {Container} from "@mui/material";

interface ILayoutProps extends PropsWithChildren {}

const Layout: FC<ILayoutProps> = ({children}) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

export default Layout;