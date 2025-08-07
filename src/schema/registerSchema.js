import * as zod from 'zod'



const registerSchema = zod.object(
    {
        name: zod.string()
            .nonempty("Name is required")
            .min(3, 'Name must be at least 3 characters long')
            .max(30, 'Name must be at most 30 characters long'),
        
        email: zod.email('Email is invalid'),

        password: zod.string()
            .nonempty('Password is required')
            .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 
                'Password must be at least eight characters, one letter, one number and one special character'),

        rePassword: zod.string()
            .nonempty('Confirm password is required'),

        dateOfBirth: zod.coerce.date()
            .refine((date) => {
                const birthYear = date.getFullYear() + (date.getMonth()/12);
                const nowDateData = new Date();
                const nowYear = nowDateData.getFullYear() + (nowDateData.getMonth()/12);
                const age = nowYear - birthYear;
                return age >= 18
            }, {message: 'You must be at least 18 years old'})
        ,

        gender: zod.string()
            .nonempty('Gender is required')
            .regex(/^(male|female)$/, 'Gender must be male or female')
        
        
    }
).refine((data) => data.password === data.rePassword, {message:'Confirm Password must match Password', path:['rePassword']} )



export default registerSchema