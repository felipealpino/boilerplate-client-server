import { Pool } from 'pg';
import { appConfiguration } from '../config';

export const pool = new Pool({ connectionString: appConfiguration.pgDbConnectionString });
