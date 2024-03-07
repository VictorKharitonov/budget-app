import React, { useState, FC, useEffect, memo } from 'react';
import cl from './scss/Envelope.module.scss';
import { Divider, Box } from '@mui/material';
import { EnvelopeItem } from '../../types/envelopes';
import { User } from '../../types/user';
import { EnvelopeList, EnvelopeToolBar, EnvelopeForm } from './index';
import CustomModal from '../ui/modal/CustomModal';
import { useNavigate } from 'react-router-dom';
import { updateUserInfoAction } from '../../store/asyncActions';
import { useRoutePath, useTypedDispatch, useFilter } from '../../hooks/index';

interface EnvelopeSidebarProps {
  user: User;
}

const EnvelopeSidebar: FC<EnvelopeSidebarProps> = ({ user }) => {
  const [selectedEnvelopeName, setSelectedEnvelopeName] = useState<string>('');
  const [searchEnvelope, setSearchEnvelope] = useState<string>('');
  const [envelopeModal, setEnvelopeModal] = useState<boolean>(false);
  const [createEnvelopeLoading, setCreateEnvelopeLoading] = useState<boolean>(false);
  const dispatch = useTypedDispatch();
  const envelopesByName = useFilter<EnvelopeItem>(searchEnvelope, user.envelopes, ['name']);
  const navigate = useNavigate();
  const pathNames: string[] = useRoutePath();
  const currentEnvelopeName = pathNames.length > 1 ? pathNames[1] : null;

  const createEnvelope = async (data: EnvelopeItem) => {
    setCreateEnvelopeLoading(true);
    setEnvelopeModal(false);
    await dispatch(
      updateUserInfoAction({
        userId: user._id,
        envelopes: [data, ...user.envelopes],
        categories: user.categories
      })
    );
    setCreateEnvelopeLoading(false);
  };

  useEffect(() => {
    if (currentEnvelopeName !== null) {
      setSelectedEnvelopeName(decodeURI(currentEnvelopeName));
    }
    if (user.envelopes.length !== 0 && currentEnvelopeName === null) {
      navigate(`/envelope/${user.envelopes[0].name}`);
    }
  }, [currentEnvelopeName, user.envelopes, navigate]);

  const setCurrentEnvelope = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, envelopeId: string) => {
    setSelectedEnvelopeName(envelopeId);
    navigate(`/envelope/${envelopeId}`);
  };

  const searchEnvelopeHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchEnvelope(e.target.value);
  };

  return (
    <Box className={cl.envelopeSideBar}>
      <EnvelopeToolBar
        createEnvelopeLoading={createEnvelopeLoading}
        setModal={setEnvelopeModal}
        searchHandleChange={searchEnvelopeHandleChange}
        search={searchEnvelope}
      />
      <Divider />
      <EnvelopeList
        envelopes={envelopesByName}
        selectedEnvelopeName={selectedEnvelopeName}
        setCurrentEnvelope={setCurrentEnvelope}
      />
      <CustomModal title="Envelope" modal={envelopeModal} setModal={setEnvelopeModal}>
        <EnvelopeForm onSubmit={createEnvelope} envelopes={user.envelopes} />
      </CustomModal>
    </Box>
  );
};

export default memo(EnvelopeSidebar);
