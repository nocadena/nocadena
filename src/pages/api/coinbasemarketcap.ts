// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import _ from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";
const baseURL = "https://pro-api.coinmarketcap.com/v2";
type names = "USDC" | "ETH";
export interface price {
  name: names;
  priceUSD: number;
}
export type Data = {
  data: price[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { symbolList } = req.query as { symbolList: string };
  let url = baseURL + "/cryptocurrency/quotes/latest";
  url += "?symbol=" + symbolList;
  console.log("mhm", process.env.COINMARKETCAP_API);
  console.log("mhm", url);
  try {
    const resp = (
      await axios.get(url, {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API!,
        },
      })
    ).data.data as {
      [x in string]: [{ symbol: string; quote: object }];
    };
    const reconfiguredResp = Object.keys(resp).map((tokenId) => {
      if (tokenId == "") throw Error("Symbollist contains incorrect symbol");
      return {
        name: resp[tokenId][0].symbol as names,
        priceUSD: _.get(resp[tokenId][0], "quote.USD.price") as number,
      };
    });
    console.log("reconfiguredResp", reconfiguredResp);
    res.status(200).json({ data: reconfiguredResp });
  } catch (ex) {
    throw Error("Couldnt get price:" + ex);
  }
}
