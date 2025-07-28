// components/NestedCategoryNav.tsx
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from "next/link"

export function NestedCategoryNav() {
    return (

        <NavigationMenu>
            <NavigationMenuList>
                {/* Electronics */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Electronics</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="grid gap-3 p-4 w-[300px]">
                            <NavigationMenuLink asChild>
                                <Link href="#">Phones</Link>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                                <Link href="#">Laptops</Link>
                            </NavigationMenuLink>

                            {/* Nested Dropdown (Accessories) */}
                            <div className="group relative">
                                <span className="cursor-default text-sm font-medium text-gray-700">
                                    Accessories
                                </span>
                                <div className="absolute left-full top-0 hidden group-hover:block bg-white shadow-md border rounded-md w-[200px] ml-2 p-3">
                                    <ul className="space-y-2">
                                        <li>
                                            <Link href="#" className="text-sm hover:underline">
                                                Chargers
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#" className="text-sm hover:underline">
                                                Headphones
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Fashion */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Fashion</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="grid gap-3 p-4 w-[300px]">
                            <NavigationMenuLink asChild>
                                <Link href="#">Men</Link>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                                <Link href="#">Women</Link>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                                <Link href="#">Kids</Link>
                            </NavigationMenuLink>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
