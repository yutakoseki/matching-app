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

const HeightSelect: React.FC<AgeSelectProps> = ({ value, onChange }) => {
    const ageOptions = Array.from({ length: 200 - 140 + 1 }, (_, index) =>
        (index + 140).toString()
    );
    return (
        <Select onValueChange={(val) => onChange(val as string)} defaultValue={value}>
            <SelectTrigger>
                <SelectValue placeholder={value ? value.toString() : '140'} />
            </SelectTrigger>
            <SelectContent>
                {ageOptions.map((height) => (
                    <SelectItem key={height} value={height}>
                        {height}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default HeightSelect;
