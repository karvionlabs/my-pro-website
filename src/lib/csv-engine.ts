import Papa from "papaparse";

/**
 * Serialize an array of records to a CSV string.
 */
export function exportToCsv<T extends Record<string, unknown>>(
	data: T[],
): string {
	if (!data || data.length === 0) {
		return "";
	}
	return Papa.unparse(data, {
		header: true,
		skipEmptyLines: true,
	});
}

/**
 * Parse a CSV string into strongly typed JavaScript objects.
 */
export function parseCsvData<T = Record<string, string>>(
	csvString: string,
): T[] {
	if (!csvString?.trim()) {
		return [];
	}
	const result = Papa.parse<T>(csvString, {
		header: true,
		skipEmptyLines: true,
		dynamicTyping: false,
	});
	return result.data;
}
