import { agency, type NewAgency } from '@mobouzer/database-schema';
import { Command } from 'commander';
import { eq } from 'drizzle-orm';
import { db } from '../../db';
import logger from '../../utils/logger';

const data: NewAgency[] = [
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
  {
    agency_id: 'io',
    agency_name: 'Individual Operators',
    agency_timezone: 'Indian/Mauritius',
    agency_lang: 'en',
    agency_url: 'https://nlta.govmu.org/',
  },
];

const agencyCommand = new Command('agency').description('commands related to agencies');

agencyCommand
  .command('update')
  .description('update agency')
  .argument('[id]', 'id of the agency to update')
  .action(async function (agencyId: string) {
    if (agencyId) {
      const agencyData = data.find((a) => a.agency_id === agencyId);
      if (!agencyData) {
        logger.error(`Agency with id ${agencyId} not found.`);
        return;
      }

      await db.update(agency).set(agencyData).where(eq(agency.agency_id, agencyId)).returning();
      logger.info(`Updated agency with id ${agencyId}.`);
      return;
    }

    const results = await db.insert(agency).values(data).onConflictDoNothing().returning();
    logger.info(`Inserted ${results.length} agencies into the database.`);
  });

export default agencyCommand;
