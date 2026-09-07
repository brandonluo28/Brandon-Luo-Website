'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { portfolioItems, type PortfolioItem } from '@/lib/portfolio';

const activePaths: Record<string, string> = {
  'beta-technologies': 'M58 112 H155 V160 H290',
  spacex: 'M58 180 H225 V160 H500',
  'about-me': 'M58 285 H610 V307 H790',
  'yellow-jacket-space-program': 'M58 480 H170 V474 H270',
  'personal-projects': 'M58 500 H250 V474 H480',
  'the-hive': 'M58 520 H410 V474 H680'
};

function IcPackage({ item }: { item: PortfolioItem }) {
  return <span className={`part-body part-ic ${item.size === 'large' ? 'large' : ''}`}>
    <i className="pin-bank left"/><i className="pin-bank right"/>
    <span className="package-mark"><small>{item.ref}</small><b>{item.shortTitle}</b></span>
  </span>;
}

function Capacitors() {
  const parts = [
    ['C1',24,10],['C2',43,10],['C3',62,11],['C4',84,31],['C5',85,64],['C6',16,86],['C7',40,87],['C8',60,86],['C9',73,61]
  ];
  return <>{parts.map(([ref,x,y]) => <span className="decoupling-cap" style={{left:`${x}%`,top:`${y}%`}} key={ref}><i/><b>{ref}</b></span>)}</>;
}

function Resistors() {
  const parts = [['R1',25,8],['R2',74,16],['R3',81,76],['R4',71,86],['R5',36,57],['R6',56,44]];
  return <>{parts.map(([ref,x,y]) => <span className="smd-resistor" style={{left:`${x}%`,top:`${y}%`}} key={ref}><i/><b>{ref}</b></span>)}</>;
}

function TerminationResistors() {
  return <>
    <span className="termination-resistor eth-term"><i/><b>R100<br/>ETH TERM</b></span>
    <span className="termination-resistor can-term-a"><i/><b>R120<br/>120R</b></span>
    <span className="termination-resistor can-term-b"><i/><b>R121<br/>120R</b></span>
  </>;
}

export function PcbExplorer() {
  const router = useRouter();
  const [orbit, setOrbit] = useState({ x: 48, y: -3 });
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const drag = useRef<{ x:number; y:number; rx:number; ry:number } | null>(null);

  const openItem = (item: PortfolioItem) => {
    if (active) return;
    setActive(item.slug);
    window.setTimeout(() => router.push(`/work/${item.slug}/`), 780);
  };
  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('button,a')) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x:event.clientX, y:event.clientY, rx:orbit.x, ry:orbit.y };
  };
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const dx = event.clientX - drag.current.x;
    const dy = event.clientY - drag.current.y;
    setOrbit({ x:Math.max(24,Math.min(68,drag.current.rx-dy*.16)), y:Math.max(-22,Math.min(22,drag.current.ry+dx*.16)) });
  };
  const nudge = (dx:number,dy:number) => setOrbit((v)=>({x:Math.max(24,Math.min(68,v.x+dx)),y:Math.max(-22,Math.min(22,v.y+dy))}));

  return <main className={`pcb-shell ${active ? 'routing' : ''}`}>
    <header className="pcb-topbar">
      <a href="/" className="pcb-brand"><span className="logo-chip">BL</span><span><b>BRANDON LUO</b><small>ELECTRICAL AND COMPUTER ENGINEERING</small></span></a>
      <p><span className="live-dot"/>INTERACTIVE PORTFOLIO <b>REV 3.0</b></p>
      <div className="board-links"><a href="mailto:brandonluo@gatech.edu">CONTACT</a><a href="/Brandon-Luo-Resume.pdf" target="_blank" rel="noreferrer">RESUME ↗</a></div>
    </header>

    <section className="pcb-workbench" aria-labelledby="board-title">
      <div className="bench-copy"><p className="overline">ASSEMBLY / BL-PORTFOLIO-28</p><h1 id="board-title">Select a component.</h1><p>Hover to identify. Click to route the signal. Drag anywhere on the board to orbit.</p></div>
      <div className="orbit-controls" aria-label="Board rotation controls"><span>ORBIT</span><button onClick={()=>nudge(0,-7)} aria-label="Tilt board up">↑</button><button onClick={()=>nudge(-7,0)} aria-label="Rotate board left">←</button><button onClick={()=>setOrbit({x:48,y:-3})} aria-label="Reset board rotation">RESET</button><button onClick={()=>nudge(7,0)} aria-label="Rotate board right">→</button><button onClick={()=>nudge(0,7)} aria-label="Tilt board down">↓</button></div>

      <div className="board-stage" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={()=>drag.current=null} onPointerCancel={()=>drag.current=null}>
        <div className="board-shadow"/>
        <div className="pcb-board" style={{transform:`rotateX(${orbit.x}deg) rotateZ(${orbit.y}deg)`}}>
          <div className="board-edge"/><div className="pcb-surface">
            <div className="board-grid"/>
            <span className="mount-hole mh1"/><span className="mount-hole mh2"/><span className="mount-hole mh3"/><span className="mount-hole mh4"/>
            <div className="board-title-block"><b>Brandon Luo</b><span>Electrical and Computer Engineering</span><small>Georgia Tech 2028</small></div>
            <span className="silk board-name">BL PORTFOLIO</span><span className="silk board-rev">REV 3.0 / 2026</span>
            <div className="edge-connector" aria-hidden="true"><span>J1 / EDGE I/O</span>{Array.from({length:10},(_,i)=><i key={i}/>)}</div>

            <svg className="signal-networks" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true">
              <g className="network ethernet"><path d="M58 110H180V128H282l8-12 10 24 10-24 10 24 10-24 10 24 10-12H500V160"/><path d="M58 128H195V146H500V174"/><text x="345" y="104">1000BASE-T / MATCHED PAIR</text></g>
              <g className="network spi"><path d="M58 238H660V260H790"/><path d="M58 258H645V280H790"/><path d="M58 278H630V300H790"/><path d="M58 298H615V320H790"/><text x="500" y="231">SPI / SCLK · MOSI · MISO · CS</text></g>
              <g className="network can"><path d="M58 468H790"/><path d="M58 492H790"/><path d="M270 468V474M270 492V490M480 468V474M480 492V490M680 468V474M680 492V490"/><text x="505" y="458">CAN_H</text><text x="505" y="515">CAN_L</text></g>
              <g className="network beta"><path d="M58 74H150V126H290V160"/><path d="M58 92H168V142H275V160"/></g>
            </svg>

            <svg className="board-traces" viewBox="0 0 1000 640" preserveAspectRatio="none" aria-hidden="true"><defs><filter id="trace-glow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>{portfolioItems.map((item)=><g key={item.slug}><path className={`trace-live ${active===item.slug?'active':''}`} pathLength="1" d={activePaths[item.slug]}/><circle className={active===item.slug?'via active':'via'} cx={item.x*10} cy={item.y*6.4} r="6"/></g>)}</svg>

            {portfolioItems.map((item)=><button key={item.slug} type="button" className={`board-part ${active===item.slug?'selected':''}`} style={{left:`${item.x}%`,top:`${item.y}%`}} aria-label={`Open ${item.shortTitle}`} onMouseEnter={()=>setHovered(item.slug)} onMouseLeave={()=>setHovered(null)} onFocus={()=>setHovered(item.slug)} onBlur={()=>setHovered(null)} onClick={()=>openItem(item)}><IcPackage item={item}/><span className="part-ref">{item.ref}</span><span className={`part-tooltip ${hovered===item.slug?'visible':''}`}><small>{item.ref} / OPEN PAGE</small><b>{item.shortTitle}</b><i>ROUTE SIGNAL →</i></span></button>)}
            <Capacitors/><Resistors/><TerminationResistors/>
          </div>
        </div>
      </div>
      <div className="board-legend"><span><i className="legend-line"/> BLUE: SIGNAL NET</span><span><i className="legend-dot"/> CLICK: ROUTE</span><span><i className="legend-hand">↔</i> DRAG: ORBIT</span></div>
      {active&&<div className="routing-status" role="status"><span>ROUTING SIGNAL</span><b>{portfolioItems.find((item)=>item.slug===active)?.shortTitle}</b><i/></div>}
    </section>
  </main>;
}
