import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { hellocoop } from "@hellocoop/better-auth";

const database = new Database("./auth.db");

export const auth = betterAuth({
	appName: "Better Auth Demo",
	baseURL: "http://localhost:3000",
	database,
	plugins: [
		hellocoop({
			config: {
				clientId: "fb2f193e-d2e0-40d7-8e1f-3bfcab3eac6d",
				providerHint: "github",
				scopes: ["openid","profile"]
			},
		}),
	],
});
