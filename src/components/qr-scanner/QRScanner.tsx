// src/components/QRScanner.tsx
import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';


const QRScanner: React.FC = () => {
    const [result, setResult] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleScan = (data: string | null) => {
        if (data) {
            navigate('card/' + data);  // Navigate to the scanned URL
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
            <p>{result}</p>
        </div>
    );
};

export default QRScanner;