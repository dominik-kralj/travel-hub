import type { Metadata } from 'next';

import { geistMono, geistSans } from './utils/fonts';
import { Providers } from './Providers';

export const metadata: Metadata = {
    title: 'Travel Hub',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
