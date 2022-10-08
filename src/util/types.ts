export interface TokenType {
  name: string;
  pic: string;
  address: string;
}
export interface UserToken extends TokenType {
  amount: number;
}
