import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Wrapper, WrapperWithQuery } from "@/components/wrapper";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
	title: {
		template: "%s | Hellō Better Auth Demo",
		default: "Hellō Better Auth Demo",
	},
	description: "Next.js demo app showcasing the Better Auth plugin for Hellō",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="icon" href="/favicon/favicon.ico" sizes="any" />
				<link rel="stylesheet" href="https://cdn.hello.coop/css/hello-btn.css" />
			</head>
			<body className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
				<ThemeProvider attribute="class" defaultTheme="dark">
					<Wrapper>
						<WrapperWithQuery>{children}</WrapperWithQuery>
					</Wrapper>
					<Toaster richColors closeButton />
				</ThemeProvider>
			</body>
		</html>
	);
}
