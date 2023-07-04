import {EnvelopeItem} from '../types';

export const getEnvelopeNameById = (envelopes: EnvelopeItem[], id: string | undefined): string => {
  const foundedEnvelope = [...envelopes].find(envelope => envelope.name === id);
  return foundedEnvelope ? decodeURI(foundedEnvelope.name) : '';
};