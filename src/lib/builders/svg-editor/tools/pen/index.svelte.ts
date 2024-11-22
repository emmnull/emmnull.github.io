import { KEYS } from '$lib/common/constants';
import { PenToolIcon } from 'lucide-svelte';
import { Tool } from '../tool.svelte';

export class PenTool extends Tool {
	constructor() {
		super({
			name: 'Pen',
			description: 'Draw custom shapes using anchors.',
			icon: PenToolIcon,
			hotkey: { key: KEYS.P }
		});
	}
}
