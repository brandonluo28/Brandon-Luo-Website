'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { portfolioItems, type PortfolioItem } from '@/lib/portfolio';

type SymbolLayout = { cx: number; cy: number; width: number; height: number; titleLines: string[] };

const symbolLayouts: Record<string, SymbolLayout> = {
  'beta-technologies': { cx: 270, cy: 145, width: 160, height: 100, titleLines: ['BETA', 'Technologies'] },
  spacex: { cx: 520, cy: 145, width: 160, height: 100, titleLines: ['SpaceX'] },
  'about-me': { cx: 830, cy: 290, width: 200, height: 144, titleLines: ['About Me'] },
  'yellow-jacket-space-program': { cx: 265, cy: 490, width: 170, height: 100, titleLines: ['Yellow Jacket', 'Space Program'] },
  'personal-projects': { cx: 480, cy: 490, width: 160, height: 100, titleLines: ['Personal', 'Projects'] },
  'the-hive': { cx: 690, cy: 490, width: 170, height: 100, titleLines: ['The Hive'] }
};

const activePaths: Record<string, string> = {
  'beta-technologies': 'M90 115H170M90 135H170',
  spacex: 'M90 205H120M160 205H400V115H420M90 225H160M200 225H410V135H420',
  'about-me': 'M90 245H710M90 275H710M90 305H710M90 335H710',
  'yellow-jacket-space-program': 'M90 395H240V420M90 415H290V420',
  'personal-projects': 'M90 395H455V420M90 415H505V420',
  'the-hive': 'M90 395H665V420M90 415H715V420'
};

function NoConnect({ x, y }: { x: number; y: number }) {
  return <g className="no-connect"><path d={`M${x-5} ${y-5}L${x+5} ${y+5}M${x+5} ${y-5}L${x-5} ${y+5}`}/></g>;
}

function GroundSymbol({ x, y }: { x: number; y: number }) {
  return <g className="ground-symbol" transform={`translate(${x} ${y})`}><path d="M0-12V0M-12 0H12M-8 5H8M-4 10H4"/></g>;
}

function PowerSymbol({ x, y, label }: { x: number; y: number; label: '3V3' | '5V' }) {
  return <g className="power-symbol" transform={`translate(${x} ${y})`}><path d="M0 0V-12M-7-5L0-12L7-5"/><text x="10" y="-7">+{label}</text></g>;
}

function Capacitor({ x, y, refName }: { x: number; y: number; refName: string }) {
  return <g className="capacitor-symbol" transform={`translate(${x} ${y})`}><path d="M0-18V-6M-13-6H13M-13 6H13M0 6V18"/><text x="18" y="3">{refName}</text></g>;
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
    <rect x="32" y="82" width="38" height="362"/>
    <text x="51" y="69" textAnchor="middle">J1</text>
    {pins.map((y, index) => <g key={y}><path d={`M60 ${y}H90`}/><text x="55" y={y - 3} textAnchor="end">{index + 1}</text></g>)}
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
  const noConnectYs = [layout.cy - 10, layout.cy + 10];
  const canPinXs = item.slug === 'yellow-jacket-space-program' ? [240,290] : item.slug === 'personal-projects' ? [455,505] : [665,715];

  const activateFromKeyboard = (event: React.KeyboardEvent<SVGGElement>) => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onOpen(); }
  };

  return <g className={`schematic-component ${active ? 'selected' : ''}`} role="button" tabIndex={0} aria-label={`Open ${item.shortTitle}`} onClick={onOpen} onKeyDown={activateFromKeyboard} onMouseEnter={()=>onHover(true)} onMouseLeave={()=>onHover(false)} onFocus={()=>onHover(true)} onBlur={()=>onHover(false)}>
    <rect className="ic-body" x={left} y={top} width={layout.width} height={layout.height}/>
    <circle className="pin-one" cx={left + 12} cy={top + 12} r="3"/>
    <text className="ic-ref" x={left + 12} y={top + 24}>{item.ref}</text>
    <text className="ic-title" x={layout.cx} y={layout.cy - (layout.titleLines.length - 1) * 8} textAnchor="middle">{layout.titleLines.map((line,index)=><tspan key={line} x={layout.cx} dy={index ? 18 : 0}>{line}</tspan>)}</text>

    {connectedLeftPinYs.map((y,index)=><g className="ic-pin" key={`left-${y}`}><path d={`M${left-20} ${y}H${left}`}/><text x={left + 5} y={y - 3}>{index + 1}</text></g>)}
    {noConnectYs.map((y,index)=><g className="ic-pin" key={`nc-${y}`}><path d={`M${right} ${y}H${right+20}`}/><text x={right - 5} y={y - 3} textAnchor="end">{index + 5}</text><NoConnect x={right+20} y={y}/></g>)}

    {isBottomBusDevice ? <>
      <g className="ic-pin"><path d={`M${canPinXs[0]} ${top-20}V${top}`}/><text x={canPinXs[0]+4} y={top+12}>9</text></g>
      <g className="ic-pin"><path d={`M${canPinXs[1]} ${top-20}V${top}`}/><text x={canPinXs[1]+4} y={top+12}>10</text></g>
      <g className="ic-pin"><path d={`M${canPinXs[0]} ${bottom}V${bottom+20}`}/><text x={canPinXs[0]+4} y={bottom-5}>11</text></g>
      <g className="ic-pin"><path d={`M${canPinXs[1]} ${bottom}V${bottom+20}`}/><text x={canPinXs[1]+4} y={bottom-5}>12</text></g>
    </> : <>
      <g className="ic-pin"><path d={`M${layout.cx} ${top-20}V${top}`}/><text x={layout.cx+5} y={top+12}>9</text></g>
      <g className="ic-pin"><path d={`M${layout.cx-20} ${bottom}V${bottom+20}`}/><text x={layout.cx-15} y={bottom-5}>10</text></g>
    </>}

    {hovered && <g className="svg-tooltip" transform={`translate(${layout.cx} ${top-48})`}>
      <rect x="-105" y="-22" width="210" height="43"/>
      <text className="tooltip-ref" x="-94" y="-7">{item.ref} / OPEN SHEET</text>
      <text className="tooltip-title" x="-94" y="11">{item.shortTitle}</text>
    </g>}
  </g>;
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
      <p><span className="live-dot"/>SCHEMATIC <b>REV 4.2</b></p>
      <div className="board-links"><a href="mailto:brandonluo@gatech.edu">CONTACT</a><a href="/Brandon-Luo-Resume.pdf" target="_blank" rel="noreferrer">RESUME ↗</a></div>
    </header>

    <section className="pcb-workbench schematic-workbench" aria-labelledby="board-title">
      <div className="bench-copy schematic-copy"><p className="overline">PORTFOLIO / TOP LEVEL</p><h1 id="board-title">Select a component.</h1><p>Hover to identify a component. Click to highlight its net and open the detailed sheet.</p></div>

      <div className="board-stage schematic-stage">
        <div className="schematic-sheet">
          <div className="sheet-zones" aria-hidden="true"><span className="zone-a">A</span><span className="zone-b">B</span><span className="zone-c">C</span><span className="zone-d">D</span></div>
          <span className="sheet-coordinate top one">1</span><span className="sheet-coordinate top two">2</span><span className="sheet-coordinate top three">3</span><span className="sheet-coordinate top four">4</span><span className="sheet-coordinate top five">5</span>

          <div className="sheet-title-block">
            <div className="title-main"><small>TITLE</small><b>Brandon Luo</b><span>Electrical &amp; Computer Engineering</span></div>
            <div><small>DOC</small><span>BL-PORTFOLIO-28</span></div><div><small>REV</small><span>4.2</span></div>
            <div><small>SHEET</small><span>1 / 1</span></div><div><small>GRAD</small><span>2028</span></div>
          </div>

          <svg className="schematic-drawing" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-label="Interactive top-level portfolio schematic">
            <Connector/>

            <g className="signal-nets">
              <path d="M90 115H170M90 135H170"/>
              <path d="M90 205H120M160 205H400V115H420M90 225H160M200 225H410V135H420"/>
              <HorizontalResistor x={140} y={205} refName="R1"/><HorizontalResistor x={180} y={225} refName="R2" labelSide/>
              <text className="net-label" x="250" y="198">ETH_P</text><text className="net-label" x="250" y="242">ETH_N</text>

              <path d="M90 245H710M90 275H710M90 305H710M90 335H710"/>
              <text className="net-label" x="620" y="238">SCLK</text><text className="net-label" x="620" y="268">MOSI</text><text className="net-label" x="620" y="298">MISO</text><text className="net-label" x="620" y="328">CS</text>

              <path d="M90 395H850M90 415H850M240 395V420M290 415V420M455 395V420M505 415V420M665 395V420M715 415V420"/>
              <VerticalResistor x={850} y={405} refName="R3" labelSide="left"/>
              <text className="net-label" x="770" y="389">CAN_H</text><text className="net-label" x="770" y="432">CAN_L</text>
            </g>

            <g className="support-circuits">
              <path className="wire" d="M270 95V55M270 65H380V37M250 195V207M520 95V55M520 65H630V37M500 195V207"/>
              <PowerSymbol x={270} y={55} label="5V"/><Capacitor x={380} y={55} refName="C1"/><GroundSymbol x={380} y={85}/><GroundSymbol x={250} y={219}/>
              <PowerSymbol x={520} y={55} label="3V3"/><Capacitor x={630} y={55} refName="C2"/><GroundSymbol x={630} y={85}/><GroundSymbol x={500} y={219}/>

              <path className="wire" d="M830 218V178M830 188H960V170M810 362V374"/>
              <PowerSymbol x={830} y={178} label="3V3"/><Capacitor x={960} y={188} refName="C3"/><GroundSymbol x={960} y={218}/><GroundSymbol x={810} y={386}/>

              <path className="wire" d="M240 540V560M240 550H190V570M290 540V560M455 540V560M455 550H405V570M505 540V560M665 540V560M665 550H620V570M715 540V560"/>
              <PowerSymbol x={240} y={560} label="5V"/><Capacitor x={190} y={588} refName="C4"/><GroundSymbol x={190} y={618}/><GroundSymbol x={290} y={572}/>
              <PowerSymbol x={455} y={560} label="3V3"/><Capacitor x={405} y={588} refName="C5"/><GroundSymbol x={405} y={618}/><GroundSymbol x={505} y={572}/>
              <PowerSymbol x={665} y={560} label="3V3"/><Capacitor x={630} y={588} refName="C6"/><GroundSymbol x={630} y={618}/><GroundSymbol x={715} y={572}/>
            </g>

            <g className="active-nets"><defs><filter id="trace-glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>{portfolioItems.map((item)=><path key={item.slug} className={`trace-live ${active===item.slug?'active':''}`} pathLength="1" d={activePaths[item.slug]}/>)}</g>

            {portfolioItems.map((item)=><IcSymbol key={item.slug} item={item} hovered={hovered===item.slug} active={active===item.slug} onOpen={()=>openItem(item)} onHover={(value)=>setHovered(value ? item.slug : null)}/>)}
          </svg>
        </div>
      </div>
      <div className="board-legend schematic-legend"><span><i className="legend-line"/> SIGNAL NET</span><span><i className="legend-dot"/> CLICKABLE COMPONENT</span><span><i className="legend-nc">×</i> NO CONNECT</span></div>
      {active&&<div className="routing-status schematic-status" role="status"><span>HIGHLIGHTING NET</span><b>{portfolioItems.find((item)=>item.slug===active)?.shortTitle}</b><i/></div>}
    </section>
  </main>;
}
