import { useEffect, useState } from 'react';

export const useBeforeUnload = (shouldPrompt: boolean) => {
    const [showCustomDialog, setShowCustomDialog] = useState(false);

    useEffect(() => {
        const handleBeforeUnload = (event: any) => {
            if (shouldPrompt && !showCustomDialog) {
                event.preventDefault();
                event.returnValue =
                    'Nakon izlaska kviz više nije dostupan, jeste li sigurni da želite izaći?';
                setShowCustomDialog(true);
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [shouldPrompt, showCustomDialog]);

    return showCustomDialog;
};
