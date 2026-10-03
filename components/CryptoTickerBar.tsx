
import React, { useState, useEffect } from 'react';
import { CryptoCoin } from '../types';
import { COIN_IDS_FOR_TICKER } from '@/constants'; // Changed from ../constants

const CryptoTickerBar: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoCoin[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCryptoData = async () => {
    try {
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${COIN_IDS_FOR_TICKER.join(',')}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data = await response.json();

      const formattedData: CryptoCoin[] = [];
      let bitcoinMarketCap: number | null = null;

      if (data['bitcoin'] && data['bitcoin']['usd_market_cap']) {
        bitcoinMarketCap = data['bitcoin']['usd_market_cap'];
      }

      for (const id in data) {
        if (COIN_IDS_FOR_TICKER.includes(id)) {
          const coin = data[id];
          if (coin && typeof coin.usd === 'number') {
            formattedData.push({
              id,
              name: id.charAt(0).toUpperCase() + id.slice(1), // Simple name generation
              symbol: id.toUpperCase(), // Simple symbol generation
              usd: coin.usd,
              usd_market_cap: coin.usd_market_cap ?? 0,
              usd_24h_change: coin.usd_24h_change ?? 0,
            });
          }
        }
      }

      // Add market cap as a special item if available
      if (bitcoinMarketCap !== null) {
        const marketCapCoin: CryptoCoin = {
          id: 'marketcap',
          name: 'CRYPTO MKT CAP',
          symbol: 'TOTAL',
          usd: bitcoinMarketCap,
          usd_market_cap: bitcoinMarketCap, // N/A for this specific item in this context
          usd_24h_change: 0, // N/A
        };
        setCryptoData([marketCapCoin, ...formattedData]);
      } else {
        setCryptoData(formattedData);
      }
      setError(null);
    } catch (err) {
      console.error("Failed to fetch crypto data:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  useEffect(() => {
    fetchCryptoData();
    const intervalId = setInterval(fetchCryptoData, 60000); // Fetch every 60 seconds
    return () => clearInterval(intervalId);
  }, []);

  const renderTickerItems = () => {
    if (error) {
      return <span className="text-red-500 font-['Share_Tech_Mono'] text-[0.9rem] mx-4">Error fetching live data.</span>;
    }
    if (cryptoData.length === 0) {
      return <span className="text-gray-400 font-['Share_Tech_Mono'] text-[0.9rem] mx-4">Loading data...</span>;
    }

    const items = cryptoData.map((coin) => {
      const price = coin.usd ?? 0;
      const change = coin.usd_24h_change ?? 0;
      const changeClass = change >= 0 ? 'text-green-400' : 'text-red-500'; // Tailwind classes for color
      const sign = change >= 0 ? '+' : '';

      if (coin.id === 'marketcap') {
        return (
          <span key={coin.id} className="inline-block text-white font-['Share_Tech_Mono'] mx-4 text-[0.9rem]">
            {coin.name}: <span className="text-[#00ff41]">${(price / 1e12).toFixed(2)}T</span>
          </span>
        );
      }

      return (
        <span key={coin.id} className="inline-block text-white font-['Share_Tech_Mono'] mx-4 text-[0.9rem]">
          {coin.symbol}: <span className="text-[#00ff41]">${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>{' '}
          <span className={changeClass}>({sign}{change.toFixed(2)}%)</span>
        </span>
      );
    });
    // Duplicate items for seamless scroll
    return [...items, ...items];
  };

  return (
    <div className="fixed top-0 left-0 w-full h-[30px] bg-black/80 backdrop-blur-md z-[100] overflow-hidden whitespace-nowrap border-b border-gray-700">
      <div className="inline-block ticker-scroll-animate py-1">
        {renderTickerItems()}
      </div>
    </div>
  );
};

export default CryptoTickerBar;
