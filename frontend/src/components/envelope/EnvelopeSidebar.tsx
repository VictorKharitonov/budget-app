import React, {useState, FC, useEffect} from 'react';
import {Divider, Grid, Box} from '@mui/material';
import {EnvelopeItem} from '../../types';
import EnvelopeList from './EnvelopeList';
import useFilter from '../../hooks/useFilter';
import ToolBar from '../toolBar/ToolBar';
import CustomModal from '../ui/modal/CustomModal';
import EnvelopeForm from './EnvelopeForm';
import {useNavigate, useLocation} from "react-router-dom"
import {getPathNames} from "../../utils/stringHelper";

interface EnvelopeSidebarProps {
  envelopes: EnvelopeItem[],
  setEnvelopes: (envelopes: EnvelopeItem[]) => void
}

const EnvelopeSidebar: FC<EnvelopeSidebarProps> = ({envelopes, setEnvelopes}) => {
  const [selectedEnvelopeId, setSelectedEnvelopeId] = useState<string>('');
  const [searchEnvelope, setSearchEnvelope] = useState<string>('');
  const [envelopeModal, setEnvelopeModal] = useState<boolean>(false);
  const envelopesByName = useFilter<EnvelopeItem>(searchEnvelope, envelopes, ['name']);
  const navigate = useNavigate();
  const location = useLocation();
  const pathNames: string[] = getPathNames(location);
  const currentEnvelopeId = pathNames.length > 1 ? pathNames[1] : null;

  useEffect(() => {
    if (currentEnvelopeId !== null) {
      setSelectedEnvelopeId(currentEnvelopeId);
    }
    if (envelopes.length !== 0 && currentEnvelopeId === null) {
      navigate(`/envelope/${envelopes[0].id}`);
    }
  }, [pathNames.length]);

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
          envelopes={envelopes}
          setEnvelopes={setEnvelopes}
          setEnvelopesModal={setEnvelopeModal}
        />
      </CustomModal>
    </Box>
  );
};

export default EnvelopeSidebar;
