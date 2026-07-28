import { ref } from "vue";
import type { AlertOptions } from "../alert/type";
import type { EventTableType } from "@/entities/Event/type";
import { ApiError } from "@/shared/api/type";
import { ERROR_ALERT, UNKNOWN_ERROR } from "../alert/config";
import { EVENTS_TABLE_MOCK } from "@/entities/Event/mock";

export function useEventsTable() {
	const isLoading = ref<boolean>(false);
	const errorAlert = ref<AlertOptions | null>(null);
	const data = ref<EventTableType>([]);

	async function load(): Promise<void> {
		isLoading.value = true;
		errorAlert.value = null;

		try {
			data.value = EVENTS_TABLE_MOCK;
		} catch (currentError) {
			if (currentError instanceof ApiError)
				errorAlert.value = ERROR_ALERT.network ?? UNKNOWN_ERROR;
		} finally {
			isLoading.value = false;
		}
	}

	return {
		isLoading,
		errorAlert,
		data,
		load
	}
}
