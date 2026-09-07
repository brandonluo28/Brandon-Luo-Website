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
  statsTitle?: string;
  skills: string[];
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  mediaTitle?: string;
  mediaText?: string;
  projectSections?: { eyebrow: string; title: string; summary: string; bullets: string[] }[];
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
    context: 'BETA Technologies is advancing electric aviation through its ALIA CTOL and VTOL aircraft and an integrated ecosystem of motors, flight controls, batteries, and charging infrastructure. UPS has committed to purchase 10 ALIA aircraft, with options for up to 150, while Amazon has invested in BETA and hosted an ALIA test flight between Amazon Air hubs. BETA also supplies electric pusher motors to Eve Air Mobility and flight-control computers and software to Horizon Aircraft.',
    bullets: [
      'Designed and laid out galvanically isolated, dissimilar flight computer modules in Altium and KiCad: Angle of Attack and Weight on Wheels sensors, plus Ethernet, CAN FD, RS-422, and ARINC 429 transceivers.',
      'Analyzed PHY specifications and characteristic impedances to design a functioning gigabit Ethernet transceiver circuit.',
      'Ran LTspice Monte Carlo simulations to analyze component drift and RSS worst-case tolerances.',
      'Designed an interface board for testing flight computers and avionics units, including AHRS, Garmin displays, and Speedgoat test racks.',
      'Used unity-gain buffers and RC filters to achieve +/-0.2 degree AOA sensor accuracy across -40 C to 120 C.',
      'Built a high-side overcurrent protection circuit for the AOA sensor with a three-microsecond shutdown time.',
      'Wrote and released PCB fabrication and assembly drawings for battery pack components submitted for FAA certification.'
    ],
    statsTitle: 'Angle of Attack Board Stats',
    stats: [{ value: '+/-0.2°', label: 'AOA sensor accuracy' }, { value: '3 us', label: 'protection shutdown' }, { value: '-40 to 120 C', label: 'operating range' }],
    skills: ['Altium Designer', 'KiCad', 'LTspice', 'Ethernet', 'CAN FD', 'RS-422', 'ARINC 429', 'Mixed-signal design'],
    image: 'beta-alia.webp', imageAlt: 'BETA Technologies ALIA electric aircraft in UPS livery', imageCaption: 'ALIA VTOL / BETA TECHNOLOGIES',
    mediaTitle: 'ALIA in flight.', mediaText: 'BETA’s aircraft sit inside a broader electric-aviation platform that connects propulsion, controls, energy storage, and charging infrastructure.',
    sourceLinks: [{ label: 'BETA and UPS', url: 'https://about.ups.com/ae/en/newsroom/press-releases/innovation-driven/ups-flight-forward-adds-new-aircraft.html' }, { label: 'BETA and Amazon', url: 'https://www.aboutamazon.com/news/sustainability/beta-technologies-receives-new-funding-from-the-climate-pledge-fund' }, { label: 'BETA and Eve Air Mobility', url: 'https://investors.beta.team/news-events/press-releases/detail/93/eve-air-mobility-selects-beta-technologies-as-pusher-motor-supplier' }, { label: 'BETA and Horizon Aircraft', url: 'https://investors.beta.team/news-events/press-releases/detail/107/horizon-aircraft-selects-beta-technologies-advanced-flight-control-computers-and-software-for-the-cavorite-x7' }], x: 29, y: 25
  },
  {
    slug: 'spacex', ref: 'U2', shortTitle: 'SpaceX', title: 'SpaceX',
    eyebrow: 'STARLINK AVIONICS', role: 'Avionics Engineering Intern', period: 'Jan - Apr 2026',
    summary: 'Worked across flight-readiness testing, harness design, and precision manufacturing automation, including a four-minute fiber termination process.',
    context: 'My internship work supported Starlink V3, SpaceX’s next-generation satellite platform. Each V3 satellite is designed for 1 Tbps of downlink and 160 Gbps of uplink capacity, with 2,048 beams in each direction, upgraded phased-array antennas, next-generation beamforming chips, and solar arrays producing roughly twice the power of V2. Designed for Starship deployment, V3 is expected to add more than 20 times the network capacity of a current Falcon 9 V2 launch.',
    bullets: [
      'Designed and routed copper and fiber-optic harnesses for power and data using Siemens NX on a fast-paced timeline.',
      'Validated high-voltage PCBs for flight readiness through in-circuit and functional load testing, establishing tolerances.',
      'Engineered an automated, micron-accurate fiber-optic termination machine using LabVIEW, .NET/C#, and RS-232.',
      'Implemented custom edge-detection algorithms and a dedicated GUI to reach a four-minute termination cycle.'
    ],
    skills: ['Starlink V3', 'LabVIEW', '.NET / C#', 'RS-232', 'Siemens NX', 'PCB validation', 'Fiber optics'],
    image: 'starlink-exterior.webp', imageAlt: 'Starlink production facility in Redmond, Washington during winter', imageCaption: 'STARLINK PRODUCTION / REDMOND, WASHINGTON',
    sourceLinks: [{ label: 'Starlink: Version 3 satellites', url: 'https://starlink.com/updates/starlink-version-3-satellites' }, { label: 'SpaceX: V3 and Starship updates', url: 'https://new.spacex.com/updates' }], x: 50, y: 25
  },
  {
    slug: 'about-me', ref: 'U3', shortTitle: 'About Me', title: 'Brandon Luo',
    eyebrow: 'ABOUT ME', role: 'Electrical and Computer Engineering', period: 'Georgia Tech 2028',
    summary: 'An engineer from Seattle who likes building circuits, hiking farther than planned, playing guitar, and thinking a few moves ahead over a chessboard.',
    bullets: [
      'From Seattle, Washington; currently studying Electrical and Computer Engineering at Georgia Tech.',
      'My path into electrical engineering started with Arduino projects in high school and now includes custom PCBs, flight hardware, embedded control systems, and processors I design and write myself.',
      'I like hiking and backpacking, including trips into Montana.',
      'Outside the lab I play guitar and chess.',
      'I maintain a 4.0 GPA and was selected as one of 50 Stamps President’s Scholars with a full-ride merit scholarship.',
      'Relevant coursework includes Circuit Analysis, Digital Design, and Programming Hardware/Software Systems.'
    ],
    statsTitle: 'Academic & Personal Stats',
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
    statsTitle: 'Yellow Jacket Space Program Stats',
    stats: [{ value: '2019', label: 'first YJSP launch' }, { value: '1.5 km', label: 'GoldiLOX apogee' }, { value: '900 lbf', label: 'GoldiLOX thrust' }],
    skills: ['Power distribution', 'Active cell balancing', 'Hardware-in-the-loop', 'Signal integrity', 'Sensor integration'],
    image: 'yjsp-avionics.webp', imageAlt: 'YJSP avionics and wiring installed inside a rocket airframe', imageCaption: 'YJSP AVIONICS STACK / VEHICLE INTEGRATION',
    mediaTitle: 'The avionics stack.', mediaText: 'The YJSP avionics stack integrates multiple purpose-built PCBs, including the Battery Management System, Flight Computer, and Recovery Board, into one flight-ready assembly.',
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
    skills: ['C++', 'CircuitPython', 'PID control', 'Teensy 4.0', 'IMU feedback', '3D printing'],
    projectSections: [
      {
        eyebrow: 'PROJECT 01 / ATTITUDE CONTROL', title: 'Thrust Vectoring Monocopter',
        summary: 'A single-rotor aircraft that actively counters angular momentum to stabilize its attitude.',
        bullets: [
          'Wrote a C++ PID control system using MPU6050 IMU feedback to command dynamic thrust-vector corrections.',
          'Integrated a Teensy 4.0, HC-05 Bluetooth module, RS2205 motor, 4S LiPo battery, servos, and custom 3D-printed parts.'
        ]
      },
      {
        eyebrow: 'PROJECT 02 / APOGEE CONTROL', title: 'Active-Control Airbrake Rocket',
        summary: 'A deployable drag system that adjusts the rocket’s trajectory toward a commanded apogee.',
        bullets: [
          'Designed, wired, programmed, and 3D-printed the complete system around CircuitPython, an Adafruit Feather Sense, servos, and a LiPo battery.',
          'Reached +/-10 feet accuracy around an 820-foot target by actuating drag flaps with a PID algorithm.'
        ]
      }
    ], x: 48, y: 74
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
    statsTitle: 'The Hive Makerspace Stats',
    stats: [{ value: '15,000 ft²', label: 'student-run makerspace' }, { value: '24', label: 'electronics benches' }],
    skills: ['Oscilloscopes', 'Waveform generators', 'PCB fabrication', 'Machine tools', 'Resin 3D printers', 'Plastic 3D printers', 'Embedded hardware', 'Digital multimeters', 'Soldering', 'Laser cutting', 'Technical instruction'],
    image: 'hive-benchtops.jpg', imageAlt: 'Students working at electronics benchtops inside The Hive at Georgia Tech', imageCaption: 'THE HIVE ELECTRONICS BENCHTOPS / PHOTO: GEORGIA TECH',
    sourceLinks: [{ label: 'The Hive: About', url: 'https://hive.ece.gatech.edu/about/' }, { label: 'The Hive: Tools', url: 'https://hive.ece.gatech.edu/explore/' }, { label: 'Georgia Tech makerspaces', url: 'https://coe.gatech.edu/academics/makerspaces' }], x: 68, y: 74
  }
];

export const portfolioBySlug = Object.fromEntries(portfolioItems.map((item) => [item.slug, item])) as Record<string, PortfolioItem>;
