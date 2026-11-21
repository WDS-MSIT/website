import React from 'react';
import { Link } from 'react-router-dom';
import { Home, RefreshCcw, AlertTriangle, Mail, Phone, LifeBuoy } from 'lucide-react';
import SEO from '../components/SEO';

const ServerError = () => {
    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-b from-white to-red-50/30 transition-colors duration-300">
            <SEO 
                title="500 Server Error" 
                description="The Maharaja Surajmal Institute of Technology server encountered an internal error. We are working to resolve it. Contact support if the issue persists." 
            />
            <div className="max-w-3xl w-full text-center">
                {/* Visual Header */}
                <div className="relative mb-12">
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                        <span className="text-giant md:text-mega font-black text-red-900">500</span>
                    </div>
                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-red-600 shadow-card shadow-red-600/20 mb-8 transform hover:-rotate-12 transition-transform duration-500">
                            <AlertTriangle className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-7xl font-bold text-slate-900 tracking-tight">
                            Something went <span className="text-red-500 font-medium italic">wrong.</span>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-lg mx-auto leading-relaxed">
                            Our servers at Maharaja Surajmal Institute of Technology are having a bit of a moment. We're already on it, but feel free to try again or reach out to us.
                        </p>
                    </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                    <button 
                        onClick={handleRetry}
                        className="group w-full sm:w-auto px-10 py-4 md:py-5 bg-red-600 text-white rounded-2xl font-bold shadow-card shadow-red-600/10 hover:shadow-card-hover hover:shadow-red-600/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 cursor-pointer"
                    >
                        <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                        Try Again
                    </button>
                    <Link 
                        to="/" 
                        className="w-full sm:w-auto px-10 py-4 md:py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-bold hover:border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
                    >
                        <Home className="w-5 h-5" />
                        Back to Home
                    </Link>
                </div>

                {/* Support Contact */}
                <div className="max-w-2xl mx-auto p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-card shadow-slate-900/5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                            <LifeBuoy className="w-5 h-5 text-slate-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Technical Support</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <a href="mailto:director@msit.in" className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
                            <div className="mt-1 w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                <Mail className="w-5 h-5 text-blue-600 group-hover:text-white" />
                            </div>
                            <div>
                                <p className="text-base font-medium text-slate-500">Email us at</p>
                                <p className="font-bold text-slate-900">director@msit.in</p>
                            </div>
                        </a>
                        
                        <a href="tel:01145037193" className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
                            <div className="mt-1 w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                                <Phone className="w-5 h-5 text-emerald-600 group-hover:text-white" />
                            </div>
                            <div>
                                <p className="text-base font-medium text-slate-500">Call support</p>
                                <p className="font-bold text-slate-900">011-45037193</p>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="mt-20 opacity-50">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
                        Error Code: 500_INTERNAL_SERVER_ERROR
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ServerError;
