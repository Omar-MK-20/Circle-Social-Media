import * as zod from 'zod'



const loginSchema = zod.object(
    {
        email: zod.email()
            .nonempty('Email is required'),
        password: zod.string()
            .nonempty('Password is required')
            .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 
                'Password must be at least eight characters, one letter, one number and one special character'),
    }
)

export default loginSchema