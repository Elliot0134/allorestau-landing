import { useState, useRef } from 'react';
import { useImageCompression } from '@/hooks/useImageCompression';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Image as ImageIcon, CheckCircle2, XCircle } from 'lucide-react';

export const ImageCompressor = () => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string>('');
  const [compressedPreview, setCompressedPreview] = useState<string>('');
  const [stats, setStats] = useState<{
    originalSize: number;
    compressedSize: number;
    ratio: number;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { compressImage, isCompressing, progress, formatFileSize } = useImageCompression();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Vérifier que c'est une image
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image');
      return;
    }

    setOriginalFile(file);

    // Créer preview de l'original
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Compresser l'image
    const result = await compressImage(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: 0.8,
    });

    if (result.error) {
      alert(`Erreur: ${result.error}`);
      return;
    }

    if (result.compressedFile) {
      setCompressedFile(result.compressedFile);

      // Créer preview du fichier compressé
      const compressedReader = new FileReader();
      compressedReader.onloadend = () => {
        setCompressedPreview(compressedReader.result as string);
      };
      compressedReader.readAsDataURL(result.compressedFile);

      // Sauvegarder les stats
      setStats({
        originalSize: result.originalSize,
        compressedSize: result.compressedSize,
        ratio: result.compressionRatio,
      });
    }
  };

  const handleDownload = () => {
    if (!compressedFile) return;

    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed_${compressedFile.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setOriginalFile(null);
    setCompressedFile(null);
    setOriginalPreview('');
    setCompressedPreview('');
    setStats(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-6 h-6" />
            Compresseur d'images
          </CardTitle>
          <CardDescription>
            Compressez vos images avant de les uploader - Jusqu'à 80% de réduction
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Zone d'upload */}
          <div className="mb-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isCompressing}
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                {isCompressing ? 'Compression en cours...' : 'Sélectionner une image'}
              </Button>
            </label>
          </div>

          {/* Barre de progression */}
          {isCompressing && (
            <div className="mb-6">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-center mt-2 text-gray-600">{progress}%</p>
            </div>
          )}

          {/* Statistiques */}
          {stats && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-800">Compression réussie !</h3>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Taille originale</p>
                  <p className="font-bold text-gray-900">{formatFileSize(stats.originalSize)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Taille compressée</p>
                  <p className="font-bold text-green-600">{formatFileSize(stats.compressedSize)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Réduction</p>
                  <p className="font-bold text-green-600">{stats.ratio}%</p>
                </div>
              </div>
            </div>
          )}

          {/* Aperçus côte à côte */}
          {originalPreview && compressedPreview && (
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Image originale */}
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-700">Image originale</h4>
                <div className="border-2 border-gray-300 rounded-lg overflow-hidden aspect-video bg-gray-100">
                  <img
                    src={originalPreview}
                    alt="Original"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  {originalFile?.name} - {formatFileSize(stats?.originalSize || 0)}
                </p>
              </div>

              {/* Image compressée */}
              <div className="space-y-2">
                <h4 className="font-semibold text-green-700">Image compressée</h4>
                <div className="border-2 border-green-500 rounded-lg overflow-hidden aspect-video bg-gray-100">
                  <img
                    src={compressedPreview}
                    alt="Compressée"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm text-green-600">
                  {compressedFile?.name} - {formatFileSize(stats?.compressedSize || 0)}
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          {compressedFile && (
            <div className="flex gap-3">
              <Button onClick={handleDownload} className="flex-1">
                Télécharger l'image compressée
              </Button>
              <Button onClick={handleReset} variant="outline">
                Recommencer
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
