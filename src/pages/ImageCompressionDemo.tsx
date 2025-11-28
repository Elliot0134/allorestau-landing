import { ImageCompressor } from '@/components/ImageCompressor';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ImageCompressionDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Button>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Démo de compression d'images</h1>
          <p className="text-gray-600">
            Testez la compression d'images avec browser-image-compression
          </p>
        </div>

        <ImageCompressor />

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">Comment ça marche ?</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-lg mb-2">1. Sélectionnez une image</h3>
                <p>Choisissez n'importe quelle image de votre ordinateur (JPEG, PNG, WebP, BMP)</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">2. Compression automatique</h3>
                <p>L'image est compressée automatiquement avec Web Workers (non-bloquant)</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Taille maximale : 1 MB</li>
                  <li>Dimensions max : 1920px</li>
                  <li>Qualité : 80%</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">3. Comparez et téléchargez</h3>
                <p>Visualisez la différence de taille et téléchargez l'image compressée</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
            <h3 className="font-bold text-blue-900 mb-2">Pour les développeurs</h3>
            <p className="text-blue-800 mb-3">
              Utilisez le hook <code className="bg-blue-100 px-2 py-1 rounded">useImageCompression</code> dans vos composants :
            </p>
            <pre className="bg-blue-900 text-blue-50 p-4 rounded overflow-x-auto text-sm">
{`import { useImageCompression } from '@/hooks/useImageCompression';

const { compressImage, isCompressing, progress } = useImageCompression();

const result = await compressImage(file, {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  initialQuality: 0.8,
});`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCompressionDemo;
