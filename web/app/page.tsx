import { Metadata } from "next";
import { redirect } from "next/navigation";

import config from "@/lib/config";

export const metadata: Metadata = {
	alternates: {
		canonical: config.clientUrl,
	},
};

export default function RootPage() {
	redirect("/en");
}
