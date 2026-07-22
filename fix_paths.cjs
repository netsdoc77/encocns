const fs = require('fs');
const { execSync } = require('child_process');

// Find all tsx files
const files = execSync('find src -name "*.tsx"').toString().trim().split('\n');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // For <img src="/..."/> JSX attributes
  content = content.replace(/src="\/([^"]+)"/g, 'src={`${import.meta.env.BASE_URL}$1`}');
  content = content.replace(/src='\/([^']+)'/g, 'src={`${import.meta.env.BASE_URL}$1`}');

  // For img: "/..." JS object properties
  content = content.replace(/img:\s*['"]\/([^'"]+)['"]/g, 'img: import.meta.env.BASE_URL + "$1"');

  // For bg-[url('/images/...')] in Tailwind. Change it to inline style:
  // E.g., <div className="... bg-[url('/images/photo.jpg')]"></div>
  // This is tricky. Let's just manually replace it in About.tsx.
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}
