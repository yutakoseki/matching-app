// input タグのonChangeを使うためにClient Componentにする
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Signup() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Userテーブルへデータを書き込む
    const fetchAsyncAddUser = async () => {
        // 入力されていないものがあれば、登録しない
        if (name === '' || email === '' || password === '') {
            return;
        }

        // APIのURL
        // const url = 'https://quantum-tic-tac-entangle.vercel.app/api/register';
        // local用
        const url = 'http://localhost:3000/api/register';
        // リクエストパラメータ
        const params = {
            method: 'POST',
            // JSON形式のデータのヘッダー
            headers: {
                'Content-Type': 'application/json',
            },
            // リクエストボディ
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
        };

        // APIへのリクエスト
        await fetch(url, params);

        // 入力値を初期化
        setName('');
        setEmail('');
        setPassword('');

        // 画面をリフレッシュ
        router.refresh();
    };

    // inputタグのvalueに変化があった際に実行される
    const changeNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const changeEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const changePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <div>
            <h2>ユーザー登録</h2>
            <div>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={name} onChange={changeNameInput} />
                </div>
                <div>
                    <label>email:</label>
                    <input type="text" name="email" value={email} onChange={changeEmailInput} />
                </div>
                <div>
                    <label>password:</label>
                    <input
                        type="text"
                        name="password"
                        value={password}
                        onChange={changePasswordInput}
                    />
                </div>
                <div>
                    <button onClick={fetchAsyncAddUser}>登録</button>
                </div>
            </div>
        </div>
    );
}
