

import QrReader from 'react-qr-reader';


const QRScanner = () => {
    const handleScan = (data: string | null) => {
        if (data) {
            window.open(data, '_blank');
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