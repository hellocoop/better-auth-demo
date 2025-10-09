import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { hellocoop } from "@hellocoop/better-auth";

const database = new Database("./auth.db");

export const auth = betterAuth({
	appName: "Better Auth Demo",
	baseURL: "http://localhost:3000",
	secret: process.env.BETTER_AUTH_SECRET,
	database,
	plugins: [
		hellocoop({
			config: {
				clientId: process.env.HELLO_CLIENT_ID,
				providerHint: "google github gitlab",
				scopes: ["openid","profile"]
			},
		}),
	],
});
