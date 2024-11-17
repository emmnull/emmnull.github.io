/**
 * Create tabs and track state of currently selected tab and its corresponding pannel(s).
 */
export class Tabs<T = any> {
	current = $state<T>();

	constructor({ defaultValue, value }: { defaultValue: T; value?: T }) {
		this.current = defaultValue;
		this.getTriggerAttributes.bind(this);
		this.getContentAttributes.bind(this);
	}

	/**
	 * Get attributes for a tab trigger corresponding to a certain value.
	 */
	getTriggerAttributes(value: T) {
		const _this = this;
		return {
			role: 'tab' as const,
			get 'aria-selected'() {
				return value === _this.current;
			},
			onclick(e: MouseEvent) {
				_this.current = value;
			}
		};
	}

	/**
	 * Get attributes for the element hosting a tab's content.
	 */
	getContentAttributes(value: T, hidden: boolean = true) {
		const _this = this;
		return {
			role: 'tabpanel' as const,
			get hidden() {
				return value !== _this.current;
			},
			get 'aria-hidden'() {
				return value !== _this.current;
			},
			get 'aria-expanded'() {
				return value === _this.current;
			}
		};
	}
}
