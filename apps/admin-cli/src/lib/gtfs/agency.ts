import { GTFSFile } from '.';
import type { Agency } from '../../interfaces/gtfs/agency';

// from https://nlta.govmu.org/Pages/Procedures/Bus-Timetable.aspx
// also saved on the web archive
const data = async (): Promise<Agency[]> => {
  return [
    {
      agency_id: 'rht',
      agency_name: 'Rose Hill Transport',
      agency_timezone: 'Indian/Mauritius',
      agency_url: 'https://www.rht.mu',
      agency_lang: 'en',
      agency_phone: '212-1844',
    },
    {
      agency_id: 'ubs',
      agency_name: 'United Bus Service Ltd',
      agency_timezone: 'Indian/Mauritius',
      agency_url: 'https://www.ubsgroup.mu',
      agency_lang: 'en',
      agency_phone: '+230-211-2244',
    },
    {
      agency_id: 'tbs',
      agency_name: 'Triolet Bus Service',
      agency_timezone: 'Indian/Mauritius',
      agency_lang: 'en',
      agency_phone: '+230-241-1511',
      agency_url: 'https://mauritius-bus.com/tbs-triolet-bus-service',
    },
    {
      agency_id: 'ntc',
      agency_name: 'National Transport Corporation',
      agency_timezone: 'Indian/Mauritius',
      agency_url: 'https://www.buscnt.mu',
      agency_lang: 'en',
      agency_phone: '+230-427-5000',
      agency_email: 'customercare@buscnt.mu',
    },
    {
      agency_id: 'mbt',
      agency_name: 'Mauritian Bus Transport',
      agency_timezone: 'Indian/Mauritius',
      agency_url: 'https://www.rht.mu',
      agency_lang: 'en',
      agency_phone: '+230-216-0200',
    },
  ];
};

const AgencyFile = new GTFSFile('agency', data);

export default AgencyFile;
