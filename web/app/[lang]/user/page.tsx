"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";

import { User } from "@repo/types";

import { usersService } from "@/services/users-service";

import UserProfile from "./user-profile";

function UserPageContent() {
	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!id) {
			setLoading(false);
			return;
		}

		async function fetchData() {
			try {
				const data = await usersService.getPublicById(id as string);
				setUser(data);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}

		fetchData();
	}, [id]);

	if (loading) {
		return <div className="text-center py-12">Loading...</div>;
	}

	if (!user) {
		notFound();
	}

	return <UserProfile user={user} />;
}

export default function Page() {
	return (
		<Suspense>
			<UserPageContent />
		</Suspense>
	);
}
