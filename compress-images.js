import sharp from 'sharp';
import { statSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Liste des images à compresser (exclut les logos)
const imagesToCompress = [
  'public/assets/taco_realistic_1763911193817.png',
  'public/assets/items-hero-section/restaurant/restaurant-item-vin.png',
  'public/assets/items-hero-section/restaurant/restaurant-item-hamberger.png',
  'public/assets/items-hero-section/restaurant/restaurant-item-pasta.png',
  'public/assets/items-hero-section/restaurant/restaurant-item-fondant.png',
  'public/assets/items-hero-section/restaurant/restaurant-item-poulet.png',
  'public/assets/items-hero-section/restaurant/restaurant-item-paella.png',
  'public/assets/items-hero-section/pizza/pizza-slice-4-cheeses.png',
  'public/assets/items-hero-section/pizza/pizza-slice-basilic.png',
  'public/assets/items-hero-section/pizza/pizza-slice-ananas.png',
  'public/assets/items-hero-section/pizza/pizza-slice-carbonara.png',
  'public/assets/items-hero-section/pizza/pizza-slice-peperoni.png',
  'public/assets/items-hero-section/pizza/pizza-slice-mushroom.png',
  'public/assets/items-hero-section/pizza/pizza-slice-vegetarian.png',
  'public/assets/items-hero-section/pizza/pizza-slice-bbq.png',
  'public/assets/patterns/pattern-snack.png',
  'public/assets/pasta_plate_1763911209923.png',
  'public/assets/pizza_slice_cheese_1763911151894.png',
  'public/assets/uploaded_image_1763911041440.png',
  'public/assets/burger_realistic_1763911178588.png',
  'public/assets/pizza_slice_pepperoni_1763911115743.png',
  'public/assets/pizza_slice_margherita_1763911132802.png',
  'public/assets/pizza_slice_mushroom_1763912459145.png',
  'public/assets/fleches/2.png',
  'public/assets/fleches/3.png',
  'public/assets/fleches/1.png',
];

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

async function compressImage(filePath) {
  const fullPath = join(__dirname, filePath);

  try {
    const originalSize = statSync(fullPath).size;

    console.log(`\n📸 Compression de: ${filePath}`);
    console.log(`   Taille originale: ${formatFileSize(originalSize)}`);

    // Compresser avec sharp
    await sharp(fullPath)
      .png({
        quality: 85,
        compressionLevel: 9,
        effort: 10,
      })
      .toFile(fullPath + '.tmp');

    // Récupérer la taille du fichier compressé
    const compressedSize = statSync(fullPath + '.tmp').size;
    const ratio = Math.round((1 - compressedSize / originalSize) * 100);

    console.log(`   Taille compressée: ${formatFileSize(compressedSize)}`);

    // Remplacer seulement si c'est plus petit
    if (compressedSize < originalSize) {
      await sharp(fullPath + '.tmp').toFile(fullPath);

      // Supprimer le fichier temporaire
      const { unlinkSync } = await import('fs');
      unlinkSync(fullPath + '.tmp');

      console.log(`   ✅ Réduction: ${ratio}%`);
      return { success: true, originalSize, compressedSize, ratio };
    } else {
      // Supprimer le fichier temporaire
      const { unlinkSync } = await import('fs');
      unlinkSync(fullPath + '.tmp');

      console.log(`   ⚠️  Fichier déjà optimisé, pas de remplacement`);
      return { success: false, originalSize, compressedSize: originalSize, ratio: 0 };
    }

  } catch (error) {
    console.error(`   ❌ Erreur: ${error.message}`);
    return { success: false, originalSize: 0, compressedSize: 0, ratio: 0 };
  }
}

async function compressAllImages() {
  console.log('🚀 Démarrage de la compression des images...\n');
  console.log(`📁 ${imagesToCompress.length} images à compresser (logos exclus)\n`);
  console.log('━'.repeat(60));

  let totalOriginal = 0;
  let totalCompressed = 0;
  let successCount = 0;

  for (const imagePath of imagesToCompress) {
    const result = await compressImage(imagePath);
    if (result.success) {
      successCount++;
      totalOriginal += result.originalSize;
      totalCompressed += result.compressedSize;
    } else if (result.originalSize > 0) {
      // Fichier non compressé mais existant
      totalOriginal += result.originalSize;
      totalCompressed += result.compressedSize;
    }
  }

  console.log('\n' + '━'.repeat(60));
  console.log('\n📊 RÉSUMÉ DE LA COMPRESSION');
  console.log(`   Images compressées avec succès: ${successCount}/${imagesToCompress.length}`);
  console.log(`   Taille totale avant: ${formatFileSize(totalOriginal)}`);
  console.log(`   Taille totale après: ${formatFileSize(totalCompressed)}`);

  if (totalOriginal > 0) {
    const totalRatio = Math.round((1 - totalCompressed / totalOriginal) * 100);
    console.log(`   🎉 Réduction totale: ${totalRatio}%`);
    console.log(`   💾 Économie: ${formatFileSize(totalOriginal - totalCompressed)}`);
  }

  console.log('\n✨ Compression terminée !\n');
}

compressAllImages();
