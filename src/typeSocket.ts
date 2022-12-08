/* eslint-disable @typescript-eslint/naming-convention */
interface ServerToClientEvents {
  comment: (
    option: {
      id: number;
      comment: string;
      commentData: Date;
      user: {
        id: number;
        fullname: string;
        email: string;
        photoFilePath: string;
      };
    }
  ) => void;
}

interface ClientToServerEvents {
  comment: (
    option: {
      id: number;
      comment: string;
      commentData: Date;
      user: {
        id: number;
        fullname: string;
        email: string;
        photoFilePath: string;
      };
    }
  ) => void;
}

export {
  ServerToClientEvents,
  ClientToServerEvents,
};
