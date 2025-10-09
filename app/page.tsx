import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SignInButton } from "@/components/sign-in-btn";
import InfoBlock from "@/components/InfoBlock";
import { DashboardButton } from "@/components/dashboard-btn";

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
						Next.js demo app showcasing the <a
							href="https://hello.dev"
							target="_blank"
							className="underline"
						>
							Hellō
						</a> plugin for Better Auth
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
					{session?.session ? <DashboardButton/> : <SignInButton/>}
					<InfoBlock />
				</div>
			</main>
		</div>
	);
}
