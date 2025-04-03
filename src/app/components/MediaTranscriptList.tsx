'use client';

import { useState, useEffect } from 'react';

interface MediaTranscriptListProps {
  files: string[];
}

export default function MediaTranscriptList({ files }: MediaTranscriptListProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [fileContent, setFileContent] = useState<string>('');

  const loadFileContent = async (file: string) => {
    try {
      const response = await fetch(`/api/markdown?file=${encodeURIComponent(file)}`);
      const data = await response.json();
      setFileContent(data.content);
    } catch (error) {
      console.error('Error loading file:', error);
      setFileContent('Error loading file content');
    }
  };

  useEffect(() => {
    if (expandedIndex !== null) {
      loadFileContent(files[expandedIndex]);
    }
  }, [expandedIndex, files]);

  return (
    <div className="grid gap-4">
      {files.map((file, index) => (
        <div 
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <button
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="font-medium text-gray-900 dark:text-gray-100">{file}</span>
            <svg
              className={`w-5 h-5 transform transition-transform ${expandedIndex === index ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedIndex === index && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="prose dark:prose-invert max-w-none">
                {expandedIndex === index && (
                  <pre className="whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300">
                    {fileContent}
                  </pre>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}