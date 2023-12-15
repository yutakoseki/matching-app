export type Profile = {
    id: string;
    bio?: string | null | undefined;
    interests?: [];
    age?: Number | null | undefined;
    gender?: string | null | undefined;
    birthplace?: string | null | undefined;
    prefecture?: string | null | undefined;
    city?: string | null | undefined;
    height?: Number | null | undefined;
    style?: string | null | undefined;
    oneWord?: string | null | undefined;
    user: User[];
    userId: string;
    createdAt: string;
};

export type User = {
    userId: string;
    id: string;
    name?: string;
    email: string;
    password: string;
    emailVerified?: string | null;
    image?: string;
    createdAt: string;
    profile: Profile;
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

// 画像アップロード
export type UploadStorage = {
    folder: FolderList; // 画像のフォルダリスト
    bucketName: string; // バケットの名前
    id: string;
};
export type FolderList = Array<File>; // 画像のフォルダリスト
export type UploadPathname = {
    path: string; // パス名
};
