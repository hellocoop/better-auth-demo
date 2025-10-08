"use client";

import { client } from "@/lib/auth-client";
import { ContinueButton } from "@hellocoop/better-auth";
import { useState } from "react";


export default function Home() {
	const [isLoading, setIsLoading] = useState(false);
	return (
		<div className="min-h-[80vh] flex items-center justify-center overflow-hidden no-visible-scrollbar px-6 md:px-0">
			<main className="flex flex-col gap-4 row-start-2 items-center justify-center">
				<div className="flex flex-col gap-1">
					<h3 className="font-bold text-4xl text-black dark:text-white text-center">
						Hello Better Auth Demo
					</h3>
					<p className="text-center break-words text-sm md:text-base">
					Next.js demo app showcasing the Better Auth plugin for{" "}
						<a
							href="https://hello.dev"
							target="_blank"
							className="underline"
						>
							Hellō
						</a>{" "}
					</p>
				</div>
				<div className="md:w-10/12 w-full flex flex-col gap-4">
					<div className="flex flex-col gap-3 pt-2 flex-wrap">
						<div className="border-y py-2 border-dotted bg-secondary/60 opacity-80">
							<div className="text-xs flex items-center gap-2 justify-center text-muted-foreground ">
								<span className="text-center">
									Placeholder text for now
								</span>
							</div>
						</div>
					</div>
					<ContinueButton 
						className={`w-56 mx-auto mt-6 hello-btn-black-and-invert ${isLoading ? 'hello-btn-loader' : ''}`}
						disabled={isLoading}
						onClick={async () => {
							setIsLoading(true);
							try {
								await (client as any).signInWithHello({
									callbackURL: "/dashboard",
									scopes: ["openid", "profile"],
									prompt: "consent",
								});
							} catch (error) {
								console.error('Sign in error:', error);
							} finally {
								setIsLoading(false);
							}
						}} 
					/>
					
				</div>
			</main>
		</div>
	);
}
