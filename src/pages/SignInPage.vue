<script setup lang="ts">
import SignInFeature from '@/features/signIn/SignInFeature.vue';

import { PROJECT_NAME } from '@/shared/constants/config';

import LogoIllustration from '@/shared/assets/illustrations/illustration-logo.svg?component';
import BackgroundIllustration from '@/shared/assets/illustrations/illustration-sign_up_page.svg?component';
import AlertFeature from '@/features/alert/AlertFeature.vue';

</script>

<template>
	<div class="si-page">
		<AlertFeature />
		<div class="si-page__left">
			<div class="si-page__left__content">
				<div class="si-page__left__content__header">
					<component 
						:is="LogoIllustration"
						class="si-page__left__content__header__icon"
					/>
					<span class="si-page__left__content__header__text">
						{{ PROJECT_NAME }}
					</span>
				</div>
				<SignInFeature class="si-page__left__content__central" />
			</div>
		</div>
		<div class="si-page__right">
			<component 
				:is="BackgroundIllustration"
				class="si-page__right__img"
			/>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.si-page{
		width: 100%;
		height: 100%;

		display: grid;
		grid-template-columns: 1.5fr 1fr;

		background: radial-gradient(78.5% 78.5% at 77.6% 50%, #5e81f4 0%, #1b51e5 100%);

		&__left{
			width: 100%;
			height: 100%;

			display: flex;
			align-items: center;
			justify-content: center;

			border-top-right-radius: 16px;
			border-bottom-right-radius: 16px;

			background-color: var(--color-background);

			&__content{
				max-width: 400px;
				width: 100%;
				min-width: 320px;
				height: fit-content;

				display: flex;
				align-items: flex-start;
				justify-content: center;
				flex-direction: column;
				gap: 50px;

				&__header{
					width: 100%;
					height: fit-content;

					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: row;
					gap: 30px;

					&__icon{
						width: clamp(48px, 10vw, 55px);
						height: clamp(48px, 10vw, 55px);
						--icon-primary-color: var(--color-text-primary);
					}

					&__text{
						font-family: var(--font-family-bold);
						font-size: clamp(36px, 10vw, 48px);
						color: var(--color-text-primary);
					}
				}
			}
		}
		&__right{
			width: 100%;
			height: 100%;

			display: flex;
			align-items: center;
			justify-content: center;

			background-image: url('@/shared/assets/BackgeoundImage.png');
			background-position: center center;
			background-repeat: no-repeat;
			background-size: cover;
		}
	}

	@media (max-width: 1000px){
		.si-page{
			grid-template-columns: 1fr;
			&__right{
				display: none;
			}
			&__left{
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
			}
		}
	}
</style>
