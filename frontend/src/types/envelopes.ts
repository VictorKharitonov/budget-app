export interface EnvelopeItem {
  name: string,
  status: 'open' | 'closed' | 'frozen'
}

export interface EnvelopesInfo {
  envelope: string;
  total: {
    dollar: {
      income: number
    }
  };
  documentsCount: number;
}