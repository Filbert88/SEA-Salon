import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  fullName: z.string().min(3, { message: 'Full name must be at least 3 characters long' }),
  phone: z.string().min(10, { message: 'Phone number must be valid' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsedBody = userSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json({
        user: null,
        message: 'Invalid input',
        errors: parsedBody.error.errors,
      }, { status: 400 });
    }

    const { email, fullName, phone, password } = parsedBody.data;

    const existingUserByEmail = await db.user.findUnique({
      where: { email },
    });

    if (existingUserByEmail) {
      console.log('User already exists with this email');
      return NextResponse.json({
        user: null,
        message: 'User already exists with this email',
      }, { status: 409 });
    }

    const existingUserByPhone = await db.user.findUnique({
      where: { phone },
    });

    if (existingUserByPhone) {
      console.log('User already exists with this phone number');
      return NextResponse.json({
        user: null,
        message: 'User already exists with this phone number',
      }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        fullName,
        phone,
        password: hashedPassword,
        role: 'CUSTOMER', 
      },
    });

    return NextResponse.json({
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role,
      },
      message: 'User created successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/user:', error);
    return NextResponse.json({
      user: null,
      message: 'Internal Server Error',
    }, { status: 500 });
  }
}
