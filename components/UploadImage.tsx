'use client';
import supabase from '@/lib/supabase';
import { UploadPathname, UploadStorage } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const UploadImage = async ({
    folder,
    bucketName,
    id,
}: UploadStorage): Promise<UploadPathname> => {
    const file = folder[0]; // 1ファイルアップロード
    const pathName = `profiles/${id}/${uuidv4()}`; // パス名の設定
    const { data, error } = await supabase.storage.from(bucketName).upload(pathName, file, {
        cacheControl: '3600',
        upsert: false,
    });
    if (error) throw error;

    return {
        path: data?.path ?? null,
    };
};
