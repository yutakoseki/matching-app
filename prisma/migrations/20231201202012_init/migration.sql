-- CreateTable
CREATE TABLE "Reset" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Reset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL DEFAULT uuid_generate_v4(),
    "player1" TEXT NOT NULL,
    "player2" TEXT,
    "turn_count" INTEGER NOT NULL,
    "next_turn" TEXT,
    "player1_kifu" INTEGER[],
    "player2_kifu" INTEGER[],
    "kifu1_90" INTEGER[],
    "kifu1_70" INTEGER[],
    "kifu2_90" INTEGER[],
    "kifu2_70" INTEGER[],
    "pre_player1_kifu" INTEGER[],
    "pre_player2_kifu" INTEGER[],
    "pre_kifu1_90" INTEGER[],
    "pre_kifu1_70" INTEGER[],
    "pre_kifu2_90" INTEGER[],
    "pre_kifu2_70" INTEGER[],
    "winner" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnRooms" (
    "userid" TEXT NOT NULL,
    "roomid" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersOnRooms_pkey" PRIMARY KEY ("userid","roomid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UsersOnRooms" ADD CONSTRAINT "UsersOnRooms_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnRooms" ADD CONSTRAINT "UsersOnRooms_roomid_fkey" FOREIGN KEY ("roomid") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
