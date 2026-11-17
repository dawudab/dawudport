import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Project } from '../types';

interface ProjectDemoGameProps {
  project: Project;
  onClose: () => void;
}

interface DemoMeta {
  title: string;
  instruction: string;
}

const DEMO_META: Record<string, DemoMeta> = {
  qareeb: {
    title: 'Express Dispatch Simulator',
    instruction: 'Move scooter (arrows/tap) to 🏪 Store, grab order, then deliver to 📍 Pin & confirm Bankily!',
  },
  'nouakchott-energy-map': {
    title: 'Live Grid Outage Reporter & Forecaster',
    instruction: 'Tap any Nouakchott district to report outages, dispatch fuel, or toggle backup power.',
  },
  'charity-trash-bounties': {
    title: 'Clean City Bounty Loop',
    instruction: 'Tap littered blocks to Fund Sadaqah -> Dispatch Worker -> Verify & Release Payout.',
  },
  shtreli: {
    title: 'Local Market Deal Hunter',
    instruction: 'Compare seller price vs. market value and snag verified local deals within your MRU budget.',
  },
  'mahdara-al-andalous': {
    title: 'Classical Curriculum & Verse Builder',
    instruction: 'Pair each classical Mahdara term with its scholarly meaning to complete the scroll.',
  },
  'global-resistance-network': {
    title: 'OSINT Signal Tracker',
    instruction: 'Tap pulsing radar hotspots, inspect confidence telemetry, and verify or filter signals.',
  },
  'islamic-contracts': {
    title: 'Shariah-Compliant Contract Builder',
    instruction: 'Select the matching Fiqh structure, check all 3 Shariah clauses, and seal the block.',
  },
  'al-jisr-institute': {
    title: 'Language Bridge Matcher',
    instruction: 'Match Arabic & English phrases to walk learner and instructor across the bridge.',
  },
};

/* -------------------------------------------------------------------------- */
/* 1. Qareeb — Express Dispatch Simulator                                     */
/* -------------------------------------------------------------------------- */
const GRID_W = 6;
const GRID_H = 4;
const OBSTACLES = new Set(['1,1', '3,1', '2,2', '4,2']);

const randomFreeCell = (exclude: string[]): { x: number; y: number } => {
  const candidates: Array<{ x: number; y: number }> = [];
  for (let y = 0; y < GRID_H; y++) {
    for (let x = 0; x < GRID_W; x++) {
      const key = `${x},${y}`;
      if (!OBSTACLES.has(key) && !exclude.includes(key)) {
        candidates.push({ x, y });
      }
    }
  }
  return candidates[Math.floor(Math.random() * candidates.length)] || { x: 0, y: 0 };
};

const QareebDemo: React.FC<{ onStatusChange: (s: string) => void }> = ({ onStatusChange }) => {
  const [scooter, setScooter] = useState({ x: 0, y: 3 });
  const [store, setStore] = useState({ x: 0, y: 0 });
  const [customer, setCustomer] = useState({ x: 5, y: 0 });
  const [carrying, setCarrying] = useState(false);
  const [awaitingBankily, setAwaitingBankily] = useState(false);
  const [delivered, setDelivered] = useState(0);
  const [mruEarned, setMruEarned] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);

  useEffect(() => {
    onStatusChange(`Delivered: ${delivered} | Earned: ${mruEarned} MRU | ${timeLeft}s`);
  }, [delivered, mruEarned, timeLeft, onStatusChange]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const tryMove = useCallback(
    (dx: number, dy: number) => {
      if (timeLeft <= 0 || awaitingBankily) return;
      const nx = scooter.x + dx;
      const ny = scooter.y + dy;
      if (nx < 0 || nx >= GRID_W || ny < 0 || ny >= GRID_H) return;
      if (OBSTACLES.has(`${nx},${ny}`)) return;

      setScooter({ x: nx, y: ny });
      if (!carrying && nx === store.x && ny === store.y) {
        setCarrying(true);
      } else if (carrying && nx === customer.x && ny === customer.y) {
        setAwaitingBankily(true);
      }
    },
    [scooter.x, scooter.y, timeLeft, awaitingBankily, carrying, store.x, store.y, customer.x, customer.y]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w') {
        e.preventDefault();
        tryMove(0, -1);
      } else if (e.key === 'ArrowDown' || e.key === 's') {
        e.preventDefault();
        tryMove(0, 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        e.preventDefault();
        tryMove(-1, 0);
      } else if (e.key === 'ArrowRight' || e.key === 'd') {
        e.preventDefault();
        tryMove(1, 0);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [tryMove]);

  const confirmBankily = () => {
    const nextStore = randomFreeCell([`${scooter.x},${scooter.y}`]);
    const nextCustomer = randomFreeCell([
      `${scooter.x},${scooter.y}`,
      `${nextStore.x},${nextStore.y}`,
    ]);
    setStore(nextStore);
    setCustomer(nextCustomer);
    setCarrying(false);
    setAwaitingBankily(false);
    setDelivered((d) => d + 1);
    setMruEarned((m) => m + 250);
    setTimeLeft((t) => Math.min(60, t + 8));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white x11-inset px-2.5 py-1.5 text-xs">
        <span className="font-bold text-[#1e3a5f]">
          {timeLeft <= 0
            ? 'Shift Complete!'
            : awaitingBankily
            ? 'Arrived at Customer Pin!'
            : carrying
            ? 'Order Picked Up -> Head to 📍 Pin'
            : 'Head to 🏪 Grocer to Pick Up Order'}
        </span>
        <span className="font-mono-body font-bold text-[#15803d] tabular-nums">
          {mruEarned} MRU
        </span>
      </div>

      {/* 6x4 Nouakchott Street Grid */}
      <div className="bg-[#1b262c] x11-inset p-2">
        <div className="grid grid-cols-6 gap-1">
          {Array.from({ length: GRID_H }).map((_, y) =>
            Array.from({ length: GRID_W }).map((__, x) => {
              const key = `${x},${y}`;
              const isObs = OBSTACLES.has(key);
              const isScooter = scooter.x === x && scooter.y === y;
              const isStore = store.x === x && store.y === y;
              const isCustomer = customer.x === x && customer.y === y;
              const isAdjacent = Math.abs(scooter.x - x) + Math.abs(scooter.y - y) === 1;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    if (isAdjacent) {
                      tryMove(x - scooter.x, y - scooter.y);
                    }
                  }}
                  className={`h-11 sm:h-12 flex items-center justify-center text-sm font-pixel-ui border ${
                    isObs
                      ? 'bg-[#374151] border-[#4b5563] cursor-not-allowed'
                      : isScooter
                      ? 'bg-[#f59e0b] border-[#fef3c7] text-[#111827]'
                      : isCustomer && carrying
                      ? 'bg-[#7f1d1d] border-[#ef4444] text-white animate-pulse'
                      : isStore && !carrying
                      ? 'bg-[#14532d] border-[#22c55e] text-white'
                      : isAdjacent
                      ? 'bg-[#29404d] border-[#38bdf8] cursor-pointer hover:bg-[#335060]'
                      : 'bg-[#22343e] border-[#334155]'
                  }`}
                  title={isObs ? 'Traffic Jam' : 'Tap adjacent street to move'}
                >
                  {isScooter ? '🛵' : isObs ? '🚧' : isStore && !carrying ? '🏪' : isCustomer ? '📍' : ''}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Bankily Confirm or Touch D-Pad */}
      {awaitingBankily ? (
        <button
          type="button"
          onClick={confirmBankily}
          className="w-full min-h-[42px] x11-btn-primary px-4 py-2 font-pixel-ui text-xs font-bold cursor-pointer"
        >
          [ Confirm Bankily Payment (+250 MRU & +8s) ]
        </button>
      ) : (
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] text-[#374151]">
            Tap glowing blue tiles or D-pad:
          </span>
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => tryMove(-1, 0)} className="x11-btn min-w-[36px] min-h-[34px] font-pixel-ui text-xs font-bold cursor-pointer">◀</button>
            <button type="button" onClick={() => tryMove(0, -1)} className="x11-btn min-w-[36px] min-h-[34px] font-pixel-ui text-xs font-bold cursor-pointer">▲</button>
            <button type="button" onClick={() => tryMove(0, 1)} className="x11-btn min-w-[36px] min-h-[34px] font-pixel-ui text-xs font-bold cursor-pointer">▼</button>
            <button type="button" onClick={() => tryMove(1, 0)} className="x11-btn min-w-[36px] min-h-[34px] font-pixel-ui text-xs font-bold cursor-pointer">▶</button>
          </div>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. Nouakchott Energy Map — Live Grid Outage Reporter & Forecaster          */
/* -------------------------------------------------------------------------- */
type DistrictStatus = 'online' | 'fuel_low' | 'outage';

interface DistrictNode {
  id: string;
  name: string;
  status: DistrictStatus;
  backupGen: boolean;
  reported: boolean;
}

const INITIAL_DISTRICTS: DistrictNode[] = [
  { id: 'tz', name: 'Tevragh Zeina', status: 'online', backupGen: false, reported: false },
  { id: 'ks', name: 'Ksar', status: 'fuel_low', backupGen: false, reported: false },
  { id: 'ty', name: 'Teyarett', status: 'online', backupGen: false, reported: false },
  { id: 'ar', name: 'Arafat', status: 'outage', backupGen: false, reported: false },
  { id: 'em', name: 'El Mina', status: 'fuel_low', backupGen: false, reported: false },
  { id: 'sb', name: 'Sebkha', status: 'online', backupGen: false, reported: false },
  { id: 'dn', name: 'Dar Naim', status: 'outage', backupGen: false, reported: false },
  { id: 'tj', name: 'Toujounine', status: 'online', backupGen: false, reported: false },
  { id: 'ry', name: 'Riyad', status: 'fuel_low', backupGen: false, reported: false },
];

const EnergyMapDemo: React.FC<{ onStatusChange: (s: string) => void }> = ({ onStatusChange }) => {
  const [districts, setDistricts] = useState<DistrictNode[]>(INITIAL_DISTRICTS);
  const [selectedId, setSelectedId] = useState<string>('ar');
  const [reportsVerified, setReportsVerified] = useState(0);

  const onlineCount = districts.filter((d) => d.status === 'online').length;
  const stability = Math.round((onlineCount / districts.length) * 100);

  useEffect(() => {
    onStatusChange(`Grid Stability: ${stability}% | Reports: ${reportsVerified}`);
  }, [stability, reportsVerified, onStatusChange]);

  // Simulate dynamic Nouakchott power/fuel shifts
  useEffect(() => {
    const interval = setInterval(() => {
      setDistricts((prev) => {
        const idx = Math.floor(Math.random() * prev.length);
        const target = prev[idx];
        if (!target || target.backupGen) return prev;
        const nextStatus: DistrictStatus =
          target.status === 'online'
            ? 'fuel_low'
            : target.status === 'fuel_low'
            ? 'outage'
            : 'outage';
        return prev.map((d, i) => (i === idx ? { ...d, status: nextStatus, reported: false } : d));
      });
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const selected = districts.find((d) => d.id === selectedId) || districts[0];

  const handleReport = () => {
    if (!selected) return;
    setDistricts((prev) =>
      prev.map((d) => (d.id === selected.id ? { ...d, reported: true } : d))
    );
    setReportsVerified((r) => r + 1);
  };

  const handleDispatchFuel = () => {
    if (!selected) return;
    setDistricts((prev) =>
      prev.map((d) => (d.id === selected.id ? { ...d, status: 'online', reported: true } : d))
    );
    setReportsVerified((r) => r + 1);
  };

  const handleToggleGen = () => {
    if (!selected) return;
    setDistricts((prev) =>
      prev.map((d) =>
        d.id === selected.id
          ? {
              ...d,
              backupGen: !d.backupGen,
              status: !d.backupGen ? 'online' : d.status,
            }
          : d
      )
    );
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-1.5 bg-[#0d1b24] x11-inset p-2">
        {districts.map((d) => {
          const isSelected = d.id === selectedId;
          const colorCls =
            d.status === 'online'
              ? 'bg-[#14532d] border-[#22c55e] text-[#dcfce7]'
              : d.status === 'fuel_low'
              ? 'bg-[#78350f] border-[#f59e0b] text-[#fef3c7]'
              : 'bg-[#7f1d1d] border-[#ef4444] text-[#fee2e2]';

          return (
            <button
              key={d.id}
              type="button"
              onClick={() => setSelectedId(d.id)}
              className={`p-2 border-2 text-left cursor-pointer transition-transform ${colorCls} ${
                isSelected ? 'ring-2 ring-white' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="font-pixel-ui text-[10px] font-bold truncate">{d.name}</span>
                {d.backupGen && <span className="text-[10px]" title="Solar/Backup Gen Active">⚡</span>}
              </div>
              <div className="text-[10px] font-mono-body mt-1 uppercase opacity-90">
                {d.status === 'online' ? 'ONLINE' : d.status === 'fuel_low' ? 'FUEL LOW' : 'OUTAGE'}
                {d.reported ? ' ✓' : ''}
              </div>
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="x11-outset p-2.5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-pixel-ui font-bold text-[#1e3a5f]">
              Sector: {selected.name}
            </span>
            <span className="font-mono-body text-[11px] font-semibold">
              {selected.backupGen ? 'Backup Gen ON' : 'Grid Only'}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={handleReport}
              className="x11-btn min-h-[36px] px-2 py-1.5 font-pixel-ui text-[11px] font-bold cursor-pointer"
            >
              Report Status
            </button>
            <button
              type="button"
              onClick={handleDispatchFuel}
              className="x11-btn-primary min-h-[36px] px-2 py-1.5 font-pixel-ui text-[11px] font-bold cursor-pointer"
            >
              Restore / Fuel
            </button>
            <button
              type="button"
              onClick={handleToggleGen}
              className="x11-btn min-h-[36px] px-2 py-1.5 font-pixel-ui text-[11px] font-bold cursor-pointer"
            >
              {selected.backupGen ? 'Disable Gen' : 'Enable Backup'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. Charity Trash Bounties — Clean City Bounty Loop                         */
/* -------------------------------------------------------------------------- */
type BlockStage = 'littered' | 'funded' | 'clearing' | 'clean';

interface CityBlock {
  id: string;
  name: string;
  stage: BlockStage;
}

const INITIAL_BLOCKS: CityBlock[] = [
  { id: 'b1', name: 'Cinquième', stage: 'littered' },
  { id: 'b2', name: 'Socogim', stage: 'funded' },
  { id: 'b3', name: 'Médina 3', stage: 'littered' },
  { id: 'b4', name: 'Capitole', stage: 'clean' },
  { id: 'b5', name: 'Ksar Nord', stage: 'littered' },
  { id: 'b6', name: 'El Mina Port', stage: 'clearing' },
];

const TrashBountyDemo: React.FC<{ onStatusChange: (s: string) => void }> = ({ onStatusChange }) => {
  const [blocks, setBlocks] = useState<CityBlock[]>(INITIAL_BLOCKS);
  const [workerPayouts, setWorkerPayouts] = useState(20);
  const [bagsCleared, setBagsCleared] = useState(2);

  const cleanCount = blocks.filter((b) => b.stage === 'clean').length;

  useEffect(() => {
    onStatusChange(`Clean Zones: ${cleanCount}/6 | Worker Payouts: $${workerPayouts}`);
  }, [cleanCount, workerPayouts, onStatusChange]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks((prev) => {
        const cleanIndices = prev
          .map((b, idx) => (b.stage === 'clean' ? idx : -1))
          .filter((idx) => idx >= 0);
        if (cleanIndices.length <= 1) return prev;
        const pick = cleanIndices[Math.floor(Math.random() * cleanIndices.length)];
        return prev.map((b, i) => (i === pick ? { ...b, stage: 'littered' } : b));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const advanceBlock = (id: string) => {
    const target = blocks.find((b) => b.id === id);
    if (!target || target.stage === 'clean') return;

    const nextStage: BlockStage =
      target.stage === 'littered'
        ? 'funded'
        : target.stage === 'funded'
        ? 'clearing'
        : 'clean';

    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, stage: nextStage } : b)));
    if (nextStage === 'clean') {
      setWorkerPayouts((p) => p + 10);
      setBagsCleared((c) => c + 3);
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-[#11221e] x11-inset p-2">
        {blocks.map((b) => {
          const styleMap: Record<BlockStage, { bg: string; icon: string; cta: string }> = {
            littered: {
              bg: 'bg-[#374151] border-[#9ca3af] text-white',
              icon: '🗑️',
              cta: '1. Fund $10 Bounty',
            },
            funded: {
              bg: 'bg-[#78350f] border-[#fbbf24] text-[#fef3c7]',
              icon: '🪙',
              cta: '2. Dispatch Worker',
            },
            clearing: {
              bg: 'bg-[#1e3a5f] border-[#38bdf8] text-white',
              icon: '🧹',
              cta: '3. Verify & Payout',
            },
            clean: {
              bg: 'bg-[#14532d] border-[#4ade80] text-[#dcfce7]',
              icon: '🌳',
              cta: 'Clean Park ✓',
            },
          };
          const cfg = styleMap[b.stage];

          return (
            <button
              key={b.id}
              type="button"
              onClick={() => advanceBlock(b.id)}
              className={`p-2.5 border-2 flex flex-col justify-between gap-2 text-left cursor-pointer ${cfg.bg}`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="font-pixel-ui text-[10px] font-bold truncate">{b.name}</span>
                <span className="text-sm">{cfg.icon}</span>
              </div>
              <span className="font-mono-body text-[10px] font-bold underline">
                {cfg.cta}
              </span>
            </button>
          );
        })}
      </div>

      <div className="bg-white x11-inset px-3 py-2 flex items-center justify-between text-xs">
        <span>Total Bags Cleared: <strong>{bagsCleared}</strong></span>
        <span className="text-[#15803d] font-bold">Direct Sadaqah Payouts: ${workerPayouts}</span>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 4. Shtreli — Local Market Deal Hunter                                      */
/* -------------------------------------------------------------------------- */
interface MarketListing {
  id: number;
  title: string;
  icon: string;
  askPrice: number;
  marketValue: number;
  verified: boolean;
}

const LISTING_POOL: Omit<MarketListing, 'id'>[] = [
  { title: 'MacBook Pro M2', icon: '💻', askPrice: 1200, marketValue: 1650, verified: true },
  { title: 'Solar Kit 2kW', icon: '☀️', askPrice: 900, marketValue: 1300, verified: true },
  { title: 'Used Sedan Tire', icon: '🛞', askPrice: 650, marketValue: 480, verified: false },
  { title: 'iPhone 15 Clean', icon: '📱', askPrice: 1100, marketValue: 1450, verified: true },
  { title: 'Salon Sofa Set', icon: '🛋️', askPrice: 1500, marketValue: 1200, verified: true },
  { title: '5kVA Generator', icon: '⚡', askPrice: 1400, marketValue: 1950, verified: true },
  { title: 'Broken Console', icon: '🎮', askPrice: 800, marketValue: 550, verified: false },
  { title: 'DSLR Camera Kit', icon: '📷', askPrice: 750, marketValue: 1080, verified: true },
];

const ShtreliDemo: React.FC<{ onStatusChange: (s: string) => void }> = ({ onStatusChange }) => {
  const [budget, setBudget] = useState(5000);
  const [dealsCount, setDealsCount] = useState(0);
  const [netProfit, setNetProfit] = useState(0);
  const [nextId, setNextId] = useState(4);
  const [listings, setListings] = useState<MarketListing[]>(() => [
    { ...LISTING_POOL[0], id: 1 },
    { ...LISTING_POOL[2], id: 2 },
    { ...LISTING_POOL[3], id: 3 },
  ]);

  useEffect(() => {
    onStatusChange(`Budget: ${budget} MRU | Deals: ${dealsCount} | Net Gain: +${netProfit}`);
  }, [budget, dealsCount, netProfit, onStatusChange]);

  const replaceListing = (id: number) => {
    const template = LISTING_POOL[Math.floor(Math.random() * LISTING_POOL.length)];
    const newId = nextId;
    setNextId((n) => n + 1);
    setListings((prev) => prev.map((item) => (item.id === id ? { ...template, id: newId } : item)));
  };

  const handleSnag = (item: MarketListing) => {
    if (budget < item.askPrice) return;
    setBudget((b) => b - item.askPrice);
    setDealsCount((c) => c + 1);
    setNetProfit((p) => p + (item.marketValue - item.askPrice));
    replaceListing(item.id);
  };

  return (
    <div className="space-y-3">
      <div className="bg-white x11-inset px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span>Remaining Budget: <strong>{budget} MRU</strong></span>
        <span className={netProfit >= 0 ? 'text-[#15803d] font-bold' : 'text-[#b91c1c] font-bold'}>
          Portfolio Value Gain: {netProfit >= 0 ? `+${netProfit}` : netProfit} MRU
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {listings.map((item) => {
          const isGoodDeal = item.marketValue > item.askPrice && item.verified;
          const canAfford = budget >= item.askPrice;
          return (
            <div key={item.id} className="x11-outset p-2.5 flex flex-col justify-between gap-2">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-lg">{item.icon}</span>
                  <span
                    className={`font-pixel-ui text-[9px] px-1.5 py-0.5 ${
                      item.verified ? 'bg-[#dcfce7] text-[#15803d]' : 'bg-[#fee2e2] text-[#b91c1c]'
                    }`}
                  >
                    {item.verified ? 'VERIFIED' : 'UNVERIFIED'}
                  </span>
                </div>
                <div className="font-pixel-ui text-xs font-bold text-[#111827]">
                  {item.title}
                </div>
                <div className="text-[11px] font-mono-body text-[#374151]">
                  Ask: <strong>{item.askPrice}</strong> · Est:{' '}
                  <span className={isGoodDeal ? 'text-[#15803d] font-bold' : 'text-[#b91c1c]'}>
                    {item.marketValue}
                  </span>
                </div>
              </div>

              <div className="flex gap-1.5 pt-1">
                <button
                  type="button"
                  disabled={!canAfford}
                  onClick={() => handleSnag(item)}
                  className={`flex-1 min-h-[34px] px-2 py-1 font-pixel-ui text-[10px] font-bold cursor-pointer ${
                    canAfford ? 'x11-btn-primary' : 'x11-btn opacity-50 cursor-not-allowed'
                  }`}
                >
                  Snag 🛒
                </button>
                <button
                  type="button"
                  onClick={() => replaceListing(item.id)}
                  className="x11-btn min-h-[34px] px-2 py-1 font-pixel-ui text-[10px] cursor-pointer"
                >
                  Skip
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 5. Mahdara Al-Andalous Al-Ilmiyya — Classical Curriculum & Verse Builder   */
/* -------------------------------------------------------------------------- */
interface MahdaraLevel {
  moduleName: string;
  pairs: Array<{ id: string; term: string; meaning: string }>;
}

const MAHDARA_LEVELS: MahdaraLevel[] = [
  {
    moduleName: 'Module 1: Nahw & Tajweed Foundations',
    pairs: [
      { id: 'irab', term: 'إِعْرَاب (I‘rāb)', meaning: 'Grammatical case endings' },
      { id: 'idgham', term: 'إِدْغَام (Idghām)', meaning: 'Merging adjacent letters' },
      { id: 'madd', term: 'مَدّ (Madd)', meaning: 'Measured vowel elongation' },
    ],
  },
  {
    moduleName: 'Module 2: Sarf & Usul al-Fiqh',
    pairs: [
      { id: 'wazan', term: 'فَعَلَ (Fa‘ala)', meaning: 'Trilateral root template' },
      { id: 'ijma', term: 'إِجْمَاع (Ijmā‘)', meaning: 'Scholarly consensus' },
      { id: 'sanad', term: 'سَنَد (Sanad)', meaning: 'Unbroken chain of transmission' },
    ],
  },
];

const MahdaraDemo: React.FC<{ onStatusChange: (s: string) => void }> = ({ onStatusChange }) => {
  const [levelIdx, setLevelIdx] = useState(0);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [completedAll, setCompletedAll] = useState(false);

  const level = MAHDARA_LEVELS[levelIdx] || MAHDARA_LEVELS[0];

  useEffect(() => {
    onStatusChange(
      completedAll
        ? 'Rank: Sanad Scholar ✓'
        : `Scroll ${levelIdx + 1}/2 | Terms Mastered: ${matchedIds.length}/3`
    );
  }, [levelIdx, matchedIds.length, completedAll, onStatusChange]);

  const handleMeaningClick = (meaningId: string) => {
    if (!selectedTerm || matchedIds.includes(meaningId)) return;
    if (selectedTerm === meaningId) {
      const updated = [...matchedIds, meaningId];
      setMatchedIds(updated);
      setSelectedTerm(null);
      if (updated.length === level.pairs.length) {
        if (levelIdx + 1 < MAHDARA_LEVELS.length) {
          setTimeout(() => {
            setLevelIdx((i) => i + 1);
            setMatchedIds([]);
            setSelectedTerm(null);
          }, 550);
        } else {
          setCompletedAll(true);
        }
      }
    } else {
      setSelectedTerm(null);
    }
  };

  // Fixed reverse visual ordering for meanings so it's always a matching puzzle
  const shuffledMeanings = [...level.pairs].reverse();

  return (
    <div className="space-y-3">
      <div className="bg-[#162d30] text-[#fefce8] x11-inset px-3 py-2 flex items-center justify-between text-xs">
        <span className="font-pixel-ui font-bold">{level.moduleName}</span>
        <span className="text-[#fde047] font-mono-body">
          {completedAll ? 'Ijāzah Ready ✓' : `${matchedIds.length}/3 Matched`}
        </span>
      </div>

      {completedAll ? (
        <div className="bg-[#fefce8] x11-inset p-4 text-center space-y-2">
          <div className="font-pixel-ui text-sm font-bold text-[#162d30]">
            Classical Curriculum Scroll Completed!
          </div>
          <p className="text-xs text-[#374151]">
            All foundational Arabic &amp; Islamic science modules assembled in sequence.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <div className="font-pixel-ui text-[10px] font-bold text-[#1e3a5f]">
              1. SELECT TERM:
            </div>
            {level.pairs.map((p) => {
              const isMatched = matchedIds.includes(p.id);
              const isSelected = selectedTerm === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  disabled={isMatched}
                  onClick={() => setSelectedTerm(p.id)}
                  className={`w-full min-h-[38px] px-2.5 py-1.5 text-left font-mono-body text-xs font-bold cursor-pointer ${
                    isMatched
                      ? 'bg-[#dcfce7] text-[#15803d] border border-[#22c55e] opacity-70'
                      : isSelected
                      ? 'x11-btn-primary'
                      : 'x11-btn'
                  }`}
                >
                  {p.term} {isMatched ? '✓' : ''}
                </button>
              );
            })}
          </div>

          <div className="space-y-1.5">
            <div className="font-pixel-ui text-[10px] font-bold text-[#1e3a5f]">
              2. MATCH DEFINITION:
            </div>
            {shuffledMeanings.map((p) => {
              const isMatched = matchedIds.includes(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  disabled={isMatched}
                  onClick={() => handleMeaningClick(p.id)}
                  className={`w-full min-h-[38px] px-2.5 py-1.5 text-left font-mono-body text-xs cursor-pointer ${
                    isMatched
                      ? 'bg-[#dcfce7] text-[#15803d] border border-[#22c55e] opacity-70'
                      : 'x11-btn'
                  }`}
                >
                  {p.meaning}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 6. Global Resistance Network — OSINT Signal Tracker                        */
/* -------------------------------------------------------------------------- */
interface OsintPing {
  id: number;
  region: string;
  headline: string;
  confidence: number;
  xPct: number;
  yPct: number;
}

const OSINT_TEMPLATES: Omit<OsintPing, 'id'>[] = [
  { region: 'Red Sea Corridor', headline: 'Maritime AIS transponder shift logged', confidence: 92, xPct: 58, yPct: 52 },
  { region: 'Sahel Belt', headline: 'Cross-border convoy telemetry confirmed', confidence: 86, xPct: 42, yPct: 48 },
  { region: 'Levant Sector', headline: 'Multi-source satellite thermal anomaly', confidence: 95, xPct: 56, yPct: 38 },
  { region: 'Unverified Channel', headline: 'Single uncorroborated social rumor', confidence: 34, xPct: 26, yPct: 34 },
  { region: 'East Europe', headline: 'Flight radar diversion pattern detected', confidence: 88, xPct: 54, yPct: 24 },
  { region: 'Spoofed Beacon', headline: 'Synthetic GPS replay packet flagged', confidence: 28, xPct: 76, yPct: 44 },
];

const GRNDemo: React.FC<{ onStatusChange: (s: string) => void }> = ({ onStatusChange }) => {
  const [pings, setPings] = useState<OsintPing[]>([
    { ...OSINT_TEMPLATES[0], id: 1 },
    { ...OSINT_TEMPLATES[3], id: 2 },
    { ...OSINT_TEMPLATES[2], id: 3 },
  ]);
  const [selectedId, setSelectedId] = useState<number>(1);
  const [verifiedCount, setVerifiedCount] = useState(0);
  const [accuracyHits, setAccuracyHits] = useState(0);
  const [totalReviewed, setTotalReviewed] = useState(0);
  const [nextId, setNextId] = useState(4);

  const accuracy = totalReviewed === 0 ? 100 : Math.round((accuracyHits / totalReviewed) * 100);

  useEffect(() => {
    onStatusChange(`Verified Intel: ${verifiedCount} | Accuracy: ${accuracy}%`);
  }, [verifiedCount, accuracy, onStatusChange]);

  const activePing = pings.find((p) => p.id === selectedId) || pings[0];

  const resolvePing = (action: 'verify' | 'filter') => {
    if (!activePing) return;
    const isCorroborated = activePing.confidence >= 70;
    const correct =
      (action === 'verify' && isCorroborated) || (action === 'filter' && !isCorroborated);

    setTotalReviewed((t) => t + 1);
    if (correct) setAccuracyHits((a) => a + 1);
    if (action === 'verify' && isCorroborated) setVerifiedCount((v) => v + 1);

    const template = OSINT_TEMPLATES[Math.floor(Math.random() * OSINT_TEMPLATES.length)];
    const replacement: OsintPing = { ...template, id: nextId };
    setNextId((n) => n + 1);
    setPings((prev) => prev.map((p) => (p.id === activePing.id ? replacement : p)));
    setSelectedId(replacement.id);
  };

  return (
    <div className="space-y-3">
      {/* Pixel World Radar */}
      <div className="relative h-36 bg-[#0b1520] x11-inset overflow-hidden">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="absolute top-1.5 left-2 font-pixel-ui text-[10px] text-[#38bdf8]">
          GRN // LIVE OSINT RADAR
        </div>

        {pings.map((ping) => {
          const isSelected = ping.id === activePing?.id;
          const isHigh = ping.confidence >= 70;
          return (
            <button
              key={ping.id}
              type="button"
              onClick={() => setSelectedId(ping.id)}
              style={{ left: `${ping.xPct}%`, top: `${ping.yPct}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 px-1.5 py-0.5 border font-pixel-ui text-[9px] cursor-pointer ${
                isHigh
                  ? 'bg-[#7f1d1d] border-[#ef4444] text-white'
                  : 'bg-[#78350f] border-[#f59e0b] text-[#fef3c7]'
              } ${isSelected ? 'ring-2 ring-white scale-110' : ''}`}
            >
              ● {ping.region.split(' ')[0]}
            </button>
          );
        })}
      </div>

      {activePing && (
        <div className="x11-outset p-2.5 space-y-2">
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="font-pixel-ui font-bold text-[#1e3a5f]">{activePing.region}</span>
            <span
              className={`font-mono-body font-bold ${
                activePing.confidence >= 70 ? 'text-[#15803d]' : 'text-[#b45309]'
              }`}
            >
              Confidence: {activePing.confidence}%
            </span>
          </div>
          <p className="bg-white x11-inset px-2.5 py-1.5 text-xs text-[#111827]">
            {activePing.headline}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => resolvePing('verify')}
              className="flex-1 min-h-[36px] x11-btn-primary px-2 py-1.5 font-pixel-ui text-[11px] font-bold cursor-pointer"
            >
              Verify &amp; Broadcast
            </button>
            <button
              type="button"
              onClick={() => resolvePing('filter')}
              className="flex-1 min-h-[36px] x11-btn px-2 py-1.5 font-pixel-ui text-[11px] font-bold cursor-pointer"
            >
              Filter Noise
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 7. Islamic Contracts — Shariah-Compliant Contract Builder                  */
/* -------------------------------------------------------------------------- */
interface ContractScenario {
  prompt: string;
  expected: 'Murabaha' | 'Mudarabah' | 'Musharakah';
}

const CONTRACT_SCENARIOS: ContractScenario[] = [
  { prompt: 'Finance solar equipment purchase with transparent cost + fixed markup.', expected: 'Murabaha' },
  { prompt: 'Investor supplies capital while entrepreneur manages operations & shares profit.', expected: 'Mudarabah' },
  { prompt: 'Two partners pool capital and jointly manage a real estate venture.', expected: 'Musharakah' },
];

const IslamicContractsDemo: React.FC<{ onStatusChange: (s: string) => void }> = ({ onStatusChange }) => {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [structure, setStructure] = useState<'Murabaha' | 'Mudarabah' | 'Musharakah'>('Murabaha');
  const [clauses, setClauses] = useState({ noRiba: true, assetBacked: false, noGharar: false });
  const [sealedBlocks, setSealedBlocks] = useState<string[]>(['Genesis']);
  const [feedback, setFeedback] = useState<string | null>(null);

  const scenario = CONTRACT_SCENARIOS[scenarioIdx % CONTRACT_SCENARIOS.length];

  useEffect(() => {
    onStatusChange(`Sealed Blocks: ${sealedBlocks.length - 1} | Shariah Verified: 100%`);
  }, [sealedBlocks.length, onStatusChange]);

  const handleSeal = () => {
    if (!clauses.noRiba || !clauses.assetBacked || !clauses.noGharar) {
      setFeedback('Enable all 3 Shariah compliance clauses before sealing.');
      return;
    }
    if (structure !== scenario.expected) {
      setFeedback(`Hint: This scenario matches ${scenario.expected}.`);
      return;
    }
    setSealedBlocks((prev) => [...prev, `${structure} #${prev.length}`]);
    setScenarioIdx((i) => i + 1);
    setClauses({ noRiba: true, assetBacked: false, noGharar: false });
    setFeedback(`${structure} block sealed onto iContractChain ✓`);
  };

  return (
    <div className="space-y-3">
      {/* Sealed Contract Chain */}
      <div className="bg-[#162733] x11-inset p-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {sealedBlocks.map((b, idx) => (
          <React.Fragment key={`${b}-${idx}`}>
            {idx > 0 && <span className="text-[#fde047] font-bold text-xs shrink-0">→</span>}
            <span className="px-2 py-1 bg-[#1e3a5f] border border-[#38bdf8] text-white font-pixel-ui text-[10px] whitespace-nowrap shrink-0">
              [{b}]
            </span>
          </React.Fragment>
        ))}
      </div>

      <div className="bg-white x11-inset p-2.5 text-xs space-y-1">
        <div className="font-pixel-ui text-[10px] font-bold text-[#1e3a5f]">SCENARIO:</div>
        <p className="text-[#111827]">{scenario.prompt}</p>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {(['Murabaha', 'Mudarabah', 'Musharakah'] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => {
              setStructure(type);
              setFeedback(null);
            }}
            className={`min-h-[34px] px-2 py-1 font-pixel-ui text-[11px] font-bold cursor-pointer ${
              structure === type ? 'x11-btn-primary' : 'x11-btn'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="x11-outset p-2.5 space-y-1.5 text-xs">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={clauses.noRiba}
            onChange={(e) => setClauses((c) => ({ ...c, noRiba: e.target.checked }))}
          />
          <span>0% Riba (Interest-Free Structure)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={clauses.assetBacked}
            onChange={(e) => setClauses((c) => ({ ...c, assetBacked: e.target.checked }))}
          />
          <span>Real Asset-Backed / Productive Venture</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={clauses.noGharar}
            onChange={(e) => setClauses((c) => ({ ...c, noGharar: e.target.checked }))}
          />
          <span>No Gharar (Transparent Terms &amp; Risk Sharing)</span>
        </label>
      </div>

      {feedback && (
        <div className="text-xs font-semibold text-[#1e3a5f] bg-[#fefce8] x11-inset px-2.5 py-1.5">
          {feedback}
        </div>
      )}

      <button
        type="button"
        onClick={handleSeal}
        className="w-full min-h-[38px] x11-btn-primary px-3 py-2 font-pixel-ui text-xs font-bold cursor-pointer"
      >
        [ Seal Block on Chain ]
      </button>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 8. Al Jisr Institute — Language Bridge Matcher                             */
/* -------------------------------------------------------------------------- */
const BRIDGE_PAIRS = [
  { id: 'peace', en: 'Peace be upon you', ar: 'السلام عليكم' },
  { id: 'bridge', en: 'The Bridge Institute', ar: 'معهد الجسر' },
  { id: 'faculty', en: 'Join Our Faculty', ar: 'انضم إلى هيئة التدريس' },
  { id: 'dialogue', en: 'Cultural Dialogue', ar: 'حوار ثقافي' },
];

const AlJisrDemo: React.FC<{ onStatusChange: (s: string) => void }> = ({ onStatusChange }) => {
  const [selectedEn, setSelectedEn] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    onStatusChange(`Matched: ${matched.length}/${BRIDGE_PAIRS.length} | Fluency Streak: ${streak}`);
  }, [matched.length, streak, onStatusChange]);

  const handleArabicClick = (id: string) => {
    if (!selectedEn || matched.includes(id)) return;
    if (selectedEn === id) {
      setMatched((prev) => [...prev, id]);
      setStreak((s) => s + 1);
      setSelectedEn(null);
    } else {
      setStreak(0);
      setSelectedEn(null);
    }
  };

  const progressPct = (matched.length / BRIDGE_PAIRS.length) * 42;
  const reversedArabic = [...BRIDGE_PAIRS].reverse();

  return (
    <div className="space-y-3">
      {/* Visual Bridge Progress */}
      <div className="relative h-16 bg-[#1e3a4c] x11-inset overflow-hidden px-3">
        <div
          className="absolute bottom-2 text-lg transition-all duration-300"
          style={{ left: `${8 + progressPct}%` }}
          title="Learner"
        >
          🧑‍🎓
        </div>
        <div
          className="absolute bottom-2 text-lg transition-all duration-300"
          style={{ right: `${8 + progressPct}%` }}
          title="Instructor"
        >
          👩‍🏫
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#d4d0c8] border-t border-white" />
        <div className="pt-1.5 text-center font-pixel-ui text-[10px] text-[#fde047]">
          {matched.length === BRIDGE_PAIRS.length
            ? 'BRIDGE CONNECTED! EN ↔ عربي'
            : `Fluency Bridge: ${matched.length}/${BRIDGE_PAIRS.length}`}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <div className="font-pixel-ui text-[10px] font-bold text-[#1e3a5f]">ENGLISH:</div>
          {BRIDGE_PAIRS.map((p) => {
            const isDone = matched.includes(p.id);
            const isSel = selectedEn === p.id;
            return (
              <button
                key={p.id}
                type="button"
                disabled={isDone}
                onClick={() => setSelectedEn(p.id)}
                className={`w-full min-h-[36px] px-2.5 py-1.5 text-left font-mono-body text-xs cursor-pointer ${
                  isDone
                    ? 'bg-[#dcfce7] text-[#15803d] border border-[#22c55e] opacity-70'
                    : isSel
                    ? 'x11-btn-primary'
                    : 'x11-btn'
                }`}
              >
                {p.en} {isDone ? '✓' : ''}
              </button>
            );
          })}
        </div>

        <div className="space-y-1.5">
          <div className="font-pixel-ui text-[10px] font-bold text-[#1e3a5f]">ARABIC (عربي):</div>
          {reversedArabic.map((p) => {
            const isDone = matched.includes(p.id);
            return (
              <button
                key={p.id}
                type="button"
                disabled={isDone}
                onClick={() => handleArabicClick(p.id)}
                dir="rtl"
                className={`w-full min-h-[36px] px-2.5 py-1.5 text-right text-sm font-bold cursor-pointer ${
                  isDone
                    ? 'bg-[#dcfce7] text-[#15803d] border border-[#22c55e] opacity-70'
                    : 'x11-btn'
                }`}
              >
                {p.ar}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Modal Wrapper                                                              */
/* -------------------------------------------------------------------------- */
const ProjectDemoGame: React.FC<ProjectDemoGameProps> = ({ project, onClose }) => {
  const [resetCount, setResetCount] = useState(0);
  const [statusText, setStatusText] = useState('Ready');

  const meta = DEMO_META[project.id] || {
    title: `${project.name} Interactive Demo`,
    instruction: 'Interact with the live retro pixel simulation below.',
  };

  const renderDemoBody = () => {
    switch (project.id) {
      case 'qareeb':
        return <QareebDemo key={resetCount} onStatusChange={setStatusText} />;
      case 'nouakchott-energy-map':
        return <EnergyMapDemo key={resetCount} onStatusChange={setStatusText} />;
      case 'charity-trash-bounties':
        return <TrashBountyDemo key={resetCount} onStatusChange={setStatusText} />;
      case 'shtreli':
        return <ShtreliDemo key={resetCount} onStatusChange={setStatusText} />;
      case 'mahdara-al-andalous':
        return <MahdaraDemo key={resetCount} onStatusChange={setStatusText} />;
      case 'global-resistance-network':
        return <GRNDemo key={resetCount} onStatusChange={setStatusText} />;
      case 'islamic-contracts':
        return <IslamicContractsDemo key={resetCount} onStatusChange={setStatusText} />;
      case 'al-jisr-institute':
      default:
        return <AlJisrDemo key={resetCount} onStatusChange={setStatusText} />;
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[120] bg-black/60 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} Interactive Demo`}
    >
      <div
        className="x11-window-frame w-full max-w-xl max-h-[88dvh] flex flex-col overflow-hidden p-1"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navy X11 Demo Window Title Bar */}
        <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-2.5 py-1.5 flex items-center justify-between gap-2 text-white shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-block w-2.5 h-2.5 bg-[#d4d0c8] border border-[#404040] shrink-0" />
            <span className="font-pixel-ui text-xs font-bold truncate">
              [DEMO] {project.name} — {meta.title}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-w-[28px] min-h-[28px] x11-btn font-pixel-ui text-xs font-bold leading-none flex items-center justify-center cursor-pointer shrink-0"
            aria-label="Close demo"
          >
            X
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-3 sm:p-4 bg-[#d4d0c8] overflow-y-auto space-y-3 text-[#111827]">
          {/* Status Readout + Reset & Close Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#808080]">
            <div className="bg-white x11-inset px-2.5 py-1 font-mono-body text-[11px] font-bold text-[#1e3a5f] truncate max-w-full">
              {statusText}
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setResetCount((c) => c + 1)}
                className="x11-btn min-h-[30px] px-2.5 py-1 font-pixel-ui text-[11px] font-bold cursor-pointer"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={onClose}
                className="x11-btn min-h-[30px] px-2.5 py-1 font-pixel-ui text-[11px] font-bold cursor-pointer"
              >
                Close Demo
              </button>
            </div>
          </div>

          {/* 1-Line Instruction Banner */}
          <div className="bg-[#fefce8] x11-inset px-2.5 py-1.5 text-xs font-mono-body text-[#111827]">
            {meta.instruction}
          </div>

          {/* Interactive Mini-Game Content */}
          {renderDemoBody()}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProjectDemoGame;
