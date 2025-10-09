import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import UserCard from "@/components/UserCard";
import InfoBlock from "@/components/InfoBlock";

export default async function DashboardPage() {
	const [session ] =
		await Promise.all([
			auth.api.getSession({
				headers: await headers(),
			}),
		]).catch((e) => {
			console.log(e);
			throw redirect("/sign-in");
		});
	return (
		<div className="w-full">
			<div className="flex gap-4 flex-col">
				<UserCard
					session={JSON.parse(JSON.stringify(session))}
				/>
			</div>
			<InfoBlock />
		</div>
	);
}
