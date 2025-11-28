import { useState } from 'react';
import imageCompression from 'browser-image-compression';

interface CompressionOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
  fileType?: string;
  initialQuality?: number;
}

interface CompressionResult {
  compressedFile: File | null;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  error: string | null;
}

export const useImageCompression = () => {
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);

  const compressImage = async (
    file: File,
    options: CompressionOptions = {}
  ): Promise<CompressionResult> => {
    const {
      maxSizeMB = 1,
      maxWidthOrHeight = 1920,
      useWebWorker = true,
      fileType,
      initialQuality = 0.8,
    } = options;

    setIsCompressing(true);
    setProgress(0);

    const compressionOptions = {
      maxSizeMB,
      maxWidthOrHeight,
      useWebWorker,
      fileType,
      initialQuality,
      onProgress: (progressValue: number) => {
        setProgress(progressValue);
      },
    };

    try {
      const compressedFile = await imageCompression(file, compressionOptions);

      const result: CompressionResult = {
        compressedFile,
        originalSize: file.size,
        compressedSize: compressedFile.size,
        compressionRatio: Math.round((1 - compressedFile.size / file.size) * 100),
        error: null,
      };

      setIsCompressing(false);
      setProgress(100);

      return result;
    } catch (error) {
      setIsCompressing(false);
      setProgress(0);

      return {
        compressedFile: null,
        originalSize: file.size,
        compressedSize: 0,
        compressionRatio: 0,
        error: error instanceof Error ? error.message : 'Erreur de compression',
      };
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return {
    compressImage,
    isCompressing,
    progress,
    formatFileSize,
  };
};
