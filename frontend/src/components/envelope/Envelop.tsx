import React, {useState, FC} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {IEnvelopeItem} from '../../types';
import {Divider} from '@mui/material';
import EnvelopeList from './EnvelopeList';

const Envelope: FC = () => {
  const [envelopes, setEnvelopes] = useState<IEnvelopeItem[]>([{"id":"a","userId":"test","name":"jopa"},
    {"id":"b","userId":"test","name":"salary"},
    {"id":"c","userId":"test","name":"bar"},
    {"id":"d","userId":"test","name":"negr"}]);
  const [selectedEnvelopeId, setSelectedEnvelopeId] = useState<string>('');

  const setCurrentEnvelope = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    envelopeId: string
  ) => {
    setSelectedEnvelopeId(envelopeId);
  }

  return (
    <Box sx={{flexGrow: 1, maxWidth: 550}}>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={6}>
          <Divider/>
          <EnvelopeList
            envelopes={envelopes}
            selectedEnvelopeId={selectedEnvelopeId}
            setCurrentEnvelope={setCurrentEnvelope}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Envelope;