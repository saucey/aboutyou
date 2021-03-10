export interface Suggestion {
  mainText: string;
  link: string;
  boldTextGroup?: {
    blackText: string;
    redText: string;
    struckText: string;
  };
  image?: string;
}
