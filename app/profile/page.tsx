'use client';

import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Profile() {
    const { data: session, status } = useSession();
    const router = useRouter();
    // ユーザー個別のプロフィールに飛ばす
    useEffect(() => {
        const userId = session?.user?.id;
        if (userId) {
            router.push(`/profile/${userId}`);
        }
    });
    return (
        <>
            <p>プロフィール</p>
            <Button>Click here</Button>
        </>
    );
}
