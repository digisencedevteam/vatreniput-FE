// src/components/QRScanner.tsx
import React, { useState } from 'react';
import QrReader from 'react-qr-reader';


const QRScanner: React.FC = () => {
    const handleScan = (data: string | null) => {
        if (data) {
            window.open(data, '_blank');  // This will open the scanned URL in a new tab
        }
    };

    const handleError = (err: any) => {
        console.error(err);
    };

    return (
        <div>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
            />
        </div>
    );
};

export default QRScanner;