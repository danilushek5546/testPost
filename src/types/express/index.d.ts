import type User from '../../db/entities/User';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Request {
      user?: User;
    }
  }
}
