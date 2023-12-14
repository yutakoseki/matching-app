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

const StyleSelect: React.FC<AgeSelectProps> = ({ value, onChange }) => {
    return (
        <Select onValueChange={(val) => onChange(val as string)} defaultValue={value}>
            <SelectTrigger>
                <SelectValue placeholder={value ? value.toString() : '未選択'} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="未選択">未選択</SelectItem>
                <SelectItem value="スリム">スリム</SelectItem>
                <SelectItem value="やや細め">やや細め</SelectItem>
                <SelectItem value="普通">普通</SelectItem>
                <SelectItem value="グラマー">グラマー</SelectItem>
                <SelectItem value="筋肉質">筋肉質</SelectItem>
                <SelectItem value="ややぽっちゃり">ややぽっちゃり</SelectItem>
                <SelectItem value="ぽっちゃり">ぽっちゃり</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default StyleSelect;
