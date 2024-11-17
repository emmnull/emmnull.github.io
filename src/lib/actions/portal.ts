export function portal(
	node: Node,
	{ target = document.body, anchor }: { target?: HTMLElement; anchor?: HTMLElement } = {}
) {
	anchor ? target.insertBefore(node, anchor) : target.appendChild(node);
	return {
		destroy() {
			// target.removeChild(node);
		}
	};
}
