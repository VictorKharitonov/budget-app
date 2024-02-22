import React, { FC, memo, useContext } from 'react';
import Logo from '../../images/logo.png';
import cl from './scss/navBar.module.scss';
import { AppBar, Box, Toolbar, Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import AddTransaction from '../../features/transaction/AddTransaction';
import CustomBreadCrumbs from '../ui/customBreadCrumbs/CustomBreadCrumbs';
import NavBarMobileMenu from './NavBarMobileMenu';
import { AuthContext, IAuthContext } from '../../context';
import { clearUserInfoAction } from '../../store/asyncActions';
import { useTypedSelector, useTypedDispatch, useRoutePath } from '../../hooks';

const NavBar: FC = () => {
  const pathNames = useRoutePath();
  const dispatch = useTypedDispatch();
  const { isAuth, setIsAuth } = useContext<IAuthContext>(AuthContext);
  const { user } = useTypedSelector(state => state.userInfo);

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('chatId');
    dispatch(clearUserInfoAction());
  };

  return (
    <AppBar position="static" className={cl.navBar}>
      <Container>
        <Toolbar disableGutters>
          <NavBarMobileMenu isAuth={isAuth} userName={user.name} logout={logout} pathNames={pathNames} />
          <Box className={cl.logoContainer} component={Link} to="/envelope">
            <img src={Logo} height="60px" width="60px" alt="logo" />
            <Typography variant="h4" className={cl.logoText}>
              Budget
            </Typography>
          </Box>
          {/** desktop **/}
          {isAuth && (
            <Typography className={cl.userId} variant="h6">
              {user.name}
            </Typography>
          )}
          {isAuth && <AddTransaction className={cl.transactionBtnText} />}
          <Box className={cl.breadCrumbsContainer}>
            <CustomBreadCrumbs color="black" pathNames={pathNames} />
          </Box>
          <Box color="primary" className={cl.authContainer}>
            {isAuth ? (
              <Button onClick={logout} variant="contained">
                Logout
              </Button>
            ) : (
              <Button component={Link} to="/sign-in" variant="contained">
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default memo(NavBar);
