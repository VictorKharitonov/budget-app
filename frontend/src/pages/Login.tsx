import React, { FC, useContext, useEffect } from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ILogin } from '../types/login';
import { loginScheme } from '../validations/loginValidation';
import Input from '../components/ui/input/Input';
import { fetchUserByChatIdAction } from '../store/asyncActions';
import { useTypedSelector, useTypedDispatch } from '../hooks/index';

import { AuthContext, IAuthContext } from '../context';
import Link from '@mui/material/Link';

const Login: FC = () => {
  const dispatch = useTypedDispatch();
  const { setIsAuth } = useContext<IAuthContext>(AuthContext);
  const { user, error } = useTypedSelector(state => state.userInfo);

  let defaultValue: ILogin = {
    chatId: ''
  };

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<ILogin>({
    defaultValues: defaultValue,
    resolver: yupResolver(loginScheme)
  });

  const fetchUser: SubmitHandler<ILogin> = async (data: ILogin) => {
    const { chatId } = data;

    if (typeof chatId === 'number') {
      dispatch(fetchUserByChatIdAction(chatId));
    }
  };

  useEffect(() => {
    if (user.chatId) {
      localStorage.setItem('chatId', String(user.chatId));
      setIsAuth(true);
    }
  }, [setIsAuth, user.chatId]);

  return (
    <Container>
      <Grid container justifyContent="center" mt={5}>
        <Grid item xs={12} sm={4}>
          <Box component="form" onSubmit={handleSubmit(fetchUser)}>
            <Input
              name="chatId"
              label="Chat Id"
              control={control}
              errors={errors.chatId}
              autoFocus={true}
              placeholder="1473184514"
              sx={{ mb: 1 }}
              autoComplete="off"
            />
            <Button fullWidth variant="contained" type="submit">
              <Typography variant="body1">Login</Typography>
            </Button>
            {error && (
              <Typography variant="body1" color="error">
                User not found
              </Typography>
            )}
            <Link href="https://web.telegram.org/a/#6120708817" target="_blank" variant="subtitle1" sx={{ mb: 1 }}>
              Get chat id from Telegram Bot
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
