import { ConfigService } from '@nestjs/config';

import { DatabaseModule as configFactory} from '../databaseModule';

const service = new ConfigService();

const config = configFactory.useFactory(service);

export default config;
