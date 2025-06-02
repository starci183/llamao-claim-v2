// index-template.ts
import path from "path";

interface FilePath {
  path: string;
  originalPath: string;
}

function defaultIndexTemplate(filePaths: FilePath[]): string {
  const exportEntries = filePaths.map(({ path: filePath }) => {
    const basename = path.basename(filePath, path.extname(filePath));
    const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename;
    return `export { default as ${exportName} } from './${basename}'`;
  });
  return exportEntries.join("\n");
}

export default defaultIndexTemplate;
