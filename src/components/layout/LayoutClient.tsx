'use client';

import { ReactNode } from 'react';
import SmoothScroll from '@/components/layout/SmoothScroll';
import Cursor from '@/components/ui/Cursor';
import Header from '@/components/layout/Header';
import PageTransition from '@/components/transitions/PageTransition';
import LoadingScreen from '@/components/ui/LoadingScreen';

export default function LayoutClient({ children }: { children: ReactNode }) {
    return (
        <SmoothScroll>
            <LoadingScreen />
            <Cursor />
            <Header />
            <PageTransition>
                <main>{children}</main>
            </PageTransition>
        </SmoothScroll>
    );
}
