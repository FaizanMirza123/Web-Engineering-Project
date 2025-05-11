// src/components/ResultsTable.js
import React from 'react';
import { useTable } from '@tanstack/react-table';

export default function ResultsTable({ data }) {
  const columns = React.useMemo(() => [
    { header: 'Payload', accessorKey: 'payload' },
    { header: 'Duration (ms)', accessorKey: 'duration_ms' },
    { header: 'Leaked Data', accessorKey: 'leaked_data', cell: info => JSON.stringify(info.getValue(), null, 2) }
  ], []);
  const table = useTable({ data, columns });
  // render table markup...
}
