'use client';
import { useState } from 'react';
import { UploadImage } from './UploadImage';
import supabase from '@/lib/supabase';
import { FolderList } from '@/types';

export default function Upload() {
    const [path, setPathName] = useState<string | undefined>();
    const handleUploadStorage = async (folder: FolderList | null) => {
        if (!folder || !folder.length) return;
        const { path } = await UploadImage({
            folder,
            bucketName: 'pictures',
        });
        const { data } = supabase.storage.from('pictures').getPublicUrl(path);
        if (path) setPathName(data.publicUrl);
        console.log(path);
    };
    return (
        <label htmlFor="file-upload">
            <span>アップロードする</span>
            <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept="image/png, image/jpeg"
                onChange={(e) => {
                    const fileList = Array.from(e.target?.files || []);
                    console.log(fileList);
                    handleUploadStorage(fileList);
                }}
            />
            <img src={path} alt="" width="800" height="500" />;
        </label>
    );
}
