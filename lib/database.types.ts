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
            _TenantToUser: {
                Row: {
                    A: string;
                    B: string;
                };
                Insert: {
                    A: string;
                    B: string;
                };
                Update: {
                    A?: string;
                    B?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: '_TenantToUser_A_fkey';
                        columns: ['A'];
                        referencedRelation: 'Tenant';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: '_TenantToUser_B_fkey';
                        columns: ['B'];
                        referencedRelation: 'User';
                        referencedColumns: ['id'];
                    },
                ];
            };
            ChatFlag: {
                Row: {
                    createdAt: string;
                    id: string;
                    messageId: string;
                    seen: boolean;
                    updatedAt: string;
                    userId: string;
                    watchLater: boolean;
                };
                Insert: {
                    createdAt?: string;
                    id?: string;
                    messageId: string;
                    seen?: boolean;
                    updatedAt?: string;
                    userId: string;
                    watchLater?: boolean;
                };
                Update: {
                    createdAt?: string;
                    id?: string;
                    messageId?: string;
                    seen?: boolean;
                    updatedAt?: string;
                    userId?: string;
                    watchLater?: boolean;
                };
                Relationships: [
                    {
                        foreignKeyName: 'ChatFlag_messageId_fkey';
                        columns: ['messageId'];
                        referencedRelation: 'Message';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'ChatFlag_userId_fkey';
                        columns: ['userId'];
                        referencedRelation: 'User';
                        referencedColumns: ['id'];
                    },
                ];
            };
            ChatStamp: {
                Row: {
                    createdAt: string;
                    emoji: string;
                    id: string;
                    messageId: string;
                    updatedAt: string;
                    userId: string;
                };
                Insert: {
                    createdAt?: string;
                    emoji: string;
                    id?: string;
                    messageId: string;
                    updatedAt?: string;
                    userId: string;
                };
                Update: {
                    createdAt?: string;
                    emoji?: string;
                    id?: string;
                    messageId?: string;
                    updatedAt?: string;
                    userId?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'ChatStamp_messageId_fkey';
                        columns: ['messageId'];
                        referencedRelation: 'Message';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'ChatStamp_userId_fkey';
                        columns: ['userId'];
                        referencedRelation: 'User';
                        referencedColumns: ['id'];
                    },
                ];
            };
            File: {
                Row: {
                    createdAt: string;
                    id: string;
                    mimeType: string;
                    size: number;
                    updatedAt: string;
                    url: string;
                };
                Insert: {
                    createdAt?: string;
                    id?: string;
                    mimeType: string;
                    size: number;
                    updatedAt?: string;
                    url: string;
                };
                Update: {
                    createdAt?: string;
                    id?: string;
                    mimeType?: string;
                    size?: number;
                    updatedAt?: string;
                    url?: string;
                };
                Relationships: [];
            };
            FileRelation: {
                Row: {
                    fileId: string;
                    messageId: string | null;
                    taskId: string;
                };
                Insert: {
                    fileId: string;
                    messageId?: string | null;
                    taskId: string;
                };
                Update: {
                    fileId?: string;
                    messageId?: string | null;
                    taskId?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'FileRelation_fileId_fkey';
                        columns: ['fileId'];
                        referencedRelation: 'File';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'FileRelation_messageId_fkey';
                        columns: ['messageId'];
                        referencedRelation: 'Message';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'FileRelation_taskId_fkey';
                        columns: ['taskId'];
                        referencedRelation: 'Task';
                        referencedColumns: ['id'];
                    },
                ];
            };
            Message: {
                Row: {
                    body: Json | null;
                    createdAt: string;
                    id: string;
                    taskId: string;
                    updatedAt: string;
                    userId: string;
                };
                Insert: {
                    body?: Json | null;
                    createdAt?: string;
                    id?: string;
                    taskId: string;
                    updatedAt?: string;
                    userId: string;
                };
                Update: {
                    body?: Json | null;
                    createdAt?: string;
                    id?: string;
                    taskId?: string;
                    updatedAt?: string;
                    userId?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'Message_taskId_fkey';
                        columns: ['taskId'];
                        referencedRelation: 'Task';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'Message_userId_fkey';
                        columns: ['userId'];
                        referencedRelation: 'User';
                        referencedColumns: ['id'];
                    },
                ];
            };
            Project: {
                Row: {
                    createdAt: string;
                    description: string | null;
                    endDate: string | null;
                    id: string;
                    name: string;
                    status: string;
                    taskCount: number;
                    tenantId: string;
                    updatedAt: string;
                };
                Insert: {
                    createdAt?: string;
                    description?: string | null;
                    endDate?: string | null;
                    id?: string;
                    name: string;
                    status: string;
                    taskCount?: number;
                    tenantId: string;
                    updatedAt?: string;
                };
                Update: {
                    createdAt?: string;
                    description?: string | null;
                    endDate?: string | null;
                    id?: string;
                    name?: string;
                    status?: string;
                    taskCount?: number;
                    tenantId?: string;
                    updatedAt?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'Project_tenantId_fkey';
                        columns: ['tenantId'];
                        referencedRelation: 'Tenant';
                        referencedColumns: ['id'];
                    },
                ];
            };
            ProjectPin: {
                Row: {
                    createdAt: string;
                    id: string;
                    projectId: string;
                    updatedAt: string;
                    userId: string;
                };
                Insert: {
                    createdAt?: string;
                    id?: string;
                    projectId: string;
                    updatedAt?: string;
                    userId: string;
                };
                Update: {
                    createdAt?: string;
                    id?: string;
                    projectId?: string;
                    updatedAt?: string;
                    userId?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'ProjectPin_projectId_fkey';
                        columns: ['projectId'];
                        referencedRelation: 'Project';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'ProjectPin_userId_fkey';
                        columns: ['userId'];
                        referencedRelation: 'User';
                        referencedColumns: ['id'];
                    },
                ];
            };
            Task: {
                Row: {
                    createdAt: string;
                    description: string | null;
                    endDate: string | null;
                    id: string;
                    name: string | null;
                    projectId: string;
                    status: string;
                    taskNo: number | null;
                    updatedAt: string;
                };
                Insert: {
                    createdAt?: string;
                    description?: string | null;
                    endDate?: string | null;
                    id?: string;
                    name?: string | null;
                    projectId: string;
                    status: string;
                    taskNo?: number | null;
                    updatedAt?: string;
                };
                Update: {
                    createdAt?: string;
                    description?: string | null;
                    endDate?: string | null;
                    id?: string;
                    name?: string | null;
                    projectId?: string;
                    status?: string;
                    taskNo?: number | null;
                    updatedAt?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'Task_projectId_fkey';
                        columns: ['projectId'];
                        referencedRelation: 'Project';
                        referencedColumns: ['id'];
                    },
                ];
            };
            TaskTag: {
                Row: {
                    createdAt: string;
                    id: string;
                    tagString: string;
                    taskId: string;
                    updatedAt: string;
                    userId: string;
                };
                Insert: {
                    createdAt?: string;
                    id?: string;
                    tagString: string;
                    taskId: string;
                    updatedAt?: string;
                    userId: string;
                };
                Update: {
                    createdAt?: string;
                    id?: string;
                    tagString?: string;
                    taskId?: string;
                    updatedAt?: string;
                    userId?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'TaskTag_taskId_fkey';
                        columns: ['taskId'];
                        referencedRelation: 'Task';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'TaskTag_userId_fkey';
                        columns: ['userId'];
                        referencedRelation: 'User';
                        referencedColumns: ['id'];
                    },
                ];
            };
            TaskUser: {
                Row: {
                    createdAt: string;
                    id: string;
                    taskId: string;
                    updatedAt: string;
                    userId: string;
                };
                Insert: {
                    createdAt?: string;
                    id?: string;
                    taskId: string;
                    updatedAt?: string;
                    userId: string;
                };
                Update: {
                    createdAt?: string;
                    id?: string;
                    taskId?: string;
                    updatedAt?: string;
                    userId?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'TaskUser_taskId_fkey';
                        columns: ['taskId'];
                        referencedRelation: 'Task';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'TaskUser_userId_fkey';
                        columns: ['userId'];
                        referencedRelation: 'User';
                        referencedColumns: ['id'];
                    },
                ];
            };
            Tenant: {
                Row: {
                    createdAt: string;
                    id: string;
                    isSuspended: boolean;
                    name: string | null;
                    updatedAt: string;
                };
                Insert: {
                    createdAt?: string;
                    id?: string;
                    isSuspended?: boolean;
                    name?: string | null;
                    updatedAt?: string;
                };
                Update: {
                    createdAt?: string;
                    id?: string;
                    isSuspended?: boolean;
                    name?: string | null;
                    updatedAt?: string;
                };
                Relationships: [];
            };
            UnreadMessageInfo: {
                Row: {
                    readDateTime: string | null;
                    taskId: string;
                    unreadCount: number;
                    userId: string;
                };
                Insert: {
                    readDateTime?: string | null;
                    taskId: string;
                    unreadCount?: number;
                    userId: string;
                };
                Update: {
                    readDateTime?: string | null;
                    taskId?: string;
                    unreadCount?: number;
                    userId?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'UnreadMessageInfo_taskId_fkey';
                        columns: ['taskId'];
                        referencedRelation: 'Task';
                        referencedColumns: ['id'];
                    },
                    {
                        foreignKeyName: 'UnreadMessageInfo_userId_fkey';
                        columns: ['userId'];
                        referencedRelation: 'User';
                        referencedColumns: ['id'];
                    },
                ];
            };
            User: {
                Row: {
                    bio: string | null;
                    createdAt: string;
                    email: string;
                    emoji: string | null;
                    id: string;
                    isActive: boolean;
                    isServiceManager: boolean;
                    name: string;
                    profileUrl: string | null;
                    role: string | null;
                    updatedAt: string;
                };
                Insert: {
                    bio?: string | null;
                    createdAt?: string;
                    email: string;
                    emoji?: string | null;
                    id: string;
                    isActive?: boolean;
                    isServiceManager?: boolean;
                    name: string;
                    profileUrl?: string | null;
                    role?: string | null;
                    updatedAt?: string;
                };
                Update: {
                    bio?: string | null;
                    createdAt?: string;
                    email?: string;
                    emoji?: string | null;
                    id?: string;
                    isActive?: boolean;
                    isServiceManager?: boolean;
                    name?: string;
                    profileUrl?: string | null;
                    role?: string | null;
                    updatedAt?: string;
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
                    public?: boolean | null;
                    updated_at?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: 'buckets_owner_fkey';
                        columns: ['owner'];
                        referencedRelation: 'users';
                        referencedColumns: ['id'];
                    },
                ];
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
                    path_tokens?: string[] | null;
                    updated_at?: string | null;
                    version?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: 'objects_bucketId_fkey';
                        columns: ['bucket_id'];
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
