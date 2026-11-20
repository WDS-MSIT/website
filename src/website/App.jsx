import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { TransitionProvider, SuspenseFallbackHandler } from './context/TransitionContext';
import PageTransitionLoader from './components/PageTransitionLoader';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Placements = lazy(() => import('./pages/Placements'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const AcademicCalendar = lazy(() => import('./pages/AcademicCalendar'));
const Syllabus = lazy(() => import('./pages/Syllabus'));
const TimeTable = lazy(() => import('./pages/TimeTable'));
const Brochure = lazy(() => import('./pages/Brochure'));
const DynamicPage = lazy(() => import('./pages/DynamicPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ServerError = lazy(() => import('./pages/ServerError'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'));
const Facilities = lazy(() => import('./pages/Facilities'));
const FacultyStaff = lazy(() => import('./pages/FacultyStaff'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const VirtualTour = lazy(() => import('./pages/VirtualTour'));
const NewsDetail = lazy(() => import('./pages/NewsDetail'));
const Team = lazy(() => import('./pages/Team'));

const App = () => {
    return (
        <AccessibilityProvider>
            <Router>
                <TransitionProvider>
                    <Suspense fallback={<SuspenseFallbackHandler message="Loading MSIT..." />}>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route path="/search" element={<SearchPage />} />
                                <Route path="/placements" element={<Placements />} />
                                <Route path="/virtual-tour" element={<VirtualTour />} />
                                <Route path="/gallery" element={<VirtualTour />} />
                                <Route path="/news-event/:id" element={<NewsDetail />} />
                                <Route path="/team" element={<Team />} />
                                <Route path="/academic-calendar" element={<AcademicCalendar />} />
                                <Route path="/syllabus" element={<Syllabus />} />
                                <Route path="/timetable" element={<TimeTable />} />
                                <Route path="/brochure" element={<Brochure />} />
                                <Route path="/privacy" element={<PrivacyPolicy />} />
                                <Route path="/terms" element={<TermsOfUse />} />
                                <Route path="/facilities" element={<Facilities />} />
                                <Route path="/faculty" element={<FacultyStaff />} />
                                <Route path="/sitemap" element={<Sitemap />} />
                                <Route path="/500" element={<ServerError />} />
                                <Route path="/:slug" element={<DynamicPage />} />
                                <Route path="*" element={<NotFound />} />
                            </Route>
                        </Routes>
                    </Suspense>
                </TransitionProvider>
            </Router>
        </AccessibilityProvider>
    );
};

export default App;
