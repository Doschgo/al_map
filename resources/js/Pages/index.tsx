import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import React from 'react';

export default function Welcome({laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {


    return (
        <h1>dev</h1>
    );
}
