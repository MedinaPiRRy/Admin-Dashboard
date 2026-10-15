'use client';
import ErrorView from '@/(ui)/dashboard/common/errorView';

const DashboardError = ({ error, reset }) => <ErrorView error={error} reset={reset} />;

export default DashboardError;
