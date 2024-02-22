import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EnvelopeItem } from '../types/envelopes';
import { getCurrentEnvelope } from '../utils/envelopeHelper';
import { User } from '../types/user';

const useEnvelope = (user: User) => {
  const params = useParams<string>();
  const [currentEnvelope, setCurrentEnvelope] = useState<EnvelopeItem | undefined>();

  useEffect(() => {
    if (!params.id) {
      return;
    }

    if (user.envelopes.length > 0) {
      setCurrentEnvelope(getCurrentEnvelope(params.id, user.envelopes));
    }
  }, [params.id, user.envelopes]);

  return {
    currentEnvelope,
    setCurrentEnvelope
  };
};

export default useEnvelope;
