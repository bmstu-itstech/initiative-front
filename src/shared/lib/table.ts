type TableRow = Record<string, unknown>;
type TableObject = Record<string, TableRow>

export type ObjectSizeResult = {
	rows: number,
	columns: number,
	columnsName: string[],
	normData: TableObject
}

export function getObjectSize(data: TableObject): ObjectSizeResult{
	const entries = Object.entries(data)

	let buffer = new Set<string>();

    entries.forEach(([, row])=>Object.keys(row).forEach((column)=>buffer.add(column)));
    let columnsName = Array.from(buffer);

    let normData:TableObject = {};
    entries.forEach(([rowName, row])=>{
        normData[rowName] = {};
		const normalizedRow: TableRow = {};
        columnsName.forEach((column)=>
            normalizedRow[column] = (Object.prototype.hasOwnProperty.call(row, column))
                ? row[column]
                : null
		)
		normData[rowName] = normalizedRow;
	});

	return {
	    rows: entries.length,
	    columns: columnsName.length,
	    columnsName,
	    normData
	}
}
