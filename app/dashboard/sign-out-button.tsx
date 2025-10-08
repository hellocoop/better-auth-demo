"use client";

import { client } from "@/lib/auth-client";

export default function SignOutButton() {
	return (
		<button
			onClick={() => client.signOut()}
			className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
		>
			Sign Out
		</button>
	);
}
