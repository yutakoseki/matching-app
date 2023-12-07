'use client';

import Login from '../components/Login';
import Signup from '../components/Signup';

export default function welcome() {
    return (
        <>
            <h1 className="text-3xl font-bold underline">Welcome</h1>
            <div className="signin">
                <p>サインアップ</p>
                <Signup />
            </div>
            <div className="login">
                <p>ログイン</p>
                <Login />
            </div>
        </>
    );
}
