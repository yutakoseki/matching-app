'use client';
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Settings } from 'lucide-react';
import { AlignJustify } from 'lucide-react';
import Link from 'next/link';

const HunbergerMenu = () => {
    const ageOptions = Array.from({ length: 120 - 18 + 1 }, (_, index) => (index + 18).toString());
    return (
        <Dialog>
            <DialogTrigger>
                <AlignJustify strokeWidth={1} size={30} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <div className="w-full h-full">
                        <Link
                            href="/settings"
                            className="bg-secondary flex items-center justify-center h-10 m-2 p-4"
                        >
                            <Settings size={18} strokeWidth={1} />
                            <label className="ml-2" htmlFor="settings">
                                設定
                            </label>
                        </Link>
                        <Link
                            href="/settings"
                            className="bg-secondary flex items-center justify-center h-10 m-2 p-4"
                        >
                            <Settings size={18} strokeWidth={1} />
                            <label className="ml-2" htmlFor="settings">
                                設定
                            </label>
                        </Link>
                        <Link
                            href="/settings"
                            className="bg-secondary flex items-center justify-center h-10 m-2 p-4"
                        >
                            <Settings size={18} strokeWidth={1} />
                            <label className="ml-2" htmlFor="settings">
                                設定
                            </label>
                        </Link>
                        <Link
                            href="/settings"
                            className="bg-secondary flex items-center justify-center h-10 m-2 p-4"
                        >
                            <Settings size={18} strokeWidth={1} />
                            <label className="ml-2" htmlFor="settings">
                                設定
                            </label>
                        </Link>
                        <Link
                            href="/settings"
                            className="bg-secondary flex items-center justify-center h-10 m-2 p-4"
                        >
                            <Settings size={18} strokeWidth={1} />
                            <label className="ml-2" htmlFor="settings">
                                設定
                            </label>
                        </Link>
                        <Link
                            href="/settings"
                            className="bg-secondary flex items-center justify-center h-10 m-2 p-4"
                        >
                            <Settings size={18} strokeWidth={1} />
                            <label className="ml-2" htmlFor="settings">
                                設定
                            </label>
                        </Link>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default HunbergerMenu;
