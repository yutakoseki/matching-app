import { z } from 'zod';

export const profileSchema = z.object({
    name: z.string({ required_error: '必須項目です' }).min(1, {
        message: 'ユーザー名は必須入力項目です。',
    }),
    email: z
        .string({ required_error: '必須項目です' })
        .email({ message: 'メールアドレスの形式で入力してください。' }),
    password: z.string({ required_error: '必須項目です' }).min(8, {
        message: 'パスワードは8文字以上で入力してください。',
    }),
    bio: z.string().optional(),
});