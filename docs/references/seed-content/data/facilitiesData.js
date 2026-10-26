// MSIT Campus Facilities & Laboratories Data
// Source: msit.in/facilities (Scraped 2026-09-08)

export const departments = [
    {
        key: 'all',
        name: 'All Departments',
        shortName: 'All',
        count: 33,
        description: 'Explore state-of-the-art computer, hardware, signal processing, electrical machines, and AI laboratories across all engineering streams at MSIT.'
    },
    {
        key: 'cse',
        name: 'Department of Computer Science & Engineering',
        shortName: 'CSE',
        count: 10,
        intro: 'The computer labs in the CSE department are equipped with high-quality computers and software with good configurations. Students, faculty, and staff all have access to these labs, which offer various tools and technologies for a wide range of tasks such as creating websites, editing documents, completing class assignments, sending emails, conducting data analyses, and accessing library resources. Microsoft Windows software is available for word processing, statistics, spreadsheet work, and database management.'
    },
    {
        key: 'it',
        name: 'Department of Information Technology',
        shortName: 'IT',
        count: 8,
        intro: 'The Information Technology department features high-performance computing systems, dedicated IoT/CoE research centers, industry MOUs, and software suites supporting modern data analytics, cloud computing, machine learning, and hardware interfacing.'
    },
    {
        key: 'ece',
        name: 'Department of Electronics & Communication Engineering',
        shortName: 'ECE',
        count: 7,
        intro: 'The ECE department houses specialized laboratories equipped with high-bandwidth DSOs, RF antenna simulation tools (CST Studio), VLSI design setups (Tanner Tools), microcontrollers (8085/8086/8051), optical fiber communication kits, and deep learning workstations.'
    },
    {
        key: 'eee',
        name: 'Department of Electrical & Electronics Engineering',
        shortName: 'EEE',
        count: 7,
        intro: 'The EEE department offers practical test benches and motor setup workstations for Electrical Machines, Power Systems, Power Electronics, Electric Drives, Instrumentation, and Electrical Science.'
    },
    {
        key: 'as',
        name: 'Department of Applied Sciences',
        shortName: 'Applied Sciences',
        count: 1,
        intro: 'Foundational sciences support all first-year engineering disciplines through hands-on physics, chemistry, computational mathematics, and general engineering workshops.'
    }
];

export const labData = [
    // CSE LABS
    {
        id: 'cse-105',
        labNo: 'Lab #105',
        name: 'CN Lab / Python Lab',
        dept: 'Computer Science & Engineering',
        deptKey: 'cse',
        hasPhoto: true,
        images: ['https://i.ibb.co/dwqKRF0V/105.jpg'],
        systemConfig: {
            desktop: 'DELL Desktop, Intel Core i7-10700 @2.90GHz (10th Gen), 8GB DDR4 RAM, 1TB HDD, TFT Monitor',
            server: 'Dell PowerEdge T430, Intel Xeon E5-2604 v4 @1.70GHz, 16GB RAM, 3TB SATA HDD'
        },
        software: ['Cisco Packet Tracer', 'VS Code', 'NS-3 Simulator', 'Python 3'],
        subjects: [
            { code: 'CIC-332', name: 'Programming in Python' },
            { code: 'CIC-355', name: 'Computer Networks' }
        ],
        description: 'Computer Networking (CN) Lab hosts practical sessions on network topologies, communication protocols, Cisco Packet Tracer, and NS-3 on Ubuntu. Python Lab provides a hands-on environment for coding, debugging, and object-oriented programming.'
    },
    {
        id: 'cse-05',
        labNo: 'Lab #05',
        name: 'OS Lab / SSM & DA Lab',
        dept: 'Computer Science & Engineering',
        deptKey: 'cse',
        hasPhoto: true,
        images: ['https://msit.in/media/uploads/2025/03/06/whatsapp-image-2025-03-06-at-215240.jpeg'],
        systemConfig: {
            desktop: 'DELL OptiPlex 5080 Desktop, Intel Core i7-10700, 8GB DDR4 RAM, 1TB 7200RPM HDD, 2GB Integrated Graphics, 19.5" LED TFT'
        },
        software: ['Scilab', 'VS Code', 'Linux OS'],
        subjects: [
            { code: 'DA-304P', name: 'SSM & Data Analytics' },
            { code: 'CIC-353', name: 'Operating Systems' }
        ],
        description: 'Operating Systems Lab covers CPU scheduling algorithms (FCFS, SJF, Priority, Round Robin), page replacement, memory management, and semaphores. SSM & DA Lab performs matrix operations, statistical modeling, correlation, and regression in Scilab.'
    },
    {
        id: 'cse-106a',
        labNo: 'Lab #106-A',
        name: 'Programming Lab',
        dept: 'Computer Science & Engineering',
        deptKey: 'cse',
        hasPhoto: true,
        images: ['https://i.ibb.co/cST0Zrwx/106-A.jpg'],
        systemConfig: {
            desktop: 'DELL Vostro 3268, Core i5 7th Gen, 4GB DDR4 RAM, 1TB SATA, 18.5" LED TFT'
        },
        software: ['VS Code', 'GCC Compiler'],
        subjects: [
            { code: 'ES-153/154', name: 'Programming in C' }
        ],
        description: 'Dedicated hands-on environment for foundational C programming, algorithm logic building, syntax debugging, and introductory computer engineering problem solving.'
    },
    {
        id: 'cse-106b',
        labNo: 'Lab #106-B',
        name: 'PSLP Lab / Compiler Design Lab',
        dept: 'Computer Science & Engineering',
        deptKey: 'cse',
        hasPhoto: true,
        images: ['https://i.ibb.co/vvXDPy7p/106-B.jpg'],
        systemConfig: {
            desktop: 'DELL Vostro 3268, Core i5 7th Gen, 4GB DDR4 RAM, 1TB SATA, 18.5" LED TFT'
        },
        software: ['LEX', 'YACC', 'VS Code', 'GCC'],
        subjects: [
            { code: 'CIC-351', name: 'Compiler Design' },
            { code: 'BS-252', name: 'PSLP' }
        ],
        description: 'Compiler Design Lab focuses on LEX/YACC tokenization, grammar checking, shift-reduce parsing, and AST generation. PSLP Lab covers matrix operations, probability distribution fitting, and linear programming.'
    },
    {
        id: 'cse-102',
        labNo: 'Lab #102',
        name: 'Design & Analysis of Algorithms / DBMS Lab',
        dept: 'Computer Science & Engineering',
        deptKey: 'cse',
        hasPhoto: true,
        images: ['https://i.ibb.co/1tPwXzwv/102.jpg'],
        systemConfig: {
            desktop: 'ACER P-V, Core i5 2nd Gen @3.0GHz, 4GB DDR3 RAM, 500GB HDD, 18.5" Color TFT'
        },
        software: ['Turbo C/C++', 'Oracle 11g', 'SQL*Plus'],
        subjects: [
            { code: 'CIC-359', name: 'Design & Analysis of Algorithms' },
            { code: 'CIC-256', name: 'Database Management Systems' }
        ],
        description: 'DAA Lab analyzes computational complexity, greedy algorithms, dynamic programming, and graph algorithms in Turbo C++. DBMS Lab provides hands-on SQL database creation, indexing, schema normalization, and transaction handling in Oracle 11g.'
    },
    {
        id: 'cse-402',
        labNo: 'Lab #402',
        name: 'Java Lab / Object Oriented Programming Lab',
        dept: 'Computer Science & Engineering',
        deptKey: 'cse',
        hasPhoto: true,
        images: ['https://i.ibb.co/TxfgYN0H/402.jpg'],
        systemConfig: {
            desktop: 'Acer Core i5-2320 @3GHz & HP Intel Core 2 Duo @2.93GHz, 4GB RAM, 500GB SATA HDD, LCD with APC UPS'
        },
        software: ['JDK (Java Development Kit)', 'VS Code', 'Turbo C++'],
        subjects: [
            { code: 'CIC-258', name: 'Java Programming' },
            { code: 'CIC-257', name: 'Object Oriented Programming' }
        ],
        description: 'Covers Object-Oriented Principles including encapsulation, inheritance, polymorphism, multithreading, exception handling, and GUI development using Java JDK and C++.'
    },
    {
        id: 'cse-101',
        labNo: 'Lab #101',
        name: 'Data Structure Lab / Web Technology Lab',
        dept: 'Computer Science & Engineering',
        deptKey: 'cse',
        hasPhoto: true,
        images: ['https://i.ibb.co/35hM71rk/101.jpg'],
        systemConfig: {
            desktop: 'Dell Precision Workstation 3460 SFF CTO, 13th Gen Intel Core i7-13700, 16GB DDR5 RAM @5600MHz, 512GB NVMe SSD, Nvidia Quadro T400 (4GB), 19.5" HD Monitor'
        },
        software: ['VS Code', 'Turbo C7', 'Node.js', 'HTML5/CSS3/JS'],
        subjects: [
            { code: 'CIC-255', name: 'Data Structures' },
            { code: 'CIE-356P', name: 'Web Technology' }
        ],
        description: 'High-performance workstation lab. Data Structures Lab covers linked lists, trees, graphs, sorting, and searching. Web Technology Lab covers HTML5, CSS3, client-side JavaScript, XML schema design, and modern frontend frameworks.'
    },
    {
        id: 'cse-104',
        labNo: 'Lab #104',
        name: 'Software Engineering / AI & Project Lab',
        dept: 'Computer Science & Engineering',
        deptKey: 'cse',
        hasPhoto: true,
        images: ['https://i.ibb.co/KjnQ65kj/104.jpg'],
        systemConfig: {
            desktop: 'Dell Precision Workstation 3460 SFF CTO, 13th Gen Intel Core i7-13700, 16GB DDR5 RAM @5600MHz, 512GB NVMe SSD, Nvidia Quadro T400 (4GB), 19.5" HD Monitor'
        },
        software: ['SWI Prolog', 'StarUML', 'Python NLTK', 'VS Code'],
        subjects: [
            { code: 'CIC-357', name: 'Software Engineering' },
            { code: 'AI-302P', name: 'Artificial Intelligence' }
        ],
        description: 'Advanced workstation setup. SE Lab handles DFDs, UML diagrams, SRS creation, and testing in StarUML. AI Lab implements logic inference in SWI Prolog, Natural Language Processing (NLTK), state-space search (BFS/DFS), and final-year capstone project engineering.'
    },
    {
        id: 'cse-224',
        labNo: 'Lab #224',
        name: 'Mobile Computing Lab / Computational Methods Lab',
        dept: 'Computer Science & Engineering',
        deptKey: 'cse',
        hasPhoto: true,
        images: ['https://i.ibb.co/PvcD244N/224.jpg'],
        systemConfig: {
            desktop: 'HP Core 2 Duo @2.93GHz & Acer P-V Core i5 2nd Gen @3.0GHz, 4GB RAM, 500GB HDD'
        },
        software: ['Turbo C', 'HTML (One Compiler)', 'Android SDK Tools'],
        subjects: [
            { code: 'CIE-368P', name: 'Mobile Computing' },
            { code: 'ES-251', name: 'Computational Methods' }
        ],
        description: 'Computational Methods Lab performs numerical root-finding, interpolation, and matrix solvers in Python and C. Mobile Computing Lab explores wireless protocol design, sensor network simulations, and mobile application frameworks.'
    },
    {
        id: 'cse-216',
        labNo: 'Lab #216',
        name: 'Digital Logic & Computer Design (DLCD) Lab',
        dept: 'Computer Science & Engineering',
        deptKey: 'cse',
        hasPhoto: true,
        images: ['https://i.ibb.co/7tpKmLtB/216.jpg'],
        systemConfig: {
            desktop: 'DELL Vostro 3268 i5 7th Gen, HP Core 2 Duo, and HCL Core 2 Duo Systems'
        },
        software: ['GNUSim8085', 'Logisim', 'Turbo C'],
        subjects: [
            { code: 'ECC-207', name: 'Digital Logic and Computer Design' }
        ],
        description: 'Covers fundamental digital logic gate implementations, combinational logic (adders, multiplexers, decoders), sequential logic (flip-flops, counters), memory organization, and 8085 assembly language execution on GNUSim8085.'
    },

    // IT LABS
    {
        id: 'it-01',
        labNo: 'Lab 01',
        name: 'STRTI Lab / SMDA Lab',
        dept: 'Information Technology',
        deptKey: 'it',
        hasPhoto: true,
        totalSystems: 30,
        images: ['https://msit.in/media/2025/02/18/lab01.png'],
        systemConfig: {
            desktop: 'P-V Core i5 (4GB RAM, Windows 10) & HP i7 Processor (16GB RAM, Windows 11 Licensed)'
        },
        software: ['Scilab', 'R Programming Tool', 'Weka', 'SPSS'],
        subjects: [
            { code: 'ETIT-458', name: 'Selected Topics of Recent Trends in IT' },
            { code: 'DA-304P', name: 'Statistical Modelling & Data Analytics' }
        ],
        description: 'Equipped with 30 high-spec systems. SMDA Lab utilizes Scilab, R, and SPSS for advanced statistical inference, time-series forecasting, and distribution modeling. STRTIT Lab leverages WEKA for data mining and predictive model development.'
    },
    {
        id: 'it-02',
        labNo: 'Lab 02',
        name: 'DS / PSLP Lab',
        dept: 'Information Technology',
        deptKey: 'it',
        hasPhoto: true,
        totalSystems: 20,
        images: ['https://msit.in/media/2025/02/14/lab02.png'],
        systemConfig: {
            desktop: 'Acer Core i5 @3.0GHz (5 PCs), 4GB RAM, Windows 7/10 Licensed'
        },
        software: ['Turbo C++', 'Scilab'],
        subjects: [
            { code: 'CIC-255', name: 'Data Structures' },
            { code: 'ES-251', name: 'Computational Mathematics' },
            { code: 'BS-252', name: 'PSLP' }
        ],
        description: 'Supports hands-on practical exercises in fundamental Data Structures (arrays, trees, graphs), Computational Mathematics, and PSLP probability visualization using Scilab.'
    },
    {
        id: 'it-107',
        labNo: 'Lab 107',
        name: 'Web Technologies / Compiler Design Lab',
        dept: 'Information Technology',
        deptKey: 'it',
        hasPhoto: true,
        totalSystems: 20,
        images: ['https://msit.in/media/2025/02/14/lab-107.png'],
        systemConfig: {
            desktop: '19x Acer Core i5 @3.0GHz & 1x Dell Core i7 @2.10GHz, 4-8GB RAM, Windows 10 Licensed'
        },
        software: ['Turbo C++', 'VS Code', 'HTML/CSS/JS'],
        subjects: [
            { code: 'CIC-351', name: 'Compiler Design' },
            { code: 'CIE-356P', name: 'Web Technologies' }
        ],
        description: '20 workstation capacity. Web Technologies covers modern responsive web page architecture, DOM scripting, dynamic AJAX, and client-side web apps. Compiler Design covers syntax analyzer generation and parsing tables.'
    },
    {
        id: 'it-108',
        labNo: 'Lab 108',
        name: 'DBMS / SE Lab',
        dept: 'Information Technology',
        deptKey: 'it',
        hasPhoto: true,
        totalSystems: 30,
        images: ['https://msit.in/media/2025/02/14/lab-108_JUgNYMU.png'],
        systemConfig: {
            desktop: 'Dell Precision Core i7-14700 (16GB DDR5 RAM) & Dell 12th Gen Core i7-12700 @2.10GHz (8GB RAM)'
        },
        software: ['Oracle 9i/11g', 'StarUML 5', 'SQL*Plus'],
        subjects: [
            { code: 'CIC-256', name: 'Database Management Systems' },
            { code: 'CIC-357', name: 'Software Engineering' }
        ],
        description: '30 workstation capacity featuring 14th Gen i7 Dell Precision systems. Database practicals focus on SQL query execution, relational algebra, and stored procedures in Oracle. SE practicals cover UML architectural modeling in StarUML.'
    },
    {
        id: 'it-110',
        labNo: 'Lab 110',
        name: 'Programming & AI/ML Lab',
        dept: 'Information Technology',
        deptKey: 'it',
        hasPhoto: true,
        totalSystems: 31,
        images: ['https://msit.in/media/2025/02/14/lab-110_Wn0saoW.png'],
        systemConfig: {
            desktop: 'Dell Precision 3460 SFF CTO (13th Gen Core i7-13700, 16GB DDR5), Dell 12th Gen i7-12700, & Acer P-V Core i5'
        },
        software: ['SWI Prolog', 'Python 3', 'Java JDK', 'Arduino IDE'],
        subjects: [
            { code: 'AI-302P', name: 'Artificial Intelligence' },
            { code: 'ML-407P', name: 'Machine Learning' }
        ],
        description: '31 high-performance workstations. Supports AI logical programming in SWI Prolog, deep machine learning algorithm implementation in Python/Scikit-Learn/TensorFlow, and microcontroller IoT programming.'
    },
    {
        id: 'it-111',
        labNo: 'Lab 111',
        name: 'Networking Lab',
        dept: 'Information Technology',
        deptKey: 'it',
        hasPhoto: true,
        totalSystems: 20,
        images: ['https://msit.in/media/2025/02/14/lab-111.png'],
        systemConfig: {
            desktop: 'Intel Core i7-10700 (10th Gen) @2.90GHz, 8GB DDR4 RAM, Windows 10 Licensed'
        },
        software: ['Network Simulator-3 (NS-3)', 'Cisco Packet Tracer', 'NetBeans', 'Python'],
        subjects: [
            { code: 'CIC-355', name: 'Computer Networks' },
            { code: 'CIC-258', name: 'Java Programming' },
            { code: 'CIE-332P', name: 'Python Programming' }
        ],
        description: '20 desktop networking lab. Facilitates computer network simulation, TCP/UDP protocol modeling, sliding window flow control experiments, and socket programming.'
    },
    {
        id: 'it-501',
        labNo: 'Lab 501',
        name: 'Circuit & System / Project Lab',
        dept: 'Information Technology',
        deptKey: 'it',
        hasPhoto: true,
        totalSystems: 12,
        hardwareKits: [
            '10x Electrical Circuit Trainer Kits',
            '10x Digital Multimeters',
            'Nvidia Quadro T1000/RTX T400 Workstations',
            'APC 600VA UPS Backups'
        ],
        images: ['https://msit.in/media/2025/02/14/lab-501.png'],
        systemConfig: {
            desktop: 'HP Core i7 14th Gen, Dell Precision 3660 Workstation (Core i7-13700, 32GB DDR5, Nvidia Quadro T1000 8GB), Dell Precision 3460 (Core i7-14700, 16GB DDR5, Nvidia Quadro RTX T400 4GB)'
        },
        software: ['MATLAB', 'Proteus', 'Keil Microvision', 'Python'],
        subjects: [
            { code: 'EEC-254', name: 'Circuit & System Lab' },
            { code: 'ES-452/454', name: 'Minor & Major Capstone Projects' }
        ],
        description: '12 workstation & 10 hardware kit setup. Conducts two-port network parameter analysis (Z, Y, ABCD) and RLC circuit experiments. Also serves as the primary hardware incubator for E-Yantra Robotics, Hackathons, and project prototyping.'
    },
    {
        id: 'it-504',
        labNo: 'Lab 504',
        name: 'Centre of Excellence (CoE) Lab',
        dept: 'Information Technology',
        deptKey: 'it',
        hasPhoto: false,
        totalSystems: 10,
        hardwareKits: [
            'HPE ProLiant ML30 Gen10 Server (Intel Xeon 2314)',
            'Raspberry Pi 4 Model B (4GB) & Raspberry Pi 5 (8GB)',
            'Arduino Uno, Arduino Nano, ESP32, STM32 Nucleo',
            'DHT11/DHT22, Ultrasonic, IR Sensors, Relays, Servos, HC-05 Bluetooth'
        ],
        images: [],
        systemConfig: {
            desktop: 'HP Desktop Z2 Intel Core i7-14700 @2.10GHz, HP & Dell Core i7 Laptops, 16GB RAM, Server Infrastructure'
        },
        software: ['Arduino IDE', 'Python 3', 'Node-RED', 'MQTT Broker'],
        subjects: [
            { code: 'CIE-330P', name: 'Introduction to Internet of Things' }
        ],
        description: 'Dedicated R&D Center of Excellence for IoT, Artificial Intelligence, and Embedded Edge Computing. Supports official GGSIPU IoT curriculum lab experiments and stays open to research scholars and hackathon teams year-round.'
    },

    // ECE LABS
    {
        id: 'ece-204',
        labNo: 'Lab #204',
        name: 'PSLP / SMDA / Microelectronics Lab',
        dept: 'Electronics & Communication Engineering',
        deptKey: 'ece',
        hasPhoto: true,
        totalSystems: 20,
        images: [
            'https://msit.in/media/uploads/2025/05/01/image-20250501113424-1.jpeg',
            'https://msit.in/media/uploads/2025/05/01/image-20250501113424-2.jpeg'
        ],
        systemConfig: {
            desktop: '7x Dell Intel Core i7 (16GB RAM, 512GB HDD, Win 10) & 13x Acer Intel Core i5 (4GB RAM, 500GB HDD, Win 10)'
        },
        software: ['Tanner Tools (S-Edit, L-Edit, W-Edit)', 'Scilab', 'R Studio'],
        subjects: [
            { code: 'BS-252', name: 'PSLP' },
            { code: 'DA-304P', name: 'SMDA' },
            { code: 'ML-469P', name: 'ML & Data Analytics Frameworks' },
            { code: 'ECC-353', name: 'Microelectronics' }
        ],
        description: '20 workstation VLSI & Data Analytics facility. Uses Tanner Tools for schematic capture, SPICE simulation, and CMOS layout in Microelectronics; R Studio & Scilab for statistical inference and probability modeling.'
    },
    {
        id: 'ece-202',
        labNo: 'Lab #202',
        name: 'DSP / Signal & System Lab',
        dept: 'Electronics & Communication Engineering',
        deptKey: 'ece',
        hasPhoto: true,
        totalSystems: 22,
        images: ['https://msit.in/media/uploads/2025/05/01/image-20250501113424-3.png'],
        systemConfig: {
            desktop: '6x Dell Intel Core i7 (16GB RAM), 13x Acer Core i5, 2x Wipro Duo CPU, 1x Dedicated MATLAB Server'
        },
        software: ['MATLAB 7.0 (Licensed)', 'Scilab', 'R Studio'],
        subjects: [
            { code: 'ECC-352', name: 'Digital Signal Processing' },
            { code: 'ECC-251', name: 'Signals and Systems' },
            { code: 'BS-252', name: 'PSLP' }
        ],
        description: '22 system signal processing hub. Features a dedicated central MATLAB server for executing complex FFT algorithms, digital filter design (FIR/IIR), spectrum estimation, convolution, and continuous/discrete signal transformations.'
    },
    {
        id: 'ece-210',
        labNo: 'Lab #210',
        name: 'Analog & Digital Communication / Control Systems Lab',
        dept: 'Electronics & Communication Engineering',
        deptKey: 'ece',
        hasPhoto: false,
        totalSystems: 10,
        hardwareKits: [
            '100MHz 2GS/s & 40MHz 500GS/s DSOs',
            'Mixed-Domain Oscilloscope (100MHz, 2.5GS/s)',
            'AM / FM Communication Trainer Kits',
            'Data Formatting Kits & Function/Data Generators'
        ],
        images: [],
        systemConfig: {
            desktop: '5x Dell 12th Gen Core i7-12700 (8GB RAM, Win 11) & 5x Acer Core i5-3330S (4GB RAM, Win 7)'
        },
        software: ['MATLAB', 'Simulink'],
        subjects: [
            { code: 'ECC-255', name: 'Analog Communication' },
            { code: 'ECC-258', name: 'Digital Communication' },
            { code: 'ECC-355', name: 'Control Systems' },
            { code: 'ECE-405P', name: 'Pattern Recognition' }
        ],
        description: 'Equipped with high-bandwidth DSOs and signal generators. Hands-on modulation experiments (AM, FM, ASK, FSK, PSK), pulse code modulation, time-domain control response, and pattern recognition algorithms.'
    },
    {
        id: 'ece-213',
        labNo: 'Lab #213',
        name: 'Analog Electronics / OPOC Lab',
        dept: 'Electronics & Communication Engineering',
        deptKey: 'ece',
        hasPhoto: true,
        hardwareKits: [
            '10x Silicon Elec. Dual Channel 100MHz DSOs',
            '10x Vinytics AL-303 Analog Trainer Kits',
            '10x Silicon Elec. 10MHz Function Generators',
            '7x Advanced Fiber Optics Trainer Kits',
            '2x Optical Power Meters'
        ],
        images: [
            'https://msit.in/media/uploads/2025/05/01/image-20250501113424-4.jpeg',
            'https://msit.in/media/uploads/2025/05/01/image-20250501113424-5.jpeg',
            'https://msit.in/media/uploads/2025/05/01/image-20250501113424-6.png'
        ],
        systemConfig: {
            desktop: '10x Dell Intel Core i7 Systems (shared with Labs 218 & 214)'
        },
        software: ['Proteus 7.7 Circuit Simulator'],
        subjects: [
            { code: 'ECC-251', name: 'Analog Electronics I & II' },
            { code: 'ECC-356', name: 'Optical Communication (OPOC)' }
        ],
        description: 'Comprehensive discrete hardware testing laboratory. Features 10 complete bench setups with DSOs, function generators, analog trainer kits, and optical fiber attenuation/numerical aperture measurement apparatus.'
    },
    {
        id: 'ece-214',
        labNo: 'Lab #214',
        name: 'Microprocessor & Microcontroller / ML / NIBOT Lab',
        dept: 'Electronics & Communication Engineering',
        deptKey: 'ece',
        hasPhoto: false,
        totalSystems: 15,
        hardwareKits: [
            '20x Digital Trainer Kits (DLCD)',
            '15x 8085 Microprocessor Kits',
            '17x 8086 Microprocessor Kits (MPMC)',
            'Interfacing Cards (8255 PPI, 8253 PIT, 8259 PIC, ADC/DAC)'
        ],
        images: [],
        systemConfig: {
            desktop: '13x 13th Gen Core i7-12700 @2.10GHz (16GB RAM, Win 10), 1x Core i5 @3.0GHz, 1x Core @2.93GHz'
        },
        software: ['Python 3.8', 'Jupyter Notebook', 'Anaconda 3', '8085 Simulator (Jubin Mitra)', 'EMU8086 v4.08', 'MCU 8051 IDE'],
        subjects: [
            { code: 'ECC-257', name: 'Microprocessor & Microcontroller' },
            { code: 'ECC-207', name: 'DLCD' },
            { code: 'ML-401', name: 'Unsupervised Learning' },
            { code: 'ECE-403', name: 'NIBOT (Nature Inspired Optimization)' }
        ],
        description: '15 workstations and 50+ hardware trainer kits. Assembly programming for 8085, 8086, and 8051. NIBOT and ML practicals implement neural network backpropagation, genetic algorithms (TSP), Hebbian learning, and Iris dataset clustering in Python.'
    },
    {
        id: 'ece-218',
        labNo: 'Lab #218',
        name: 'AI / Antenna Design & Waveguide Lab',
        dept: 'Electronics & Communication Engineering',
        deptKey: 'ece',
        hasPhoto: true,
        totalSystems: 22,
        images: [
            'https://msit.in/media/uploads/2025/05/01/image-20250501113424-7.png',
            'https://msit.in/media/uploads/2025/05/01/image-20250501113424-8.jpeg'
        ],
        systemConfig: {
            desktop: '10x Dell 13th Gen Core i7-13700 (16GB RAM), 10x Dell 12th Gen Core i7-12700 (8GB RAM), 2x HP Core 2 Duo'
        },
        software: ['CST Studio Suite (3D EM Simulation)', 'SWI Prolog', 'Python 3'],
        subjects: [
            { code: 'ECE-318P', name: 'Artificial Intelligence' },
            { code: 'ECE-330P', name: 'Antenna Design & Radiating Systems' },
            { code: 'ECC-357', name: 'Transmission Line & Waveguide Analysis' },
            { code: 'ML-463P', name: 'Supervised & Deep Learning' }
        ],
        description: '22 system electromagnetic and AI computational facility. Employs CST Studio Suite for 3D electromagnetic field analysis, patch antenna synthesis, microwave waveguide mode analysis, and SWI Prolog/Python for AI inference.'
    },
    {
        id: 'ece-216',
        labNo: 'Lab #216-ECE',
        name: 'ECE Hardware & Software Project Lab',
        dept: 'Electronics & Communication Engineering',
        deptKey: 'ece',
        hasPhoto: true,
        totalSystems: 9,
        hardwareKits: [
            '4x Variable DC Power Supplies & 4x DSOs',
            '6x Digital Multimeters DT-9205A',
            'Full Soldering/Desoldering Workstation Kits',
            '10x 606 Transformers, Wire Strippers, Pliers & Toolsets'
        ],
        images: [
            'https://msit.in/media/uploads/2025/05/01/image-20250501113424-9.jpeg',
            'https://msit.in/media/uploads/2025/05/01/image-20250501113424-10.jpeg',
            'https://msit.in/media/uploads/2025/05/01/image-20250501113424-11.jpeg',
            'https://msit.in/media/uploads/2025/05/01/image-20250501113424-12.jpeg',
            'https://msit.in/media/uploads/2025/05/01/image-20250501113424-13.jpeg',
            'https://msit.in/media/uploads/2025/05/01/image-20250501113424-14.jpeg'
        ],
        systemConfig: {
            desktop: '4x Dell Core i7 (16GB RAM, 512GB HDD), 1x Dell i5-7400, 3x Acer Core i5, 1x HP Core 2 Duo'
        },
        software: ['MATLAB', 'Scilab', 'R Studio', 'Python 3.8', 'Anaconda', 'EMU8086', 'Proteus'],
        subjects: [
            { code: 'ES-452', name: 'Minor Project' },
            { code: 'ES-454', name: 'Major Capstone Project' }
        ],
        description: 'Dedicated fabrication and prototyping laboratory equipped with complete electronic hardware toolsets, soldering stations, multimeters, transformers, DSOs, and multi-language simulation software for student capstone innovations.'
    },

    // EEE LABS
    {
        id: 'eee-506a',
        labNo: 'Lab #506A',
        name: 'Utilization of Electrical Energy / Electrical Machines-I Lab',
        dept: 'Department of Electrical & Electronics Engineering',
        deptKey: 'eee',
        hasPhoto: false,
        hardwareKits: [
            'Photometric & Illumination Measurement Setups',
            'Cut-Section DC Machine & Motor Models',
            '1-Phase & 3-Phase Transformers',
            'DC Motor-Generator Loading Test Benches'
        ],
        images: [],
        systemConfig: {
            desktop: 'Electrical Test Benches with Analog/Digital Voltmeter, Ammeter & Power Supplies'
        },
        software: ['MATLAB/Simulink'],
        subjects: [
            { code: 'EEE-320P', name: 'Utilization of Electrical Energy (6th Sem)' },
            { code: 'EEC-257', name: 'Electrical Machines-I (3rd Sem)' }
        ],
        description: 'UEE Lab performs photometric calculations and energy utilization analysis. Electrical Machines-I Lab studies internal/external characteristics of DC generators, load testing, speed control, efficiency, and transformer voltage regulation.'
    },
    {
        id: 'eee-506b',
        labNo: 'Lab #506B',
        name: 'Electrical Machines-II Lab',
        dept: 'Department of Electrical & Electronics Engineering',
        deptKey: 'eee',
        hasPhoto: false,
        hardwareKits: [
            '3-Phase & 1-Phase Induction Motors',
            'Synchronous Motor & Alternator Test Panels',
            'Cut-Section AC Machine Demonstrators'
        ],
        images: [],
        systemConfig: {
            desktop: 'AC Motor Test Benches with Torque Indicators & Variable Frequency Drives'
        },
        software: ['MATLAB'],
        subjects: [
            { code: 'EEC-256', name: 'Electrical Machines-II (4th Sem)' }
        ],
        description: 'Analyzes AC electrical machines. Performs no-load and blocked-rotor tests on induction motors, load tests on squirrel-cage and slip-ring motors, V-curves and inverted V-curves of synchronous motors, and alternator synchronization.'
    },
    {
        id: 'eee-502',
        labNo: 'Lab #502',
        name: 'Power Systems I & II / Network Analysis & Synthesis Lab',
        dept: 'Department of Electrical & Electronics Engineering',
        deptKey: 'eee',
        hasPhoto: false,
        hardwareKits: [
            'Transmission Line Simulation Model',
            'CT/PT & Cable Testing Panels',
            'Protective Relays (IDMT, Buchholz, Thermal, Differential)',
            'Two-Port RLC Network Trainer Kits'
        ],
        images: [],
        systemConfig: {
            desktop: 'Relay Testing Panels & Transmission Line Analyzer Setups'
        },
        software: ['ETAP', 'MATLAB Power System Tool'],
        subjects: [
            { code: 'EEC-260', name: 'Power System-I (4th Sem)' },
            { code: 'EEC-351', name: 'Power System-II (5th Sem)' },
            { code: 'EEC-206', name: 'Network Analysis & Synthesis (4th Sem)' }
        ],
        description: 'Covers transmission line performance, fault detection using protective relays under artificial fault conditions, earthing resistance measurement, and two-port network (Z, Y, ABCD) parameter verification.'
    },
    {
        id: 'eee-227',
        labNo: 'Lab #227',
        name: 'Electrical Science Lab',
        dept: 'Department of Electrical & Electronics Engineering',
        deptKey: 'eee',
        hasPhoto: false,
        hardwareKits: [
            'Variable AC/DC Power Supplies with Circuit Breakers',
            'Energy Meters, Power Factor Meters, Wattmeters',
            'Single-Phase Transformers & Motor Modules'
        ],
        images: [],
        systemConfig: {
            desktop: 'Multi-bench Electrical Science Workstations'
        },
        software: ['Multisim'],
        subjects: [
            { code: 'ES-159', name: 'Electrical Science (1st & 2nd Sem - Shared)' }
        ],
        description: 'Core foundational laboratory serving all 1st and 2nd semester B.Tech engineering branches (CSE, IT, ECE, EEE). Provides fundamental training in KVL/KCL, Thévenin/Norton theorems, AC circuits, and power factor analysis.'
    },
    {
        id: 'eee-306b',
        labNo: 'Lab #306B',
        name: 'SMDA / Computational Methods / ML & PPI Lab',
        dept: 'Department of Electrical & Electronics Engineering',
        deptKey: 'eee',
        hasPhoto: false,
        totalSystems: 14,
        images: [],
        systemConfig: {
            desktop: '14x Systems (P-V Core i5 with 4GB RAM & HP Core 2 Duo, Windows 10 Licensed)'
        },
        software: ['MATLAB', 'R Programming', 'Anaconda Python', 'Turbo C'],
        subjects: [
            { code: 'ES-251', name: 'Computational Methods (3rd Sem)' },
            { code: 'BS-252', name: 'PSLP (4th Sem)' },
            { code: 'DA-304P', name: 'SMDA (6th Sem)' },
            { code: 'ML-342P', name: 'Machine Learning (6th Sem)' },
            { code: 'EEE-402', name: 'Power Plant Instrumentation (8th Sem)' }
        ],
        description: '14 system computational lab for EEE students. Features MATLAB/R for statistical data analytics, Anaconda Python for Machine Learning practicals, and power plant instrumentation simulation.'
    },
    {
        id: 'eee-306a',
        labNo: 'Lab #306A',
        name: 'Electric Drives / Power Electronics Lab',
        dept: 'Department of Electrical & Electronics Engineering',
        deptKey: 'eee',
        hasPhoto: false,
        hardwareKits: [
            'Thyristor, SCR, MOSFET & IGBT Characterization Kits',
            'AC/DC Motor Speed Control Experimental Setups',
            'Digital Storage Oscilloscopes (DSOs)',
            'Closed-loop Hardware Control Modules'
        ],
        images: [],
        systemConfig: {
            desktop: 'Dedicated Hardware-in-the-Loop Motor Control Desks & MATLAB Interfaced Workstations'
        },
        software: ['MATLAB/Simulink', 'Proteus'],
        subjects: [
            { code: 'EEE-340P', name: 'Electric Drives (6th Sem)' },
            { code: 'EEC-357', name: 'Power Electronics (5th Sem)' }
        ],
        description: 'Examines power semiconductor device firing circuits (SCR, IGBT, MOSFET), converter topologies, phase-controlled rectifiers, and closed-loop hardware/software speed control of DC and AC motors.'
    },
    {
        id: 'eee-eemi',
        labNo: 'EEMI Lab',
        name: 'Electrical Measurements & Instrumentation / Workshop Lab',
        dept: 'Department of Electrical & Electronics Engineering',
        deptKey: 'eee',
        hasPhoto: false,
        hardwareKits: [
            'Potentiometers, Wheatstone & Kelvin Bridges',
            'Transducer Kits (LVDT, Thermocouple, Strain Gauge)',
            'House Wiring Boards (Tube Light, Fan Control, Relays)',
            'Illumination Device Demonstrators (CFL, LED, Halogen)'
        ],
        images: [],
        systemConfig: {
            desktop: 'Instrument Calibration Workbenches & Electrical Wiring Boards'
        },
        software: ['LabVIEW'],
        subjects: [
            { code: 'EEC-353', name: 'EEMI (5th Sem)' },
            { code: 'EEC-259', name: 'Electrical Workshop (3rd Sem)' }
        ],
        description: 'EEMI Lab provides hands-on instrument calibration, bridge measurements, and transducer testing. Workshop Lab teaches residential house wiring, conduit routing, relay connections, and lighting system assembly.'
    },

    // APPLIED SCIENCES
    {
        id: 'as-physics-chem',
        labNo: 'General Workshop',
        name: 'Applied Physics & Chemistry Labs (Foundational)',
        dept: 'Department of Applied Sciences',
        deptKey: 'as',
        hasPhoto: false,
        hardwareKits: [
            'Spectrometers, Lasers, Newton Ring Apparatus',
            'Digital Viscometers, pH Meters, Conductometers',
            'Fitting, Carpentry, & Sheet Metal Workshop Machinery'
        ],
        images: [],
        systemConfig: {
            desktop: 'Physics & Chemistry Measurement Instruments & Mechanical Workshop Benches'
        },
        software: ['OriginLab', 'Scilab'],
        subjects: [
            { code: 'BS-105', name: 'Applied Physics-I & II' },
            { code: 'BS-107', name: 'Applied Chemistry' },
            { code: 'ES-111', name: 'Engineering Workshop' }
        ],
        description: 'Foundational practical laboratories serving all incoming 1st year B.Tech students. Covers optical physics, laser diffraction, chemical titration, viscosity determination, and hands-on manufacturing workshop skills.'
    }
];

export const itMous = [
    {
        id: 1,
        partner: 'AI-SHALA Pvt. Ltd.',
        mouDate: '2025-11-10',
        expiryDate: '2027-11-10',
        beneficiaries: 7,
        status: 'Active',
        domain: 'Artificial Intelligence & Machine Learning Training'
    },
    {
        id: 2,
        partner: 'Internshala Pvt. Ltd.',
        mouDate: '2023-11-23',
        expiryDate: '2024-11-23',
        beneficiaries: 55,
        status: 'Pending Renewal',
        domain: 'Student Internship Placement Support'
    },
    {
        id: 3,
        partner: 'The IoT Academy',
        mouDate: '2023-12-20',
        expiryDate: 'Perpetual',
        beneficiaries: 127,
        status: 'Active',
        domain: 'Internet of Things & Embedded Systems'
    },
    {
        id: 4,
        partner: 'Brain Mentors Pvt. Ltd.',
        mouDate: '2024-02-27',
        expiryDate: '2026-02-27',
        beneficiaries: 17,
        status: 'Active',
        domain: 'Full Stack Development & Data Structures'
    },
    {
        id: 5,
        partner: 'PanTech e-learning',
        mouDate: '2024-01-06',
        expiryDate: '2026-01-06',
        beneficiaries: 34,
        status: 'Active',
        domain: 'E-Learning & Virtual Skill Development'
    },
    {
        id: 6,
        partner: 'ONGC Ltd. (Lab Setup)',
        mouDate: '2024-03-22',
        expiryDate: '2025-06-22',
        beneficiaries: 'Department-wide',
        status: 'Pending Renewal',
        domain: 'State-of-the-Art Research Infrastructure Setup'
    },
    {
        id: 7,
        partner: 'Airports Authority of India (AAI)',
        mouDate: '2024-05-04',
        expiryDate: '2029-05-04',
        beneficiaries: 20,
        status: 'Active',
        domain: 'Aviation IT Infrastructure & Industrial Exposure'
    },
    {
        id: 8,
        partner: 'DUCAT, India, UP',
        mouDate: '2024-12-26',
        expiryDate: 'Perpetual',
        beneficiaries: 123,
        status: 'Active',
        domain: 'Industrial Software Skill Enhancement'
    },
    {
        id: 9,
        partner: 'NIELIT (National Inst. of Electronics & IT)',
        mouDate: '2024-12-05',
        expiryDate: '2027-12-05',
        beneficiaries: 27,
        status: 'Active',
        domain: 'Government IT Certification & Advanced Computing'
    },
    {
        id: 10,
        partner: 'JKSD Infotech Pvt. Ltd.',
        mouDate: '2024-08-21',
        expiryDate: 'Perpetual',
        beneficiaries: 148,
        status: 'Active',
        domain: 'Software Testing & IT Consultancy Projects'
    }
];

export const campusInfrastructure = {
    library: {
        title: 'Maharaja Surajmal Central Library',
        books: '50,000+',
        journals: '100+',
        software: 'Koha Online OPAC Catalog',
        opacUrl: 'http://library.msit.in/',
        description: 'The Central Library serves both MSIT and MSI. Fully computerized using the Koha OPAC system, it houses over 50,000 volumes, subscribes to 100+ national and international print journals, and provides digital access to IEEE Xplore, SpringerNature, Sage, DELNET, and SCC Online.',
        features: [
            'Book Bank Facility: Complete set of syllabus textbooks issued to every student for the entire semester',
            'Subscribed E-Resources: Remote and on-campus access to IEEE Xplore, SpringerNature, Sage, and DELNET',
            'Digital Repository: NPTEL video lectures, AICTE e-KUMBH books, NDLI, and previous year GGSIPU papers',
            'Air-conditioned quiet reading halls and dedicated group study research wings'
        ]
    },
    hostel: {
        title: 'Maharaja Mahendra Pratap Hostel',
        boysCapacity: 200,
        girlsCapacity: 100,
        description: 'On-campus residential facilities accommodating ~200 male students and ~100 female students in a four-storey complex with 24/7 security, high-speed Wi-Fi, power backup, and hygienic dining mess.',
        amenities: ['24/7 Power Backup', 'RO Purified Water', 'Sports & Games Room', 'Hygienic Mess Hall']
    },
    sports: {
        title: 'Sports & Athletic Grounds',
        facilities: ['Football Pitch', 'Cricket Nets', 'Volleyball Court', 'Outdoor Badminton Courts', 'Table Tennis & Chess'],
        description: 'Expansive outdoor sports grounds and indoor gaming areas. Host of the annual SPHURTI inter-college sports festival and contingent training for GGSIPU meets.'
    },
    canteen: {
        capacity: '60–70 Seating',
        description: 'Campus cafeteria serving hygienic meals, quick snacks, hot beverages, and fresh juices for students and faculty.'
    },
    banking: {
        name: 'On-Campus Banking & ATM',
        description: 'Full-service banking facility and 24-hour ATM located right inside the institute campus for safe financial transactions.'
    },
    medical: {
        title: 'Campus Medical Room & Emergency Care',
        attendantName: 'Medical Room Attendant / Healthcare Staff Officer',
        attendantPhone: '+91 98XXX XXXXX (Attendant Contact - Placeholder)',
        landline: '011-25552026 (Ext. Medical Room)',
        email: 'medical@msit.in',
        description: 'On-campus dedicated Medical Room providing first-aid, emergency medical assistance, and health support for students, faculty, and administrative staff. Equipped with rest beds, oxygen support, emergency stretchers, and basic diagnostic tools.',
        facilities: [
            'Immediate First Aid & Emergency Medical Triage',
            'Full-time Medical Attendant & Doctor-on-Call Service',
            'Rest Beds, BP Monitor, Pulse Oximeter & Stretcher Support',
            'Emergency hospital tie-up and 24-hour ambulance dispatch coordination'
        ]
    }
};

export const auditNotes = {
    warningTitle: 'Data Migration & Image Hosting Audit Notes',
    notes: [
        'Image Re-hosting Required: Original laboratory images are currently hosted on external third-party hosts (i.ibb.co) or temporary Google CDN links (lh7-us.googleusercontent.com). Recommend downloading and storing in local assets before production release.',
        'Photography Required: Photos are currently missing in official records for all 7 EEE labs, IT Lab #504 (CoE), ECE Lab #210, and ECE Lab #214.',
        'MOU Verification: IT Department MOUs with Internshala (Nov 2024) and ONGC (Jun 2025) have reached end-of-term date and are pending official renewal confirmation.'
    ]
};
