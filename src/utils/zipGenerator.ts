import JSZip from 'jszip';

export async function downloadRepoZip(
  files: { name: string; content: string }[],
  previewBlob: Blob | null,
  repoName: string = 'kodluyoruzilkrepo'
) {
  const zip = new JSZip();
  const folder = zip.folder(repoName) || zip;

  files.forEach((file) => {
    folder.file(file.name, file.content);
  });

  if (previewBlob) {
    folder.file('preview.png', previewBlob);
  }

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${repoName}.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
