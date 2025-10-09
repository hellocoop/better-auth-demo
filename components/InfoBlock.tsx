import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function InfoBlock() {
	return (
        <>
            <div className="flex flex-col gap-3 pt-10 flex-wrap">
                <div className="border-y py-2 border-dotted bg-secondary/60 opacity-80">
                    <div className="text-xs text-center gap-2 text-muted-foreground">
                        This sample app demonstrates how you can add Hellō login and registration to Better Auth in seconds using the <a href="https://www.npmjs.com/package/@hellocoop/better-auth" className="inline underline">@hellocoop/better-auth</a> plugin package.
                    </div>
                </div>
            </div>
            <div className="flex gap-3 mt-2">
                <Link href="https://www.npmjs.com/package/@hellocoop/better-auth" target="_blank" className="w-1/3">
                    <Card>
                        <CardHeader className="p-4">
                            <CardTitle className="text-sm">Add Hello to Better Auth<br/>@hellocoop/better-auth</CardTitle>
                            <span className="text-xs">npm</span>
                        </CardHeader>
                    </Card>
                </Link>
                <Link href="https://github.com/hellocoop/better-auth-demo" target="_blank" className="w-1/3">
                    <Card>
                        <CardHeader className="p-4">
                            <CardTitle className="text-sm">Checkout this demo app<br/>better-auth-demo</CardTitle>
                            <span className="text-xs">GitHub</span>
                        </CardHeader>
                    </Card>
                </Link>
                <Link href="https://www.hello.coop/" target="_blank" className="w-1/3">
                    <Card>
                        <CardHeader className="p-4">
                            <CardTitle className="text-sm">Learn more about the<br/>Hellō Co-operative</CardTitle>
                            <span className="text-xs">hello.coop</span>
                        </CardHeader>
                    </Card>
                </Link>
            </div>
        </>
	);
}