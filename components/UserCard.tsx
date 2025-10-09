"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { client, signOut, useSession } from "@/lib/auth-client";
import { Session } from "@/lib/auth-types";
import {
	Loader2,
	LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ContinueButton } from "@hellocoop/better-auth";

export default function UserCard(props: {
	session: Session | null;
}) {
	const router = useRouter();
	const { data } = useSession();
	const session = data || props.session;
	const [isSignOut, setIsSignOut] = useState<boolean>(false);
	const [isUpdatingProfile, setIsUpdatingProfile] = useState<boolean>(false);
	return (
		<Card>
			<CardHeader>
				<CardTitle>User</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-8 grid-cols-1">
				<div className="flex flex-col gap-2">
					<div className="flex flex-wrap gap-4 items-start justify-between">
						<div className="flex items-center gap-4">
							<Avatar className="h-9 w-9">
								<AvatarImage
									src={session?.user.image || undefined}
									alt="Avatar"
									className="object-cover"
								/>
								<AvatarFallback>{session?.user.name.charAt(0)}</AvatarFallback>
							</Avatar>
							<div className="grid">
								<div className="flex items-center gap-1">
									<p className="text-sm font-medium leading-none">
										{session?.user.name}
									</p>
								</div>
								<p className="text-sm">{session?.user.email}</p>
							</div>
						</div>
						<ContinueButton 
							className={`!text-sm h-8 w-auto !px-4 hello-btn-black-and-static ${isUpdatingProfile ? 'hello-btn-loader' : ''}`}
							disabled={isUpdatingProfile}
							onClick={async () => {
								setIsUpdatingProfile(true);
								try {
									await client.signInWithHello({
										callbackURL: "/dashboard",
										prompt: "consent",
										loginHint: session?.user.email,
									});
								} catch (error) {
									console.error('Update profile error:', error);
									setIsUpdatingProfile(false);
								}
							}}
						>Update Profile with Hello</ContinueButton>
					</div>
				</div>
			</CardContent>
			<CardFooter className="gap-2 justify-between items-center pt-6">
				<Button
					className="gap-2 z-10"
					variant="secondary"
					onClick={async () => {
						setIsSignOut(true);
						await signOut({
							fetchOptions: {
								onSuccess() {
									router.push("/");
								},
							},
						});
						setIsSignOut(false);
					}}
					disabled={isSignOut}
				>
					<span className="text-sm">
						{isSignOut ? (
							<Loader2 size={15} className="animate-spin" />
						) : (
							<div className="flex items-center gap-2">
								<LogOut size={16} />
								Sign Out
							</div>
						)}
					</span>
				</Button>
			</CardFooter>
		</Card>
	);
}