import React, {useState, FC} from 'react';
import {Divider, Grid, Box} from '@mui/material';
import {IEnvelopeItem} from '../../types';
import EnvelopeList from './EnvelopeList';
import useFilter from '../../hooks/useFilter';
import ToolBar from '../toolBar/ToolBar';
import CustomModal from '../ui/modal/CustomModal';
import EnvelopeForm from './EnvelopeForm';

const Envelope: FC = () => {
  const [envelopes, setEnvelopes] = useState<IEnvelopeItem[]>([{'id': 'a', 'userId': 'test', 'name': 'jopa'},
    {'id': 'b', 'userId': 'test', 'name': 'salary'},
    {'id': 'c', 'userId': 'test', 'name': 'bar'},
    {'id': 'd', 'userId': 'test', 'name': 'negr'},
    {'id': 'f', 'userId': 'test', 'name': 'jop'}]);
  const [selectedEnvelopeId, setSelectedEnvelopeId] = useState<string>('');
  const [searchEnvelope, setSearchEnvelope] = useState<string>('');
  const [envelopeModal, setEnvelopeModal] = useState<boolean>(false);
  const [newEnvelope, setNewEnvelope] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const filteredEnvelopes = useFilter<IEnvelopeItem>(searchEnvelope, envelopes, ['name']);

  const setCurrentEnvelope = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    envelopeId: string
  ) => {
    setSelectedEnvelopeId(envelopeId);
  };

  const searchEnvelopeHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchEnvelope(e.target.value);
  };

  const newEnvelopeHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError(false);
    }

    setNewEnvelope(e.target.value);
  };

  const createEnvelope = () => {
    const envelope = newEnvelope.trim();

    if (!envelope) {
      setError(true);
      return;
    }

    setEnvelopes([{'id': 'g', 'userId': 'test', 'name': envelope}, ...envelopes]);
    setEnvelopeModal(!envelopeModal);
    setNewEnvelope('');
  };

  return (
    <Box sx={{flexGrow: 1, maxWidth: 550}}>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} md={6}>
          <ToolBar
            setModal={setEnvelopeModal}
            searchHandleChange={searchEnvelopeHandleChange}
            search={searchEnvelope}
          />
          <Divider/>
          <EnvelopeList
            envelopes={filteredEnvelopes}
            selectedEnvelopeId={selectedEnvelopeId}
            setCurrentEnvelope={setCurrentEnvelope}
          />
        </Grid>
      </Grid>
      <CustomModal
        title="Envelope"
        modal={envelopeModal}
        setModal={setEnvelopeModal}
      >
        <EnvelopeForm
          newItem={newEnvelope}
          newItemHandleChange={newEnvelopeHandleChange}
          createItem={createEnvelope}
          error={error}
        />
      </CustomModal>
    </Box>
  );
};

export default Envelope;