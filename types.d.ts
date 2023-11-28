export type User = {
    id: string;
    name: String?;
    email: string;
    password: string;
    emailVerified: DateTime?;
    image: String?;
    accounts: Account[];
    sessions: Session[];
};

export type Room = {
    id: string;
    player1: User;
    player2: User;
    createdAt: DateTime;
};
