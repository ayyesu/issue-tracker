'use client';
import {Button, Callout, Text, TextField} from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import {useForm, Controller} from 'react-hook-form';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {createIssueSchema} from '@/app/validationSchema';
import {z} from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
    const router = useRouter();
    const {
        register,
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema),
    });
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            setSubmitting(false);
            setError('An unexpected error occurred. Please try again.');
        }
    });

    return (
        <div className='max-w-xl'>
            {error && (
                <Callout.Root color='red' className='mb-5'>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}

            <form className='space-y-3' onSubmit={onSubmit}>
                <TextField.Root>
                    <TextField.Input
                        placeholder='Title'
                        {...register('title')}
                    />
                </TextField.Root>

                <ErrorMessage>{errors.title?.message}</ErrorMessage>

                <Controller
                    name='description'
                    control={control}
                    render={({field}) => (
                        <SimpleMDE placeholder='Description' {...field} />
                    )}
                />

                <ErrorMessage>{errors.description?.message}</ErrorMessage>

                <Button disabled={submitting}>
                    Submit New Issue {submitting && <Spinner />}
                </Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
