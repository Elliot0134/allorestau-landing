# 📸 Système de Compression d'Images

## Installation

```bash
npm install browser-image-compression
```

✅ **Déjà installé dans ce projet**

---

## 🚀 Utilisation Rapide

### Hook personnalisé : `useImageCompression`

Le hook `useImageCompression` est situé dans `src/hooks/useImageCompression.ts`

```typescript
import { useImageCompression } from '@/hooks/useImageCompression';

const MyComponent = () => {
  const { compressImage, isCompressing, progress, formatFileSize } = useImageCompression();

  const handleFileUpload = async (file: File) => {
    const result = await compressImage(file, {
      maxSizeMB: 1,              // Taille maximale : 1 MB
      maxWidthOrHeight: 1920,    // Dimension maximale : 1920px
      useWebWorker: true,        // Utiliser Web Workers (non-bloquant)
      initialQuality: 0.8,       // Qualité : 80%
    });

    if (result.error) {
      console.error('Erreur:', result.error);
      return;
    }

    console.log('Original:', formatFileSize(result.originalSize));
    console.log('Compressé:', formatFileSize(result.compressedSize));
    console.log('Réduction:', result.compressionRatio + '%');

    // Utiliser result.compressedFile pour l'upload
  };

  return (
    <div>
      <input type="file" onChange={(e) => handleFileUpload(e.target.files[0])} />
      {isCompressing && <div>Compression: {progress}%</div>}
    </div>
  );
};
```

---

## 🎨 Composant de Démo

Un composant complet de démonstration est disponible : `ImageCompressor`

**Voir en action :** `http://localhost:8080/image-compression-demo`

Le composant affiche :
- Zone de drop/upload
- Barre de progression en temps réel
- Comparaison visuelle (avant/après)
- Statistiques de compression
- Téléchargement du fichier compressé

---

## ⚙️ Options de Compression

```typescript
interface CompressionOptions {
  maxSizeMB?: number;          // Taille max en MB (défaut: 1)
  maxWidthOrHeight?: number;   // Dimension max en pixels (défaut: 1920)
  useWebWorker?: boolean;      // Utiliser Web Workers (défaut: true)
  fileType?: string;           // Type de sortie : 'image/jpeg', 'image/png', etc.
  initialQuality?: number;     // Qualité de 0 à 1 (défaut: 0.8)
}
```

---

## 📊 Retour du Hook

```typescript
interface CompressionResult {
  compressedFile: File | null;     // Fichier compressé
  originalSize: number;            // Taille originale en bytes
  compressedSize: number;          // Taille compressée en bytes
  compressionRatio: number;        // % de réduction (ex: 75 = 75% plus petit)
  error: string | null;            // Message d'erreur si échec
}
```

---

## 🎯 Cas d'Usage Typiques

### 1. Upload de photos utilisateur

```typescript
const handleAvatarUpload = async (file: File) => {
  const result = await compressImage(file, {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 800,
    initialQuality: 0.7,
  });

  if (!result.error) {
    uploadToServer(result.compressedFile);
  }
};
```

### 2. Galerie d'images

```typescript
const handleGalleryUpload = async (files: File[]) => {
  const compressed = await Promise.all(
    files.map(file => compressImage(file, {
      maxSizeMB: 2,
      maxWidthOrHeight: 2048,
      useWebWorker: true,
    }))
  );

  const validFiles = compressed
    .filter(r => !r.error)
    .map(r => r.compressedFile);

  uploadMultipleToServer(validFiles);
};
```

### 3. Conversion de format

```typescript
const convertToWebP = async (file: File) => {
  const result = await compressImage(file, {
    maxSizeMB: 1,
    fileType: 'image/webp',  // Convertir en WebP
    initialQuality: 0.85,
  });

  return result.compressedFile;
};
```

---

## 🔧 Fonctionnalités Avancées

### Callback de progression

```typescript
const options = {
  maxSizeMB: 1,
  onProgress: (percent) => {
    console.log(`Progression: ${percent}%`);
    updateProgressBar(percent);
  }
};
```

### Prévisualisation avant/après

```typescript
const showPreview = (file: File, compressedFile: File) => {
  // Original
  const originalURL = URL.createObjectURL(file);

  // Compressé
  const compressedURL = URL.createObjectURL(compressedFile);

  // Afficher les deux images côte à côte
  // N'oubliez pas de révoquer les URLs après usage
  // URL.revokeObjectURL(originalURL);
};
```

---

## 📈 Performances

- **Web Workers** : La compression ne bloque pas le thread principal
- **Formats supportés** : JPEG, PNG, WebP, BMP
- **Réduction typique** : 60-80% de réduction de taille
- **Vitesse** : ~1-2 secondes pour une image de 5MB

---

## 🧪 Test de la Démo

1. Démarrer le serveur de dev :
   ```bash
   npm run dev
   ```

2. Ouvrir dans le navigateur :
   ```
   http://localhost:8080/image-compression-demo
   ```

3. Sélectionner une image et observer :
   - Barre de progression
   - Comparaison visuelle
   - Statistiques de compression
   - Possibilité de télécharger

---

## 📦 Fichiers Créés

```
src/
├── hooks/
│   └── useImageCompression.ts          # Hook principal
├── components/
│   └── ImageCompressor.tsx             # Composant de démo
└── pages/
    └── ImageCompressionDemo.tsx        # Page de démo complète
```

---

## 💡 Tips

1. **Qualité optimale** : Utilisez `initialQuality: 0.8` pour un bon équilibre qualité/taille
2. **Photos** : `maxWidthOrHeight: 1920` suffit pour la plupart des affichages web
3. **Avatars** : `maxWidthOrHeight: 500` et `maxSizeMB: 0.2` sont suffisants
4. **Performance** : Toujours activer `useWebWorker: true` pour les grandes images
5. **Format** : WebP offre la meilleure compression, mais vérifiez la compatibilité navigateur

---

## 🔗 Ressources

- [Documentation browser-image-compression](https://www.npmjs.com/package/browser-image-compression)
- [GitHub du package](https://github.com/Donaldcwl/browser-image-compression)
- **Téléchargements hebdomadaires** : ~287,000
- **Dernière mise à jour** : Régulièrement maintenu

---

**Créé pour AlloRestau** 🍕
