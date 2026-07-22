import "server-only";

import { Locale } from "@repo/types";

import { Dictionary } from "@/types/i18n.type";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
	en: () => import("../dictionaries/en.json").then((module) => module.default),
	vi: () => import("../dictionaries/vi.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
