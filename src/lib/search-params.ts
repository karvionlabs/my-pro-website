import { parseAsInteger, parseAsString, parseAsStringEnum } from "nuqs";

/**
 * Standard URL state parsers via nuqs for query-driven routing and telemetry filtering
 */
export const searchParamsCache = {
	category: parseAsString.withDefault("all"),
	page: parseAsInteger.withDefault(1),
	view: parseAsStringEnum(["grid", "list"]).withDefault("grid"),
	status: parseAsStringEnum(["new", "contacted", "closed"]).withDefault("new"),
};
