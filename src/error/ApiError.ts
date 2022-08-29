type ErrorPayloadType<Data> = {
  statusCode: number;
  message: string;
  data?: Data;
};

class ApiError<Data> extends Error {
  payload: ErrorPayloadType<Data>;

  constructor(payload: ErrorPayloadType<Data>) {
    super(payload.message);

    this.payload = payload;
  }
}

export default ApiError;
