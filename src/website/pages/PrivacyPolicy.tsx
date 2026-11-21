import SEO from '../components/SEO';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

const PrivacyPolicy = () => {
    return (
        <main className="min-h-screen bg-white transition-colors duration-300">
            <SEO 
                title="Privacy Policy" 
                description="Read the official Privacy Policy of Maharaja Surajmal Institute of Technology (MSIT). Learn how we protect student data and user privacy." 
                canonicalPath="/privacy"
            />
            <PageHero 
                title="Privacy &" 
                accentTitle="Data Protection" 
                description="Maharaja Surajmal Institute of Technology is committed to protecting the personal data of our students, faculty, and website visitors."
                breadcrumbs={[{ label: 'MSIT' }, { label: 'Privacy Policy' }]}
            />
            
            <div className="max-w-4xl mx-auto px-6 py-12">

                    <div className="p-8 md:p-12 space-y-10 prose prose-slate max-w-none">
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                                <Eye className="w-6 h-6 mr-3 text-blue-600" /> 1. Introduction
                            </h2>
                            <p className="text-slate-600 leading-relaxed font-light">
                                Welcome to Maharaja Surajmal Institute of Technology (MSIT). We respect your privacy and are committed to protecting the personal data of our students, faculty, staff, and website visitors. This Privacy Policy outlines how we collect, use, and safeguard your information when you interact with our digital platforms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                                <Lock className="w-6 h-6 mr-3 text-blue-600" /> 2. Information We Collect
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                    <h3 className="font-bold text-slate-800 mb-2">Personal Data</h3>
                                    <p className="text-base text-slate-600">While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you, including names, email addresses, and phone numbers via admission forms or inquiries.</p>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                    <h3 className="font-bold text-slate-800 mb-2">Usage Data</h3>
                                    <p className="text-base text-slate-600">Usage Data is collected automatically when using the Service. This may include your device's IP address, browser type, page visit duration, and other diagnostic data to improve site performance.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                                <Shield className="w-6 h-6 mr-3 text-blue-600" /> 3. How We Use Your Data
                            </h2>
                            <ul className="list-disc pl-6 space-y-3 text-slate-600 font-light">
                                <li><strong className="text-slate-900">To provide and maintain our Service:</strong> Including to monitor the usage of our Service.</li>
                                <li><strong className="text-slate-900">To manage Your Account:</strong> To manage Your registration as a user of the Service and student portal.</li>
                                <li><strong className="text-slate-900">For academic purposes:</strong> Processing admissions, maintaining academic records, and facilitating examinations.</li>
                                <li><strong className="text-slate-900">To contact You:</strong> By email, telephone calls, SMS, or other equivalent forms of electronic communication regarding updates or informative communications related to campus events and placements.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                                <FileText className="w-6 h-6 mr-3 text-blue-600" /> 4. Data Security
                            </h2>
                            <p className="text-slate-600 leading-relaxed font-light">
                                The security of Your Personal Data is important to Us. We implement enterprise-grade security measures to prevent unauthorized access, disclosure, or modification of student records. However, no method of transmission over the Internet is 100% secure, and we strive to use commercially acceptable means to protect Your Personal Data.
                            </p>
                        </section>

                        <section className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
                            <h2 className="text-xl font-bold text-blue-900 mb-2">5. Contact Us</h2>
                            <p className="text-blue-900 text-base mb-4 font-medium">If you have any questions about this Privacy Policy, You can contact us:</p>
                            <ul className="text-base text-blue-900 space-y-2">
                                <li><strong className="text-blue-950">Email:</strong> privacy@msit.in</li>
                                <li><strong className="text-blue-950">Address:</strong> Maharaja Surajmal Institute of Technology, C-4, Janakpuri, New Delhi</li>
                            </ul>
                        </section>
                </div>
            </div>
        </main>
    );
};

export default PrivacyPolicy;
