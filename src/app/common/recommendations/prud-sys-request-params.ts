// TODO #1392 consider renaming params to more explicit values, e.g. sid -> sessionId
export interface PrudSysRequestParams {
  sid: string;
  tracking: boolean;
  pid: string;
  cid: string;
  userid?: string;
}
