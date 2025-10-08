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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { client, signOut, useSession } from "@/lib/auth-client";
import { Session } from "@/lib/auth-types";
import { MobileIcon } from "@radix-ui/react-icons";
import {
	Laptop,
	Loader2,
	LogOut,
	StopCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { UAParser } from "ua-parser-js";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Subscription } from "@better-auth/stripe";
import { ContinueButton } from "@hellocoop/better-auth";

export default function UserCard(props: {
	session: Session | null;
	activeSessions: Session["session"][];
	subscription?: Subscription;
}) {
	const router = useRouter();
	const { data } = useSession();
	const session = data || props.session;
	const [isTerminating, setIsTerminating] = useState<string>();
	const [isSignOut, setIsSignOut] = useState<boolean>(false);
	const [emailVerificationPending, setEmailVerificationPending] =
		useState<boolean>(false);
	const [activeSessions, setActiveSessions] = useState(props.activeSessions);
	const removeActiveSession = (id: string) =>
		setActiveSessions(activeSessions.filter((session) => session.id !== id));
	const { data: subscription } = useQuery({
		queryKey: ["subscriptions"],
		initialData: props.subscription ? props.subscription : null,
		queryFn: async () => {
			const res = await client.subscription.list({
				fetchOptions: {
					throw: true,
				},
			});
			return res.length ? res[0] : null;
		},
	});

	console.log(session)

	return (
		<Card>
			<CardHeader>
				<CardTitle>User</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-8 grid-cols-1">
				<div className="flex flex-col gap-2">
					<div className="flex items-start justify-between">
						<div className="flex items-center gap-4">
							<Avatar className="hidden h-9 w-9 sm:flex ">
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
									{!!subscription && (
										<Badge
											className="w-min p-px rounded-full"
											variant="outline"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="1.2em"
												height="1.2em"
												viewBox="0 0 24 24"
											>
												<path
													fill="currentColor"
													d="m9.023 21.23l-1.67-2.814l-3.176-.685l.312-3.277L2.346 12L4.49 9.546L4.177 6.27l3.177-.685L9.023 2.77L12 4.027l2.977-1.258l1.67 2.816l3.176.684l-.312 3.277L21.655 12l-2.142 2.454l.311 3.277l-3.177.684l-1.669 2.816L12 19.973zm1.927-6.372L15.908 9.9l-.708-.72l-4.25 4.25l-2.15-2.138l-.708.708z"
												></path>
											</svg>
										</Badge>
									)}
								</div>
								<p className="text-sm">{session?.user.email}</p>
							</div>
						</div>
						<ContinueButton className="!text-sm h-8 w-auto hello-btn-black-and-invert" onClick={
							async () => await client.signInWithHello({
								callbackURL: "/dashboard",
								scopes: ["openid", "profile"],
								prompt: "consent",
							})
						}>Update Profile with Hello</ContinueButton>
					</div>
				</div>

				{session?.user.emailVerified ? null : (
					<Alert>
						<AlertTitle>Verify Your Email Address</AlertTitle>
						<AlertDescription className="text-muted-foreground">
							Please verify your email address. Check your inbox for the
							verification email. If you haven't received the email, click the
							button below to resend.
							<Button
								size="sm"
								variant="secondary"
								className="mt-2"
								onClick={async () => {
									await client.sendVerificationEmail(
										{
											email: session?.user.email || "",
										},
										{
											onRequest(context) {
												setEmailVerificationPending(true);
											},
											onError(context) {
												toast.error(context.error.message);
												setEmailVerificationPending(false);
											},
											onSuccess() {
												toast.success("Verification email sent successfully");
												setEmailVerificationPending(false);
											},
										},
									);
								}}
							>
								{emailVerificationPending ? (
									<Loader2 size={15} className="animate-spin" />
								) : (
									"Resend Verification Email"
								)}
							</Button>
						</AlertDescription>
					</Alert>
				)}

				<div className="border-l-2 px-2 w-max gap-1 flex flex-col">
					<p className="text-xs font-medium ">Active Sessions</p>
					{activeSessions
						.filter((session) => session.userAgent)
						.map((session) => {
							return (
								<div key={session.id}>
									<div className="flex items-center gap-2 text-sm  text-black font-medium dark:text-white">
										{new UAParser(session.userAgent || "").getDevice().type ===
										"mobile" ? (
											<MobileIcon />
										) : (
											<Laptop size={16} />
										)}
										{new UAParser(session.userAgent || "").getOS().name ||
											session.userAgent}
										, {new UAParser(session.userAgent || "").getBrowser().name}
										<button
											className="text-red-500 opacity-80  cursor-pointer text-xs border-muted-foreground border-red-600  underline "
											onClick={async () => {
												setIsTerminating(session.id);
												const res = await client.revokeSession({
													token: session.token,
												});

												if (res.error) {
													toast.error(res.error.message);
												} else {
													toast.success("Session terminated successfully");
													removeActiveSession(session.id);
												}
												if (session.id === props.session?.session.id)
													router.refresh();
												setIsTerminating(undefined);
											}}
										>
											{isTerminating === session.id ? (
												<Loader2 size={15} className="animate-spin" />
											) : session.id === props.session?.session.id ? (
												"Sign Out"
											) : (
												"Terminate"
											)}
										</button>
									</div>
								</div>
							);
						})}
				</div>
			</CardContent>
			<CardFooter className="gap-2 justify-between items-center">
				{/* <ChangePassword /> */}
				{session?.session.impersonatedBy ? (
					<Button
						className="gap-2 z-10"
						variant="secondary"
						onClick={async () => {
							setIsSignOut(true);
							await client.admin.stopImpersonating();
							setIsSignOut(false);
							toast.info("Impersonation stopped successfully");
							router.push("/admin");
						}}
						disabled={isSignOut}
					>
						<span className="text-sm">
							{isSignOut ? (
								<Loader2 size={15} className="animate-spin" />
							) : (
								<div className="flex items-center gap-2">
									<StopCircle size={16} color="red" />
									Stop Impersonation
								</div>
							)}
						</span>
					</Button>
				) : (
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
				)}
			</CardFooter>
		</Card>
	);
}