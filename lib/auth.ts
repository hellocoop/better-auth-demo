import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { hellocoop } from "@hellocoop/better-auth";

const clientId = process.env.HELLO_CLIENT_ID;

if (!clientId) {
	throw new Error("HELLO_CLIENT_ID environment variable is required");
}

const database = new Database("./auth.db");

export const auth = betterAuth({
	appName: "Better Auth Demo",
	baseURL: "http://localhost:3000",
	database,
	plugins: [
		hellocoop({
			config: {
				clientId,
				providerHint: "github",
				scopes: ["openid","profile"]
			},
		}),
	],
});
