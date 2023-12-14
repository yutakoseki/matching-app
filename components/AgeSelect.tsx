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

const AgeSelect: React.FC<AgeSelectProps> = ({ value, onChange }) => {
    const ageOptions = Array.from({ length: 120 - 18 + 1 }, (_, index) => (index + 18).toString());
    return (
        <Select onValueChange={(val) => onChange(val as string)} defaultValue={value}>
            <SelectTrigger>
                <SelectValue placeholder={value ? value.toString() : '18'} />
            </SelectTrigger>
            <SelectContent>
                {/* 1から99までの年齢を表示 */}
                {ageOptions.map((age) => (
                    <SelectItem key={age} value={age}>
                        {age}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default AgeSelect;
