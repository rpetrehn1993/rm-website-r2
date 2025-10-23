// Figma REST API integration for design system

const FIGMA_API_BASE = 'https://api.figma.com/v1';

const makeFigmaRequest = async (endpoint: string) => {
  const token = process.env.FIGMA_ACCESS_TOKEN;
  if (!token) {
    throw new Error('FIGMA_ACCESS_TOKEN is not set');
  }

  const response = await fetch(`${FIGMA_API_BASE}${endpoint}`, {
    headers: {
      'X-Figma-Token': token,
    },
  });

  if (!response.ok) {
    throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const getFigmaFile = async (fileKey: string) => {
  try {
    const file = await makeFigmaRequest(`/files/${fileKey}`);
    return file;
  } catch (error) {
    console.error('Error fetching Figma file:', error);
    return null;
  }
};

export const getFigmaImages = async (fileKey: string, nodeIds: string[]) => {
  try {
    const ids = nodeIds.join(',');
    const images = await makeFigmaRequest(`/images/${fileKey}?ids=${ids}&format=svg&scale=2`);
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

  // Extract typography from text nodes
  const extractTypography = (node: any) => {
    if (node.type === 'TEXT' && node.style) {
      const fontFamily = node.style.fontFamily;
      const fontSize = node.style.fontSize;
      const fontWeight = node.style.fontWeight;
      
      if (fontFamily) {
        tokens.typography[`${fontFamily}-${fontSize || 'base'}`] = {
          fontFamily,
          fontSize,
          fontWeight,
        };
      }
    }
    
    if (node.children) {
      node.children.forEach(extractTypography);
    }
  };

  if (figmaFile.document) {
    extractTypography(figmaFile.document);
  }

  return tokens;
};

