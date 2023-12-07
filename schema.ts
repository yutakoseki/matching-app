export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
    graphql_public: {
        Tables: {
            [_ in never]: never;
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            graphql: {
                Args: {
                    operationName?: string;
                    query?: string;
                    variables?: Json;
                    extensions?: Json;
                };
                Returns: Json;
            };
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
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
            Match: {
                Row: {
                    createdAt: string;
                    id: string;
                };
                Insert: {
                    createdAt?: string;
                    id?: string;
                };
                Update: {
                    createdAt?: string;
                    id?: string;
                };
                Relationships: [];
            };
            Message: {
                Row: {
                    createdAt: string;
                    id: string;
                    roomId: string;
                    senderId: string;
                    text: string;
                };
                Insert: {
                    createdAt?: string;
                    id?: string;
                    roomId: string;
                    senderId: string;
                    text: string;
                };
                Update: {
                    createdAt?: string;
                    id?: string;
                    roomId?: string;
                    senderId?: string;
                    text?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'Message_senderId_fkey';
                        columns: ['senderId'];
                        isOneToOne: false;
                        referencedRelation: 'User';
                        referencedColumns: ['id'];
                    },
                ];
            };
            Profile: {
                Row: {
                    age: number | null;
                    bio: string | null;
                    birthplace: string | null;
                    city: string | null;
                    createdAt: string;
                    gender: string | null;
                    height: number | null;
                    id: string;
                    interests: string[] | null;
                    oneWord: string | null;
                    prefecture: string | null;
                    style: string | null;
                    userId: string;
                };
                Insert: {
                    age?: number | null;
                    bio?: string | null;
                    birthplace?: string | null;
                    city?: string | null;
                    createdAt?: string;
                    gender?: string | null;
                    height?: number | null;
                    id?: string;
                    interests?: string[] | null;
                    oneWord?: string | null;
                    prefecture?: string | null;
                    style?: string | null;
                    userId: string;
                };
                Update: {
                    age?: number | null;
                    bio?: string | null;
                    birthplace?: string | null;
                    city?: string | null;
                    createdAt?: string;
                    gender?: string | null;
                    height?: number | null;
                    id?: string;
                    interests?: string[] | null;
                    oneWord?: string | null;
                    prefecture?: string | null;
                    style?: string | null;
                    userId?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'Profile_userId_fkey';
                        columns: ['userId'];
                        isOneToOne: false;
                        referencedRelation: 'User';
                        referencedColumns: ['id'];
                    },
                ];
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
                };
                Insert: {
                    createdAt?: string;
                    id?: string;
                };
                Update: {
                    createdAt?: string;
                    id?: string;
                };
                Relationships: [];
            };
            RoomsOnMessages: {
                Row: {
                    createdAt: string;
                    messageId: string;
                    roomId: string;
                };
                Insert: {
                    createdAt?: string;
                    messageId: string;
                    roomId: string;
                };
                Update: {
                    createdAt?: string;
                    messageId?: string;
                    roomId?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'RoomsOnMessages_messageId_fkey';
                        columns: ['messageId'];
                        isOneToOne: false;
                        referencedRelation: 'Message';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'RoomsOnMessages_roomId_fkey';
                        columns: ['roomId'];
                        isOneToOne: false;
                        referencedRelation: 'Room';
                        referencedColumns: ['id'];
                    },
                ];
            };
            User: {
                Row: {
                    createdAt: string;
                    email: string;
                    id: string;
                    image: string | null;
                    name: string;
                    password: string;
                };
                Insert: {
                    createdAt?: string;
                    email: string;
                    id?: string;
                    image?: string | null;
                    name: string;
                    password: string;
                };
                Update: {
                    createdAt?: string;
                    email?: string;
                    id?: string;
                    image?: string | null;
                    name?: string;
                    password?: string;
                };
                Relationships: [];
            };
            UsersOnMatches: {
                Row: {
                    createdAt: string;
                    matchId: string;
                    userId: string;
                };
                Insert: {
                    createdAt?: string;
                    matchId: string;
                    userId: string;
                };
                Update: {
                    createdAt?: string;
                    matchId?: string;
                    userId?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'UsersOnMatches_matchId_fkey';
                        columns: ['matchId'];
                        isOneToOne: false;
                        referencedRelation: 'Match';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'UsersOnMatches_userId_fkey';
                        columns: ['userId'];
                        isOneToOne: false;
                        referencedRelation: 'User';
                        referencedColumns: ['id'];
                    },
                ];
            };
            UsersOnRooms: {
                Row: {
                    createdAt: string;
                    roomId: string;
                    userId: string;
                };
                Insert: {
                    createdAt?: string;
                    roomId: string;
                    userId: string;
                };
                Update: {
                    createdAt?: string;
                    roomId?: string;
                    userId?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'UsersOnRooms_roomId_fkey';
                        columns: ['roomId'];
                        isOneToOne: false;
                        referencedRelation: 'Room';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'UsersOnRooms_userId_fkey';
                        columns: ['userId'];
                        isOneToOne: false;
                        referencedRelation: 'User';
                        referencedColumns: ['id'];
                    },
                ];
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
    storage: {
        Tables: {
            buckets: {
                Row: {
                    allowed_mime_types: string[] | null;
                    avif_autodetection: boolean | null;
                    created_at: string | null;
                    file_size_limit: number | null;
                    id: string;
                    name: string;
                    owner: string | null;
                    owner_id: string | null;
                    public: boolean | null;
                    updated_at: string | null;
                };
                Insert: {
                    allowed_mime_types?: string[] | null;
                    avif_autodetection?: boolean | null;
                    created_at?: string | null;
                    file_size_limit?: number | null;
                    id: string;
                    name: string;
                    owner?: string | null;
                    owner_id?: string | null;
                    public?: boolean | null;
                    updated_at?: string | null;
                };
                Update: {
                    allowed_mime_types?: string[] | null;
                    avif_autodetection?: boolean | null;
                    created_at?: string | null;
                    file_size_limit?: number | null;
                    id?: string;
                    name?: string;
                    owner?: string | null;
                    owner_id?: string | null;
                    public?: boolean | null;
                    updated_at?: string | null;
                };
                Relationships: [];
            };
            migrations: {
                Row: {
                    executed_at: string | null;
                    hash: string;
                    id: number;
                    name: string;
                };
                Insert: {
                    executed_at?: string | null;
                    hash: string;
                    id: number;
                    name: string;
                };
                Update: {
                    executed_at?: string | null;
                    hash?: string;
                    id?: number;
                    name?: string;
                };
                Relationships: [];
            };
            objects: {
                Row: {
                    bucket_id: string | null;
                    created_at: string | null;
                    id: string;
                    last_accessed_at: string | null;
                    metadata: Json | null;
                    name: string | null;
                    owner: string | null;
                    owner_id: string | null;
                    path_tokens: string[] | null;
                    updated_at: string | null;
                    version: string | null;
                };
                Insert: {
                    bucket_id?: string | null;
                    created_at?: string | null;
                    id?: string;
                    last_accessed_at?: string | null;
                    metadata?: Json | null;
                    name?: string | null;
                    owner?: string | null;
                    owner_id?: string | null;
                    path_tokens?: string[] | null;
                    updated_at?: string | null;
                    version?: string | null;
                };
                Update: {
                    bucket_id?: string | null;
                    created_at?: string | null;
                    id?: string;
                    last_accessed_at?: string | null;
                    metadata?: Json | null;
                    name?: string | null;
                    owner?: string | null;
                    owner_id?: string | null;
                    path_tokens?: string[] | null;
                    updated_at?: string | null;
                    version?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: 'objects_bucketId_fkey';
                        columns: ['bucket_id'];
                        isOneToOne: false;
                        referencedRelation: 'buckets';
                        referencedColumns: ['id'];
                    },
                ];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            can_insert_object: {
                Args: {
                    bucketid: string;
                    name: string;
                    owner: string;
                    metadata: Json;
                };
                Returns: undefined;
            };
            extension: {
                Args: {
                    name: string;
                };
                Returns: string;
            };
            filename: {
                Args: {
                    name: string;
                };
                Returns: string;
            };
            foldername: {
                Args: {
                    name: string;
                };
                Returns: unknown;
            };
            get_size_by_bucket: {
                Args: Record<PropertyKey, never>;
                Returns: {
                    size: number;
                    bucket_id: string;
                }[];
            };
            search: {
                Args: {
                    prefix: string;
                    bucketname: string;
                    limits?: number;
                    levels?: number;
                    offsets?: number;
                    search?: string;
                    sortcolumn?: string;
                    sortorder?: string;
                };
                Returns: {
                    name: string;
                    id: string;
                    updated_at: string;
                    created_at: string;
                    last_accessed_at: string;
                    metadata: Json;
                }[];
            };
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (Database['public']['Tables'] & Database['public']['Views'])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
              Database[PublicTableNameOrOptions['schema']]['Views'])
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
          Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
            Database['public']['Views'])
      ? (Database['public']['Tables'] &
            Database['public']['Views'])[PublicTableNameOrOptions] extends {
            Row: infer R;
        }
          ? R
          : never
      : never;

export type TablesInsert<
    PublicTableNameOrOptions extends
        | keyof Database['public']['Tables']
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof Database['public']['Tables']
      ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
            Insert: infer I;
        }
          ? I
          : never
      : never;

export type TablesUpdate<
    PublicTableNameOrOptions extends
        | keyof Database['public']['Tables']
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
        : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof Database['public']['Tables']
      ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
            Update: infer U;
        }
          ? U
          : never
      : never;

export type Enums<
    PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
        : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
    : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
      ? Database['public']['Enums'][PublicEnumNameOrOptions]
      : never;
