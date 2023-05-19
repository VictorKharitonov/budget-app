import React, {useState, FC} from 'react';
import {Divider, Grid, Box} from '@mui/material';
import {EnvelopeItem} from '../../types';
import EnvelopeList from './EnvelopeList';
import useFilter from '../../hooks/useFilter';
import ToolBar from '../toolBar/ToolBar';
import CustomModal from '../ui/modal/CustomModal';
import EnvelopeForm from './EnvelopeForm';
import {useNavigate} from "react-router-dom"

interface EnvelopesProps {
  envelopes: EnvelopeItem[],
  setEnvelopes: (envelopes: EnvelopeItem[]) => void
}

const Envelope: FC<EnvelopesProps> = ({envelopes, setEnvelopes}) => {
  const [selectedEnvelopeId, setSelectedEnvelopeId] = useState<string>('');
  const [searchEnvelope, setSearchEnvelope] = useState<string>('');
  const [envelopeModal, setEnvelopeModal] = useState<boolean>(false);
  const [newEnvelope, setNewEnvelope] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const envelopesByName = useFilter<EnvelopeItem>(searchEnvelope, envelopes, ['name']);
  const navigate = useNavigate();

  const setCurrentEnvelope = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    envelopeId: string
  ) => {
    setSelectedEnvelopeId(envelopeId);
    navigate(`/envelope/${envelopeId}`);
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

    setEnvelopes([{'id': String(Math.random() * 1000), 'userId': 'test', 'name': envelope}, ...envelopes]);
    setEnvelopeModal(false);
    setNewEnvelope('');
  };

  return (
    <Box sx={{flexGrow: 1, maxWidth: 'fit-content'}}>
      <Grid container spacing={2}>
        <Grid item>
          <ToolBar
            setModal={setEnvelopeModal}
            searchHandleChange={searchEnvelopeHandleChange}
            search={searchEnvelope}
          />
          <Divider/>
          <EnvelopeList
            envelopes={envelopesByName}
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