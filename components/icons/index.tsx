import React from 'react';

// Classic 90s Linux X11 / CDE 16-bit Pixel Document Icon (README)
export const FileTextIcon = (props: React.SVGProps<SVGSVGElement>): React.JSX.Element => (
  <svg viewBox="0 0 16 16" shapeRendering="crispEdges" fill="none" {...props}>
    {/* Drop shadow */}
    <rect x="3" y="2" width="11" height="14" fill="#1f2937" />
    {/* Outer border */}
    <rect x="2" y="1" width="10" height="14" fill="#374151" />
    {/* Crisp white paper interior */}
    <rect x="3" y="2" width="8" height="12" fill="#ffffff" />
    {/* Folded corner */}
    <rect x="9" y="1" width="3" height="3" fill="#d4d0c8" />
    <rect x="9" y="3" width="3" height="1" fill="#808080" />
    <rect x="9" y="1" width="1" height="3" fill="#808080" />
    {/* Header bar & text lines */}
    <rect x="4" y="4" width="4" height="1" fill="#1e3a5f" />
    <rect x="4" y="6" width="6" height="1" fill="#4b5563" />
    <rect x="4" y="8" width="6" height="1" fill="#4b5563" />
    <rect x="4" y="10" width="5" height="1" fill="#4b5563" />
    <rect x="4" y="12" width="4" height="1" fill="#9ca3af" />
  </svg>
);

// Classic 90s Linux X11 / XFCE 16-bit Manila Folder Icon (Projects)
export const FolderIcon = (props: React.SVGProps<SVGSVGElement>): React.JSX.Element => (
  <svg viewBox="0 0 16 16" shapeRendering="crispEdges" fill="none" {...props}>
    {/* Shadow */}
    <rect x="2" y="4" width="14" height="11" fill="#1f2937" />
    {/* Folder tab */}
    <rect x="1" y="2" width="6" height="2" fill="#d97706" />
    <rect x="2" y="3" width="4" height="1" fill="#fcd34d" />
    {/* Folder back */}
    <rect x="1" y="4" width="13" height="10" fill="#92400e" />
    {/* Paper sheet peeking out */}
    <rect x="3" y="4" width="9" height="2" fill="#ffffff" />
    {/* Folder front flap */}
    <rect x="2" y="6" width="11" height="7" fill="#f59e0b" />
    {/* Top highlight bevel */}
    <rect x="2" y="5" width="11" height="1" fill="#fde68a" />
    <rect x="2" y="6" width="1" height="7" fill="#fde68a" />
  </svg>
);

// Classic 90s Linux X11 Mail Envelope Icon (Contact)
export const MailIcon = (props: React.SVGProps<SVGSVGElement>): React.JSX.Element => (
  <svg viewBox="0 0 16 16" shapeRendering="crispEdges" fill="none" {...props}>
    {/* Shadow */}
    <rect x="2" y="4" width="14" height="10" fill="#1f2937" />
    {/* Envelope border */}
    <rect x="1" y="3" width="13" height="10" fill="#374151" />
    {/* Envelope paper */}
    <rect x="2" y="4" width="11" height="8" fill="#f9fafb" />
    {/* Envelope V flap lines */}
    <rect x="2" y="4" width="2" height="1" fill="#6b7280" />
    <rect x="11" y="4" width="2" height="1" fill="#6b7280" />
    <rect x="4" y="5" width="2" height="1" fill="#6b7280" />
    <rect x="9" y="5" width="2" height="1" fill="#6b7280" />
    <rect x="6" y="6" width="3" height="1" fill="#1e3a5f" />
    {/* Stamp accent */}
    <rect x="10" y="9" width="2" height="2" fill="#2563eb" />
  </svg>
);

// Classic 90s Linux X11 System User ID Card Icon (Info)
export const InfoIcon = (props: React.SVGProps<SVGSVGElement>): React.JSX.Element => (
  <svg viewBox="0 0 16 16" shapeRendering="crispEdges" fill="none" {...props}>
    {/* Shadow */}
    <rect x="3" y="3" width="12" height="12" fill="#1f2937" />
    {/* Outer bevel card */}
    <rect x="2" y="2" width="12" height="12" fill="#374151" />
    <rect x="3" y="3" width="10" height="10" fill="#e5e7eb" />
    {/* Navy top header stripe */}
    <rect x="3" y="3" width="10" height="2" fill="#1e3a5f" />
    {/* User avatar silhouette */}
    <rect x="6" y="6" width="4" height="3" fill="#2563eb" />
    <rect x="5" y="10" width="6" height="2" fill="#1e3a5f" />
  </svg>
);
