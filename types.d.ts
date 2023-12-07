export type User = {
    id: string;
    name: String?;
    email: string;
    password: string;
    emailVerified: DateTime?;
    image: String?;
    createdAt: DateTime;
    profile: [];
    messages: Message[];
    rooms: UsersOnRooms[];
    matches: UsersOnMatches[];
};

export type Room = {
    id: string;
    player1: string;
    player2: string;
    player1_kifu: [];
    player2_kifu: [];
    kifu1_90: [];
    kifu1_70: [];
    kifu2_90: [];
    kifu2_70: [];
    next_turn: string;
    users: User[];
    createdAt: string;
};
