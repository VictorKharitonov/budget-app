import React, {FC} from 'react';
import cl from './Main.module.scss';
import Envelope from "../components/Envelope/Envelop";
import {Container} from "@mui/material";

const Main: FC = () => {
  console.log(cl);
  return (
    <Container>
      <Envelope/>
    </Container>
  );
};

export default Main;