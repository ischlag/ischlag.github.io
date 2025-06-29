#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function showUsage() {
  console.log('Usage: node version-article.js <filename> <version-type> <change-description>');
  console.log('');
  console.log('Arguments:');
  console.log('  filename          Article filename (e.g., "test-article.md")');
  console.log('  version-type      Version increment type: major, minor, or patch');
  console.log('  change-description Description of changes made');
  console.log('');
  console.log('Example:');
  console.log('  node version-article.js test-article.md minor "Added empirical validation section"');
}

function parseFrontmatter(content) {
  const lines = content.split('\n');
  if (lines[0] !== '---') return { data: {}, content: content };
  
  let endIndex = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === '---') {
      endIndex = i;
      break;
    }
  }
  
  if (endIndex === -1) return { data: {}, content: content };
  
  const frontmatter = lines.slice(1, endIndex).join('\n');
  const bodyContent = lines.slice(endIndex + 1).join('\n');
  
  const data = {};
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // Parse arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(v => v.trim().replace(/['"]/g, ''));
      }
      
      data[key] = value;
    }
  });
  
  // Parse changelog if exists
  if (content.includes('changelog:')) {
    const changelogMatch = content.match(/changelog:\s*\n((?:\s*-\s*version:.*\n(?:\s+.*\n)*)*)/);
    if (changelogMatch) {
      const changelogText = changelogMatch[1];
      const entries = [];
      const entryMatches = changelogText.match(/\s*-\s*version:\s*"?([^"\n]+)"?\s*\n\s+date:\s*"?([^"\n]+)"?\s*\n\s+changes:\s*"?([^"\n]+)"?/g);
      if (entryMatches) {
        entryMatches.forEach(match => {
          const versionMatch = match.match(/version:\s*"?([^"\n]+)"?/);
          const dateMatch = match.match(/date:\s*"?([^"\n]+)"?/);
          const changesMatch = match.match(/changes:\s*"?([^"\n]+)"?/);
          if (versionMatch && dateMatch && changesMatch) {
            entries.push({
              version: versionMatch[1],
              date: dateMatch[1],
              changes: changesMatch[1]
            });
          }
        });
      }
      data.changelog = entries;
    }
  }
  
  return { data, content: bodyContent };
}

function stringifyFrontmatter(data, content) {
  let frontmatter = '---\n';
  
  Object.keys(data).forEach(key => {
    if (key === 'changelog') {
      frontmatter += 'changelog:\n';
      data[key].forEach(entry => {
        frontmatter += `  - version: "${entry.version}"\n`;
        frontmatter += `    date: "${entry.date}"\n`;
        frontmatter += `    changes: "${entry.changes}"\n`;
      });
    } else if (Array.isArray(data[key])) {
      frontmatter += `${key}: [${data[key].map(v => `"${v}"`).join(', ')}]\n`;
    } else {
      frontmatter += `${key}: "${data[key]}"\n`;
    }
  });
  
  frontmatter += '---\n';
  return frontmatter + content;
}

function incrementVersion(currentVersion, type) {
  const parts = currentVersion.split('.').map(Number);
  
  switch (type.toLowerCase()) {
    case 'major':
      return `${parts[0] + 1}.0.0`;
    case 'minor':
      return `${parts[0]}.${parts[1] + 1}.0`;
    case 'patch':
      return `${parts[0]}.${parts[1]}.${parts[2] + 1}`;
    default:
      throw new Error('Invalid version type. Use: major, minor, or patch');
  }
}

function archiveVersion(filePath, content, version) {
  const articleName = path.basename(filePath, '.md');
  const versionDir = path.join('_articles', '_versions', articleName);
  
  if (!fs.existsSync(versionDir)) {
    fs.mkdirSync(versionDir, { recursive: true });
  }
  
  const archiveFileName = `v${version}.md`;
  const archivePath = path.join(versionDir, archiveFileName);
  
  fs.writeFileSync(archivePath, content);
  console.log(`Archived version ${version} to ${archivePath}`);
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length !== 3) {
    showUsage();
    process.exit(1);
  }
  
  const [filename, versionType, changeDescription] = args;
  const filePath = path.join('_articles', filename);
  
  if (!fs.existsSync(filePath)) {
    console.error(`Error: Article file "${filePath}" not found.`);
    process.exit(1);
  }
  
  try {
    // Read current article
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const parsed = parseFrontmatter(fileContent);
    
    const currentVersion = parsed.data.version || '0.0.0';
    const newVersion = incrementVersion(currentVersion, versionType);
    const currentDate = getCurrentDate();
    
    // Archive the current version before updating
    archiveVersion(filePath, fileContent, currentVersion);
    
    // Update frontmatter
    parsed.data.version = newVersion;
    parsed.data.lastUpdated = currentDate;
    
    // Add to changelog
    if (!parsed.data.changelog) {
      parsed.data.changelog = [];
    }
    
    parsed.data.changelog.unshift({
      version: newVersion,
      date: currentDate,
      changes: changeDescription
    });
    
    // Write updated file
    const updatedContent = stringifyFrontmatter(parsed.data, parsed.content);
    fs.writeFileSync(filePath, updatedContent);
    
    console.log(`Successfully updated ${filename}:`);
    console.log(`  Version: ${currentVersion} → ${newVersion}`);
    console.log(`  Last Updated: ${currentDate}`);
    console.log(`  Change: ${changeDescription}`);
    
  } catch (error) {
    console.error('Error processing article:', error.message);
    process.exit(1);
  }
}

main();