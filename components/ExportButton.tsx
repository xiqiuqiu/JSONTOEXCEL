
import React from 'react';
import { JsonData } from '../types';
import { DownloadIcon } from './icons';

interface ExportButtonProps {
  data: JsonData;
  fileName: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ data, fileName }) => {
  const exportToExcel = () => {
    if (!data || data.length === 0) return;

    try {
      // Create a worksheet from the JSON data
      const worksheet = XLSX.utils.json_to_sheet(data);
      
      // Create a new workbook
      const workbook = XLSX.utils.book_new();
      
      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      
      // Trigger the file download
      XLSX.writeFile(workbook, `${fileName}.xlsx`);
    } catch (error) {
      console.error("Failed to export to Excel:", error);
      alert("An error occurred while exporting the data to Excel. Please check the console for details.");
    }
  };

  return (
    <button
      onClick={exportToExcel}
      className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-emerald-500 shadow-lg shadow-emerald-900/50"
    >
      <DownloadIcon className="h-4 w-4" />
      Export to Excel
    </button>
  );
};

export default ExportButton;
