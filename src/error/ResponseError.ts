import { status } from "grpc";

export class ResponseError {
  public status: status;
  public message: string;

  constructor(status: status, message: string) {
    this.status = status;
    this.message = message;
  }
}
