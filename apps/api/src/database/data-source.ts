import { DataSource } from 'typeorm';
import { databaseCliOptions } from './database.config.js';

export default new DataSource(databaseCliOptions());
