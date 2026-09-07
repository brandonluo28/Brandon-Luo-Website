export type PortfolioItem = {
  slug: string;
  ref: string;
  shortTitle: string;
  title: string;
  eyebrow: string;
  role: string;
  period: string;
  summary: string;
  context?: string;
  bullets: string[];
  stats?: { value: string; label: string }[];
  skills: string[];
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  sourceLinks?: { label: string; url: string }[];
  x: number;
  y: number;
  size?: 'large';
};

export const portfolioItems: PortfolioItem[] = [
  {
    slug: 'beta-technologies', ref: 'U1', shortTitle: 'BETA Technologies', title: 'BETA Technologies',
    eyebrow: 'FLIGHT COMPUTER & CONTROLS', role: 'PCB Design Intern', period: 'May - Aug 2026',
    summary: 'Designed the sensing, communications, and test hardware around flight computers.',
    context: 'BETA designs and manufactures all-electric ALIA aircraft in VTOL and conventional takeoff configurations. The ALIA platform combines a 50-foot wingspan, 200 cubic feet of cargo capacity, and a demonstrated range of 336 nautical miles.',
    bullets: [
      'Designed and laid out galvanically isolated, dissimilar flight computer modules in Altium and KiCad: Angle of Attack and Weight on Wheels sensors, plus Ethernet, CAN FD, RS-422, and ARINC 429 transceivers.',
      'Analyzed PHY specifications and characteristic impedances to design a functioning gigabit Ethernet transceiver circuit.',
      'Ran LTspice Monte Carlo simulations to analyze component drift and RSS worst-case tolerances.',
      'Designed an interface board for testing flight computers and avionics units, including AHRS, Garmin displays, and Speedgoat test racks.',
      'Used unity-gain buffers and RC filters to achieve +/-0.2 degree AOA sensor accuracy across -40 C to 120 C.',
      'Built a high-side overcurrent protection circuit for the AOA sensor with a three-microsecond shutdown time.',
      'Wrote and released PCB fabrication and assembly drawings for battery pack components submitted for FAA certification.'
    ],
    stats: [{ value: '+/-0.2°', label: 'AOA sensor accuracy' }, { value: '3 us', label: 'protection shutdown' }, { value: '-40 to 120 C', label: 'operating range' }],
    skills: ['Altium Designer', 'KiCad', 'LTspice', 'Ethernet', 'CAN FD', 'RS-422', 'ARINC 429', 'Mixed-signal design'],
    image: 'beta-alia.webp', imageAlt: 'BETA Technologies ALIA electric aircraft in UPS livery', imageCaption: 'ALIA VTOL / BETA TECHNOLOGIES',
    sourceLinks: [{ label: 'BETA aircraft specifications', url: 'https://beta.team/aircraft' }], x: 29, y: 25
  },
  {
    slug: 'spacex', ref: 'U2', shortTitle: 'SpaceX', title: 'SpaceX',
    eyebrow: 'STARLINK AVIONICS', role: 'Avionics Engineering Intern', period: 'Jan - Apr 2026',
    summary: 'Worked across flight-readiness testing, harness design, and precision manufacturing automation.',
    context: 'Starlink V2 Mini introduced more powerful phased-array antennas, E-band backhaul, and argon Hall thrusters. SpaceX reported roughly four times the capacity per satellite compared with earlier generations.',
    bullets: [
      'Designed and routed copper and fiber-optic harnesses for power and data using Siemens NX on a fast-paced timeline.',
      'Validated high-voltage PCBs for flight readiness through in-circuit and functional load testing, establishing tolerances.',
      'Engineered an automated, micron-accurate fiber-optic termination machine using LabVIEW, .NET/C#, and RS-232.',
      'Implemented custom edge-detection algorithms and a dedicated GUI to reach a four-minute termination cycle.'
    ],
    stats: [{ value: '4 min', label: 'fiber termination cycle' }, { value: '3x', label: 'production efficiency' }],
    skills: ['LabVIEW', '.NET / C#', 'RS-232', 'Siemens NX', 'PCB validation', 'Fiber optics'],
    image: 'starlink-v2.jpg', imageAlt: 'A stack of Starlink V2 Mini satellites inside a Falcon 9 payload fairing', imageCaption: 'STARLINK V2 MINI STACK / PHOTO: SPACEX',
    sourceLinks: [{ label: 'SpaceX V2 Mini announcement', url: 'https://www.linkedin.com/posts/spacex_targeting-monday-february-27-for-launch-activity-7035737444880683008-2UdB' }, { label: 'V2 Mini satellite photos', url: 'https://spaceflightnow.com/2023/02/26/spacex-unveils-first-batch-of-larger-upgraded-starlink-satellites/' }], x: 50, y: 25
  },
  {
    slug: 'about-me', ref: 'U3', shortTitle: 'About Me', title: 'Brandon Luo',
    eyebrow: 'ABOUT ME', role: 'Electrical and Computer Engineering', period: 'Georgia Tech 2028',
    summary: 'An engineer from Seattle who likes building circuits, hiking farther than planned, playing guitar, and thinking a few moves ahead over a chessboard.',
    context: 'My interest in electrical engineering started with Arduino projects in high school. At Georgia Tech, that curiosity has grown into custom PCBs, flight hardware, embedded control systems, and processors I design and write myself.',
    bullets: [
      'From Seattle, Washington; currently studying Electrical and Computer Engineering at Georgia Tech.',
      'I like hiking and backpacking, including trips into Montana.',
      'Outside the lab I play guitar and chess.',
      'I maintain a 4.0 GPA and was selected as one of 50 Stamps President’s Scholars with a full-ride merit scholarship.',
      'Relevant coursework includes Circuit Analysis, Digital Design, and Programming Hardware/Software Systems.'
    ],
    stats: [{ value: '4.0', label: 'GPA' }, { value: '2028', label: 'expected graduation' }, { value: 'Seattle', label: 'home' }],
    skills: ['RISC-V', 'Python', 'Java', 'C++', 'PCB design', 'Embedded systems', 'Guitar', 'Chess'],
    image: 'brandon-portrait.webp', imageAlt: 'Brandon Luo outdoors beside a rocky coastline', imageCaption: 'BRANDON / OFF THE BENCH', x: 79, y: 48, size: 'large'
  },
  {
    slug: 'yellow-jacket-space-program', ref: 'U4', shortTitle: 'Yellow Jacket Space Program', title: 'Yellow Jacket Space Program',
    eyebrow: 'BATTERY MANAGEMENT', role: 'Battery Management System RE', period: 'Aug 2025 - Present',
    summary: 'Lead engineer for power distribution and management to onboard systems on Georgia Tech’s liquid-rocket team.',
    context: 'YJSP has grown from a student engine-test group into one of collegiate rocketry’s most ambitious programs. Its first rocket, TIAT, flew in 2019. In 2023, the 250-member team launched GoldiLOX, Georgia Tech’s largest student-built rocket, to 1.5 km on 900 pounds of thrust as a subscale step toward the Karman line.',
    bullets: [
      'Implemented load switches and active cell balancing to manage battery and umbilical power safely.',
      'Conducted extensive field integration and testing, troubleshooting continuity faults and signal integrity issues.',
      'Building hardware-in-the-loop circuitry to test avionics systems against edge cases before fires and launches.',
      'Worked extensively with RTDs, pressure transducers, thermocouples, NTCs, load cells, and vibration sensors.'
    ],
    stats: [{ value: '2019', label: 'first YJSP launch' }, { value: '1.5 km', label: 'GoldiLOX apogee' }, { value: '900 lbf', label: 'GoldiLOX thrust' }],
    skills: ['Power distribution', 'Active cell balancing', 'Hardware-in-the-loop', 'Signal integrity', 'Sensor integration'],
    image: 'yjsp-avionics.webp', imageAlt: 'YJSP avionics and wiring installed inside a rocket airframe', imageCaption: 'YJSP AVIONICS STACK / VEHICLE INTEGRATION',
    sourceLinks: [{ label: 'Georgia Tech: GoldiLOX launch', url: 'https://news.gatech.edu/features/2023/01/after-milestone-launch-yellow-jacket-space-program-shooting-stars' }, { label: 'YJSP: TIAT first launch', url: 'https://yjsp-gt.squarespace.com/tiat-old' }], x: 27, y: 74
  },
  {
    slug: 'personal-projects', ref: 'U5', shortTitle: 'Personal Projects', title: 'Personal Projects',
    eyebrow: 'CLOSED-LOOP CONTROL', role: 'Monocopter + Airbrake Rocket', period: '2024 - 2026',
    summary: 'Two flight-control projects built around sensing, feedback, and physical actuation.',
    context: 'Both projects began as a controls question and became complete electromechanical systems: circuits, firmware, mechanisms, power, fabrication, and testing.',
    bullets: [
      'Thrust Vectoring Monocopter: wrote a PID control system using IMU feedback to counter angular momentum for dynamic attitude stabilization.',
      'Built the monocopter with C++, a Teensy 4.0, MPU6050, HC-05 Bluetooth module, RS2205 motor, 4S LiPo battery, servos, and custom 3D-printed parts.',
      'Active Control Airbrake Rocket: designed, wired, coded, and 3D-printed the complete system using CircuitPython, an Adafruit Feather Sense, servos, and a LiPo battery.',
      'Achieved +/-10 feet accuracy around an 820-foot target by actuating drag flaps according to a PID algorithm.'
    ],
    stats: [{ value: '820 ft', label: 'target altitude' }, { value: '+/-10 ft', label: 'achieved accuracy' }],
    skills: ['C++', 'CircuitPython', 'PID control', 'Teensy 4.0', 'IMU feedback', '3D printing'], x: 48, y: 74
  },
  {
    slug: 'the-hive', ref: 'U6', shortTitle: 'The Hive', title: 'The Hive Makerspace',
    eyebrow: 'GEORGIA TECH', role: 'Peer Instructor', period: 'Feb 2026 - Present',
    summary: 'Helping Georgia Tech students turn ideas into working hardware in an electrical and computer engineering makerspace.',
    context: 'The Hive is Georgia Tech’s 15,000-square-foot Interdisciplinary Design Commons and the Institute’s largest student-run makerspace. Peer Instructors keep its equipment accessible and help students use 24 electronics benches, PCB fabrication tools, 3D printers, laser cutters, and machine-shop resources.',
    bullets: [
      'Certified in advanced operation of oscilloscopes, waveform generators, and power supplies.',
      'Guide students using PCB manufacturing machines, laser cutters, and benchtop instruments for their projects.',
      'Help sustain a student-led, low-pressure environment where students from any major can prototype and learn safely.'
    ],
    stats: [{ value: '15,000 ft²', label: 'student-run makerspace' }, { value: '24', label: 'electronics benches' }],
    skills: ['Oscilloscopes', 'Waveform generators', 'PCB fabrication', 'Laser cutting', 'Technical instruction'],
    sourceLinks: [{ label: 'The Hive: About', url: 'https://hive.ece.gatech.edu/about/' }, { label: 'The Hive: Tools', url: 'https://hive.ece.gatech.edu/explore/' }], x: 68, y: 74
  }
];

export const portfolioBySlug = Object.fromEntries(portfolioItems.map((item) => [item.slug, item])) as Record<string, PortfolioItem>;
