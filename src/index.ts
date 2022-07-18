import "./libs/loadenv";
import { service } from './grpc/index';
import { createLog } from './libs/logger';

(async() => {
  const logger = createLog("Telegram-Service");

  service(logger);
})();