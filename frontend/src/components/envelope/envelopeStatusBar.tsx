import React, { FC, memo, useEffect, useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import cl from '../envelope/scss/Envelope.module.scss';
import { EnvelopeItem } from '../../types/envelopes';

interface EnvelopeStatusBarProps {
  isLoading: boolean;
  onChange: (status: string) => Promise<void>;
  currentEnvelope: EnvelopeItem | undefined;
}

const EnvelopeStatusBar: FC<EnvelopeStatusBarProps> = ({ isLoading, onChange, currentEnvelope }) => {
  const [status, setStatus] = useState<string>('');

  const handleChangeStatus = (event: React.MouseEvent<HTMLElement>, newStatus: string) => {
    if (newStatus !== null) {
      setStatus(newStatus);
      onChange(newStatus);
    }
  };

  useEffect(() => {
    if (currentEnvelope) {
      setStatus(currentEnvelope.status);
    }
  }, [currentEnvelope]);

  return (
    <ToggleButtonGroup
      disabled={isLoading}
      color="primary"
      value={status}
      exclusive
      onChange={handleChangeStatus}
      size="small"
      className={cl.toggleGroup}
      sx={{ mr: 1 }}
    >
      <ToggleButton value="open" color="success" className={cl.toggleGroup__btn}>
        Open
      </ToggleButton>
      <ToggleButton value="closed" color="error" className={cl.toggleGroup__btn}>
        Closed
      </ToggleButton>
      <ToggleButton value="frozen" color="info" className={cl.toggleGroup__btn}>
        Frozen
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default memo(EnvelopeStatusBar);
