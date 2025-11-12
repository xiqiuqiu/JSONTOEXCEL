
import React, { useRef } from 'react';
import { JsonData } from '../types';
import { UploadCloudIcon } from './icons';

interface FileUploadProps {
  onFileLoad: (data: JsonData, fileName: string) => void;
  onFileError: (error: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileLoad, onFileError }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        if (!text) {
          onFileError('File is empty.');
          return;
        }
        
        let json = JSON.parse(text);

        // If the parsed JSON is a single object, wrap it in an array for compatibility.
        if (typeof json === 'object' && json !== null && !Array.isArray(json)) {
          json = [json];
        }

        // Validate that the result is a non-empty array of objects.
        if (Array.isArray(json) && json.length > 0 && typeof json[0] === 'object' && json[0] !== null) {
          onFileLoad(json, file.name);
        } else {
          onFileError('Invalid JSON format. The file must contain an array of objects or a single object.');
        }
      } catch (err) {
        onFileError('Error parsing JSON file. Please ensure the file contains valid JSON.');
      }
    };

    reader.onerror = () => {
      onFileError('Failed to read the file.');
    };

    reader.readAsText(file);
     // Reset file input value to allow re-uploading the same file
    if(fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-lg">
      <label
        htmlFor="file-upload"
        className="relative block w-full p-8 text-center border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-emerald-500 hover:bg-slate-700/50 transition-colors"
      >
        <div className="flex flex-col items-center justify-center space-y-3">
            <UploadCloudIcon className="h-12 w-12 text-slate-500" />
            <p className="text-lg font-semibold text-slate-300">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-slate-400">
              JSON file (single object or array of objects)
            </p>
        </div>
        <input
          id="file-upload"
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </label>
    </div>
  );
};

export default FileUpload;
