<script setup lang="ts">
import { USER_PLACEHOLDERS, USER_PROFILE_DATE_INPUT_CONFIG, USER_PROFILE_INPUT_CONFIG } from './config';
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
	loadUser,
	updateUser,
	deleteUser,
	createUser,
	loadStructureTree
} = useUser();

watch(
	()=>props.id,
	async (id)=>{
		if(!props.isEditing){
			await loadUser(id);
			if(errorAlert.value != null){
				showAlert(errorAlert.value, true);
				form.value = USER_PLACEHOLDERS;
				router.replace({name: props.from});
				return;
			}
			form.value = structuredClone(toRaw(data.value));
			selectorErrors.value = form.value.membership.map(()=>[false, false]);
		}
		if(!(await loadStructureTree())){
			showAlert({
				state: 'danger',
				header: 'Ошибка сети',
				description: 'Не удалось загрузить членство в организации'
			}, true);
		}
	},
	{immediate: true}
);

const isEditing = ref<boolean>(props.isEditing);

const form = ref<UserProfileInterface>(structuredClone(USER_PLACEHOLDERS));

const selectorErrors = ref<boolean[][]>([]);

const inputStates = computed<InputType[]>(()=>{
	return USER_PROFILE_INPUT_CONFIG.map(()=>{
		if(isLoading.value)
			return 'loading';
		return isEditing.value
			? 'default'
			: 'disabled';
	})
});

const selectorStates = computed<UserProfileSelectorStateType[]>(()=>{
	return form.value.membership.map((_, index)=>{
		if(isLoading.value)
			return {
				state: 'loading',
				error: [false, false]
			}
		return {
			state: isEditing.value ? 'active' : 'passive',
			error: selectorErrors.value[index] ?? [false, false]
		}
	});
});

const addButtonState = computed<ButtonType>(()=>{
	if(isLoading.value || !isEditing.value)
		return 'disabled';
	return 'primary';
});

const editButtonState = computed<ButtonType>(()=>isLoading.value ? 'disabled' : 'primary');
const deleteButtonState = computed<ButtonType>(()=>isLoading.value ? 'disabled' : 'danger');

let temporaryId: number = -1;

function toggleEditable(): void {
	if(props.isEditing){
		createProfile();
		return;
	}

	if(isLoading.value)
		return;
	if(isEditing.value){
		updateUser(form.value);
		if(errorAlert.value != null){
			showAlert(errorAlert.value, true);
			return;
		}
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

function deleteMember(selector: MembershipType): void {
	let targetID = form.value.membership.findIndex((member)=>member.id==selector.id);
	if(targetID == -1)
		return;
	form.value.membership.splice(targetID, 1);
	selectorErrors.value.splice(targetID, 1);
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
					{{ form.group }}
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
					:state="inputStates[index]"
					:isPassword="false"
				/>
				<DateInput 
					v-for="(input, index) in USER_PROFILE_DATE_INPUT_CONFIG"
					:key="input.id"
					v-model="form[input.field]"
					:header="input.header"
					:placeholder="input.header"
					:state="inputStates[index]"
					:isPassword="false"
					
				/>
			</div>
			<div class="user-page__content__right">
				<div class="user-page__content__right__membership">
					<div class="user-page__content__right__membership__header">
						<span class="user-page__content__right__membership__header__text">
							Членство в организации
						</span>
					</div>
					<div class="user-page__content__right__membership__content">
						<CourseSelector 
							v-for="(selector, index) in form.membership"
							:key="selector.id"
							:state="selectorStates[index]?.state"
							:error="selectorStates[index]?.error"
							
							:data="selector"
							@update:data="value=>form.membership[index] = value"

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
