// utils/mediaValidation.js
const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png'];

export default function validateImage(file) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'Only JPG or PNG files are allowed.';
  }

  if (file.fileSize > MAX_SIZE) {
    return 'Image size must be under 10MB.';
  }

  return null;
}
