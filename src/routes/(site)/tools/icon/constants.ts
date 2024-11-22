import { PenTool } from './tools/pen/index.svelte';
import { RectangleTool } from './tools/rectangle/index.svelte';

export const TOOLS = {
	PEN: new PenTool(),
	RECTANGLE: new RectangleTool()
};
