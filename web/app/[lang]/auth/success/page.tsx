"use client";

import { Suspense, useEffect } from "react";

import { useSearchParams } from "next/navigation";

import { Container } from "@/components/common/container";

import { useAuth } from "@/hooks/use-auth";

function SuccessPageContent() {
	const searchParams = useSearchParams();

	const { googleAuth } = useAuth();

	useEffect(() => {
		const token = searchParams.get("token");

		if (token) {
			googleAuth(token);
		}
	}, [searchParams, googleAuth]);

	return (
		<Container>
			<p>Logging you in...</p>
		</Container>
	);
}

export default function Page() {
	return (
		<Suspense>
			<SuccessPageContent />
		</Suspense>
	);
}
