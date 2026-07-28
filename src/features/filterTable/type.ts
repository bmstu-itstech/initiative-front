export type TableRowType = Record<string, unknown>;
export type TableType = TableRowType[];

export type TableRowContentType =
	| 'text'
	| 'date'
	| 'number'
	| 'except';
export type TableMapperType = Record<keyof TableRowType, TableRowContentType>
