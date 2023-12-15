'use client';
import React, { useState } from 'react';
import { UploadImage } from './UploadImage';
import supabase from '@/lib/supabase';
import { FolderList } from '@/types';
import { useCookies } from 'react-cookie';

const Upload = () => {
    const [path, setPathName] = useState<string | undefined>();
    const [cookies, setCookie, RemoveCookie] = useCookies(['session', 'profile']);

    const handleUploadStorage = async (folder: FolderList | null) => {
        const id = cookies.session.user.id;
        if (!folder || !folder.length) {
            alert('ファイルを選択してください。');
            return;
        } else if (!id) {
            alert('ログインしてください。');
            return;
        }
        const { path } = await UploadImage({
            folder,
            bucketName: 'pictures',
            id: id,
        });
        const { data } = supabase.storage.from('pictures').getPublicUrl(path);

        // ストレージパスをプロフィールに登録
        const url = 'http://localhost:3000/api/profile/upload';
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                image: data.publicUrl,
            }),
        };

        try {
            const response = await fetch(url, params);
            if (!response.ok) {
                alert('更新に失敗しました');
            }
        } catch (error) {
            alert('更新に失敗しました');
        }

        if (path) setPathName(data.publicUrl);
        console.log('ファイルパス', data.publicUrl);
    };

    return null; // 適切なコンポーネントを返すことを忘れずに
};

export { Upload };
