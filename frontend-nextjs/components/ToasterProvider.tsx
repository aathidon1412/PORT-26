'use client';

import { Toaster } from 'react-hot-toast';

export default function ToasterProvider() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 6000,
                style: {
                    background: '#1e1b4b',
                    color: '#e2e8f0',
                    border: '1px solid rgba(139,92,246,0.4)',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    fontSize: '14px',
                    maxWidth: '420px',
                    boxShadow: '0 8px 32px rgba(139,92,246,0.25)',
                },
                success: {
                    iconTheme: {
                        primary: '#a78bfa',
                        secondary: '#1e1b4b',
                    },
                },
                error: {
                    iconTheme: {
                        primary: '#f87171',
                        secondary: '#1e1b4b',
                    },
                },
            }}
        />
    );
}
