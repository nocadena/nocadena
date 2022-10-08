export interface TokenType {
  name: string;
  pic: string;
  address: string;
}
export interface UserToken extends TokenType {
  amount: number;
}
export interface InvestedToken extends UserToken {
  APY: number;
  fixed: boolean;
}
export interface investmentDetails {
  title: string;
  pic: string;
}
export interface investment extends investmentDetails {
  desc: string;
  options: {
    name: string;
    APY: number;
  }[];
}
