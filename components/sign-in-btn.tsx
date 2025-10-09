"use client";

import { client } from "@/lib/auth-client";
import { ContinueButton } from "@hellocoop/better-auth";
import { useState } from "react";

export function SignInButton() {
	const [isLoading, setIsLoading] = useState(false);
	return (
		<ContinueButton 
			className={`w-56 mt-6 mx-auto hello-btn-black-and-static hello-btn-hover-flare ${isLoading ? 'hello-btn-loader' : ''}`}
			disabled={isLoading}
			onClick={async () => {
				setIsLoading(true);
				try {
					await (client as any).signInWithHello({
						callbackURL: "/dashboard",
					});
				} catch (error) {
					console.error('Sign in error:', error);
					setIsLoading(false);
				}
			}} 
		/>
	);
}