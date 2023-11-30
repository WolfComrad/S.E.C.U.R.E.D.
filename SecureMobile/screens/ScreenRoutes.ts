

export const screens = {
    home: 'Home',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    chats: 'Chats',
    friend: "Friend",
    friendRequest: 'FriendRequest',
    twoFactor:"TwoFactor",
} as const;

export type Screens = 'Home' | 'Login' | 'Register' | 'Logout' | 'Chats' | 'FriendRequest' | 'TwoFactor' | "Friend";


