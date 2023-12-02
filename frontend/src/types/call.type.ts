export enum CallStatus {
  'START' = 'START',
  'CONNECTED' = 'CONNECTED',
  'FAILED' = 'FAILED',
  'ANSWERED' = 'ANSWERED',
  'RINGING' = 'RINGING',
  'BAD_NUMBER' = 'BAD NUMBER',
  'BUSY' = 'BUSY',
  'NO_ANSWER' = 'NO ANSWER',
}

export interface PhoneCallData {
  status: CallStatus;
  phoneNumber: string;
  createdAt?: Date;
  callDuration?: number;
}
