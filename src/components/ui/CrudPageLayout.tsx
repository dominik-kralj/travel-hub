import { Box, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";
import BackButton from "./BackButton";

type CrudPageLayoutProps = {
	title: string;
	actions?: ReactNode;
	children: ReactNode;
};

export function CrudPageLayout({
	title,
	actions,
	children,
}: CrudPageLayoutProps) {
	return (
		<Box p={6}>
			<Box
				bg="gray.50"
				borderRadius="lg"
				borderWidth="1px"
				p={4}
				mb={6}
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				boxShadow="sm"
			>
				<BackButton />

				<Heading size="lg" color="blue.700" letterSpacing="tight">
					{title}
				</Heading>

				{actions}
			</Box>

			{children}
		</Box>
	);
}
