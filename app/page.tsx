import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SignInButton } from "@/components/sign-in-btn";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";

export default async function Home() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	return (
		<div className="min-h-[80vh] flex items-center justify-center overflow-hidden no-visible-scrollbar px-6 md:px-0">
			<main className="flex flex-col gap-4 row-start-2 items-center justify-center">
				<div className="flex flex-col gap-1">
					<h3 className="font-bold text-3xl md:text-4xl text-black dark:text-white text-center">
					Hellō Better Auth Demo
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
				<div className="w-full flex flex-col">
					<div className="text-left text-sm w-56 mx-auto opacity-50">
						<span>You will be prompted to provide:</span>
						<ul className="list-disc list-inside">
							<li>Name</li>
							<li>Verified Email</li>
							<li>Profile Picture</li>
						</ul>
					</div>
					{session?.session ? (
						<Link href="/dashboard" className="mx-auto mt-6">
						<Button className="gap-2 justify-between" variant="default">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1.2em"
								height="1.2em"
								viewBox="0 0 24 24"
							>
								<path
									fill="currentColor"
									d="M5 3H3v4h2V5h14v14H5v-2H3v4h18V3zm12 8h-2V9h-2V7h-2v2h2v2H3v2h10v2h-2v2h2v-2h2v-2h2z"
								></path>
							</svg>
							<span>Dashboard</span>
						</Button></Link>) : <SignInButton/>
					}
					<div className="flex flex-col gap-3 pt-16 flex-wrap">
						<div className="border-y py-2 border-dotted bg-secondary/60 opacity-80">
							<div className="text-xs text-center gap-2 text-muted-foreground">
								This sample app demonstrates how you can add Hellō login and registration to Better Auth in seconds using the <a href="https://www.npmjs.com/package/@hellocoop/better-auth" className="inline underline">@hellocoop/better-auth</a> plugin package.
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
