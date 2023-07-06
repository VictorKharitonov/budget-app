import React, {FC, useContext, useEffect, useState} from 'react';
import {Box, Button, Container, Grid, Paper, Typography} from '@mui/material';
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Login as LoginT} from "../types/login";
import {loginScheme} from "../validations/loginValidation";
import Input from "../components/ui/input/Input";
import {fetchUserByChatId} from "../store/asyncActions/fetchUserByChatIdAction";
import {useTypedDispatch} from "../hooks/useTypedDispatch";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {AuthContext, IAuthContext} from "../context";

const Login: FC = () => {
  const dispatch = useTypedDispatch();
  const {setIsAuth} = useContext<IAuthContext>(AuthContext);
  const {user, error} = useTypedSelector(state => state.userInfo);

  let defaultValue: LoginT = {
    chatId: '',
  };

  const {handleSubmit, control,  formState: {errors}} = useForm<LoginT>({
    defaultValues: defaultValue,
    resolver: yupResolver(loginScheme),
  });

  const fetchUser: SubmitHandler<LoginT> = (data: LoginT) => {
    const { chatId } = data;

    if (typeof chatId === 'number') {
      dispatch(fetchUserByChatId(chatId));
    }
  };

  useEffect(() => {
    if (user.chatId) {
      localStorage.setItem('chatId', JSON.stringify(user.chatId));
      setIsAuth(true);
    }
  }, []);

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
              sx={{ mb: 1}}
              autoComplete="off"
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
            >
              <Typography variant="body1">Login</Typography>
            </Button>
            {
              error &&
              <Typography variant="body1" color="error">User not found</Typography>
            }
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;