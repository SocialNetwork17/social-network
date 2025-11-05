export interface User {
  userName: string;
  userPhoto: string;
  following: number;
  followers: number;
  publications: number;
  aboutYourself: string;
  posts: string[];
}

type UsersData = Record<number, User>;

export const usersData: UsersData = {
  1: {
    userName: "Kate",
    userPhoto: "/mock-images/userPhoto-1.png",
    following: 2218,
    followers: 2358,
    publications: 2764,
    aboutYourself:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    posts: [
      "/mock-images/card-image-1.png",
      "/mock-images/card-image-2.png",
      "/mock-images/card-image-3.png",
      "/mock-images/card-image-4.png",
      "/mock-images/card-image-5.png",
      "/mock-images/card-image-6.png",
      "/mock-images/card-image-3.png",
      "/mock-images/card-image-4.png",
    ],
  },
  2: {
    userName: "Julia",
    userPhoto: "/mock-images/userPhoto-2.png",
    following: 1218,
    followers: 4358,
    publications: 3764,
    aboutYourself:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    posts: [
      "/mock-images/card-image-5.png",
      "/mock-images/card-image-4.png",
      "/mock-images/card-image-3.png",
      "/mock-images/card-image-6.png",
      "/mock-images/card-image-3.png",
      "/mock-images/card-image-1.png",
      "/mock-images/card-image-4.png",
      "/mock-images/card-image-1.png",
    ],
  },
  3: {
    userName: "Michael",
    userPhoto: "/mock-images/userPhoto-3.png",
    following: 1818,
    followers: 5358,
    publications: 764,
    aboutYourself:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    posts: [
      "/mock-images/card-image-6.png",
      "/mock-images/card-image-2.png",
      "/mock-images/card-image-1.png",
      "/mock-images/card-image-4.png",
      "/mock-images/card-image-3.png",
      "/mock-images/card-image-4.png",
      "/mock-images/card-image-5.png",
      "/mock-images/card-image-3.png",
    ],
  },
};
