import { computed, ref, toRaw } from "vue";
import type { UserEditorDraft, UserEditorMode, UserFieldsDraft } from "./type";
import { resetUserDraft } from "./reset";

function cloneDraft(draft: UserEditorDraft): UserEditorDraft {
	return structuredClone(toRaw(draft));
}

export function useUserEditorState() {
	const mode = ref<UserEditorMode>('read');
	const original = ref<UserEditorDraft | null>(null);
	const draft = ref<UserEditorDraft>(resetUserDraft());
	const isEditing = computed<boolean>(() => mode.value !== 'read');

	function loadDraft(loadedDraft: UserEditorDraft): void {
		original.value = cloneDraft(loadedDraft);
		draft.value = cloneDraft(loadedDraft);
		mode.value = 'read';
	}
	function startEditingDraft(): void {
		if (!original.value)
			return;
		mode.value = 'update';
	}
	function startCreatingDraft(): void {
		original.value = null;
		draft.value = resetUserDraft();
		mode.value = 'create';
	}
	function cancelEditingDraft(): void {
		if (mode.value == 'create') {
			draft.value = resetUserDraft();
			return;
		}
		if (!original.value)
			return;
		draft.value = cloneDraft(original.value);
		mode.value = 'read';
	}

	return {
		mode,
		original,
		draft,
		isEditing,

		loadDraft,
		startEditingDraft,
		startCreatingDraft,
		cancelEditingDraft
	}
}
