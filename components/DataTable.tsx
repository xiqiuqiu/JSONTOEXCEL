
import React from 'react';
import { JsonData } from '../types';

interface DataTableProps {
  data: JsonData;
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-10 text-slate-400">
        <p>No data to display.</p>
      </div>
    );
  }

  const headers = Object.keys(data[0]);

  const renderCell = (item: any) => {
    if (item === null || item === undefined) {
      return <span className="text-slate-500">null</span>;
    }
    if (typeof item === 'boolean') {
      return item ? 'true' : 'false';
    }
    if (typeof item === 'object') {
      return (
        <pre className="text-xs bg-slate-900/50 p-2 rounded whitespace-pre-wrap break-all">
          {JSON.stringify(item, null, 2)}
        </pre>
      );
    }
    return String(item);
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-700 max-h-[60vh]">
      <table className="w-full text-sm text-left text-slate-300">
        <thead className="text-xs text-slate-400 uppercase bg-slate-700/50 sticky top-0 backdrop-blur-sm">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="px-6 py-3 whitespace-nowrap">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-slate-800 border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
              {headers.map((header, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`} className="px-6 py-4">
                  {renderCell(row[header])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
