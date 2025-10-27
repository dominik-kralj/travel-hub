'use client';

import { ReactNode } from 'react';
import { SWRConfig } from 'swr';
import { Provider } from '@/components/chakra-ui/provider';
import { fetcher } from '@/lib/fetcher';

export function Providers({ children }: { children: ReactNode }) {
	return (
		<SWRConfig
			value={{
				fetcher,
				refreshInterval: 0,
				revalidateOnFocus: false,
			}}
		>
			<Provider>{children}</Provider>
		</SWRConfig>
	);
}
