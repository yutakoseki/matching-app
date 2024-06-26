import { z } from 'zod';

// ユーザー登録
export const registerUserSchema = z.object({
    userid: z
        .string({ required_error: '必須項目です' })
        .min(1, {
            message: 'ユーザーIDは必須入力項目です。',
        })
        .max(15, {
            message: 'ユーザーIDは15文字以内で入力してください。',
        }),
    name: z
        .string({ required_error: '必須項目です' })
        .min(1, {
            message: 'ユーザー名は必須入力項目です。',
        })
        .max(15, {
            message: 'ユーザー名は15文字以内で入力してください。',
        }),
    email: z
        .string({ required_error: '必須項目です' })
        .email({ message: 'メールアドレスの形式で入力してください。' }),
    password: z.string({ required_error: '必須項目です' }).min(8, {
        message: 'パスワードは8文字以上で入力してください。',
    }),
    bio: z
        .string()
        .max(50, {
            message: '自己紹介文は50文字以内で入力してください。',
        })
        .optional(),
});

// プロフィール更新
export const profileSchema = z.object({
    userid: z.string({ required_error: '必須項目です' }).min(1, {
        message: 'ユーザーIDは必須入力項目です。',
    }),
    name: z.string({ required_error: '必須項目です' }).min(1, {
        message: 'ユーザー名は必須入力項目です。',
    }),
    email: z
        .string({ required_error: '必須項目です' })
        .email({ message: 'メールアドレスの形式で入力してください。' }),
    password: z.string({ required_error: '必須項目です' }).min(8, {
        message: 'パスワードは8文字以上で入力してください。',
    }),
    bio: z
        .string()
        .max(50, {
            message: '自己紹介文は50文字以内で入力してください。',
        })
        .optional(),
    age: z.string().optional(),
    gender: z.string().optional(),
    prefecture: z.string().optional(),
    city: z
        .string()
        .max(50, {
            message: '市区町村は30文字以内で入力してください。',
        })
        .optional(),
    birthplace: z.string().optional(),
    height: z.string().optional(),
    style: z.string().optional(),
});
