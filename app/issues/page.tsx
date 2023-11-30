import React from 'react';
import {Table, TableColumnHeaderCell} from '@radix-ui/themes';
import prisma from '@/prisma/client';
import IssueStatusBadge from '../components/IssueStatusBadge';
import delay from 'delay';
import IssueActions from './IssueActions';
import Link from 'next/link';

const IssuePage = async () => {
    const issues = await prisma.issue.findMany();
    await delay(2000);

    return (
        <div>
            <IssueActions />
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
                                <Link href={`/issues/${issue.id}`}>
                                    {issue.title}
                                </Link>
                                <div className='block md:hidden'>
                                    <IssueStatusBadge status={issue.status} />
                                </div>
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>
                                <IssueStatusBadge status={issue.status} />
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
