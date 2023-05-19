import {EnvelopeItem} from '../types';

export const getEnvelopeNameById = (envelopes: EnvelopeItem[], id: string | undefined): string => {
  const foundedEnvelope = [...envelopes].find(envelope => envelope.id === id);
  return foundedEnvelope ? foundedEnvelope.name : '';
};