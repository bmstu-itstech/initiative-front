import { reactive } from "vue";
import type { AlertOptions, AlertState } from "./type";
import { ANIM_DUR_CONFIG, TEMP_DUR_CONFIG, DEFAULT_STATE_ALERT_CONFIG } from "./config";

export const alertState = reactive<AlertState>(
	{
		...DEFAULT_STATE_ALERT_CONFIG,
		onCross: ()=>{alertState.visible = false;}
	}
);

let closingTimer: ReturnType<typeof setTimeout> | undefined;
let hidingTimer: ReturnType<typeof setTimeout> | undefined;

function clearTimers() {
	clearTimeout(closingTimer);
	clearTimeout(hidingTimer);
}

export function showAlert(options: AlertOptions, isTemporary: boolean = false) {
	clearTimers();
	reset();

	Object.assign(alertState, options);

	alertState.visible = true;
	alertState.isTemporary = false;

	closingTimer = setTimeout(()=>alertState.isTemporary = isTemporary, TEMP_DUR_CONFIG-ANIM_DUR_CONFIG)

	if(isTemporary)
		hidingTimer = setTimeout(()=>hideAlert(), TEMP_DUR_CONFIG);
}

export function hideAlert(): void {
	clearTimers();
	reset();
}

function reset(): void {
	Object.assign(alertState, structuredClone(DEFAULT_STATE_ALERT_CONFIG));
	alertState.onCross = ()=>hideAlert();
}
