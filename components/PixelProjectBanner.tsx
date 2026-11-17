import React from 'react';

interface PixelProjectBannerProps {
  projectId: string;
  projectName: string;
}

const PixelProjectBanner: React.FC<PixelProjectBannerProps> = ({ projectId, projectName }) => {
  const renderScene = () => {
    switch (projectId) {
      case 'qareeb':
        // 1. Qareeb: Pixelated delivery scooter / grocery box & location pin
        return (
          <svg
            viewBox="0 0 120 48"
            className="w-full h-full"
            shapeRendering="crispEdges"
            aria-label={`${projectName} pixel illustration`}
          >
            {/* Background Sky & Road */}
            <rect width="120" height="36" fill="#23414d" />
            <rect y="36" width="120" height="12" fill="#1b262c" />
            {/* Dashed road line */}
            <rect x="8" y="41" width="12" height="2" fill="#d4d0c8" />
            <rect x="30" y="41" width="12" height="2" fill="#d4d0c8" />
            <rect x="52" y="41" width="12" height="2" fill="#d4d0c8" />
            <rect x="74" y="41" width="12" height="2" fill="#d4d0c8" />
            <rect x="96" y="41" width="12" height="2" fill="#d4d0c8" />

            {/* Delivery Package / Grocery Box on Left */}
            <rect x="16" y="14" width="20" height="18" fill="#d97706" />
            <rect x="16" y="14" width="20" height="4" fill="#fbbf24" />
            <rect x="24" y="14" width="4" height="10" fill="#fef3c7" />
            <rect x="18" y="10" width="5" height="4" fill="#22c55e" />
            <rect x="25" y="9" width="6" height="5" fill="#ef4444" />

            {/* Delivery Scooter in Center */}
            {/* Wheels */}
            <rect x="48" y="30" width="8" height="8" fill="#111827" />
            <rect x="50" y="32" width="4" height="4" fill="#9ca3af" />
            <rect x="70" y="30" width="8" height="8" fill="#111827" />
            <rect x="72" y="32" width="4" height="4" fill="#9ca3af" />
            {/* Scooter chassis */}
            <rect x="50" y="26" width="24" height="5" fill="#38bdf8" />
            <rect x="52" y="21" width="10" height="5" fill="#1e3a5f" />
            <rect x="68" y="15" width="4" height="12" fill="#38bdf8" />
            <rect x="66" y="13" width="8" height="3" fill="#e5e7eb" />
            <rect x="74" y="16" width="3" height="3" fill="#fde047" />
            {/* Rear cargo box */}
            <rect x="45" y="16" width="9" height="9" fill="#f59e0b" />
            <rect x="46" y="17" width="7" height="2" fill="#fef3c7" />
            {/* Speed lines */}
            <rect x="39" y="20" width="4" height="2" fill="#93c5fd" />
            <rect x="37" y="25" width="6" height="2" fill="#93c5fd" />

            {/* Location Pin on Right */}
            <rect x="93" y="10" width="12" height="12" fill="#ef4444" />
            <rect x="95" y="8" width="8" height="2" fill="#ef4444" />
            <rect x="95" y="22" width="8" height="3" fill="#ef4444" />
            <rect x="97" y="25" width="4" height="3" fill="#ef4444" />
            <rect x="98" y="28" width="2" height="3" fill="#ef4444" />
            <rect x="97" y="13" width="4" height="4" fill="#ffffff" />
            {/* Pin ground pulse */}
            <rect x="93" y="32" width="12" height="2" fill="#93c5fd" />
          </svg>
        );

      case 'nouakchott-energy-map':
        // 2. Nouakchott Energy Map: Pixelated lightning bolt / power grid tower & city map blocks
        return (
          <svg
            viewBox="0 0 120 48"
            className="w-full h-full"
            shapeRendering="crispEdges"
            aria-label={`${projectName} pixel illustration`}
          >
            <rect width="120" height="48" fill="#1b3440" />
            {/* Subtle Map Grid Lines */}
            <rect x="0" y="12" width="120" height="1" fill="#2b4c59" />
            <rect x="0" y="24" width="120" height="1" fill="#2b4c59" />
            <rect x="0" y="36" width="120" height="1" fill="#2b4c59" />
            <rect x="24" y="0" width="1" height="48" fill="#2b4c59" />
            <rect x="60" y="0" width="1" height="48" fill="#2b4c59" />
            <rect x="96" y="0" width="1" height="48" fill="#2b4c59" />

            {/* Power Grid Tower (Left) */}
            <rect x="20" y="10" width="2" height="30" fill="#d4d0c8" />
            <rect x="28" y="10" width="2" height="30" fill="#d4d0c8" />
            <rect x="16" y="14" width="18" height="2" fill="#d4d0c8" />
            <rect x="18" y="22" width="14" height="2" fill="#d4d0c8" />
            <rect x="22" y="7" width="6" height="3" fill="#93c5fd" />
            {/* Power lines connecting to city */}
            <rect x="34" y="15" width="20" height="1" fill="#fde047" />
            <rect x="32" y="23" width="22" height="1" fill="#fde047" />

            {/* Pixelated Lightning Bolt (Center) */}
            <rect x="58" y="7" width="8" height="4" fill="#facc15" />
            <rect x="55" y="11" width="8" height="4" fill="#facc15" />
            <rect x="52" y="15" width="14" height="4" fill="#fde047" />
            <rect x="57" y="19" width="7" height="4" fill="#facc15" />
            <rect x="54" y="23" width="6" height="4" fill="#facc15" />
            <rect x="52" y="27" width="4" height="4" fill="#eab308" />

            {/* City Map Blocks with Lit Windows (Right) */}
            <rect x="76" y="20" width="12" height="20" fill="#334155" />
            <rect x="79" y="23" width="2" height="3" fill="#4ade80" />
            <rect x="83" y="23" width="2" height="3" fill="#4ade80" />
            <rect x="79" y="29" width="2" height="3" fill="#fde047" />
            <rect x="83" y="29" width="2" height="3" fill="#4ade80" />

            <rect x="90" y="14" width="14" height="26" fill="#475569" />
            <rect x="93" y="17" width="3" height="3" fill="#fde047" />
            <rect x="98" y="17" width="3" height="3" fill="#fde047" />
            <rect x="93" y="23" width="3" height="3" fill="#4ade80" />
            <rect x="98" y="23" width="3" height="3" fill="#fde047" />
            <rect x="93" y="29" width="3" height="3" fill="#4ade80" />
            <rect x="98" y="29" width="3" height="3" fill="#4ade80" />

            <rect x="10" y="40" width="100" height="3" fill="#64748b" />
          </svg>
        );

      case 'charity-trash-bounties':
        // 3. Charity Trash Bounties: Pixelated recycling/cleanup bin, coin/reward badge & clean city skyline
        return (
          <svg
            viewBox="0 0 120 48"
            className="w-full h-full"
            shapeRendering="crispEdges"
            aria-label={`${projectName} pixel illustration`}
          >
            <rect width="120" height="38" fill="#23453c" />
            <rect y="38" width="120" height="10" fill="#162c26" />

            {/* Clean City Skyline (Left) */}
            <rect x="12" y="18" width="10" height="20" fill="#4b6b63" />
            <rect x="23" y="12" width="12" height="26" fill="#5c8077" />
            <rect x="26" y="15" width="2" height="3" fill="#d1fae5" />
            <rect x="30" y="15" width="2" height="3" fill="#d1fae5" />
            <rect x="26" y="21" width="2" height="3" fill="#d1fae5" />
            <rect x="30" y="21" width="2" height="3" fill="#d1fae5" />

            {/* Recycling / Cleanup Bin (Center) */}
            <rect x="49" y="13" width="20" height="3" fill="#22c55e" />
            <rect x="55" y="10" width="8" height="3" fill="#4ade80" />
            <rect x="51" y="16" width="16" height="22" fill="#16a34a" />
            {/* White pixel eco symbol on bin */}
            <rect x="57" y="21" width="4" height="2" fill="#ffffff" />
            <rect x="55" y="23" width="2" height="4" fill="#ffffff" />
            <rect x="61" y="23" width="2" height="4" fill="#ffffff" />
            <rect x="57" y="27" width="4" height="2" fill="#ffffff" />

            {/* Bounty Coin / Reward Badge (Right) */}
            <rect x="84" y="12" width="18" height="18" fill="#f59e0b" />
            <rect x="86" y="10" width="14" height="2" fill="#fbbf24" />
            <rect x="86" y="30" width="14" height="2" fill="#d97706" />
            <rect x="87" y="14" width="12" height="14" fill="#fde047" />
            {/* Star/Currency mark inside coin */}
            <rect x="92" y="16" width="2" height="10" fill="#b45309" />
            <rect x="90" y="18" width="6" height="2" fill="#b45309" />
            <rect x="90" y="22" width="6" height="2" fill="#b45309" />
            {/* Sparkles */}
            <rect x="78" y="10" width="2" height="2" fill="#fef08a" />
            <rect x="105" y="16" width="2" height="2" fill="#fef08a" />
          </svg>
        );

      case 'shtreli':
        // 4. Shtreli: Pixelated shopping bag / local marketplace storefront
        return (
          <svg
            viewBox="0 0 120 48"
            className="w-full h-full"
            shapeRendering="crispEdges"
            aria-label={`${projectName} pixel illustration`}
          >
            <rect width="120" height="38" fill="#2c3e50" />
            <rect y="38" width="120" height="10" fill="#1a252f" />

            {/* Marketplace Storefront (Left-Center) */}
            <rect x="18" y="16" width="44" height="22" fill="#d4d0c8" />
            {/* Striped Awning */}
            <rect x="16" y="10" width="8" height="7" fill="#ef4444" />
            <rect x="24" y="10" width="8" height="7" fill="#ffffff" />
            <rect x="32" y="10" width="8" height="7" fill="#ef4444" />
            <rect x="40" y="10" width="8" height="7" fill="#ffffff" />
            <rect x="48" y="10" width="8" height="7" fill="#ef4444" />
            <rect x="56" y="10" width="8" height="7" fill="#ffffff" />
            {/* Store Window & Door */}
            <rect x="22" y="21" width="18" height="11" fill="#38bdf8" />
            <rect x="24" y="23" width="6" height="2" fill="#e0f2fe" />
            <rect x="44" y="21" width="12" height="17" fill="#1e3a5f" />
            <rect x="53" y="29" width="2" height="2" fill="#fde047" />

            {/* Shopping Bag & Price Tag (Right) */}
            {/* Bag Handles */}
            <rect x="81" y="10" width="2" height="5" fill="#fef3c7" />
            <rect x="89" y="10" width="2" height="5" fill="#fef3c7" />
            <rect x="83" y="8" width="6" height="2" fill="#fef3c7" />
            {/* Bag Body */}
            <rect x="76" y="15" width="20" height="23" fill="#f59e0b" />
            <rect x="76" y="15" width="20" height="3" fill="#fbbf24" />
            <rect x="81" y="22" width="10" height="8" fill="#ffffff" />
            <rect x="83" y="25" width="6" height="2" fill="#ef4444" />
          </svg>
        );

      case 'mahdara-al-andalous':
        // 5. Mahdara Al-Andalous Al-Ilmiyya: Pixelated open book / classic Islamic arch & scroll
        return (
          <svg
            viewBox="0 0 120 48"
            className="w-full h-full"
            shapeRendering="crispEdges"
            aria-label={`${projectName} pixel illustration`}
          >
            <rect width="120" height="48" fill="#1f3a3d" />

            {/* Classic Andalusian Arch Silhouette (Left) */}
            <rect x="16" y="16" width="4" height="24" fill="#d4d0c8" />
            <rect x="38" y="16" width="4" height="24" fill="#d4d0c8" />
            <rect x="18" y="12" width="22" height="4" fill="#e5e7eb" />
            <rect x="22" y="9" width="14" height="3" fill="#fbbf24" />
            <rect x="27" y="6" width="4" height="3" fill="#fde047" />
            <rect x="14" y="40" width="30" height="2" fill="#9ca3af" />

            {/* Pixelated Open Book (Center-Right) */}
            {/* Book cover */}
            <rect x="54" y="15" width="48" height="24" fill="#b45309" />
            {/* Left Page */}
            <rect x="56" y="13" width="21" height="23" fill="#fefce8" />
            {/* Right Page */}
            <rect x="79" y="13" width="21" height="23" fill="#fef9c3" />
            {/* Center Spine */}
            <rect x="77" y="14" width="2" height="23" fill="#92400e" />
            {/* Bookmark Ribbon */}
            <rect x="77" y="37" width="3" height="6" fill="#ef4444" />
            {/* Pixel Text Lines on Pages */}
            <rect x="60" y="18" width="13" height="2" fill="#1e3a5f" />
            <rect x="60" y="22" width="11" height="2" fill="#475569" />
            <rect x="60" y="26" width="13" height="2" fill="#475569" />
            <rect x="60" y="30" width="9" height="2" fill="#475569" />

            <rect x="83" y="18" width="13" height="2" fill="#1e3a5f" />
            <rect x="83" y="22" width="13" height="2" fill="#475569" />
            <rect x="83" y="26" width="10" height="2" fill="#475569" />
            <rect x="83" y="30" width="12" height="2" fill="#475569" />
          </svg>
        );

      case 'global-resistance-network':
        // 6. Global Resistance Network: Pixelated wireframe globe with news signal waves / radar pulse
        return (
          <svg
            viewBox="0 0 120 48"
            className="w-full h-full"
            shapeRendering="crispEdges"
            aria-label={`${projectName} pixel illustration`}
          >
            <rect width="120" height="48" fill="#162636" />

            {/* Left Signal Waves */}
            <rect x="26" y="18" width="2" height="12" fill="#38bdf8" />
            <rect x="20" y="14" width="2" height="20" fill="#60a5fa" />
            <rect x="14" y="10" width="2" height="28" fill="#93c5fd" />

            {/* Pixelated Wireframe Globe (Center) */}
            <rect x="50" y="8" width="20" height="2" fill="#38bdf8" />
            <rect x="46" y="10" width="28" height="2" fill="#38bdf8" />
            <rect x="44" y="12" width="32" height="24" fill="#1e3a5f" />
            <rect x="46" y="36" width="28" height="2" fill="#38bdf8" />
            <rect x="50" y="38" width="20" height="2" fill="#38bdf8" />

            {/* Globe Latitude & Longitude Grid Lines */}
            <rect x="59" y="10" width="2" height="28" fill="#7dd3fc" />
            <rect x="52" y="12" width="1" height="24" fill="#38bdf8" />
            <rect x="67" y="12" width="1" height="24" fill="#38bdf8" />
            <rect x="44" y="23" width="32" height="2" fill="#7dd3fc" />
            <rect x="46" y="16" width="28" height="1" fill="#38bdf8" />
            <rect x="46" y="31" width="28" height="1" fill="#38bdf8" />

            {/* Active News Signal Nodes on Globe */}
            <rect x="54" y="18" width="3" height="3" fill="#ef4444" />
            <rect x="64" y="26" width="3" height="3" fill="#fde047" />

            {/* Right Signal Waves */}
            <rect x="92" y="18" width="2" height="12" fill="#38bdf8" />
            <rect x="98" y="14" width="2" height="20" fill="#60a5fa" />
            <rect x="104" y="10" width="2" height="28" fill="#93c5fd" />
          </svg>
        );

      case 'islamic-contracts':
        // 7. Islamic Contracts: Pixelated digital ledger / linked blocks & contract scroll
        return (
          <svg
            viewBox="0 0 120 48"
            className="w-full h-full"
            shapeRendering="crispEdges"
            aria-label={`${projectName} pixel illustration`}
          >
            <rect width="120" height="48" fill="#233845" />

            {/* Linked Digital Blocks (Left) */}
            <rect x="14" y="16" width="14" height="14" fill="#38bdf8" />
            <rect x="16" y="18" width="10" height="10" fill="#1e3a5f" />
            <rect x="19" y="21" width="4" height="4" fill="#fde047" />

            {/* Chain Connector */}
            <rect x="28" y="22" width="10" height="2" fill="#fde047" />

            <rect x="38" y="16" width="14" height="14" fill="#38bdf8" />
            <rect x="40" y="18" width="10" height="10" fill="#1e3a5f" />
            <rect x="43" y="21" width="4" height="4" fill="#4ade80" />

            {/* Chain Connector to Contract */}
            <rect x="52" y="22" width="14" height="2" fill="#fde047" />

            {/* Contract Scroll & Verified Seal (Right) */}
            <rect x="66" y="8" width="34" height="4" fill="#d97706" />
            <rect x="68" y="12" width="30" height="26" fill="#fefce8" />
            <rect x="66" y="38" width="34" height="4" fill="#d97706" />
            {/* Contract text lines */}
            <rect x="73" y="16" width="20" height="2" fill="#1e3a5f" />
            <rect x="73" y="21" width="18" height="2" fill="#64748b" />
            <rect x="73" y="26" width="14" height="2" fill="#64748b" />
            {/* Official Wax / Verification Seal */}
            <rect x="86" y="28" width="8" height="8" fill="#16a34a" />
            <rect x="88" y="30" width="4" height="4" fill="#86efac" />
          </svg>
        );

      case 'al-jisr-institute':
      default:
        // 8. Al Jisr Institute: Pixelated bridge connecting two pillars & graduation cap
        return (
          <svg
            viewBox="0 0 120 48"
            className="w-full h-full"
            shapeRendering="crispEdges"
            aria-label={`${projectName} pixel illustration`}
          >
            <rect width="120" height="38" fill="#244052" />
            {/* Water under the bridge */}
            <rect y="38" width="120" height="10" fill="#1084d0" />
            <rect x="14" y="42" width="16" height="2" fill="#7dd3fc" />
            <rect x="52" y="43" width="18" height="2" fill="#7dd3fc" />
            <rect x="88" y="41" width="16" height="2" fill="#7dd3fc" />

            {/* Graduation Cap Badge Above Bridge */}
            <rect x="52" y="6" width="16" height="3" fill="#111827" />
            <rect x="48" y="9" width="24" height="3" fill="#1e293b" />
            <rect x="54" y="12" width="12" height="3" fill="#334155" />
            {/* Gold Tassel */}
            <rect x="68" y="10" width="2" height="6" fill="#fde047" />

            {/* Pixelated Bridge Connecting Two Pillars ("Al Jisr") */}
            {/* Left & Right Stone Pillars */}
            <rect x="20" y="18" width="8" height="20" fill="#d4d0c8" />
            <rect x="18" y="16" width="12" height="3" fill="#ffffff" />
            <rect x="92" y="18" width="8" height="20" fill="#d4d0c8" />
            <rect x="90" y="16" width="12" height="3" fill="#ffffff" />

            {/* Bridge Deck */}
            <rect x="10" y="26" width="100" height="4" fill="#e5e7eb" />
            <rect x="10" y="29" width="100" height="2" fill="#9ca3af" />

            {/* Bridge Suspension Cables & Arch */}
            <rect x="28" y="21" width="6" height="2" fill="#fbbf24" />
            <rect x="34" y="23" width="8" height="2" fill="#fbbf24" />
            <rect x="78" y="23" width="8" height="2" fill="#fbbf24" />
            <rect x="86" y="21" width="6" height="2" fill="#fbbf24" />
            {/* Under-arch supports */}
            <rect x="36" y="31" width="12" height="3" fill="#d4d0c8" />
            <rect x="48" y="30" width="24" height="2" fill="#d4d0c8" />
            <rect x="72" y="31" width="12" height="3" fill="#d4d0c8" />
          </svg>
        );
    }
  };

  return (
    <div className="w-full h-28 sm:h-32 bg-[#1e2f38] x11-inset p-1 overflow-hidden select-none">
      {renderScene()}
    </div>
  );
};

export default PixelProjectBanner;
