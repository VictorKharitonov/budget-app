export interface EnvelopeItem {
  name: string,
  status: 'open' | 'closed' | 'frozen'
}

export interface EnvelopesInfo {
  envelopes: string;
  total: {
    dollar: {
      income: number
    }
  };
  documentsCount: number;
}