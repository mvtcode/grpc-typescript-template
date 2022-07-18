import { Logger } from "winston";
import { status } from "grpc";
import { ResponseError } from "../error/ResponseError";
import { DataType } from "../enum/DataType";
import { ParamDefine } from "../interface/grpc-handler";
import { Handlers } from "./handler";
import { toInt, toNumber } from "../libs/parse";
import { isObjectId } from "../libs/validate";

export const middlewares = (logger: Logger) => {
  const maps: {[key: string]: any} = {};
  const handlers = Handlers(logger);
  if(Object.keys(handlers).length > 0) {
    for(const key in handlers) {
      maps[key] = async (call: any, callback: any) => {
        const { params, action } = handlers[key];
        const req = call.request;
        const dataTransfer: {[key: string]: any} = {};
        if(Object.keys(params).length > 0) {
          for(const param in params) {
            // validate data
            const dataParams: ParamDefine = params[param];
            const value = req[param];
            const typeReq = typeof value;

            // required field
            if (dataParams.required && !value) {
              return callback({
                code: status.INVALID_ARGUMENT,
                message: `${dataParams.name || param} must be enter`,
              });
            }

            // validate object id
            if (dataParams.type === DataType.OBJECTID && !isObjectId(value)) {
              return callback({
                code: status.INVALID_ARGUMENT,
                message: `${dataParams.name || param} must be objectId`,
              });
            }

            switch (dataParams.type) {
            case DataType.STRING:
              dataTransfer[param] = typeReq === "string" ? value : value.toString();
              break;
            case DataType.INT:
              dataTransfer[param] = toInt(value, dataParams.default || 0);
              break;
            case DataType.NUMBER:
              dataTransfer[param] = toNumber(value, dataParams.default || 0);
              break;
            case DataType.DATE:
              dataTransfer[param] = new Date(value);
              break;
            default:
              dataTransfer[param] = value;
            }
          }
        }
        logger.info(dataTransfer);
        try {
          const res = await action(dataTransfer, call.metadata);
          callback(null, res);
        } catch (e) {
          if (e instanceof ResponseError) {
            callback({
              code: e.status,
              message: e.message,
            });
          } else {
            callback(e, null);
            logger.error(e);
          }
        }
      };
    }
  }
  return maps;
};
