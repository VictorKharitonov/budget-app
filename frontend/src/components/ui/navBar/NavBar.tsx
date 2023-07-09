import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CustomBreadCrumbs from "../customBreadCrumbs/CustomBreadCrumbs";
import cl from './scss/navBar.module.scss';
import {Button, IconButton, Menu, MenuItem} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import Logo from "../../../images/logo.png";
import Icons from '../Icons';
import {getPathNames} from "../../../utils/stringHelper";
import {FC, useContext, useEffect, useState} from "react";
import CustomModal from "../modal/CustomModal";
import {EnvelopeItem} from "../../../types/envelopes";
import {testEnvelopes} from "../../../mock";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {transactionScheme} from "../../../validations/transactionValidation";
import TransactionForm from "../../transaction/TransactionForm";
import {useTypedDispatch} from "../../../hooks/useTypedDispatch";
import {_createTransaction} from "../../../store/reducers/transactionsSlice";
import {TransactionsItem} from "../../../types/transactions";
import {AuthContext, IAuthContext} from "../../../context";
import {clearUserInfo} from "../../../store/reducers/userInfoSlice";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

const NavBar: FC = () => {
  const location = useLocation();
  const pathNames: string[] = getPathNames(location);
  const dispatch = useTypedDispatch();
  const {isAuth, setIsAuth} = useContext<IAuthContext>(AuthContext);
  const {user, isLoading} = useTypedSelector(state => state.userInfo);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [modal, setModal] = useState(false);
  const [envelopes, setEnvelopes] = useState<EnvelopeItem[]>(testEnvelopes);

  let defaultTransaction: TransactionsItem = {
    _id: 'test',
    userId: 'test',
    currency: 'dollar',
    categories: [],
    envelopes: [],
    amount: 0,
    date: Date.now(),
    description: '',
    type: 'income'
  }

  const transactionForm = useForm<TransactionsItem>({
    defaultValues: defaultTransaction,
    resolver: yupResolver(transactionScheme),
  });

  useEffect(() => {
    transactionForm.reset();
  }, [modal]);

  const createTransaction: SubmitHandler<TransactionsItem> = (data: TransactionsItem) => {
    dispatch(_createTransaction(data));
    setModal(false);
  };

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem('chatId');
    dispatch(clearUserInfo());
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" className={cl.navBar}>
      <Container>
        <Toolbar disableGutters>
          <Box className={cl.navMenu}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <Icons.MenuIcon/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {
                isAuth &&
                <MenuItem>
                    <Typography className={cl.userId} variant="h6">
                      {user.name}
                    </Typography>
                </MenuItem>
              }
              {pathNames.length > 0 &&
              <MenuItem onClick={handleCloseNavMenu}>
                  <CustomBreadCrumbs color="black" pathNames={pathNames}/>
              </MenuItem>
              }
              {
                isAuth &&
                <MenuItem>
                    <Button
                        disabled={isLoading && !user.envelopes.length}
                        variant="contained"
                        size="small"
                        className={cl.transactionBtn}
                        onClick={() => setModal(true)}
                    >
                        <Typography variant="body1" className={cl.transactionBtnText}>
                            Transaction
                        </Typography>
                        <Icons.AddCircleIcon/>
                    </Button>
                </MenuItem>
              }
              <MenuItem onClick={handleCloseNavMenu}>
                <Box color="primary" className={cl.authContainer}>
                  {
                    isAuth
                      ? <Button onClick={handleLogout} variant="contained" fullWidth={true}>Logout</Button>
                      : <Button component={Link} to="/sign-in" variant="contained" fullWidth={true}>Login</Button>
                  }
                </Box>
              </MenuItem>
            </Menu>
          </Box>
          <Box className={cl.logoContainer} component={Link} to="/envelope">
            <img src={Logo} height="60px" width="60px" alt="logo"/>
            <Typography variant="h4" className={cl.logoText}>
              Budget
            </Typography>
          </Box>
          {/** desktop **/}
          {
            isAuth &&
            <Typography className={cl.userId} variant="h6">
              {user.name}
            </Typography>
          }
          {
            isAuth &&
            <Button
                disabled={isLoading && !user.envelopes.length}
                variant="contained" size="small"
                className={cl.transactionBtn}
                onClick={() => setModal(true)}
            >
                <Typography variant="body1" className={cl.transactionBtnText}>
                    Transaction
                </Typography>
                <Icons.AddCircleIcon/>
            </Button>
          }
          <Box className={cl.breadCrumbsContainer}>
            <CustomBreadCrumbs color="black" pathNames={pathNames}/>
          </Box>
          <Box color="primary" className={cl.authContainer}>
            {
              isAuth
                ? <Button onClick={handleLogout} variant="contained">Logout</Button>
                : <Button component={Link} to="/sign-in" variant="contained">Login</Button>
            }
          </Box>
        </Toolbar>
      </Container>
      <CustomModal title="Transaction" modal={modal} setModal={setModal}>
        <TransactionForm transactionForm={transactionForm} envelopes={user.envelopes}
                         createTransaction={createTransaction}/>
      </CustomModal>
    </AppBar>
  );
}
export default NavBar;