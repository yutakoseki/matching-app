'use client';
import { useState } from 'react';
import { UploadImage } from './UploadImage';
import supabase from '@/lib/supabase';
import { FolderList } from '@/types';
import { useCookies } from 'react-cookie';

export default function Upload() {
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
    return (
        <label htmlFor="file-upload">
            <div className="flex items-center justify-center ">
                <div className="w-24 h-24 rounded-full">
                    {path ? (
                        <img
                            src={path}
                            alt=""
                            width="96"
                            height="96"
                            className="w-24 h-24 rounded-full"
                        />
                    ) : (
                        <>
                            <img
                                src={`${cookies.profile?.image}`}
                                alt=""
                                width="96"
                                height="96"
                                className="w-24 h-24 rounded-full"
                            />
                            <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                accept="image/png, image/jpeg"
                                onChange={(e) => {
                                    const fileList = Array.from(e.target?.files || []);
                                    console.log('ファイルリスト', fileList);
                                    handleUploadStorage(fileList);
                                }}
                            />
                        </>
                    )}
                </div>
            </div>
        </label>
    );
}
