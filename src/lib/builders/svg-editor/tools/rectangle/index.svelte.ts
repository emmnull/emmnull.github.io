import { KEYS } from '$lib/common/constants';
import { SquareIcon } from 'lucide-svelte';
import { Tool } from '../tool.svelte';

export class RectangleTool extends Tool {
	constructor() {
		super({
			name: 'Rectangle',
			description: 'Draw a rectangle',
			icon: SquareIcon,
			hotkey: { key: KEYS.R }
		});
	}
}
