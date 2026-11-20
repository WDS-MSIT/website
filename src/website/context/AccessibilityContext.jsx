/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const useAccessibility = () => {
    const context = useContext(AccessibilityContext);
    if (!context) {
        throw new Error('useAccessibility must be used within an AccessibilityProvider');
    }
    return context;
};

export const AccessibilityProvider = ({ children }) => {
    // Initial state from localStorage or defaults
    const [settings, setSettings] = useState(() => {
        if (typeof window === 'undefined') {
            return {
                focusHighlight: true,
                highContrast: false,
                reducedMotion: false,
                textScaling: 100
            };
        }
        try {
            const saved = localStorage.getItem('msit-accessibility-settings');
            return saved ? JSON.parse(saved) : {
                focusHighlight: true,
                highContrast: false,
                reducedMotion: false,
                textScaling: 100 // Percentage
            };
        } catch {
            return {
                focusHighlight: true,
                highContrast: false,
                reducedMotion: false,
                textScaling: 100
            };
        }
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Persist settings to localStorage and apply classes to html element
    useEffect(() => {
        if (typeof window === 'undefined') return;
        try {
            localStorage.setItem('msit-accessibility-settings', JSON.stringify(settings));
        } catch {
            // Ignore quota or private browsing errors
        }
        
        const root = document.documentElement;
        
        // Ensure no lingering dark mode classes exist
        root.classList.remove('acc-dark-mode', 'dark');
        
        // Apply classes
        if (settings.focusHighlight) root.classList.add('acc-focus-ring');
        else root.classList.remove('acc-focus-ring');
        
        if (settings.highContrast) root.classList.add('acc-high-contrast');
        else root.classList.remove('acc-high-contrast');
        
        if (settings.reducedMotion) root.classList.add('acc-reduced-motion');
        else root.classList.remove('acc-reduced-motion');
        
        // Handle text scaling (relative to the responsive base size in index.css)
        root.style.fontSize = settings.textScaling === 100 ? '' : `calc(var(--base-font-size) * ${settings.textScaling / 100})`;
        
    }, [settings]);

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const setTextScaling = (value) => {
        setSettings(prev => ({ ...prev, textScaling: value }));
    };

    return (
        <AccessibilityContext.Provider value={{ 
            settings, 
            toggleSetting, 
            setTextScaling, 
            isModalOpen, 
            setIsModalOpen 
        }}>
            {children}
        </AccessibilityContext.Provider>
    );
};
