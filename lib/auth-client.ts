import { createAuthClient } from "better-auth/react";
import { hellocoopClient } from "@hellocoop/better-auth";

export const client = createAuthClient({
	plugins: [
		hellocoopClient(),
	]
});

export const {
	signOut,
	useSession,
} = client;
