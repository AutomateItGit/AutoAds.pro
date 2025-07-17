import React from 'react';
import { headers } from 'next/headers';

// Client components for interactive features
import ClientHeader from './ClientHeader';

export default async function Header({params} : {params : Promise<{lang : "fr" | "en"}>}) {
    const {lang} = await params;
    
    // Get user session info from headers (you might need to adjust this based on your auth setup)
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || '';
    const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent);
    
    return (
        <ClientHeader 
            isMobile={isMobile}
        />
    );
}