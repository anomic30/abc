export const downloadFile = (transcription, fileName) => {
  const blob = new Blob([transcription], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName+'.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}