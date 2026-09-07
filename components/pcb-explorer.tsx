'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { portfolioItems, type PortfolioItem } from '@/lib/portfolio';

const activePaths: Record<string, string> = {
  'beta-technologies': 'M66 126 H156 V160 H290',
  spacex: 'M66 186 H220 V160 H500',
  'about-me': 'M66 274 H630 V307 H790',
  'yellow-jacket-space-program': 'M66 470 H170 V474 H270',
  'personal-projects': 'M66 494 H300 V474 H480',
  'the-hive': 'M66 518 H510 V474 H680'
};

function IcSymbol({ item }: { item: PortfolioItem }) {
  const pins = [20, 40, 60, 80];
  return <span className={`schematic-ic ${item.size === 'large' ? 'large' : ''}`}>
    <svg viewBox="0 0 160 112" aria-hidden="true">
      <rect x="20" y="8" width="120" height="96"/>
      {pins.map((y, index) => <g key={y}>
        <path d={`M0 ${y}H20M140 ${y}H160`}/>
        <text x="24" y={y - 3}>{index + 1}</text>
        <text x="136" y={y - 3} textAnchor="end">{index + 5}</text>
      </g>)}
      <circle cx="31" cy="19" r="3"/>
    </svg>
    <span className="symbol-title"><small>{item.ref}</small><b>{item.shortTitle}</b></span>
  </span>;
}

function CapacitorSymbol({ refName, x, y }: { refName: string; x: number; y: number }) {
  return <span className="schematic-passive capacitor-symbol" style={{ left: `${x}%`, top: `${y}%` }}>
    <svg viewBox="0 0 72 34" aria-hidden="true"><path d="M0 17H28M28 5V29M44 5V29M44 17H72"/></svg><b>{refName}</b>
  </span>;
}

function ResistorSymbol({ refName, x, y, note }: { refName: string; x: number; y: number; note?: string }) {
  return <span className="schematic-passive resistor-symbol" style={{ left: `${x}%`, top: `${y}%` }}>
    <svg viewBox="0 0 90 34" aria-hidden="true"><path d="M0 17H14L20 6L30 28L40 6L50 28L60 6L70 28L76 17H90"/></svg><b>{refName}</b>{note && <small>{note}</small>}
  </span>;
}

function PassiveSymbols() {
  const capacitors = [
    ['C1',24,11],['C2',43,11],['C3',62,12],['C4',88,31],['C5',88,62],['C6',16,88],['C7',40,88],['C8',61,87],['C9',73,61]
  ] as const;
  const resistors = [
    ['R1',25,8],['R2',74,16],['R3',81,76],['R4',71,88],['R5',36,57],['R6',56,44]
  ] as const;
  return <>
    {capacitors.map(([refName,x,y]) => <CapacitorSymbol key={refName} refName={refName} x={x} y={y}/>)}
    {resistors.map(([refName,x,y]) => <ResistorSymbol key={refName} refName={refName} x={x} y={y}/>)}
    <ResistorSymbol refName="R7" x={39} y={28} note="ETH TERM"/>
    <ResistorSymbol refName="R8" x={15} y={76} note="CAN TERM"/>
    <ResistorSymbol refName="R9" x={84} y={76} note="CAN TERM"/>
  </>;
}

export function PcbExplorer() {
  const router = useRouter();
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const openItem = (item: PortfolioItem) => {
    if (active) return;
    setActive(item.slug);
    window.setTimeout(() => router.push(`/work/${item.slug}/`), 650);
  };

  return <main className={`pcb-shell schematic-shell ${active ? 'routing' : ''}`}>
    <header className="pcb-topbar schematic-topbar">
      <a href="/" className="schematic-brand"><span>BL-PORTFOLIO-28</span><small>INTERACTIVE ENGINEERING SCHEMATIC</small></a>
      <p><span className="live-dot"/>SCHEMATIC <b>REV 4.0</b></p>
      <div className="board-links"><a href="mailto:brandonluo@gatech.edu">CONTACT</a><a href="/Brandon-Luo-Resume.pdf" target="_blank" rel="noreferrer">RESUME ↗</a></div>
    </header>

    <section className="pcb-workbench schematic-workbench" aria-labelledby="board-title">
      <div className="bench-copy schematic-copy"><p className="overline">PORTFOLIO / TOP LEVEL</p><h1 id="board-title">Select a subsystem.</h1><p>Hover over a symbol to identify it. Click to highlight its net and open the detailed sheet.</p></div>

      <div className="board-stage schematic-stage">
        <div className="schematic-sheet">
          <div className="sheet-zones" aria-hidden="true"><span className="zone-a">A</span><span className="zone-b">B</span><span className="zone-c">C</span><span className="zone-d">D</span></div>
          <span className="sheet-coordinate top one">1</span><span className="sheet-coordinate top two">2</span><span className="sheet-coordinate top three">3</span><span className="sheet-coordinate top four">4</span><span className="sheet-coordinate top five">5</span>

          <div className="sheet-title-block">
            <div className="title-main"><small>TITLE</small><b>Brandon Luo</b><span>ECE Engineering</span></div>
            <div><small>DOC</small><span>BL-PORTFOLIO-28</span></div><div><small>REV</small><span>4.0</span></div>
            <div><small>SHEET</small><span>1 / 1</span></div><div><small>DATE</small><span>2026</span></div>
          </div>

          <div className="schematic-connector" aria-hidden="true"><b>J1</b><span>PORTFOLIO NAV</span>{Array.from({length:10},(_,i)=><i key={i}><em>{i + 1}</em></i>)}</div>

          <svg className="signal-networks schematic-nets" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true">
            <g className="network ethernet"><path d="M66 104H178V122H282l8-10 10 20 10-20 10 20 10-20 10 20 10-10H500V152"/><path d="M66 124H194V142H500V172"/><text x="342" y="96">ETH_TX+ / ETH_TX− · MATCHED PAIR</text></g>
            <g className="network spi"><path d="M66 244H660V260H790"/><path d="M66 264H645V280H790"/><path d="M66 284H630V300H790"/><path d="M66 304H615V320H790"/><text x="470" y="235">SPI: SCLK / MOSI / MISO / CS</text></g>
            <g className="network can"><path d="M66 462H790"/><path d="M66 486H790"/><path d="M270 462V474M270 486V482M480 462V474M480 486V482M680 462V474M680 486V482"/><text x="510" y="454">CAN_H</text><text x="510" y="510">CAN_L</text></g>
            <g className="network beta"><path d="M66 72H148V126H290V152"/><path d="M66 88H166V142H275V152"/></g>
            <g className="power"><path d="M242 74V48M432 74V48M622 78V48M844 198V170M844 398V425"/><text x="230" y="43">+3V3</text><text x="420" y="43">+3V3</text><text x="610" y="43">+3V3</text></g>
          </svg>

          <svg className="board-traces schematic-active-nets" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true"><defs><filter id="trace-glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>{portfolioItems.map((item)=><path key={item.slug} className={`trace-live ${active===item.slug?'active':''}`} pathLength="1" d={activePaths[item.slug]}/>)}</svg>

          {portfolioItems.map((item)=><button key={item.slug} type="button" className={`board-part schematic-part ${active===item.slug?'selected':''}`} style={{left:`${item.x}%`,top:`${item.y}%`}} aria-label={`Open ${item.shortTitle}`} onMouseEnter={()=>setHovered(item.slug)} onMouseLeave={()=>setHovered(null)} onFocus={()=>setHovered(item.slug)} onBlur={()=>setHovered(null)} onClick={()=>openItem(item)}><IcSymbol item={item}/><span className={`part-tooltip schematic-tooltip ${hovered===item.slug?'visible':''}`}><small>{item.ref} / OPEN SHEET</small><b>{item.shortTitle}</b><i>VIEW DETAILS →</i></span></button>)}
          <PassiveSymbols/>
        </div>
      </div>
      <div className="board-legend schematic-legend"><span><i className="legend-line"/> SIGNAL NET</span><span><i className="legend-dot"/> CLICKABLE SUBSYSTEM</span><span>R = RESISTOR</span><span>C = CAPACITOR</span></div>
      {active&&<div className="routing-status schematic-status" role="status"><span>HIGHLIGHTING NET</span><b>{portfolioItems.find((item)=>item.slug===active)?.shortTitle}</b><i/></div>}
    </section>
  </main>;
}
