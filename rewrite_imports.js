const fs = require('fs');
const path = require('path');

const walk = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        filelist = walk(filepath, filelist);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      filelist.push(filepath);
    }
  }
  return filelist;
};

const files = walk(path.join(__dirname, 'src'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // General mappings
  content = content.replace(/['"](.*?)components\/sections\/(.*?)['"]/g, "'$1components/marketing/sections/$2'");
  content = content.replace(/['"](.*?)components\/layout\/(.*?)['"]/g, "'$1components/marketing/layout/$2'");
  content = content.replace(/['"](.*?)components\/charts\/(.*?)['"]/g, "'$1components/dashboard/charts/$2'");
  content = content.replace(/['"](.*?)components\/controls\/(.*?)['"]/g, "'$1components/dashboard/controls/$2'");
  
  // Specific UI components moved
  content = content.replace(/['"](.*?)components\/ui\/DataTable['"]/g, "'$1components/dashboard/table/DataTable'");
  content = content.replace(/['"](.*?)components\/ui\/PerformanceMonitor['"]/g, "'$1components/dashboard/metrics/PerformanceMonitor'");

  // Fix relative paths that might have changed depth (page.tsx moved from app/ to app/(marketing)/)
  // Actually, wait, app/(marketing)/page.tsx was moved one level deeper, so its relative imports need to go up one more level.
  if (file.includes('app/(marketing)/page.tsx')) {
    content = content.replace(/['"]@\/components/g, "'@/components"); // alias is safe
    content = content.replace(/['"]\.\.\/components/g, "'../../components"); // was likely "@/components" originally in page.tsx anyway. Let's check page.tsx in the next step.
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated imports in ${file}`);
  }
}
