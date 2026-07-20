import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { MENU_CONFIG } from '@/shared/config/menu'

import type { ThemeType } from '@/shared/types/types';
import { authStorage } from '../signIn/signIn.api';


const systemTheme: ThemeType = window.matchMedia('(prefers-color-scheme: dark)').matches  ? 'dark' : 'light';



export function useMenuHandler() {
	const router = useRouter();
	const route = useRoute();


	const savedTheme = localStorage.getItem('theme');
	const theme = ref<ThemeType>(savedTheme == 'dark' || savedTheme == 'light' ? savedTheme : systemTheme);
	localStorage.setItem('theme', theme.value);


	function toggleTheme(): void {
		theme.value = theme.value === 'light' ? 'dark' : 'light';
	}

	watch(
		theme,
		(value) => {
			document.documentElement.dataset.theme = value;
			localStorage.setItem('theme', value);
		},
		{
			immediate: true,
		},
	)

	function handlerMenu(id: number): void {
		const menuItem = MENU_CONFIG.find((item) => item.id === id)

		if (menuItem?.link)
			router.push({ name: menuItem.link })

		if (id === 2)
			toggleTheme()
		if (id === 3){
			authStorage.clearTokens();
			router.push({ name: 'login' });
		}

	}

	const currentButtonId = computed<number | null>(()=> {
		const ans = MENU_CONFIG.find((element)=>element.link==route.name)?.id;
		return ans ?? null;
	});

	return {
		theme,
		currentButtonId,
		handlerMenu,
	}
}
