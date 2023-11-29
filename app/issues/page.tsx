import React from 'react';
import {Button, Table, TableColumnHeaderCell} from '@radix-ui/themes';
import Link from 'next/link';
import prisma from '@/prisma/client';

const IssuePage = async () => {
    const issues = await prisma.issue.findMany();

    return (
        <div>
            <div className='mb-5'>
                <Button>
                    <Link href='/issues/new'>New Issue</Link>
                </Button>
            </div>
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        <TableColumnHeaderCell>Issue</TableColumnHeaderCell>
                        <TableColumnHeaderCell className='hidden md:table-cell'>
                            Status
                        </TableColumnHeaderCell>
                        <TableColumnHeaderCell className='hidden md:table-cell'>
                            Created
                        </TableColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map((issue) => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                {issue.title}
                                <div className='block md:hidden'>
                                    {issue.status}
                                </div>
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>
                                {issue.status}
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>
                                {issue.createdAt.toDateString()}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    );
};

export default IssuePage;
