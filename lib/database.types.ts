export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
    public: {
        Tables: {
            _prisma_migrations: {
                Row: {
                    applied_steps_count: number;
                    checksum: string;
                    finished_at: string | null;
                    id: string;
                    logs: string | null;
                    migration_name: string;
                    rolled_back_at: string | null;
                    started_at: string;
                };
                Insert: {
                    applied_steps_count?: number;
                    checksum: string;
                    finished_at?: string | null;
                    id: string;
                    logs?: string | null;
                    migration_name: string;
                    rolled_back_at?: string | null;
                    started_at?: string;
                };
                Update: {
                    applied_steps_count?: number;
                    checksum?: string;
                    finished_at?: string | null;
                    id?: string;
                    logs?: string | null;
                    migration_name?: string;
                    rolled_back_at?: string | null;
                    started_at?: string;
                };
                Relationships: [];
            };
            Account: {
                Row: {
                    access_token: string | null;
                    expires_at: number | null;
                    id: string;
                    id_token: string | null;
                    provider: string;
                    providerAccountId: string;
                    refresh_token: string | null;
                    scope: string | null;
                    session_state: string | null;
                    token_type: string | null;
                    type: string;
                    userId: string;
                };
                Insert: {
                    access_token?: string | null;
                    expires_at?: number | null;
                    id?: string;
                    id_token?: string | null;
                    provider: string;
                    providerAccountId: string;
                    refresh_token?: string | null;
                    scope?: string | null;
                    session_state?: string | null;
                    token_type?: string | null;
                    type: string;
                    userId: string;
                };
                Update: {
                    access_token?: string | null;
                    expires_at?: number | null;
                    id?: string;
                    id_token?: string | null;
                    provider?: string;
                    providerAccountId?: string;
                    refresh_token?: string | null;
                    scope?: string | null;
                    session_state?: string | null;
                    token_type?: string | null;
                    type?: string;
                    userId?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'Account_userId_fkey';
                        columns: ['userId'];
                        isOneToOne: false;
                        referencedRelation: 'User';
                        referencedColumns: ['id'];
                    },
                ];
            };
            Post: {
                Row: {
                    createdAt: string;
                    description: string;
                    id: number;
                    title: string;
                };
                Insert: {
                    createdAt?: string;
                    description: string;
                    id?: number;
                    title: string;
                };
                Update: {
                    createdAt?: string;
                    description?: string;
                    id?: number;
                    title?: string;
                };
                Relationships: [];
            };
            Reset: {
                Row: {
                    id: number;
                };
                Insert: {
                    id?: number;
                };
                Update: {
                    id?: number;
                };
                Relationships: [];
            };
            Room: {
                Row: {
                    createdAt: string;
                    id: string;
                    player1: string;
                    player2: string | null;
                };
                Insert: {
                    createdAt?: string;
                    id?: string;
                    player1: string;
                    player2?: string | null;
                };
                Update: {
                    createdAt?: string;
                    id?: string;
                    player1?: string;
                    player2?: string | null;
                };
                Relationships: [];
            };
            Session: {
                Row: {
                    expires: string;
                    id: string;
                    sessionToken: string;
                    userId: string;
                };
                Insert: {
                    expires: string;
                    id?: string;
                    sessionToken: string;
                    userId: string;
                };
                Update: {
                    expires?: string;
                    id?: string;
                    sessionToken?: string;
                    userId?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'Session_userId_fkey';
                        columns: ['userId'];
                        isOneToOne: false;
                        referencedRelation: 'User';
                        referencedColumns: ['id'];
                    },
                ];
            };
            User: {
                Row: {
                    email: string | null;
                    emailVerified: string | null;
                    id: string;
                    image: string | null;
                    name: string | null;
                    password: string;
                };
                Insert: {
                    email?: string | null;
                    emailVerified?: string | null;
                    id?: string;
                    image?: string | null;
                    name?: string | null;
                    password: string;
                };
                Update: {
                    email?: string | null;
                    emailVerified?: string | null;
                    id?: string;
                    image?: string | null;
                    name?: string | null;
                    password?: string;
                };
                Relationships: [];
            };
            VerificationToken: {
                Row: {
                    expires: string;
                    identifier: string;
                    token: string;
                };
                Insert: {
                    expires: string;
                    identifier: string;
                    token: string;
                };
                Update: {
                    expires?: string;
                    identifier?: string;
                    token?: string;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}
