'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-screen h-20 absolute bottom-0">
            <Tabs defaultValue="account" className="w-full h-full">
                <TabsList className="w-full h-full flex justify-between">
                    <TabsTrigger value="Home" className="w-full h-full">
                        Home
                    </TabsTrigger>
                    <TabsTrigger value="Friends" className="w-full h-full">
                        Friends
                    </TabsTrigger>
                    <TabsTrigger value="Messages" className="w-full h-full">
                        Messages
                    </TabsTrigger>
                    <TabsTrigger value="Account" className="w-full h-full">
                        <Link href={'/profile'}>Account</Link>
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </footer>
    );
}
