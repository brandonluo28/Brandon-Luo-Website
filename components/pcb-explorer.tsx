'use client';

import { useEffect, useState } from 'react';
import { portfolioItems, type PortfolioItem } from '@/lib/portfolio';
import { sitePagePath, sitePath } from '@/lib/site-path';

type SymbolLayout = { cx: number; cy: number; width: number; height: number; titleLines: string[] };

const symbolLayouts: Record<string, SymbolLayout> = {
  'beta-technologies': { cx: 270, cy: 145, width: 160, height: 100, titleLines: ['BETA', 'Technologies'] },
  spacex: { cx: 570, cy: 145, width: 160, height: 100, titleLines: ['SpaceX'] },
  'about-me': { cx: 970, cy: 290, width: 200, height: 144, titleLines: ['About Me'] },
  'yellow-jacket-space-program': { cx: 270, cy: 490, width: 170, height: 100, titleLines: ['Yellow Jacket', 'Space Program'] },
  'personal-projects': { cx: 520, cy: 490, width: 160, height: 100, titleLines: ['Personal', 'Projects'] },
  'the-hive': { cx: 775, cy: 490, width: 170, height: 100, titleLines: ['The Hive'] }
};

const activePaths: Record<string, string> = {
  'beta-technologies': 'M105 115H170M105 135H170',
  spacex: 'M105 205H130M170 205H450V115H470M105 225H175M215 225H460V135H470',
  'about-me': 'M105 245H850M105 275H850M105 305H850M105 335H850',
  'yellow-jacket-space-program': 'M105 395H245V420M105 415H295V420',
  'personal-projects': 'M105 395H495V420M105 415H545V420',
  'the-hive': 'M105 395H750V420M105 415H800V420'
};

const ROUTE_NAVIGATION_MS = 650;

function NoConnect({ x, y }: { x: number; y: number }) {
  return <g className="no-connect"><path d={`M${x-5} ${y-5}L${x+5} ${y+5}M${x+5} ${y-5}L${x-5} ${y+5}`}/></g>;
}

function GroundSymbol({ x, y }: { x: number; y: number }) {
  return <g className="ground-symbol" transform={`translate(${x} ${y})`}><path d="M0-12V0M-12 0H12M-8 5H8M-4 10H4"/></g>;
}

function PowerSymbol({ x, y, label }: { x: number; y: number; label: '3V3' }) {
  return <g className="power-symbol" transform={`translate(${x} ${y})`}><path d="M0 0V-12M-7-5L0-12L7-5"/><text x="10" y="-7">+{label}</text></g>;
}

function Capacitor({ x, y, refName }: { x: number; y: number; refName: string }) {
  return <g className="capacitor-symbol" transform={`translate(${x} ${y})`}><path d="M0-18V-6M-13-6H13M-13 6H13M0 6V18"/><circle className="junction" cy="-18" r="2.2"/><circle className="junction" cy="18" r="2.2"/><text x="18" y="3">{refName}</text></g>;
}

function HorizontalResistor({ x, y, refName, labelSide = false }: { x: number; y: number; refName: string; labelSide?: boolean }) {
  return <g className="resistor-symbol" transform={`translate(${x} ${y})`}><path d="M-20 0L-16-9L-8 9L0-9L8 9L16-9L20 0"/><text x={labelSide ? 27 : 0} y={labelSide ? 3 : -14} textAnchor={labelSide ? 'start' : 'middle'}>{refName}</text></g>;
}

function VerticalResistor({ x, y, refName, labelSide = 'right' }: { x: number; y: number; refName: string; labelSide?: 'left' | 'right' }) {
  return <g className="resistor-symbol" transform={`translate(${x} ${y})`}><path d="M0-10L-8-7L8-2L-8 3L8 8L0 10"/><text x={labelSide === 'right' ? 15 : -15} y="3" textAnchor={labelSide === 'right' ? 'start' : 'end'}>{refName}</text></g>;
}

function Connector() {
  const pins = [115,135,205,225,245,275,305,335,395,415];
  return <g className="svg-connector">
    <rect x="45" y="82" width="38" height="362"/>
    <text x="64" y="69" textAnchor="middle">J1</text>
    {pins.map((y, index) => <g key={y}><path d={`M73 ${y}H105`}/><text x="68" y={y - 3} textAnchor="end">{index + 1}</text></g>)}
  </g>;
}

function IcSymbol({ item, hovered, active, onOpen, onHover }: { item: PortfolioItem; hovered: boolean; active: boolean; onOpen: () => void; onHover: (value: boolean) => void }) {
  const layout = symbolLayouts[item.slug];
  const left = layout.cx - layout.width / 2;
  const right = layout.cx + layout.width / 2;
  const top = layout.cy - layout.height / 2;
  const bottom = layout.cy + layout.height / 2;
  const isBottomBusDevice = ['yellow-jacket-space-program','personal-projects','the-hive'].includes(item.slug);
  const connectedLeftPinYs = item.slug === 'about-me' ? [245,275,305,335] : isBottomBusDevice ? [] : [115,135];
  const noConnectYs = isBottomBusDevice ? [layout.cy - 15] : [layout.cy - 10, layout.cy + 10];
  const canPinXs = item.slug === 'yellow-jacket-space-program' ? [245,295] : item.slug === 'personal-projects' ? [495,545] : [750,800];
  const topSupplyPinXs = [layout.cx - 30, layout.cx + 30];
  const topConnectedPinNumber = connectedLeftPinYs.length + noConnectYs.length + 1;
  const rightGroundX = right + 20;
  const rightGroundY = layout.cy + 15;

  const activateFromKeyboard = (event: React.KeyboardEvent<SVGGElement>) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onOpen(); }
  };

  return <g className={`schematic-component ${active ? 'selected' : ''}`} role="button" tabIndex={0} aria-label={`Open ${item.shortTitle}`} onClick={onOpen} onKeyDown={activateFromKeyboard} onMouseEnter={()=>onHover(true)} onMouseLeave={()=>onHover(false)} onFocus={()=>onHover(true)} onBlur={()=>onHover(false)}>
    <rect className="ic-body" x={left} y={top} width={layout.width} height={layout.height}/>
    <circle className="pin-one" cx={left + 12} cy={top + 12} r="3"/>
    <text className="ic-ref" x={left + 12} y={top + 24}>{item.ref}</text>
    <text className="ic-title" x={layout.cx} y={layout.cy - (layout.titleLines.length - 1) * 8} textAnchor="middle">{layout.titleLines.map((line,index)=><tspan key={line} x={layout.cx} dy={index ? 18 : 0}>{line}</tspan>)}</text>

    {connectedLeftPinYs.map((y,index)=><g className="ic-pin" key={`left-${y}`}><path d={`M${left-20} ${y}H${left}`}/><text x={left + 5} y={y - 3}>{index + 1}</text></g>)}
    {noConnectYs.map((y,index)=><g className="ic-pin" key={`nc-${y}`}><path d={`M${right} ${y}H${right+20}`}/><text x={right - 5} y={y - 3} textAnchor="end">{isBottomBusDevice ? 5 : connectedLeftPinYs.length + index + 1}</text><NoConnect x={right+20} y={y}/></g>)}

    {isBottomBusDevice ? <>
      <g className="ic-pin"><path d={`M${canPinXs[0]} ${top-20}V${top}`}/><text x={canPinXs[0]+4} y={top+12}>1</text></g>
      <g className="ic-pin"><path d={`M${canPinXs[1]} ${top-20}V${top}`}/><text x={canPinXs[1]+4} y={top+12}>2</text></g>
      <g className="ic-pin"><path d={`M${layout.cx} ${bottom}V560`}/><text x={layout.cx+4} y={bottom-5}>3</text></g>
      <g className="ic-pin"><path d={`M${right} ${rightGroundY}H${rightGroundX}`}/><text x={right-5} y={rightGroundY-3} textAnchor="end">4</text></g>
    </> : <>
      <g className="ic-pin"><path d={`M${topSupplyPinXs[0]} ${top-20}V${top}`}/><text x={topSupplyPinXs[0]+5} y={top+12}>{topConnectedPinNumber}</text></g>
      <g className="ic-pin"><path d={`M${topSupplyPinXs[1]} ${top-14}V${top}`}/><text x={topSupplyPinXs[1]+5} y={top+12}>{topConnectedPinNumber + 1}</text></g>
    </>}

    {hovered && <g className="svg-tooltip" transform={`translate(${layout.cx} ${top-48})`}>
      <rect x="-105" y="-22" width="210" height="43"/>
      <text className="tooltip-ref" x="-94" y="-7">{item.ref} / OPEN SHEET</text>
      <text className="tooltip-title" x="-94" y="11">{item.shortTitle}</text>
    </g>}
  </g>;
}

export function PcbExplorer() {
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const resetInteractionState = () => {
      setActive(null);
      setHovered(null);
    };

    window.addEventListener('pageshow', resetInteractionState);
    return () => window.removeEventListener('pageshow', resetInteractionState);
  }, []);

  const itemPath = (item: PortfolioItem) => sitePagePath(`/work/${item.slug}/`);
  const prefetchItem = (item: PortfolioItem) => {
    void fetch(itemPath(item)).catch(() => undefined);
  };

  const openItem = (item: PortfolioItem) => {
    if (active) return;
    setActive(item.slug);
    prefetchItem(item);
    window.setTimeout(() => window.location.assign(itemPath(item)), ROUTE_NAVIGATION_MS);
  };

  return <main className={`pcb-shell schematic-shell ${active ? 'routing' : ''}`}>
    <header className="pcb-topbar schematic-topbar">
      <a href={sitePath('/')} className="pcb-brand schematic-brand"><span className="logo-chip">BL</span><span><b>BRANDON LUO</b><small>ELECTRICAL AND COMPUTER ENGINEERING</small></span></a>
      <p><span className="live-dot"/>SCHEMATIC <b>REV 8.8</b></p>
      <div className="board-links"><a href="mailto:brandonluo@gatech.edu">CONTACT</a><a href={sitePath('/Brandon-Luo-Resume.pdf')} target="_blank" rel="noreferrer">RESUME ↗</a></div>
    </header>

    <section className="pcb-workbench schematic-workbench" aria-label="Interactive portfolio schematic">
      <div className="board-stage schematic-stage">
        <div className="schematic-sheet">
          <div className="sheet-zones" aria-hidden="true"><span className="zone-a">A</span><span className="zone-b">B</span><span className="zone-c">C</span><span className="zone-d">D</span></div>
          <span className="sheet-coordinate top one">1</span><span className="sheet-coordinate top two">2</span><span className="sheet-coordinate top three">3</span><span className="sheet-coordinate top four">4</span><span className="sheet-coordinate top five">5</span>

          <div className="sheet-title-block">
            <div className="title-main"><small>TITLE</small><b>Brandon Luo</b><span>Electrical &amp; Computer Engineering</span></div>
            <div><small>DOC</small><span>BL-PORTFOLIO-28</span></div><div><small>REV</small><span>8.8</span></div>
            <div><small>SHEET</small><span>1 / 1</span></div><div><small>GRAD</small><span>2028</span></div>
          </div>

          <svg className="schematic-drawing" viewBox="0 0 1280 660" preserveAspectRatio="none" aria-label="Interactive top-level portfolio schematic">
            <Connector/>

            <g className="signal-nets">
              <path d="M105 115H170M105 135H170"/>
              <path d="M105 205H130M170 205H450V115H470M105 225H175M215 225H460V135H470"/>
              <HorizontalResistor x={150} y={205} refName="R1"/><HorizontalResistor x={195} y={225} refName="R2" labelSide/>
              <text className="net-label" x="375" y="198">ETH_P</text><text className="net-label" x="375" y="218">ETH_N</text>

              <path d="M105 245H850M105 275H850M105 305H850M105 335H850"/>
              <text className="net-label" x="760" y="238">SCLK</text><text className="net-label" x="760" y="268">MOSI</text><text className="net-label" x="760" y="298">MISO</text><text className="net-label" x="760" y="328">CS</text>

              <path d="M105 395H930M105 415H930M245 395V420M295 415V420M495 395V420M545 415V420M750 395V420M800 415V420"/>
              <VerticalResistor x={930} y={405} refName="R3" labelSide="left"/>
              <text className="net-label" x="840" y="389">CAN_H</text><text className="net-label" x="840" y="432">CAN_L</text>
            </g>

            <g className="support-circuits">
              <path className="wire" d="M240 75V45H380M300 81H380M540 75V45H700M600 81H700"/>
              <PowerSymbol x={240} y={45} label="3V3"/><Capacitor x={380} y={63} refName="C1"/><GroundSymbol x={380} y={93}/>
              <PowerSymbol x={540} y={45} label="3V3"/><Capacitor x={700} y={63} refName="C2"/><GroundSymbol x={700} y={93}/>

              <path className="wire" d="M940 198V168H1110M1000 204H1110"/>
              <PowerSymbol x={940} y={168} label="3V3"/><Capacitor x={1110} y={186} refName="C3"/><GroundSymbol x={1110} y={216}/>

              <path className="wire" d="M130 560H835M375 505V530M620 505V530M880 505V530"/>
              <PowerSymbol x={130} y={560} label="3V3"/>
              <Capacitor x={330} y={578} refName="C4"/><GroundSymbol x={330} y={608}/>
              <Capacitor x={580} y={578} refName="C5"/><GroundSymbol x={580} y={608}/>
              <Capacitor x={835} y={578} refName="C6"/><GroundSymbol x={835} y={608}/>
              <GroundSymbol x={375} y={542}/><GroundSymbol x={620} y={542}/><GroundSymbol x={880} y={542}/>
            </g>

            <g className="active-nets"><defs><filter id="trace-glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>{portfolioItems.map((item)=><path key={item.slug} className={`trace-live ${active===item.slug?'active':''}`} pathLength="1" d={activePaths[item.slug]}/>)}</g>

            {portfolioItems.map((item)=><IcSymbol key={item.slug} item={item} hovered={hovered===item.slug} active={active===item.slug} onOpen={()=>openItem(item)} onHover={(value)=>{setHovered(value ? item.slug : null);if(value) prefetchItem(item);}}/>)}
          </svg>
        </div>
      </div>
      <div className="board-legend schematic-legend"><span><i className="legend-line"/> SIGNAL NET</span><span><i className="legend-dot"/> CLICKABLE COMPONENT</span><span><i className="legend-nc">×</i> NO CONNECT</span></div>
      {active&&<div className="routing-status schematic-status" role="status"><span>HIGHLIGHTING NET</span><b>{portfolioItems.find((item)=>item.slug===active)?.shortTitle}</b><i/></div>}
    </section>
  </main>;
}
