export type User = {
  userName: string
  userPhoto: string
  following: number
  followers: number
  publications: number
  aboutYourself: string
  posts: string[]
}

type UsersData = Record<number, User>

type Images = {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string | undefined
  uploadId?: string
}

export const usersData: UsersData = {
  1: {
    userName: 'Kate',
    userPhoto: '/mock-images/userPhoto-1.png',
    following: 2218,
    followers: 2358,
    publications: 2764,
    aboutYourself:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    posts: [
      '/mock-images/card-image-1.png',
      '/mock-images/card-image-2.png',
      '/mock-images/card-image-3.png',
      '/mock-images/card-image-4.png',
      '/mock-images/card-image-5.png',
      '/mock-images/card-image-6.png',
      '/mock-images/card-image-3.png',
      '/mock-images/card-image-4.png',
    ],
  },
  2: {
    userName: 'Julia',
    userPhoto: '/mock-images/userPhoto-2.png',
    following: 1218,
    followers: 4358,
    publications: 3764,
    aboutYourself:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    posts: [
      '/mock-images/card-image-5.png',
      '/mock-images/card-image-4.png',
      '/mock-images/card-image-3.png',
      '/mock-images/card-image-6.png',
      '/mock-images/card-image-3.png',
      '/mock-images/card-image-1.png',
      '/mock-images/card-image-4.png',
      '/mock-images/card-image-1.png',
    ],
  },
  3: {
    userName: 'Michael',
    userPhoto: '/mock-images/userPhoto-3.png',
    following: 1818,
    followers: 5358,
    publications: 764,
    aboutYourself:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    posts: [
      '/mock-images/card-image-6.png',
      '/mock-images/card-image-2.png',
      '/mock-images/card-image-1.png',
      '/mock-images/card-image-4.png',
      '/mock-images/card-image-3.png',
      '/mock-images/card-image-4.png',
      '/mock-images/card-image-5.png',
      '/mock-images/card-image-3.png',
    ],
  },
  4: {
    userName: 'Michael',
    userPhoto: '/mock-images/userPhoto-3.png',
    following: 1818,
    followers: 5358,
    publications: 764,
    aboutYourself:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    posts: [
      '/mock-images/card-image-6.png',
      '/mock-images/card-image-2.png',
      '/mock-images/card-image-1.png',
      '/mock-images/card-image-4.png',
      '/mock-images/card-image-3.png',
      '/mock-images/card-image-4.png',
      '/mock-images/card-image-5.png',
      '/mock-images/card-image-3.png',
    ],
  },
}

export type Post = {
  id: number
  userName: string
  description: string
  location: string
  images: Images[]
  createdAt: string
  updatedAt: string
  ownerId: 1
  avatarOwner: string
  owner: {
    firstName: string
    lastName: string
  }
  likesCount: number
  isLiked: boolean
  avatarWhoLikes: boolean
}

type PostData = Post[]

export const postsData: PostData = [
  {
    id: 1,
    userName: 'Alex',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incd... Show more',
    location: 'location',
    images: [
      {
        url: '/mock-images/card-image-1.png',
        width: 300,
        height: 300,
        fileSize: 300,
        createdAt: '2025-11-17T10:48:43.245Z',
        uploadId: 'string',
      },
      {
        url: '/mock-images/card-image-2.png',
        width: 300,
        height: 300,
        fileSize: 300,
        createdAt: '2025-11-17T10:48:43.245Z',
        uploadId: 'string',
      },
      {
        url: '/mock-images/card-image-3.png',
        width: 300,
        height: 300,
        fileSize: 300,
        createdAt: '2025-11-17T10:48:43.245Z',
        uploadId: 'string',
      },
    ],
    createdAt: '2025-11-17T10:48:43.598Z',
    updatedAt: '2025-11-17T10:48:43.598Z',
    ownerId: 1,
    avatarOwner:
      'https://storage.yandexcloud.net/users-inctagram/users/41/avatar/3359612b-cff9-4b6b-8897-fbbd09153d51-images-45x45',
    owner: {
      firstName: 'firstName',
      lastName: 'lastName',
    },
    likesCount: 1,
    isLiked: true,
    avatarWhoLikes: false,
  },
  {
    id: 2,
    userName: 'Kate',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incd... Show more',
    location: 'location',
    images: [
      {
        url: '/mock-images/card-image-2.png',
        width: 300,
        height: 300,
        fileSize: 300,
        createdAt: '2025-11-17T10:48:43.245Z',
        uploadId: 'string',
      },
      {
        url: '/mock-images/card-image-1.png',
        width: 300,
        height: 300,
        fileSize: 300,
        createdAt: '2025-11-17T10:48:43.245Z',
        uploadId: 'string',
      },
      {
        url: '/mock-images/card-image-3.png',
        width: 300,
        height: 300,
        fileSize: 300,
        createdAt: '2025-11-17T10:48:43.245Z',
        uploadId: 'string',
      },
    ],
    createdAt: '2025-11-17T10:48:43.598Z',
    updatedAt: '2025-11-17T10:48:43.598Z',
    ownerId: 1,
    avatarOwner:
      'https://storage.yandexcloud.net/users-inctagram/users/41/avatar/3359612b-cff9-4b6b-8897-fbbd09153d51-images-45x45',
    owner: {
      firstName: 'firstName',
      lastName: 'lastName',
    },
    likesCount: 1,
    isLiked: true,
    avatarWhoLikes: false,
  },
  {
    id: 3,
    userName: 'Maria',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incd... Show more',
    location: 'location',
    images: [
      {
        url: '/mock-images/card-image-5.png',
        width: 300,
        height: 300,
        fileSize: 300,
        createdAt: '2025-11-17T10:48:43.245Z',
        uploadId: 'string',
      },
      {
        url: '/mock-images/card-image-4.png',
        width: 300,
        height: 300,
        fileSize: 300,
        createdAt: '2025-11-17T10:48:43.245Z',
        uploadId: 'string',
      },
      {
        url: '/mock-images/card-image-3.png',
        width: 300,
        height: 300,
        fileSize: 300,
        createdAt: '2025-11-17T10:48:43.245Z',
        uploadId: 'string',
      },
    ],
    createdAt: '2025-11-17T10:48:43.598Z',
    updatedAt: '2025-11-17T10:48:43.598Z',
    ownerId: 1,
    avatarOwner:
      'https://storage.yandexcloud.net/users-inctagram/users/41/avatar/3359612b-cff9-4b6b-8897-fbbd09153d51-images-45x45',
    owner: {
      firstName: 'firstName',
      lastName: 'lastName',
    },
    likesCount: 1,
    isLiked: true,
    avatarWhoLikes: false,
  },
  {
    id: 4,
    userName: 'Igor',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incd... Show more',
    location: 'location',
    images: [
      {
        url: '/mock-images/card-image-6.png',
        width: 300,
        height: 300,
        fileSize: 300,
        createdAt: '2025-11-17T10:48:43.245Z',
        uploadId: 'string',
      },
      {
        url: '/mock-images/card-image-3.png',
        width: 300,
        height: 300,
        fileSize: 300,
        createdAt: '2025-11-17T10:48:43.245Z',
        uploadId: 'string',
      },
      {
        url: '/mock-images/card-image-1.png',
        width: 300,
        height: 300,
        fileSize: 300,
        createdAt: '2025-11-17T10:48:43.245Z',
        uploadId: 'string',
      },
    ],
    createdAt: '2025-11-17T10:48:43.598Z',
    updatedAt: '2025-11-17T10:48:43.598Z',
    ownerId: 1,
    avatarOwner:
      'https://storage.yandexcloud.net/users-inctagram/users/41/avatar/3359612b-cff9-4b6b-8897-fbbd09153d51-images-45x45',
    owner: {
      firstName: 'firstName',
      lastName: 'lastName',
    },
    likesCount: 1,
    isLiked: true,
    avatarWhoLikes: false,
  },
]
//переделанные типы, пока оставляю, немного позже удалю лишнее

export type Profile = {
  id: number
  userName: string
  firstName: string | null
  lastName: string | null
  city: string | null
  country: string | null
  region: string | null
  dateOfBirth: string | null
  aboutMe: string | null
  avatars: Array<Images | null>
  createdAt: string
}

export const myProfile: Profile = {
  id: 1,
  userName: 'user1',
  firstName: 'John',
  lastName: 'Doe',
  city: 'London',
  country: 'Great Britain',
  region: 'Cambridgeshire',
  dateOfBirth: '2020-01-01',
  aboutMe: 'About me',
  avatars: [
    {
      url: '/mock-images/userPhoto-1.png',
      width: 300,
      height: 300,
      fileSize: 300,
      createdAt: '2025-12-22T13:49:27.575Z',
    },
  ],
  createdAt: '2025-12-22T13:49:27.575Z',
}
export type PostsArray = {
  id: number
  userName: string
  description: string
  location: string | null
  images: Images[]
  createdAt: string
  updatedAt: string
  avatarOwner: string
  ownerId: number
  owner: {
    firstName: string | null
    lastName: string | null
  }
  likesCount: number
  isLiked: boolean
  avatarWhoLikes: []
}

export type AllPosts = {
  totalCount: number
  pageSize: number
  items: PostsArray[]
}
