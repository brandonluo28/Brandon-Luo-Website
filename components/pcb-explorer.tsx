'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { portfolioItems, type PortfolioItem } from '@/lib/portfolio';

const activePaths: Record<string, string> = {
  'beta-technologies': 'M66 140 H210',
  spacex: 'M66 210 H380 V140 H420',
  'about-me': 'M66 250 H690',
  'yellow-jacket-space-program': 'M66 400 H260 V418',
  'personal-projects': 'M66 400 H470 V418',
  'the-hive': 'M66 400 H670 V418'
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

function GroundSymbol({ x, y }: { x: number; y: number }) {
  return <g className="ground-symbol" transform={`translate(${x} ${y})`}><path d="M0-12V0M-12 0H12M-8 5H8M-4 10H4"/></g>;
}

function PowerSymbol({ x, y, label }: { x: number; y: number; label: '3V3' | '5V' }) {
  return <g className="power-symbol" transform={`translate(${x} ${y})`}><path d="M0 0V-12M-7-5L0-12L7-5"/><text x="0" y="-19" textAnchor="middle">+{label}</text></g>;
}

function VerticalCapacitor({ x, y, refName }: { x: number; y: number; refName: string }) {
  return <g className="capacitor-symbol" transform={`translate(${x} ${y})`}><path d="M0-18V-6M-12-6H12M-12 6H12M0 6V18"/><text x="17" y="3">{refName}</text></g>;
}

function HorizontalResistor({ x, y, refName }: { x: number; y: number; refName: string }) {
  return <g className="resistor-symbol" transform={`translate(${x} ${y})`}><path d="M-36 0H-28L-22-10L-14 10L-6-10L2 10L10-10L18 10L24 0H36"/><text x="0" y="-15" textAnchor="middle">{refName}</text></g>;
}

function VerticalResistor({ x, y, refName }: { x: number; y: number; refName: string }) {
  return <g className="resistor-symbol" transform={`translate(${x} ${y})`}><path d="M0-18V-14L-8-10L8-5L-8 0L8 5L-8 10L0 14V18"/><text x="12" y="3">{refName}</text></g>;
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
            <g className="network beta"><path d="M66 140H210M66 160H210"/><text x="92" y="134">AOA_SENSE</text></g>

            <g className="network ethernet">
              <path d="M66 210H300M370 210H380V140H420M66 230H300M370 230H398V160H420"/>
              <g className="resistor-symbol" transform="translate(335 210)"><path d="M-35 0H-24L-18-10L-9 10L0-10L9 10L18-10L24 0H35"/><text x="0" y="-15" textAnchor="middle">R1</text></g>
              <g className="resistor-symbol" transform="translate(335 230)"><path d="M-35 0H-24L-18-10L-9 10L0-10L9 10L18-10L24 0H35"/><text x="0" y="19" textAnchor="middle">R2</text></g>
              <text x="244" y="199">ETH_TX+ / ETH_TX−</text>
            </g>

            <g className="network spi"><path d="M66 250H690M66 270H690M66 290H690M66 310H690"/><text x="482" y="241">SPI: SCLK / MOSI / MISO / CS</text></g>

            <g className="network can">
              <path d="M66 400H790M66 420H790M260 400V418M280 420V418M470 400V418M490 420V418M670 400V418M690 420V418"/>
              <g className="resistor-symbol vertical" transform="translate(118 410)"><path d="M0-10V-8L-9-5L9 0L-9 5L0 8V10"/><text x="14" y="3">R3</text></g>
              <g className="resistor-symbol vertical" transform="translate(760 410)"><path d="M0-10V-8L-9-5L9 0L-9 5L0 8V10"/><text x="14" y="3">R4</text></g>
              <text x="510" y="392">CAN_H</text><text x="510" y="438">CAN_L</text><text x="82" y="442">CAN TERMINATION</text>
            </g>

            <g className="support-circuits">
              <path className="wire" d="M290 104V64H185V76M185 100V112M500 104V64H600V76M600 100V112M790 247V210H930V222M930 246V258"/>
              <PowerSymbol x={290} y={64} label="5V"/><PowerSymbol x={500} y={64} label="3V3"/><PowerSymbol x={790} y={210} label="3V3"/>
              <g className="capacitor-symbol" transform="translate(185 88)"><path d="M0-12V-6M-13-6H13M-13 6H13M0 6V12"/><text x="18" y="3">C1</text></g>
              <g className="capacitor-symbol" transform="translate(600 88)"><path d="M0-12V-6M-13-6H13M-13 6H13M0 6V12"/><text x="18" y="3">C2</text></g>
              <g className="capacitor-symbol" transform="translate(930 234)"><path d="M0-12V-6M-13-6H13M-13 6H13M0 6V12"/><text x="18" y="3">C3</text></g>
              <GroundSymbol x={185} y={124}/><GroundSymbol x={600} y={124}/><GroundSymbol x={930} y={270}/>

              <path className="wire" d="M270 530V558H320V570M320 594V606M480 530V558H530V570M530 594V606M680 530V558H635V570M635 594V606"/>
              <PowerSymbol x={270} y={558} label="5V"/><PowerSymbol x={480} y={558} label="3V3"/><PowerSymbol x={680} y={558} label="3V3"/>
              <g className="capacitor-symbol" transform="translate(320 582)"><path d="M0-12V-6M-13-6H13M-13 6H13M0 6V12"/><text x="18" y="3">C4</text></g>
              <g className="capacitor-symbol" transform="translate(530 582)"><path d="M0-12V-6M-13-6H13M-13 6H13M0 6V12"/><text x="18" y="3">C5</text></g>
              <g className="capacitor-symbol" transform="translate(635 582)"><path d="M0-12V-6M-13-6H13M-13 6H13M0 6V12"/><text x="18" y="3">C6</text></g>
              <GroundSymbol x={320} y={618}/><GroundSymbol x={530} y={618}/><GroundSymbol x={635} y={618}/>
            </g>
          </svg>

          <svg className="board-traces schematic-active-nets" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true"><defs><filter id="trace-glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>{portfolioItems.map((item)=><path key={item.slug} className={`trace-live ${active===item.slug?'active':''}`} pathLength="1" d={activePaths[item.slug]}/>)}</svg>

          {portfolioItems.map((item)=><button key={item.slug} type="button" className={`board-part schematic-part ${active===item.slug?'selected':''}`} style={{left:`${item.x}%`,top:`${item.y}%`}} aria-label={`Open ${item.shortTitle}`} onMouseEnter={()=>setHovered(item.slug)} onMouseLeave={()=>setHovered(null)} onFocus={()=>setHovered(item.slug)} onBlur={()=>setHovered(null)} onClick={()=>openItem(item)}><IcSymbol item={item}/><span className={`part-tooltip schematic-tooltip ${hovered===item.slug?'visible':''}`}><small>{item.ref} / OPEN SHEET</small><b>{item.shortTitle}</b><i>VIEW DETAILS →</i></span></button>)}
        </div>
      </div>
      <div className="board-legend schematic-legend"><span><i className="legend-line"/> SIGNAL NET</span><span><i className="legend-dot"/> CLICKABLE SUBSYSTEM</span><span>R = RESISTOR</span><span>C = CAPACITOR</span></div>
      {active&&<div className="routing-status schematic-status" role="status"><span>HIGHLIGHTING NET</span><b>{portfolioItems.find((item)=>item.slug===active)?.shortTitle}</b><i/></div>}
    </section>
  </main>;
}
