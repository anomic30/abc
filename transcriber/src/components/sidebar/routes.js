import {
  HomeIcon,
  Cog6ToothIcon,
  TrashIcon,
  ShareIcon,
  BookmarkIcon,
  FolderIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

export const sidebarRoutes = [
  {
      path: '/app',
      name: 'Home',
      icon: HomeIcon
  },
  {
      path: '/app/generate',
      name: 'All Files',
      icon: FolderIcon
  },
  {
      path: '/app/courses',
      name: 'Saved',
      icon: BookmarkIcon
  },
  {
      path: '/app/quizzes',
      name: 'Integrations',
      icon: ShareIcon
  },
  {
      path: '/app/insights',
      name: 'Trash',
      icon: TrashIcon
  },
  {
    path: '/app/insights',
    name: 'Settings',
    icon: Cog6ToothIcon
  },
  {
    path: '/app/insights',
    name: 'Help & Support',
    icon: QuestionMarkCircleIcon
  },
]