import { status } from "grpc";
import { Logger } from "winston";
import { DataType } from "../enum/DataType";
import { GrpcHandler } from "../interface/grpc-handler";
import { ResponseError } from "../error/ResponseError";

export const Handlers = (logger: Logger): GrpcHandler => {
  return {
    send: {
      params: {
        id: {
          type: DataType.STRING,
          required: true,
          default: "",
        },
        text: {
          type: DataType.STRING,
          default: "",
        },
        number: {
          type: DataType.INT,
          default: 0,
        },
        timestamp: {
          type: DataType.NUMBER,
          default: 0,
        },
      },
      action: (data: {[key: string]: any}) => {
        const { id, text } = data;
        if (id === "0") {
          logger.info("Id not found");
          throw new ResponseError(status.NOT_FOUND, "Id not found");
        }

        return {
          success: true,
          text,
        };
      }
    }
  };
};
