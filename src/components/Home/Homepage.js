import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RetrievedCoin from '../RetrievedCoin';
import CoinLogo from './CoinLogo';
import SearchCoin from '../SearchCoin';
import { getCoin } from '../../helpers/getCoin';
import MarketData from './MarketData';

const Homepage = () => {
  const [searchCoin, setSearchedCoin] = useState('')
  const [coinProps, setCoinProps] = useState([])

  const coins = useSelector(state => state.coins)
  useEffect(async () => {
    if (searchCoin === '' && coins.length > 0) {
      setSearchedCoin(coins[0].id)
    } else {
      const coin = await getCoin('fear')
      setCoinProps(coin)
      console.log(coin)
      setSearchedCoin(coin.id)
    }
  }, [coins, searchCoin])

  const callback = useCallback((coin) => {
    setSearchedCoin(coin)
  }, [setSearchedCoin])

  return (
    <div>
      <SearchCoin trackedCoins={coins} parentCallback={callback} />
      <h3>{searchCoin}</h3>
      <RetrievedCoin retrievedCoin={searchCoin} />
      {/* <ChartDisplay chartCoin={searchCoin} /> */}
      {coinProps.length !== 0 &&
        <div className='side-margin'>
          <CoinLogo coinName={coinProps.name} coinLogo={coinProps.image.large} />
          <MarketData
            // marketData={{item: "Market Cap", value: coinProps.market_data}}
            marketCap={{ item: "Market Cap", value: coinProps.market_data.market_cap.usd }}
            circulatingSupply={{ item: "Circulating Supply", value: coinProps.market_data.circulating_supply }}
            priceChange={{ item: "Price Change % (24h)", value: coinProps.market_data.price_change_percentage_24h }}
            totalVolume={{ item: "Volume", value: coinProps.market_data.total_volume.usd }}
            allTimeHigh={{ item: "All-Time High", value: coinProps.market_data.ath.usd }}
            allTimeLow={{ item: "All-Time Low", value: coinProps.market_data.atl.usd }}
          />
        </div>
      }
    </div>
  );
}
 
export default Homepage;