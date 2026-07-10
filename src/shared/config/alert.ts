import dangerIcon from '../assets/icons/alert/Error Alert.svg?url';
import warningIcon from '../assets/icons/alert/Warning Alert.svg?url';
import infoIcon from '../assets/icons/alert/Info Alert.svg?url';
import successIcon from '../assets/icons/alert/Success Alert.svg?url';

import crossDangerIcon from '../assets/icons/alert/cross/Cross--red.svg?url';
import crossWarningIcon from '../assets/icons/alert/cross/Cross--yellow.svg?url';
import crossInfoIcon from '../assets/icons/alert/cross/Cross--blue.svg?url';
import crossSuccessIcon from '../assets/icons/alert/cross/Cross--green.svg?url';

import type { AlertType } from '../types/types';

export const ALERT_CONFIG = {
	'danger': {
		iconUrl: dangerIcon,
		crossUrl: crossDangerIcon,
		className: 'alert--danger',
		buttonColor: '#EA6766'
	},
	'warning': {
		iconUrl: warningIcon,
		crossUrl: crossWarningIcon,
		className: 'alert--warning',
		buttonColor: '#FF9200'
	},
	'info': {
		iconUrl: infoIcon,
		crossUrl: crossInfoIcon,
		className: 'alert--info',
		buttonColor: '#2499EC'
	},
	'success': {
		iconUrl: successIcon,
		crossUrl: crossSuccessIcon,
		className: 'alert--success',
		buttonColor: '#10AA00'
	}
} satisfies Record<
	AlertType, 
	{
		iconUrl: string,
		crossUrl: string,
		className: string,
		buttonColor: string
	}
>
