<script setup lang="ts">
import { DOWNLOAD_ERROR, USER_PLACEHOLDERS, USER_PROFILE_DATE_INPUT_CONFIG, USER_PROFILE_INPUT_CONFIG } from './config';
import type { MembershipType, UserProfileInterface, UserProfileSelectorStateType } from '@/entities/UserProfile/type';

import Button from '@/shared/ui/Button.vue';
import Input from '@/shared/ui/Input.vue';
import CourseSelector from '@/widgets/CourseSelector/CourseSelector.vue';

import { computed, ref, toRaw, watch } from 'vue';

import type { ButtonType, InputType } from '@/shared/types/types';
import { useUser } from './useUser';
import { hideAlert, showAlert } from '../alert/alert';
import { useRouter } from 'vue-router';
import { UPDATE_USER_ALERTS } from '@/entities/User/type';
import { UNKNOWN_ERROR } from '../alert/config';
import DateInput from '@/widgets/DateInput/DateInput.vue';
import { createLeaderEntry, deleteLeaderEntry, updateLeaderEntry } from './leaderActions';


const router = useRouter();

const props = withDefaults(
	defineProps<{
		id: number;
		isEditing?: boolean;
		from?: string;
	}>(),
	{
		isEditing: false,
		from: 'home'
	}
);

const {
	isLoading,
	errorAlert,
	data,
	tree,
	LeaderJournal,
	loadUser,
	updateUser,
	deleteUser,
	createUser,
	loadStructureTree,
	loadLeadership,
	errorInputId,
	errorSelector
} = useUser();

watch(
	()=>props.id,
	async (id)=>{
		if(!props.isEditing){
			await loadUser(id);
			if(errorAlert.value != null){
				showAlert(errorAlert.value, true);
				form.value = structuredClone(USER_PLACEHOLDERS);
				router.replace({name: props.from});
				return;
			}
			if(!(await loadLeadership()))
				showAlert(DOWNLOAD_ERROR, true);
			form.value = structuredClone(toRaw(data.value));
			selectorErrors.value = form.value.membership.map(()=>[false, false]);
		}
		if(!(await loadStructureTree()))
			showAlert(DOWNLOAD_ERROR, true);
	},
	{immediate: true}
);

const isEditing = ref<boolean>(props.isEditing);

const form = ref<UserProfileInterface>(structuredClone(USER_PLACEHOLDERS));

const selectorErrors = ref<boolean[][]>([]);

const inputStates = computed<Record<number, InputType>>(() => {
	const states: Record<number, InputType> = {};

	const inputs = [
		...USER_PROFILE_INPUT_CONFIG,
		...USER_PROFILE_DATE_INPUT_CONFIG
	];

	inputs.forEach((input) => {
		if (isLoading.value) {
			states[input.id] = 'loading';
			return;
		}

		if (!isEditing.value) {
			states[input.id] = 'disabled';
			return;
		}

		if (errorInputId.value === input.id && errorSelector.value == null) {
			states[input.id] = 'error';
			return;
		}

		states[input.id] = 'default';
	});

	return states;
});

function getSelectorState(selector: MembershipType): UserProfileSelectorStateType {
	const index = form.value.membership.findIndex(
		(member) => member.id === selector.id
	);

	if (isLoading.value) {
		return {
			state: 'loading',
			error: [false, false]
		};
	}

	return {
		state: isEditing.value ? 'active' : 'passive',
		error: selectorErrors.value[index] ?? [false, false]
	};
}

const addButtonState = computed<ButtonType>(()=>{
	if(isLoading.value || !isEditing.value)
		return 'disabled';
	return 'primary';
});

const editButtonState = computed<ButtonType>(()=>isLoading.value ? 'disabled' : 'primary');
const deleteButtonState = computed<ButtonType>(()=>isLoading.value ? 'disabled' : 'danger');

const membership = computed<MembershipType[]>(()=>form.value.membership.filter((member)=>!member.isHead));
const leadership = computed<MembershipType[]>(()=>form.value.membership.filter((member)=>member.isHead));

let temporaryId: number = -1;

async function toggleEditable(): Promise<void> {
	if(props.isEditing){
		await createProfile();
		return;
	}

	if(isLoading.value)
		return;
	if(isEditing.value){
		await updateUser(form.value);
		if(errorAlert.value != null){
			showAlert(errorAlert.value, true);
			return;
		}
		if(!(await loadLeadership()))
			showAlert(DOWNLOAD_ERROR, true);
		form.value = structuredClone(toRaw(data.value));
		showAlert(UPDATE_USER_ALERTS[200] ?? UNKNOWN_ERROR, true);
	}
	isEditing.value = !isEditing.value;
}

function addMember(): void {
	if(isLoading.value || !isEditing.value)
		return;
	form.value.membership.push({
		id: temporaryId--,
		isHead: false,
		course: '',
		courseId: -1,
		group: '',
		groupId: -1
	});
}

function addLeader(): void {
	if(isLoading.value || !isEditing.value)
		return;
	const member = {
		id: temporaryId--,
		isHead: true,
		course: '',
		courseId: -1,
		group: '',
		groupId: -1
	}
	form.value.membership.push(member);
	createLeaderEntry(LeaderJournal.value, temporaryId+1);
}

function deleteMember(selector: MembershipType): void {
	let targetID = form.value.membership.findIndex((member)=>member.id==selector.id && !member.isHead);
	if(targetID == -1)
		return;
	deleteLeaderEntry(LeaderJournal.value, selector)
	form.value.membership.splice(targetID, 1);
	selectorErrors.value.splice(targetID, 1);
}
function deleteLeader(selector: MembershipType): void {
	let targetID = form.value.membership.findIndex((member)=>member.id==selector.id && member.isHead);
	if(targetID == -1)
		return;
	deleteLeaderEntry(LeaderJournal.value, selector)
	form.value.membership.splice(targetID, 1);
	selectorErrors.value.splice(targetID, 1);
}

function updateMembership(
	current: MembershipType,
	value: MembershipType
): void {
	const index = form.value.membership.findIndex(
		(member) => member.id === current.id
	);

	if (index === -1)
		return;

	updateLeaderEntry(LeaderJournal.value, current);
	form.value.membership[index] = value;
}

function deleteProfile(): void {
	showAlert({
		state: 'info',
		header: 'Подтверждение',
		description: 'Вы действительно хотите удалить данную учетную запись?',
		buttons: ['Да', 'Нет'],
		onOk: async ()=>{
			if(isLoading.value)
				return;
			await deleteUser(form.value.id);
			if(errorAlert.value != null){
				showAlert(errorAlert.value, true);
				return;
			}
			selectorErrors.value = form.value.membership.map(()=>[false, false]);
			showAlert(UPDATE_USER_ALERTS[200] ?? UNKNOWN_ERROR, true);

			form.value = structuredClone(USER_PLACEHOLDERS);
			data.value = structuredClone(USER_PLACEHOLDERS);

			router.push({name: 'people'});
		},
		onNo: ()=>hideAlert()
	}, false)
}

async function createProfile(): Promise<void> {
	if(isLoading.value)
		return;
	await createUser(form.value);
	if(errorAlert.value != null){
		showAlert(errorAlert.value, true);
		return;
	}
	selectorErrors.value = form.value.membership.map(()=>[false, false]);
	showAlert(UPDATE_USER_ALERTS[200] ?? UNKNOWN_ERROR, true);
	router.push({name: 'people'});
}

</script>

<template>
	<div class="user-page">
		<div class="user-page__header">
			<div class="user-page__header__name">
				<span class="user-page__header__name__text">
					{{ form.firstName }} 
					{{ form.secondName }} 
					{{ form.surName == '-' ? '' : form.surName }}
					<span class="user-page__header__name__text__id">#{{ form.id }}</span>
				</span>
				<span class="user-page__header__name__group">
					{{ form.group == '-' ? '' : form.group }}
				</span>
			</div>
		</div>
		<div class="user-page__content">
			<div class="user-page__content__left">
				<Input 
					v-for="(input, index) in USER_PROFILE_INPUT_CONFIG"
					:key="input.id"
					v-model="form[input.field]"
					:header="input.header"
					:placeholder="input.header"
					:state="inputStates[input.id]"
					:isPassword="false"
				/>
				<DateInput 
					v-for="(input, index) in USER_PROFILE_DATE_INPUT_CONFIG"
					:key="input.id"
					v-model="form[input.field]"
					:header="input.header"
					:placeholder="input.header"
					:state="inputStates[input.id]"
					:isPassword="false"
					
				/>
			</div>
			<div class="user-page__content__right">
				<div class="user-page__content__right__organization">
					<div class="user-page__content__right__membership">
						<div class="user-page__content__right__membership__header">
							<span class="user-page__content__right__membership__header__text">
								Членство в организации
							</span>
						</div>
						<div class="user-page__content__right__membership__content">
							<CourseSelector 
								v-for="selector in membership"
								:key="selector.id"
								:state="getSelectorState(selector).state"
								:error="getSelectorState(selector).error"
								
								:data="selector"
								@update:data="value=>updateMembership(selector, value)"

								:structure="tree"
								@clicked="deleteMember"
							/>
						</div>
						<Button 
							text="Назначить"
							:state="addButtonState"
							@clicked="addMember"
						/>
					</div>
					<div class="user-page__content__right__membership">
						<div class="user-page__content__right__membership__header">
							<span class="user-page__content__right__membership__header__text">
								Руководство в организации
							</span>
						</div>
						<div class="user-page__content__right__membership__content">
							<CourseSelector 
								v-for="selector in leadership"
								:key="selector.id"
								:state="getSelectorState(selector).state"
								:error="getSelectorState(selector).error"
								
								:data="selector"
								@update:data="value=>updateMembership(selector, value)"

								:structure="tree"
								@clicked="deleteLeader"
							/>
						</div>
						<Button 
							text="Назначить"
							:state="addButtonState"
							@clicked="addLeader"
						/>
					</div>
				</div>
				<div class="user-page__content__right__action">
					<Button 
						:text="isEditing ? 'Сохранить' : 'Изменить'"
						:state="editButtonState"
						@clicked="toggleEditable"
					/>
					<Button 
						text="Удалить"
						:state="deleteButtonState"
						@clicked="deleteProfile"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.user-page{
		width: fit-content;
		height: fit-content;

		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		gap: 30px;
		flex-direction: column;

		&__header{
			width: 100%;
			height: fit-content;

			display: flex;
			align-items: flex-start;
			justify-content: flex-start;
			flex-direction: row;

			&__name{
				width: fit-content;
				height: fit-content;

				display: flex;
				flex-direction: column;
				gap: 10px;

				&__text{
					color: var(--color-text-primary);
					font-family: var(--font-family-bold);
					font-size: 32px;

					&__id{
						color: var(--color-label);
					}
				}

				&__group{
					color: var(--color-label);
					font-size: 24px;
					font-family: var(--font-family-bold);
				}
			}
		}

		&__content{
			width: fit-content;
			height: fit-content;

			display: flex;
			flex-direction: row;
			gap: 30px;

			&__left{
				width: fit-content;
				height: fit-content;

				display: grid;
				grid-template-columns: 1fr 1fr;
				gap: 20px;
			}

			&__right{
				width: fit-content;
				height: 100%;
				min-height: 396px;

				display: flex;
				align-items: flex-end;
				justify-content: space-between;
				flex-direction: column;

				&__organization{
					width: fit-content;
					height: fit-content;

					display: flex;
					align-items: flex-start;
					justify-content: center;
					flex-direction: column;
					gap: 30px;
				}

				&__membership{
					width: fit-content;
					height: fit-content;

					display: flex;
					align-items: flex-start;
					justify-content: flex-start;
					gap: 15px;
					flex-direction: column;

					&__header{
						width: 100%;
						height: fit-content;

						display: flex;
						align-items: center;
						justify-content: flex-start;

						&__text{
							color: var(--color-text-primary);
							font-family: var(--font-family-bold);
							font-size: 24px;
						}
					}

					&__content{
						width: 100%;
						height: fit-content;

						display: flex;
						align-items: flex-start;
						justify-content: flex-start;
						gap: 15px;
						flex-direction: column;
					}
				}

				&__action{
					width: fit-content;
					height: fit-content;

					display: flex;
					align-items: center;
					justify-content: center;
					gap: 20px;
					flex-direction: row;
				}
			}
		}
	}

	@media(max-width: 1590px){
		.user-page__content{
			flex-direction: column;
		}
	}
</style>
