import { DataType } from "../enum/DataType";

export interface ParamDefine {
  type: DataType,
  default?: any,
  name?: string,
  required?: boolean,
  min?: number,
  max?: number,
  length?: number,
  minLength?: number,
  maxLength?: number,
}

export interface Params {
  [key: string]: ParamDefine
}

export interface GrpcHandler {
  [key: string]: {
    params: Params,
    action (data: {[key: string]: any}, metadata?: {[key: string]: any}): any | Promise<any>,
  };
}