
export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);

  const pad = (n: number) => n.toString().padStart(2, '0');

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1); // i mesi partono da 0
  const year = date.getFullYear();

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return bytes + " B";
  const kb = 1024;
  const mb = kb * 1024;
  const gb = mb * 1024;

  if (bytes < mb) return (bytes / kb).toFixed(2) + " KB";
  if (bytes < gb) return (bytes / mb).toFixed(2) + " MB";
  return (bytes / gb).toFixed(2) + " GB";
}