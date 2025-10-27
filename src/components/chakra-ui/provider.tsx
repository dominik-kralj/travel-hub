'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ReactNode, useEffect, useState } from 'react';

export function Provider({ children }: { children: ReactNode }) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}
