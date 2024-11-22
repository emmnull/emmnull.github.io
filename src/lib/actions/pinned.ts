/**
 * Determines if a sticky element is pinned.
 */
export function pinned(
	node: Element,
	{
		set
	}: {
		set?: (pinned: boolean) => void;
	} = {}
) {
	let pinned = $state(false);
	function update() {
		pinned = false;
		node.setAttribute('data-pinned', `${pinned}`);
	}
	$effect(() => {
		// setup
		return () => {
			// teardown
		};
	});
}
