import React, {useState, FC, useEffect} from 'react';
import {Divider, Grid, Box} from '@mui/material';
import {EnvelopeItem} from '../../types/envelopes';
import EnvelopeList from './EnvelopeList';
import useFilter from '../../hooks/useFilter';
import ToolBar from '../toolBar/ToolBar';
import CustomModal from '../ui/modal/CustomModal';
import EnvelopeForm from './EnvelopeForm';
import {useNavigate, useLocation} from "react-router-dom"
import {getPathNames} from "../../utils/stringHelper";

interface EnvelopeSidebarProps {
  envelopes: EnvelopeItem[],
  setEnvelopes: (envelopes: EnvelopeItem[]) => void,
  isTransactionsLoading: boolean
}

const EnvelopeSidebar: FC<EnvelopeSidebarProps> = ({envelopes, setEnvelopes, isTransactionsLoading}) => {
  const [selectedEnvelopeName, setSelectedEnvelopeName] = useState<string>('');
  const [searchEnvelope, setSearchEnvelope] = useState<string>('');
  const [envelopeModal, setEnvelopeModal] = useState<boolean>(false);
  const envelopesByName = useFilter<EnvelopeItem>(searchEnvelope, envelopes, ['name']);
  const navigate = useNavigate();
  const location = useLocation();
  const pathNames: string[] = getPathNames(location);
  const currentEnvelopeName = pathNames.length > 1 ? pathNames[1] : null;

  useEffect(() => {
    if (currentEnvelopeName !== null) {
      setSelectedEnvelopeName(decodeURI(currentEnvelopeName));
    }
    if (envelopes.length !== 0 && currentEnvelopeName === null) {
      navigate(`/envelope/${envelopes[0].name}`);
    }
  }, [pathNames.length]);

  const setCurrentEnvelope = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    envelopeId: string
  ) => {
    if (!isTransactionsLoading) {
      setSelectedEnvelopeName(envelopeId);
      navigate(`/envelope/${envelopeId}`);
    }
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
            selectedEnvelopeName={selectedEnvelopeName}
            setCurrentEnvelope={setCurrentEnvelope}
            isTransactionsLoading={isTransactionsLoading}
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
