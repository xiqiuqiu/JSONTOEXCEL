
import React, { useState } from 'react';
import { JsonData } from './types';
import FileUpload from './components/FileUpload';
import DataTable from './components/DataTable';
import ExportButton from './components/ExportButton';
import { SheetIcon } from './components/icons';

const App: React.FC = () => {
  const [data, setData] = useState<JsonData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('exported_data');

  const handleFileLoad = (jsonData: JsonData, name: string) => {
    setData(jsonData);
    setError(null);
    setFileName(name.replace(/\.json$/i, ''));
  };

  const handleFileError = (errorMessage: string) => {
    setData(null);
    setError(errorMessage);
  };

  const clearData = () => {
    setData(null);
    setError(null);
    setFileName('exported_data');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-2">
            <SheetIcon className="h-10 w-10 text-emerald-400" />
            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
              JSON to Excel Converter
            </h1>
          </div>
          <p className="text-slate-400 text-lg">
            Upload your JSON file to instantly view and export it as an Excel spreadsheet.
          </p>
        </header>

        <main className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-2xl shadow-slate-950/50 p-6 sm:p-8">
          {data ? (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-semibold text-slate-300">
                  Preview: <span className="font-mono text-emerald-400">{fileName}.json</span>
                </h2>
                <div className="flex items-center gap-4">
                  <button
                    onClick={clearData}
                    className="px-4 py-2 text-sm font-semibold text-slate-300 bg-slate-700 hover:bg-slate-600 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-rose-500"
                  >
                    Upload Another File
                  </button>
                  <ExportButton data={data} fileName={fileName} />
                </div>
              </div>
              <DataTable data={data} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-6 py-10">
              <FileUpload onFileLoad={handleFileLoad} onFileError={handleFileError} />
              {error && (
                <div className="mt-4 text-center bg-rose-500/10 border border-rose-500/30 text-rose-400 px-4 py-3 rounded-md w-full max-w-md">
                  <p className="font-semibold">Oh, snap!</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </div>
          )}
        </main>

        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} JSON to Excel Converter. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
