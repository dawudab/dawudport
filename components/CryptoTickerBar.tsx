
import React, { useState, useEffect } from 'react';
import { CryptoCoin } from '../types';
import { COIN_IDS_FOR_TICKER } from '@/constants'; // Changed from ../constants

const COIN_SYMBOL_MAP: Record<string, string> = {
  bitcoin: 'BTC',
  ethereum: 'ETH',
  bittensor: 'TAO',
  solana: 'SOL',
  cosmos: 'ATOM',
  arbitrum: 'ARB',
  cardano: 'ADA',
  uniswap: 'UNI',
  binancecoin: 'BNB',
};

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

      for (const id of COIN_IDS_FOR_TICKER) {
        const coin = data[id];
        if (coin && typeof coin.usd === 'number') {
          formattedData.push({
            id,
            name: id.charAt(0).toUpperCase() + id.slice(1),
            symbol: COIN_SYMBOL_MAP[id] || id.toUpperCase(),
            usd: coin.usd,
            usd_market_cap: coin.usd_market_cap ?? 0,
            usd_24h_change: coin.usd_24h_change ?? 0,
          });
        }
      }

      if (bitcoinMarketCap !== null) {
        const marketCapCoin: CryptoCoin = {
          id: 'marketcap',
          name: 'BTC MKT CAP',
          symbol: 'TOTAL',
          usd: bitcoinMarketCap,
          usd_market_cap: bitcoinMarketCap,
          usd_24h_change: 0,
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
    const intervalId = setInterval(fetchCryptoData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const renderTickerItems = () => {
    if (error && cryptoData.length === 0) {
      return (
        <span className="text-zinc-500 font-['JetBrains_Mono'] text-xs mx-6 tracking-tight">
          FEED STANDBY · RECONNECTING TO ORACLE
        </span>
      );
    }
    if (cryptoData.length === 0) {
      return (
        <span className="text-zinc-500 font-['JetBrains_Mono'] text-xs mx-6 tracking-tight">
          SYNCING MARKET TELEMETRY...
        </span>
      );
    }

    const items = cryptoData.map((coin) => {
      const price = coin.usd ?? 0;
      const change = coin.usd_24h_change ?? 0;
      const changeClass = change >= 0 ? 'text-emerald-400' : 'text-rose-400';
      const sign = change >= 0 ? '+' : '';

      if (coin.id === 'marketcap') {
        return (
          <span key={coin.id} className="inline-flex items-center gap-2 font-['JetBrains_Mono'] tabular-nums mx-5 text-xs tracking-tight">
            <span className="text-zinc-400">{coin.name}</span>
            <span className="text-zinc-100 font-medium">${(price / 1e12).toFixed(2)}T</span>
            <span className="text-zinc-700 ml-3" aria-hidden="true">/</span>
          </span>
        );
      }

      const isTao = coin.id === 'bittensor';

      return (
        <span key={coin.id} className="inline-flex items-center gap-1.5 font-['JetBrains_Mono'] tabular-nums mx-5 text-xs tracking-tight">
          <span className={isTao ? 'text-white font-semibold' : 'text-zinc-400'}>
            {isTao ? 'τ TAO' : coin.symbol}
          </span>
          <span className="text-zinc-100 font-medium">
            ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className={`${changeClass} text-[11px]`}>
            {sign}{change.toFixed(2)}%
          </span>
          <span className="text-zinc-800 ml-3" aria-hidden="true">/</span>
        </span>
      );
    });
    return [...items, ...items];
  };

  return (
    <div className="fixed top-0 left-0 w-full h-[36px] bg-zinc-950/55 backdrop-blur-2xl z-[100] overflow-hidden whitespace-nowrap border-b border-white/[0.08] shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.03)] flex items-center">
      <div className="inline-flex items-center ticker-scroll-animate">
        {renderTickerItems()}
      </div>
    </div>
  );
};

export default CryptoTickerBar;
