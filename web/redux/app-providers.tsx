"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ReduxProvider } from "./provider";

const queryClient: QueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
			gcTime: 1000 * 60 * 60 * 24,
		},
	},
});

export default function AppProviders({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<QueryClientProvider client={queryClient}>
			<ReduxProvider>{children}</ReduxProvider>
		</QueryClientProvider>
	);
}
