type TableRow = Record<string, unknown>;
type TableData = TableRow[];

export type ObjectSizeResult = {
	rows: number;
	columns: number;
	columnsName: string[];
	normData: TableData;
};

export function getObjectSize(data: TableData): ObjectSizeResult {
	const columnsBuffer = new Set<string>();

	for (const row of data) {
		for (const column of Object.keys(row)) {
			columnsBuffer.add(column);
		}
	}

	const columnsName = Array.from(columnsBuffer);

	const normData = data.map((row) => {
		const normalizedRow: TableRow = {};

		for (const column of columnsName) {
			normalizedRow[column] =
				Object.prototype.hasOwnProperty.call(row, column)
					? row[column]
					: null;
		}

		return normalizedRow;
	});

	return {
		rows: data.length,
		columns: columnsName.length,
		columnsName,
		normData
	};
}
