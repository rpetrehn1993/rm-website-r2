// Figma API integration for design system
import { FigmaApi } from 'figma-api';

const figma = new FigmaApi({
  personalAccessToken: process.env.FIGMA_ACCESS_TOKEN || '',
});

export const getFigmaFile = async (fileKey: string) => {
  try {
    const file = await figma.getFile(fileKey);
    return file;
  } catch (error) {
    console.error('Error fetching Figma file:', error);
    return null;
  }
};

export const getFigmaImages = async (fileKey: string, nodeIds: string[]) => {
  try {
    const images = await figma.getImage(fileKey, {
      ids: nodeIds,
      format: 'svg',
      scale: 2,
    });
    return images;
  } catch (error) {
    console.error('Error fetching Figma images:', error);
    return null;
  }
};

export const extractDesignTokens = (figmaFile: any) => {
  const tokens = {
    colors: {},
    typography: {},
    spacing: {},
    borderRadius: {},
  };

  // Extract colors from styles
  if (figmaFile.styles) {
    Object.values(figmaFile.styles).forEach((style: any) => {
      if (style.styleType === 'FILL') {
        tokens.colors[style.name] = style.description || '';
      }
    });
  }

  return tokens;
};

