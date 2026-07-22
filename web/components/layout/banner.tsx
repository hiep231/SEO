import Link from "next/link";

import { Locale } from "@repo/types";

import { getDictionary } from "@/lib/dictionaries";
import { localizePath } from "@/lib/i18n";

export default async function Banner({ locale }: { locale: Locale }) {
	const dictionary = await getDictionary(locale);

	return (
		<div className="h-8 md:h-9 text-xs md:text-sm flex justify-center items-center gap-x-1 text-center text-white bg-primary leading-none">
			{dictionary.layout.banner}
			<Link className="underline font-medium" href={localizePath("/signup", locale)}>
				{dictionary.layout.signup}
			</Link>
		</div>
	);
}
