import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react'

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'

// Menu items.
const items = [
    {
        title: 'Home',
        url: '/admin',
        icon: Home,
    },
    {
        title: 'Db test',
        url: '/admin/dbtest',
        icon: Inbox,
    },
    {
        title: 'Db stats',
        url: '/admin/dbstats',
        icon: Inbox,
    },
    {
        title: 'Browsers',
        url: '/admin/files',
        icon: Inbox,
    },
    {
        title: 'Hash',
        url: '/admin/hash',
        icon: Calendar,
    },
    {
        title: 'Hash2',
        url: '/admin/hash2',
        icon: Calendar,
    },    
    {
        title: 'Query',
        url: '/admin/query',
        icon: Calendar,
    },
    {
        title: 'Search',
        url: '/search',
        icon: Search,
    },
    {
        title: 'Java',
        url: '/admin/java',
        icon: Settings,
    },    
    {
        title: 'Settings',
        url: '/admin/settings',
        icon: Settings,
    },
]

/**
 *
 * @see https://ui.shadcn.com/docs/components/sidebar
 */
export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
