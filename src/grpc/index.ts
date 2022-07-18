import { join } from "path";
import grpc from "grpc";
import { Logger } from "winston";
import { middlewares } from "./middleware";

export const service = (logger: Logger) => {
  const port = process.env.GRPC_PORT || process.env.PORT || 6565;

  const proto = grpc.load(join(__dirname, "../../proto/telegram.proto"));
  const server = new grpc.Server();
  const core:any = proto.core;

  server.addService(core.tracing.TelegramService.service, middlewares(logger));
  server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());
  server.start();
  logger.info(`Service listent port: ${port}`);
};