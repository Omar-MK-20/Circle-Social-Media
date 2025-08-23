import * as zod from 'zod'

const rePasswordSchema = zod.object(
    {
        password: zod.string()
            .nonempty('Password is required')
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
                'Password must be at least eight characters, one uppercase letter, one lowercase letter, one number and one special character'),
        newPassword: zod.string()
            .nonempty('New password is required')
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
                'Password must be at least eight characters, one uppercase letter, one lowercase letter, one number and one special character'),
        confirmNewPassword: zod.string()
            .nonempty('Confirm new password is required')
    }).refine(data => data.newPassword === data.confirmNewPassword,
        {
            message: "Passwords don't match",
            path: ["confirmNewPassword"],
        });

export default rePasswordSchema;