export const Path = {
  Feed: '/',
  Create: '/create',
  Profile: '/profile',
  Messenger: '/messenger',
  Search: '/search',
  Statistics: '/statistics',
  Favorites: '/favorites',
  NotFound: '*',
} as const

export const menuItems = [
  { href: Path.Feed, label: 'Feed', icon: 'feed', disabled: false },
  { href: Path.Create, label: 'Create', icon: 'create', disabled: false },
  { href: Path.Profile, label: 'My Profile', icon: 'myProfile', disabled: false },
  { href: Path.Messenger, label: 'Messenger', icon: 'messenger', disabled: false },
  { href: Path.Search, label: 'Search', icon: 'search', disabled: false },
  {
    href: Path.Statistics,
    label: 'Statistics',
    icon: 'statistic',
    disabled: false,
  },
  {
    href: Path.Favorites,
    label: 'Favorites',
    icon: 'favorites',
    disabled: false,
  },
]
