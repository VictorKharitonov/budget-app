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
import {FC, useEffect, useState} from "react";
import CustomModal from "../modal/CustomModal";
import {EnvelopeItem, TransactionsItem} from "../../../types";
import {testEnvelopes} from "../../../mock";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {transactionScheme} from "../../../validations/transactionValidation";
import TransactionForm from "../../transaction/TransactionForm";
import {useTypedDispatch} from "../../../hooks/useTypedDispatch";
import {_createTransaction} from "../../../store/reducers/transactionsSlice";

const NavBar: FC = () => {
  const location = useLocation();
  const pathNames: string[] = getPathNames(location);
  const dispatch = useTypedDispatch();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [modal, setModal] = useState(false);
  const [envelopes, setEnvelopes] = useState<EnvelopeItem[]>(testEnvelopes);

  let defaultTransaction: TransactionsItem = {
    id: String(Math.random() * 1000),
    userId: 'test',
    category: [],
    envelop: [],
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
              <MenuItem>
                <Typography className={cl.userId} variant="h6">
                  test
                </Typography>
              </MenuItem>
              {pathNames.length > 0 &&
                <MenuItem onClick={handleCloseNavMenu}>
                    <CustomBreadCrumbs color="black" pathNames={pathNames}/>
                </MenuItem>
              }
              <MenuItem>
                <Button variant="contained" size="small" className={cl.transactionBtn} onClick={() => setModal(true)}>
                  <Typography variant="body1" className={cl.transactionBtnText}>
                    Transaction
                  </Typography>
                  <Icons.AddCircleIcon/>
                </Button>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Button component={Link} to="/Sign-up" variant="contained" size="small" fullWidth>
                  <Typography variant="body1" className={cl.transactionBtnText}>
                    Sign Up
                  </Typography>
                </Button>
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
          <Typography className={cl.userId} variant="h6">
            test
          </Typography>
          <Button variant="contained" size="small" className={cl.transactionBtn} onClick={() => setModal(true)}>
            <Typography variant="body1" className={cl.transactionBtnText}>
              Transaction
            </Typography>
            <Icons.AddCircleIcon/>
          </Button>
          <Box className={cl.breadCrumbsContainer}>
            <CustomBreadCrumbs color="black" pathNames={pathNames}/>
          </Box>
          <Box color="primary" className={cl.authContainer}>
            <Button component={Link} to="/sign-in" variant="contained">Login</Button>
          </Box>
        </Toolbar>
      </Container>
      <CustomModal title="Transaction" modal={modal} setModal={setModal}>
        <TransactionForm transactionForm={transactionForm} envelopes={envelopes} createTransaction={createTransaction}/>
      </CustomModal>
    </AppBar>
  );
}
export default NavBar;