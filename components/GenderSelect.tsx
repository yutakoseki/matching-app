'use client';

import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface AgeSelectProps {
    value: string;
    onChange: (value: string) => void;
}

const GenderSelect: React.FC<AgeSelectProps> = ({ value, onChange }) => {
    return (
        <Select onValueChange={(val) => onChange(val as string)} defaultValue={value}>
            <SelectTrigger>
                <SelectValue placeholder={value ? value.toString() : '未選択'} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="未選択">未選択</SelectItem>
                <SelectItem value="男性">男性</SelectItem>
                <SelectItem value="女性">女性</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default GenderSelect;
