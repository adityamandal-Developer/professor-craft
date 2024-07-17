import {
    HomeIcon,
    LineChart,
    Presentation,
    ListChecks,
    MessageCircle
} from "lucide-react";

const links = [
    {
        label: 'dashboard',
        link: '/dashboard',
        icon: <HomeIcon className="h-5 w-5" />
    },
    {
        label: 'forum',
        link: '/dashboard/forum',
        icon: <MessageCircle className="h-5 w-5" />
    },
    {
        label: 'meetings',
        link: '/dashboard/meetings',
        icon: <Presentation className="h-5 w-5" />
    },
    {
        label: 'todo',
        link: '/dashboard/todo',
        icon: <ListChecks className="h-5 w-5" />
    },
    {
        label: 'analytics',
        link: '/dashboard/analytics',
        icon: <LineChart className="h-5 w-5" />
    }
];

export default links;
