import { Flex, Icon, Text, LinkBox, LinkOverlay } from '@chakra-ui/react';
import Link from 'next/link';

import { IconType } from 'react-icons/lib';

type FeatureCardProps = {
	icon: IconType;
	title: string;
	href: string;
};

export function FeatureCard({ icon, title, href }: FeatureCardProps) {
	return (
		<LinkBox
			as="article"
			bg="gray.50"
			borderRadius="lg"
			p={6}
			boxShadow="md"
			minW="200px"
			cursor="pointer"
			transition="all 0.2s"
			_hover={{
				boxShadow: 'lg',
				bg: 'gray.100',
			}}
		>
			<LinkOverlay as={Link} href={href}>
				<Flex direction="column" align="center">
					<Icon as={icon} boxSize={10} color="blue.400" mb={4} />

					<Text fontWeight="bold">{title}</Text>
				</Flex>
			</LinkOverlay>
		</LinkBox>
	);
}
