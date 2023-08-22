import React, {useState, FC, useEffect} from 'react';
import {Divider, Box} from '@mui/material';
import {EnvelopeItem} from '../../types/envelopes';
import EnvelopeList from './EnvelopeList';
import useFilter from '../../hooks/useFilter';
import ToolBar from '../toolBar/ToolBar';
import CustomModal from '../ui/modal/CustomModal';
import EnvelopeForm from './EnvelopeForm';
import {useNavigate, useLocation} from "react-router-dom"
import {getPathNames} from "../../utils/stringHelper";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {envelopeScheme} from "../../validations/envelopeValidation";
import {UserInfo} from "../../types/user";
import {useTypedDispatch} from "../../hooks/useTypedDispatch";
import {updateUserInfo} from "../../store/asyncActions/updateUserInfoAction";
import cl from "./scss/Envelope.module.scss";

interface EnvelopeSidebarProps {
  envelopes: EnvelopeItem[];
  userInfo: UserInfo;
  isTransactionsLoading: boolean;
}

const EnvelopeSidebar: FC<EnvelopeSidebarProps> = ({envelopes, userInfo, isTransactionsLoading}) => {
  const [selectedEnvelopeName, setSelectedEnvelopeName] = useState<string>('');
  const [searchEnvelope, setSearchEnvelope] = useState<string>('');
  const [envelopeModal, setEnvelopeModal] = useState<boolean>(false);
  const [createEnvelopeLoading, setCreateEnvelopeLoading] = useState<boolean>(false);
  const {user} = userInfo;
  const dispatch = useTypedDispatch();
  const envelopesByName = useFilter<EnvelopeItem>(searchEnvelope, envelopes, ['name']);
  const navigate = useNavigate();
  const location = useLocation();
  const pathNames: string[] = getPathNames(location);
  const currentEnvelopeName = pathNames.length > 1 ? pathNames[1] : null;
  let defaultValue: EnvelopeItem = {
    name: '',
    status: 'open'
  }

  const envelopeCreateForm = useForm<EnvelopeItem>({
    defaultValues: defaultValue,
    resolver: yupResolver(envelopeScheme),
    context: {
      envelopes: [...user.envelopes].map(envelope => envelope.name)
    }
  });

  const createEnvelope: SubmitHandler<EnvelopeItem> = (data: EnvelopeItem) => {
    setCreateEnvelopeLoading(true);
    setEnvelopeModal(false);
    dispatch(updateUserInfo({
      userId: user._id,
      envelopes: [data, ...user.envelopes],
      categories: user.categories
    })).finally(() => setCreateEnvelopeLoading(false));
    envelopeCreateForm.reset();
  }

  useEffect(() => {
    if (currentEnvelopeName !== null) {
      setSelectedEnvelopeName(decodeURI(currentEnvelopeName));
    }
    if (envelopes.length !== 0 && currentEnvelopeName === null) {
      navigate(`/envelope/${envelopes[0].name}`);
    }
  }, [currentEnvelopeName]);

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
    <Box className={cl.envelopeSideBar}>
      <ToolBar
        createEnvelopeLoading={createEnvelopeLoading}
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
      <CustomModal
        title="Envelope"
        modal={envelopeModal}
        setModal={setEnvelopeModal}
      >
        <EnvelopeForm
          envelopeCreateForm={envelopeCreateForm}
          createEnvelope={createEnvelope}
        />
      </CustomModal>
    </Box>
  );
};

export default EnvelopeSidebar;
