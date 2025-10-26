import type { Metadata } from 'next';

import { geistMono, geistSans } from './utils/fonts';
import { Provider } from '@/components/ui/provider';

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
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
