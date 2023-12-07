generator client {
    provider        = "prisma-client-js"
    previewFeatures = ["referentialActions"] // You won't need this in Prisma 3.X or higher.
  }
  
  datasource db {
    provider  = "postgresql"
    url       = env("WRITER_DATABASE_URL")
    directUrl = env("DIRECT_URL")
  }
  
  // reset用
  model Reset {
    id Int @id @default(autoincrement())
  }
  
  model User {
    id        String           @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
    email     String           @unique
    password  String
    image     String?
    createdAt DateTime         @default(now())
    profile   Profile?
    messages  Message[]
    rooms     UsersOnRooms[]
    matches   UsersOnMatches[]
  }
  
  model Profile {
    id        String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
    bio       String?
    interests String[]
    user      User     @relation(fields: [userId], references: [id])
    userId    String   @unique
    createdAt DateTime @default(now())
  }
  
  model Room {
    id        String            @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
    userId    Int
    users     UsersOnRooms[]
    messages  RoomsOnMessages[]
    createdAt DateTime          @default(now())
  }
  
  model UsersOnRooms {
    user      User     @relation(fields: [userid], references: [id])
    userid    String
    room      Room     @relation(fields: [roomid], references: [id])
    roomid    String
    createdAt DateTime @default(now())
  
    @@id([userid, roomid])
  }
  
  model Message {
    id        String            @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
    text      String
    roomId    Int
    sender    User              @relation(fields: [senderId], references: [id])
    senderId  String
    rooms     RoomsOnMessages[]
    createdAt DateTime          @default(now())
  }
  
  model RoomsOnMessages {
    room      Room     @relation(fields: [roomid], references: [id])
    roomid    String
    message   Message  @relation(fields: [messageid], references: [id])
    messageid String
    createdAt DateTime @default(now())
  
    @@id([roomid, messageid])
  }
  
  model Match {
    id        String           @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
    users     UsersOnMatches[]
    createdAt DateTime         @default(now())
  }
  
  model UsersOnMatches {
    user      User     @relation(fields: [userid], references: [id])
    userid    String
    match     Match    @relation(fields: [matchid], references: [id])
    matchid   String
    createdAt DateTime @default(now())
  
    @@id([userid, matchid])
  }
  