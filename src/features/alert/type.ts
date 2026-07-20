import type { AlertType } from "@/shared/types/types"

export interface AlertState {
	visible: boolean,
	isTemporary?: boolean,
	state: AlertType,
	header: string,
	description: string,
	buttons?: string[],
	cross?: boolean,
	onNo?: ()=>void,
	onOk?: ()=>void,
	onCross?: ()=>void
}

export type AlertOptions = Omit<AlertState, 'visible'>
