// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { CompositionEventHandler } from 'svelte/elements';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	declare const __APP_VERSION__: string;

	declare namespace svelteHTML {
		interface HTMLAttributes<T> {
			'on:clickOutside'?: CompositionEventHandler<T>;
		}
	}
}

export {};
