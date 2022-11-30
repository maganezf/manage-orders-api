export class ResponseDto<T = undefined> {
  message: string;
  data?: T;
}
