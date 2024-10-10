"use client"

import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface SideBarButtonProps {
    href: string,
    children: ReactNode
}

const SideBarButton = ({ href, children }: SideBarButtonProps) => {
    const pathname = usePathname()

    return (
        <Button variant={pathname === `${href}` ? "secondary" : "ghost"} className="justify-start gap-2" asChild>
            <Link href={href}>
                {children}
            </Link>
        </Button>
    );
}

export default SideBarButton;