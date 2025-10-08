import { createAuthClient } from "better-auth/react";
import {
	multiSessionClient,
	deviceAuthorizationClient,
} from "better-auth/client/plugins";
import { toast } from "sonner";
import { hellocoopClient } from "@hellocoop/better-auth";

export const client = createAuthClient({
	plugins: [
		multiSessionClient(),
		hellocoopClient(),
		deviceAuthorizationClient(),
	],
	fetchOptions: {
		onError(e) {
			if (e.error.status === 429) {
				toast.error("Too many requests. Please try again later.");
			}
		},
	},
});

console.log(client);

export const {
	signOut,
	useSession,
} = client;
