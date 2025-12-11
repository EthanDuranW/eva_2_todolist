import * as ImageManipulator from 'expo-image-manipulator';

const MAX_WIDTH = 1024;
const MAX_HEIGHT = 768;

/**
 * Redimensiona una imagen manteniendo el aspect ratio
 * Si la imagen es más pequeña que los límites, no se modifica
 * @param uri URI de la imagen original
 * @returns URI de la imagen redimensionada
 */
export async function resizeImage(uri: string): Promise<string> {
  try {
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: MAX_WIDTH, height: MAX_HEIGHT } }],
      { 
        compress: 0.8,
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );

    return manipulatedImage.uri;
  } catch (error) {
    return uri;
  }
}
