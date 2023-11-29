import {NextRequest, NextResponse} from 'next/server';
import {z} from 'zod';
import prisma from '@/prisma/client';

const createIssueSchema = z.object({
    title: z
        .string()
        .min(3, 'Title is required and must be 3 characters long')
        .max(255),
    description: z
        .string()
        .min(3, 'Description is required and must be 3 characters long'),
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.format(), {status: 400});

    const newIssue = await prisma.issue.create({
        data: {title: body.title, description: body.description},
    });

    return NextResponse.json(newIssue, {status: 201});
}
