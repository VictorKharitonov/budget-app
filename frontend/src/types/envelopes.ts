export interface EnvelopeItem {
  name: string;
  status: 'open' | 'closed' | 'frozen';
}

export interface EnvelopesInfo {
  envelope: string;
  total: {
    dollar: {
      income: number;
    };
  };
  documentsCount: number;
}

export interface IEnvelopeInfo {
  envelopeInfo: EnvelopesInfo | null;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}
