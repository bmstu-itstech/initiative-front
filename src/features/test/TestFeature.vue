<script setup lang="ts">
import Button from '@/shared/ui/Button.vue';
import MenuButton from '@/shared/ui/MenuButton.vue';
import Alert from '@/shared/ui/Alert.vue';
import Input from '@/shared/ui/Input.vue';
import CourseSelector from '@/widgets/CourseSelector/CourseSelector.vue';
import FilterButton from '@/shared/ui/FilterButton.vue';
import SearchInput from '@/shared/ui/SearchInput.vue';
import DropDownMenu from '@/shared/ui/DropDownMenu.vue';
import Filter from '@/widgets/Filter.vue';
import StructureTree from '@/widgets/StructureTree.vue';
import Menu from '@/widgets/Menu.vue';
import Table from '@/widgets/Table.vue';
import Skeleton from '@/shared/ui/Skeleton.vue';
import UserIcon from '@/shared/assets/icons/filter/User.svg?component';

import icon from '@/shared/assets/icons/menu/People.svg?url'

import type { FilterDataInterface } from '@/shared/types/interfaces';

import { reactive, ref, watch } from 'vue';
import DateInput from '@/widgets/DateInput/DateInput.vue';
import { STRUCTURE_TREE_MOCK } from '@/entities/StructureTree/mock';
import type { MembershipType } from '@/entities/UserProfile/type';
import Badge from '@/shared/ui/Badge.vue';
import IconButton from '@/shared/ui/IconButton.vue';
import Event from '@/widgets/Event.vue';
import { EVENT_BLOCKS_MOCK } from '@/entities/Event/mock';

const flag = ref(false);
const flag2 = ref(false);
const opened_alert = ref(true);
const value = ref('');
const value2 = ref('');
const value3 = ref<FilterDataInterface>({
	buttonID: -1,
	value: ''
});
const value4 = ref<number[]>([]);
const value5 = ref<number>(-1);

const theme = ref<'light' | 'dark'>('light')

function toggleTheme(): void{
	theme.value = theme.value == 'light' ? 'dark' : 'light';
}

function selectorHandler(args: MembershipType): void{
	console.log(args);
}

watch(theme, (value)=>{
	document.documentElement.setAttribute('data-theme', value);
});

function http(){
	fetch('/health/')
		.then(response => response.text())
		.then(console.log)
		.catch(console.error)
}

const vars = ref<string[][]>([]);
const value6 = ref<string>('ул.Бауманская д5с3');
const value7 = ref<string>('');
const value8 = ref({
			id: 0,
			isHead: false,
			course: '',
			courseId: -1,
			group: '',
			groupId: -1
		});


</script>

<template>
<div class="main">
	<div class="menu">
		<Menu style="height: 100vh;" @clicked="(id)=>{if(id==2)toggleTheme()}"/>
	</div>
	<div class="events" style="display: flex;flex-direction: column;">
		<Event 
			v-for="event in EVENT_BLOCKS_MOCK"
			style="width: 741px;"
			:data="event"
		/>
	</div>
	<Badge 
		v-model="value6"
		:icon="UserIcon"
	/>
	{{ value6 }}
	<IconButton />
	<DateInput 
		v-model="value7"
		placeholder="Дата рождения"
	/>
	{{ value7 }}
	<Skeleton 
		state="Tree"
	/>
	<Table @clicked="(id)=>value5=id"/>
	{{ value5 }}
	<StructureTree @clicked="(ids:number[])=>value4=ids"/>
	{{ value4 }}
	<Filter 
		v-model="value3"
	/>
	{{ value3 }}
	<div class="tree">
		<DropDownMenu 
			:ID="0"
			style="width: 400px;"
		/>
		<DropDownMenu 
			:ID="1"
			state="group"
			style="width: 400px;"
			@clicked="flag2=!flag2"
		/>
		<DropDownMenu 
			v-if="flag2"
			:ID="2"
			state="user"
			header="Фамилия Имя Отчество"
			style="width: 400px;"
		/>
		<DropDownMenu 
			v-if="flag2"
			:ID="3"
			state="user"
			header="Фамилия Имя Отчество"
			style="width: 400px;"
		/>
	</div>
	<Button 
		:text="'Нажми меня'"
		:icon="true"
		:state="'danger'"
		@clicked="flag=!flag"
	/>
	<MenuButton 
		:text="'Активисты'"
		:icon-url="icon"
		:elongated="flag"
		:is-active="true"
		@clicked="console.log('!')"
	/>
	<Alert 
		:state="'success'"
		:header="'Header'"
		:description="'Description'"
		v-if="opened_alert"
		@button-cross="opened_alert=!opened_alert"
		@button-o-k="toggleTheme"
		@button-n-o="http"
	/>
	<Input 
		v-model="value"
		header="Header"
		placeholder="Placeholder"
		state="default"
		:is-password="true"
		:variants="vars"
		:hint-header="['Год', 'Месяц', 'День']"
		:hint-grid="[[1, 1, 1], [1, 1], [1]]"
		@clicked="(variant)=>{value6=variant; vars=[];console.log(variant);vars=[];}"
		@focused="vars=[
			['Вариант№1', 'Вариант№2', 'Вариант№3'], 
			['Вариант№4', 'Вариант№5', 'Вариант№6'],
			['Вариант№7', 'Вариант№8', 'Вариант№9']
		]"
		@unfocused="vars=[]"
	/>
	{{ value6 }}
	<FilterButton/>
	<SearchInput 
		v-model="value2" 
		style="width: 400px;" 
		state="default"
	/>
</div>
</template>

<style scoped lang="scss">
.main{
	display: flex;
	flex-direction: column;
	gap: 50px;
	justify-content: center;
	align-items: center;
}
.menu{
	width: 100%;
	height: 100vh;

	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
}
</style>
