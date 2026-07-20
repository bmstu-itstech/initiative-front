export function getArrayYear(amount: number): string[]{
	let res: string[] = [];
	let year: number = Number(new Date().getFullYear());
	for(let i=0;i<amount;i++)
		res.push(String(year - i));
	return res;
}

export function getArrayDays(year: number, month: number): string[] {
	let res: string[] = [];
	let amount = new Date(year, month+1, 0).getDate();
	for(let i=1;i<=amount;i++)
		res.push(String(i));
	return res;
}
