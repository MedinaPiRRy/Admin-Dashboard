'use client';
import ErrorView from '@/(ui)/dashboard/common/errorView';

const Error = ({ error, reset }) => <ErrorView error={error} reset={reset} />;

export default Error;
