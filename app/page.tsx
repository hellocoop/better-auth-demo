"use client";

// import { SignInButton, SignInFallback } from "@/components/sign-in-btn";
// import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { client, signIn } from "@/lib/auth-client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { getCallbackURL } from "@/lib/shared";
import { ContinueButton } from "@hellocoop/better-auth";


const features = [
	{
		name: "Email & Password",
		link: "https://www.better-auth.com/docs/authentication/email-password",
	},
	{
		name: "Organization | Teams",
		link: "https://www.better-auth.com/docs/plugins/organization",
	},
	{
		name: "Passkeys",
		link: "https://www.better-auth.com/docs/plugins/passkey",
	},
	{
		name: "Multi Factor",
		link: "https://www.better-auth.com/docs/plugins/2fa",
	},
	{
		name: "Password Reset",
		link: "https://www.better-auth.com/docs/authentication/email-password#request-password-reset",
	},
	{
		name: "Email Verification",
		link: "https://www.better-auth.com/docs/authentication/email-password#email-verification",
	},
	{
		name: "Roles & Permissions",
		link: "https://www.better-auth.com/docs/plugins/organization#roles",
	},
	{
		name: "Rate Limiting",
		link: "https://www.better-auth.com/docs/reference/security#rate-limiting",
	},
	{
		name: "Session Management",
		link: "https://www.better-auth.com/docs/concepts/session-management",
	},
];

export default async function Home() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, startTransition] = useTransition();
	const [rememberMe, setRememberMe] = useState(false);
	const router = useRouter();
	const params = useSearchParams();
	return (
		<div className="min-h-[80vh] flex items-center justify-center overflow-hidden no-visible-scrollbar px-6 md:px-0">
			<main className="flex flex-col gap-4 row-start-2 items-center justify-center">
				<div className="flex flex-col gap-1">
					<h3 className="font-bold text-4xl text-black dark:text-white text-center">
						Better Auth.
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
									All features on this demo are implemented with Better Auth
									without any custom backend code
								</span>
							</div>
						</div>
					</div>
					<ContinueButton className="w-56 mx-auto mt-6 hello-btn-black-and-invert" onClick={async () => {
						await client.signInWithHello({
							callbackURL: "/dashboard",
						})
					}} />
					
				</div>
			</main>
		</div>
	);
}
