import React, {FC} from 'react';
import cl from './Main.module.scss';

const Main: FC = () => {
  console.log(cl);
  return (
    <div>
      Main page
      <button className={cl.btnRed}>123</button>
    </div>
  );
};

export default Main;