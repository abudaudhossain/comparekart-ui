// hooks/useFingerprint.ts
import { useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export function useFingerprint() {
    const [fingerprint, setFingerprint] = useState<string | null>(null);

    useEffect(() => {
        async function loadFingerprint() {
            const fp = await FingerprintJS.load();
            const result = await fp.get();
            setFingerprint(result.visitorId);
        }

        loadFingerprint();
    }, []);

    return fingerprint;
}
