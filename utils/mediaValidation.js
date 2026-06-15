// utils/mediaValidation.js
const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png'];

export default function validateImage(file) {
  const type = file.mimeType ?? file.type;

  if (!ALLOWED_TYPES.includes(type)) {
    return 'Only JPG or PNG files are allowed.';
  }

  if (typeof file.fileSize === 'number' && file.fileSize > MAX_SIZE) {
    return 'Image size must be under 10MB.';
  }

  return null;
}
