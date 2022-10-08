export interface TokenType {
  name: string;
  pic: string;
  address: string;
}
export interface UserToken extends TokenType {
  amount: number;
}
export interface investment {
  title: string;
  pic: string;
  desc: string;
  options: {
    name: string;
    APY: number;
  }[];
}
