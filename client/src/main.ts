/**
 * Hello world
 */

 import {
  PublicKeyInitData,
 } from '@solana/web3.js'

import {
  establishConnection,
  checkProgram,
  establishPayer,
  reportPrice,
  getPrice
} from './hello_world'

async function main() {
  console.log("Let's work with Chainlink and Solana...")

  // Establish connection to the cluster
  await establishConnection()

  // Determine who pays for the fees
  await establishPayer()

  // Check if the program has been deployed
  await checkProgram()

  let market_price_feeds: { [key: string]: string } = {
    "SOLUSD": "FmAmfoyPXiA8Vhhe6MZTr3U6rZfEZ1ctEHay1ysqCqcf",
    "ETHUSD": "8pcXGi4QoHKytv3issKdFF3XRDeYAGEgy6EEAi1ioLe7",
    "MATICUSD": "9Xzp4FjgB9UKF3tDXS1WxHTGauv4dtPmkxxTZdWZsP2x"
  };

  for (let market in market_price_feeds) {
    let price_feed = market_price_feeds[market];
      // Make a transaction to get price
      await getPrice(price_feed)
      // Find out how many times that account has been greeted
      await reportPrice(market)
  }

  console.log('Success')
}

main().then(
  () => process.exit(),
  err => {
    console.error(err)
    process.exit(-1)
  },
)
