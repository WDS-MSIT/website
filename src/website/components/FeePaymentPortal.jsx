import React, { useState } from 'react';
import { 
    CreditCard, 
    Landmark, 
    CheckCircle, 
    Download, 
    Printer, 
    ShieldCheck, 
    Receipt, 
    RefreshCw, 
    Loader2, 
    ArrowLeft, 
    ArrowRight,
    Sparkles,
    ExternalLink
} from 'lucide-react';

const DEPARTMENTS = [
    { code: 'cse', name: 'Computer Science & Engineering' },
    { code: 'it', name: 'Information Technology' },
    { code: 'ece', name: 'Electronics & Communication Engineering' },
    { code: 'eee', name: 'Electrical & Electronics Engineering' },
    { code: 'applied-sciences', name: 'Applied Sciences (1st Year)' }
];

const FEE_TYPES = [
    { id: 'tuition', name: 'Tuition Fee', amount: 120000 },
    { id: 'hostel', name: 'Hostel Fee', amount: 85000 },
    { id: 'misc', name: 'Miscellaneous Fee', amount: 5000 }
];

const MOCK_RECEIPTS_DB = {
    "00115002720": [
        { id: "REC-2026-9812", date: "2026-08-10", type: "Tuition Fee", term: "Semester 7", amount: 120000, status: "SUCCESS" },
        { id: "REC-2025-4519", date: "2025-07-22", type: "Tuition Fee", term: "Semester 5", amount: 115000, status: "SUCCESS" },
        { id: "REC-2025-1102", date: "2025-08-01", type: "Hostel Fee", term: "Annual", amount: 80000, status: "SUCCESS" },
        { id: "REC-2024-8841", date: "2024-07-15", type: "Tuition Fee", term: "Semester 3", amount: 110000, status: "SUCCESS" }
    ],
    "00215002720": [
        { id: "REC-2026-9901", date: "2026-08-12", type: "Tuition Fee", term: "Semester 5", amount: 120000, status: "SUCCESS" },
        { id: "REC-2025-3312", date: "2025-07-28", type: "Tuition Fee", term: "Semester 3", amount: 115000, status: "SUCCESS" }
    ]
};

const FeePaymentPortal = ({ activeTab, setActiveTab }) => {
    // Payment Tab States
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        enrollmentNo: '',
        studentName: '',
        email: '',
        department: 'cse',
        semester: 'Semester 1',
        feeType: 'tuition',
        customAmount: '120000',
        paymentMethod: 'card'
    });

    // Receipt Tab States
    const [receiptSearchNo, setReceiptSearchNo] = useState('');
    const [receiptResults, setReceiptResults] = useState(null);
    const [viewingReceipt, setViewingReceipt] = useState(null);

    // Handle Active Tab Sync from Parent
    const currentTab = activeTab || 'pay';

    const handleReceiptSearch = (e) => {
        e.preventDefault();
        if (!/^\d{11}$/.test(receiptSearchNo)) {
            alert("Enrollment number must be exactly 11 digits.");
            return;
        }

        const results = MOCK_RECEIPTS_DB[receiptSearchNo] || [];
        setReceiptResults(results);
    };

    const triggerPrint = () => {
        window.print();
    };

    return (
        <div className="w-full">
            {/* Tab Navigation header within the component */}
            <div className="flex border-b border-slate-200 mb-8 select-none print:hidden">
                <button 
                    type="button"
                    onClick={() => { setActiveTab('pay'); setStep(1); }}
                    className={`flex-1 py-4 text-center text-sm font-semibold border-b-2 transition-all flex justify-center items-center gap-2 ${
                        currentTab === 'pay' 
                            ? 'border-primary text-primary' 
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                >
                    <CreditCard className="w-4 h-4" />
                    Pay Academic Fees
                </button>
                <button 
                    type="button"
                    onClick={() => { setActiveTab('receipt'); setViewingReceipt(null); }}
                    className={`flex-1 py-4 text-center text-sm font-semibold border-b-2 transition-all flex justify-center items-center gap-2 ${
                        currentTab === 'receipt' 
                            ? 'border-primary text-primary' 
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                >
                    <Receipt className="w-4 h-4" />
                    Generate Receipt
                </button>
                <button 
                    type="button"
                    onClick={() => setActiveTab('refund')}
                    className={`flex-1 py-4 text-center text-sm font-semibold border-b-2 transition-all flex justify-center items-center gap-2 ${
                        currentTab === 'refund' 
                            ? 'border-primary text-primary' 
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                >
                    <RefreshCw className="w-4 h-4" />
                    Refund Policy
                </button>
            </div>

            {/* TAB 1: OFFICIAL FEE DETAILS & DIRECT PAYMENT LINK */}
            {currentTab === 'pay' && (
                <div className="space-y-8 print:hidden">
                    {/* Hero Direct Action Banner */}
                    <div className="bg-primary/5 p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-primary/15">
                        <div className="max-w-3xl">
                            <span className="px-2.5 py-1 bg-white text-primary text-[11px] font-semibold rounded-full border border-primary/20 uppercase tracking-wider mb-3 sm:mb-4 inline-block">
                                Official Online Payment Portal
                            </span>
                            <h3 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-3 text-slate-900">
                                Pay Annual Academic Fees Online
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-5 sm:mb-6">
                                MSIT students can securely pay their annual academic, tuition, and hostel fees directly through the official Octopod fee payment portal.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4">
                                <a 
                                    href="https://octopod.co.in/student/admission/81a9421f2cfc48f2e5f5278efa47382b" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="px-5 sm:px-6 py-3 sm:py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl text-sm transition-colors shadow-sm flex items-center justify-center gap-2 group cursor-pointer"
                                >
                                    <span>Proceed to Official Octopod Fee Portal</span>
                                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </a>
                                <a 
                                    href="https://www.msit.in/media/news/fee-submission-notice-for-the-academic-year-2026-27.pdf" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="px-5 sm:px-6 py-3 sm:py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-xl text-sm transition-colors border border-slate-300 flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>Official Fee Notice PDF</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Official Batch-wise Fee Breakdown Cards */}
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
                            <h4 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-primary" />
                                Annual Fee Structure & Amounts Required
                            </h4>
                            <span className="text-xs text-slate-500 font-medium">As per GGSIPU & SFRC Notifications (AY 2026–27)</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
                            {/* 1st Year */}
                            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-md uppercase tracking-wider">Fresh Admission</span>
                                        <h5 className="text-lg font-bold text-slate-900 mt-1">B.Tech 1st Year</h5>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-[Libre_Baskerville,serif] text-xl sm:text-2xl font-bold text-primary tabular-nums">₹1,67,000</div>
                                        <div className="text-[10px] text-slate-400 uppercase font-bold">Total Annual Fee</div>
                                    </div>
                                </div>
                                <div className="text-xs text-slate-600 space-y-1.5 pt-3 border-t border-slate-100 font-medium">
                                    <div className="flex justify-between"><span>Academic Tuition Fee:</span> <span className="font-bold text-slate-800">₹1,35,000</span></div>
                                    <div className="flex justify-between"><span>University Charges (GGSIPU):</span> <span className="font-bold text-slate-800">₹20,000</span></div>
                                    <div className="flex justify-between"><span>Student Activity Fee:</span> <span className="font-bold text-slate-800">₹2,000</span></div>
                                    <div className="flex justify-between"><span>Security Deposit (Refundable):</span> <span className="font-bold text-slate-800">₹10,000</span></div>
                                </div>
                            </div>

                            {/* 2nd Year */}
                            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-md uppercase tracking-wider">Batch 2025–29</span>
                                        <h5 className="text-lg font-bold text-slate-900 mt-1">B.Tech 2nd Year</h5>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-[Libre_Baskerville,serif] text-xl sm:text-2xl font-bold text-primary tabular-nums">₹1,59,560</div>
                                        <div className="text-[10px] text-slate-400 uppercase font-bold">Total Annual Fee</div>
                                    </div>
                                </div>
                                <div className="text-xs text-slate-600 space-y-1.5 pt-3 border-t border-slate-100 font-medium">
                                    <div className="flex justify-between"><span>Program Tuition Fee:</span> <span className="font-bold text-slate-800">₹1,35,960</span></div>
                                    <div className="flex justify-between"><span>University Charges:</span> <span className="font-bold text-slate-800">₹20,000</span></div>
                                    <div className="flex justify-between"><span>Exam Fee & Charges:</span> <span className="font-bold text-slate-800">₹3,000</span></div>
                                    <div className="flex justify-between"><span>Innovation & Insurance:</span> <span className="font-bold text-slate-800">₹600</span></div>
                                </div>
                            </div>

                            {/* 3rd Year */}
                            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-md uppercase tracking-wider">Batch 2024–28</span>
                                        <h5 className="text-lg font-bold text-slate-900 mt-1">B.Tech 3rd Year</h5>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-[Libre_Baskerville,serif] text-xl sm:text-2xl font-bold text-primary tabular-nums">₹1,65,100</div>
                                        <div className="text-[10px] text-slate-400 uppercase font-bold">Total Annual Fee</div>
                                    </div>
                                </div>
                                <div className="text-xs text-slate-600 space-y-1.5 pt-3 border-t border-slate-100 font-medium">
                                    <div className="flex justify-between"><span>Program Tuition Fee:</span> <span className="font-bold text-slate-800">₹1,39,500</span></div>
                                    <div className="flex justify-between"><span>University Charges:</span> <span className="font-bold text-slate-800">₹20,000</span></div>
                                    <div className="flex justify-between"><span>Exam & Innovation Charges:</span> <span className="font-bold text-slate-800">₹3,600</span></div>
                                    <div className="flex justify-between"><span>Placement Grooming Training:</span> <span className="font-bold text-slate-800">₹2,000</span></div>
                                </div>
                            </div>

                            {/* 4th Year */}
                            <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-md uppercase tracking-wider">Batch 2023–27</span>
                                        <h5 className="text-lg font-bold text-slate-900 mt-1">B.Tech 4th Year</h5>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-[Libre_Baskerville,serif] text-xl sm:text-2xl font-bold text-primary tabular-nums">₹1,53,000</div>
                                        <div className="text-[10px] text-slate-400 uppercase font-bold">Total Annual Fee</div>
                                    </div>
                                </div>
                                <div className="text-xs text-slate-600 space-y-1.5 pt-3 border-t border-slate-100 font-medium">
                                    <div className="flex justify-between"><span>Program Tuition Fee:</span> <span className="font-bold text-slate-800">₹1,32,900</span></div>
                                    <div className="flex justify-between"><span>University Charges:</span> <span className="font-bold text-slate-800">₹20,000</span></div>
                                    <div className="flex justify-between"><span>Group Insurance & Charges:</span> <span className="font-bold text-slate-800">₹100</span></div>
                                </div>
                            </div>
                        </div>

                        {/* Additional info notice */}
                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
                            <strong>Official Payment Guidelines:</strong> Annual fees can be paid online via Net Banking, Debit/Credit Card, UPI through the Octopod link above, or via Demand Draft favoring <em>"Maharaja Surajmal Institute of Technology"</em> payable at New Delhi.
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: GENERATE RECEIPT */}
            {currentTab === 'receipt' && (
                <div>
                    {!viewingReceipt ? (
                        <div className="bg-slate-50/50 rounded-3xl border border-slate-200/60 p-6 md:p-10 shadow-xs transition-all duration-300 print:hidden">
                            <div className="flex items-center gap-2 mb-6">
                                <Receipt className="w-5 h-5 text-primary" />
                                <h3 className="text-xl font-bold text-slate-900">Receipt Lookup</h3>
                            </div>
                            <p className="text-sm text-slate-500 font-light mb-6">
                                Enter your 11-digit University Enrollment Number to search for your payment receipts. 
                                (Tip: Use <strong>00115002720</strong> or <strong>00215002720</strong> for sample loaded historical receipts).
                            </p>

                            <form onSubmit={handleReceiptSearch} className="flex gap-4 mb-8">
                                <input 
                                    type="text" 
                                    required
                                    value={receiptSearchNo}
                                    onChange={e => setReceiptSearchNo(e.target.value)}
                                    placeholder="Enter Enrollment Number (e.g. 00115002720)"
                                    className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 bg-white text-slate-800 text-sm font-medium"
                                />
                                <button 
                                    type="submit" 
                                    className="bg-primary hover:bg-primary-dark text-white font-bold px-6 rounded-xl transition-all shadow-md text-xs sm:text-sm cursor-pointer"
                                >
                                    Search Receipts
                                </button>
                            </form>

                            {receiptResults && (
                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Recent Transactions found ({receiptResults.length})</h4>
                                    
                                    {receiptResults.length === 0 ? (
                                        <div className="p-8 text-center text-slate-500 font-light border-2 border-dashed border-slate-200 rounded-2xl">
                                            No payment transactions found for this Enrollment Number. Make a payment in the "Pay Tuition Fees" tab first.
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 gap-3">
                                            {receiptResults.map((receipt, index) => (
                                                <div 
                                                    key={index} 
                                                    className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between hover:border-primary/20 hover:shadow-xs transition-all"
                                                >
                                                    <div className="space-y-1">
                                                        <div className="text-xs font-bold text-slate-900">{receipt.type} ({receipt.term || "Annual"})</div>
                                                        <div className="text-[10px] text-slate-400 font-medium">Date: {receipt.date} | Ref: {receipt.id}</div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-sm font-bold text-primary">₹{receipt.amount.toLocaleString('en-IN')}</span>
                                                        <button 
                                                            type="button"
                                                            onClick={() => setViewingReceipt(receipt)}
                                                            className="px-3.5 py-2 bg-slate-100 hover:bg-primary/5 hover:text-primary text-slate-700 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                                                        >
                                                            View Receipt
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        /* OFFICIAL DETAILED RECEIPT MOCKUP */
                        <div>
                            {/* Back and actions controls bar - HIDDEN IN PRINT */}
                            <div className="flex justify-between items-center mb-6 print:hidden">
                                <button 
                                    type="button"
                                    onClick={() => setViewingReceipt(null)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs transition-colors cursor-pointer"
                                >
                                    <ArrowLeft className="w-3.5 h-3.5" /> Back to List
                                </button>
                                
                                <div className="flex gap-2">
                                    <button 
                                        type="button"
                                        onClick={triggerPrint}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                                    >
                                        <Printer className="w-4 h-4" /> Print / Save PDF
                                    </button>
                                </div>
                            </div>

                            {/* PRINT CONTAINER WITH SPECIAL CLASS FOR CUSTOM CSS OVERRIDE */}
                            <div className="bg-white border-2 border-slate-200 p-8 sm:p-12 rounded-3xl shadow-md font-sans text-slate-800 relative overflow-hidden print:border-0 print:p-0 print:shadow-none ">
                                {/* MSIT Digital Watermark / Seal in BG */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none w-96 h-96 border-[20px] border-slate-900 rounded-full flex items-center justify-center font-bold text-3xl tracking-widest">
                                    MSIT NEW DELHI
                                </div>

                                {/* RECEIPT HEADER */}
                                <div className="flex flex-col md:flex-row justify-between items-center md:items-start border-b-2 border-slate-200 pb-8 gap-6 text-center md:text-left">
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">MAHARAJA SURAJMAL INSTITUTE OF TECHNOLOGY</h2>
                                        <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">Affiliated to GGSIPU | Approved by AICTE | NBA Accredited</p>
                                        <p className="text-xs text-slate-500 font-light mt-1.5">C-4, Janakpuri, New Delhi - 110058</p>
                                        <p className="text-xs text-slate-500 font-light">Email: accounts@msit.in | Web: www.msit.in</p>
                                    </div>
                                    <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 flex flex-col items-center justify-center shrink-0 min-w-[160px]">
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Transaction Status</span>
                                        <span className="px-2.5 py-0.5 mt-1 bg-primary/10 text-primary font-bold rounded text-[10px] uppercase tracking-wider border border-primary/20 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> {viewingReceipt.status}
                                        </span>
                                    </div>
                                </div>

                                {/* RECEIPT DETAILS GRID */}
                                <div className="my-8">
                                    <div className="text-center font-bold text-base tracking-wider text-slate-900 bg-slate-50 py-2 border-y border-slate-200 mb-6 uppercase">
                                        Fee Payment Receipt
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-xs">
                                        <div className="flex justify-between border-b border-slate-100 py-1.5">
                                            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Enrollment Number:</span>
                                            <strong className="text-slate-800 font-bold">{viewingReceipt.enrollmentNo}</strong>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-100 py-1.5">
                                            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Receipt Reference:</span>
                                            <strong className="text-slate-800 font-mono font-bold">{viewingReceipt.id}</strong>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-100 py-1.5">
                                            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Student Name:</span>
                                            <strong className="text-slate-800 font-bold">{viewingReceipt.studentName || 'Student Demo'}</strong>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-100 py-1.5">
                                            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Transaction Date:</span>
                                            <strong className="text-slate-800 font-bold">{viewingReceipt.date}</strong>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-100 py-1.5">
                                            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Course / Branch:</span>
                                            <strong className="text-slate-800 font-bold">{viewingReceipt.department || 'Computer Science & Engineering'}</strong>
                                        </div>
                                        <div className="flex justify-between border-b border-slate-100 py-1.5">
                                            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Payment Method:</span>
                                            <strong className="text-slate-800 font-bold">{viewingReceipt.paymentMethod || 'UPI/ONLINE'}</strong>
                                        </div>
                                    </div>
                                </div>

                                {/* ITEMIZED BILLING TABLE */}
                                <table className="w-full my-8 text-xs text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-100 text-slate-700 uppercase text-[9px] tracking-wider font-bold">
                                            <th className="p-3 rounded-l">#</th>
                                            <th className="p-3">Particulars / Description</th>
                                            <th className="p-3 rounded-r text-right">Amount (INR)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200">
                                        <tr>
                                            <td className="p-3 font-medium">1</td>
                                            <td className="p-3">
                                                <div className="font-bold text-slate-800">{viewingReceipt.type} ({viewingReceipt.term || 'Semester Fee'})</div>
                                                <div className="text-[10px] text-slate-400 font-light mt-0.5">Academic session 2026-27 admission/tuition charges.</div>
                                            </td>
                                            <td className="p-3 text-right font-bold text-slate-800">₹{(viewingReceipt.amount - 5000).toLocaleString('en-IN')}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-medium">2</td>
                                            <td className="p-3">
                                                <div className="font-bold text-slate-800">University Examination & Library Charges</div>
                                                <div className="text-[10px] text-slate-400 font-light mt-0.5">Annual GGSIPU registration and digital content subscription.</div>
                                            </td>
                                            <td className="p-3 text-right font-bold text-slate-800">₹5,000</td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr className="border-t-2 border-slate-300 font-bold bg-slate-50">
                                            <td colSpan="2" className="p-3 text-right font-bold uppercase text-[10px] tracking-wider text-slate-500">Grand Total Paid:</td>
                                            <td className="p-3 text-right font-bold text-sm text-primary">₹{viewingReceipt.amount.toLocaleString('en-IN')}</td>
                                        </tr>
                                    </tfoot>
                                </table>

                                {/* TERMS & AUTH SIGNATURE */}
                                <div className="mt-12 flex flex-col md:flex-row justify-between items-stretch md:items-end gap-8 pt-8 border-t border-slate-200">
                                    <div className="max-w-md text-[10px] text-slate-400 font-light leading-relaxed">
                                        <span className="font-bold uppercase tracking-wider text-[9px] text-slate-500 block mb-1">Important Terms:</span>
                                        - This is a system-generated digital fee receipt and does not require a physical signature.<br />
                                        - Subject to realization of funds. False payment notifications will lead to cancellation of registration.<br />
                                        - Refer to the GGSIPU Admissions handbook for refund policy schedules.
                                    </div>
                                    <div className="text-center self-center md:self-end">
                                        <div className="w-32 h-10 border-b border-slate-400 flex items-center justify-center mx-auto mb-2 text-slate-400 italic text-xs select-none">
                                            Digitally Verified
                                        </div>
                                        <div className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Accounts Officer</div>
                                        <div className="text-[8px] text-slate-400 font-light mt-0.5">MSIT Accounts Division</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* TAB 3: REFUND POLICY */}
            {currentTab === 'refund' && (
                <div className="bg-slate-50/50 rounded-3xl border border-slate-200/60 p-6 md:p-10 shadow-xs transition-all duration-300 print:hidden">
                    <div className="flex items-center gap-2 mb-6">
                        <RefreshCw className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-bold text-slate-900">Fee Refund Guidelines</h3>
                    </div>

                    <p className="text-sm text-slate-500 font-light mb-8">
                        The Maharaja Surajmal Institute of Technology follows the official refund schedule aligned with the <strong>Guru Gobind Singh Indraprastha University (GGSIPU)</strong> and <strong>AICTE</strong> guidelines. Refund requests must be formally submitted via the Registrar's Office.
                    </p>

                    {/* REFUND GRID TABLE */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Refund Calculation Scale</h4>
                        
                        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
                            <div className="grid grid-cols-3 bg-slate-100 text-slate-700 font-bold p-4 text-xs uppercase tracking-wider">
                                <div className="col-span-2">Deduction Criteria</div>
                                <div className="text-right">Refund Amount</div>
                            </div>
                            
                            <div className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                                <div className="grid grid-cols-3 p-4 hover:bg-slate-50 transition-colors">
                                    <div className="col-span-2 pr-4 font-semibold text-slate-800">
                                        Withdrawal request received 15 days or more before the formally-notified last date of admission.
                                    </div>
                                    <div className="text-right font-bold text-primary self-center">100% Refund*</div>
                                </div>
                                
                                <div className="grid grid-cols-3 p-4 hover:bg-slate-50 transition-colors">
                                    <div className="col-span-2 pr-4 font-semibold text-slate-800">
                                        Withdrawal request received less than 15 days before the formally-notified last date of admission.
                                    </div>
                                    <div className="text-right font-bold text-primary self-center">90% Refund</div>
                                </div>
                                
                                <div className="grid grid-cols-3 p-4 hover:bg-slate-50 transition-colors">
                                    <div className="col-span-2 pr-4 font-semibold text-slate-800">
                                        Withdrawal request received 15 days or less after the formally-notified last date of admission.
                                    </div>
                                    <div className="text-right font-bold text-primary self-center">80% Refund</div>
                                </div>
                                
                                <div className="grid grid-cols-3 p-4 hover:bg-slate-50 transition-colors">
                                    <div className="col-span-2 pr-4 font-semibold text-slate-800">
                                        Withdrawal request received more than 15 days but less than 30 days after the formally-notified last date of admission.
                                    </div>
                                    <div className="text-right font-bold text-slate-600 self-center">50% Refund</div>
                                </div>
                                
                                <div className="grid grid-cols-3 p-4 hover:bg-slate-50 transition-colors">
                                    <div className="col-span-2 pr-4 font-semibold text-slate-800">
                                        Withdrawal request received more than 30 days after the formally-notified last date of admission.
                                    </div>
                                    <div className="text-right font-bold text-slate-500 self-center">No Refund</div>
                                </div>
                            </div>
                        </div>

                        <p className="text-[10px] text-slate-400 font-light leading-relaxed">
                            * 100% refund is subject to a deduction of an administrative processing charge of maximum ₹1,000. Refund percentages are calculated on the basis of the tuition and university fees component, excluding caution security deposits (which are fully refundable).
                        </p>

                        <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200 mt-6 space-y-4">
                            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">How to Apply for Fee Refund?</h4>
                            <ol className="list-decimal list-inside space-y-2 text-xs text-slate-600 font-light">
                                <li>Collect the official <strong>Admission Withdrawal & Refund Form</strong> from the administrative Registrar Desk.</li>
                                <li>Attach the original <strong>Allotment Letter</strong> (issued by GGSIPU Counselling) and the original <strong>Fee Payment Receipt</strong>.</li>
                                <li>Submit a cancelled cheque or bank passbook copy for the bank account where the refunded amount should be credited.</li>
                                <li>Obtain a formal stamped acknowledgement slip from the Registrar desk upon submission. Refunds are typically processed and disbursed within 21 working days.</li>
                            </ol>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeePaymentPortal;
