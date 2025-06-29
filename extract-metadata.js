#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

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
      
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(v => v.trim().replace(/['"]/g, ''));
      }
      
      data[key] = value;
    }
  });
  
  return { data, content: bodyContent };
}

function extractArticleMetadata() {
  const articlesDir = path.join(__dirname, '_articles');
  const outputFile = path.join(__dirname, '_data', 'articles.json');
  
  if (!fs.existsSync(path.join(__dirname, '_data'))) {
    fs.mkdirSync(path.join(__dirname, '_data'));
  }
  
  if (!fs.existsSync(articlesDir)) {
    console.error('_articles directory not found');
    process.exit(1);
  }
  
  const articles = [];
  const files = fs.readdirSync(articlesDir).filter(file => 
    file.endsWith('.md') && !file.startsWith('.')
  );
  
  files.forEach(filename => {
    const filePath = path.join(articlesDir, filename);
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = parseFrontmatter(content);
    
    const article = {
      filename: filename,
      slug: filename.replace('.md', ''),
      title: parsed.data.title || 'Untitled',
      date: parsed.data.date || null,
      version: parsed.data.version || '1.0.0',
      lastUpdated: parsed.data.lastUpdated || parsed.data.date,
      tags: parsed.data.tags || [],
      wordCount: parsed.content.split(/\s+/).length,
      readingTime: Math.ceil(parsed.content.split(/\s+/).length / 200)
    };
    
    articles.push(article);
  });
  
  articles.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
  
  const metadata = {
    articles: articles,
    totalArticles: articles.length,
    lastGenerated: new Date().toISOString()
  };
  
  fs.writeFileSync(outputFile, JSON.stringify(metadata, null, 2));
  console.log(`Generated metadata for ${articles.length} articles`);
}

if (require.main === module) {
  extractArticleMetadata();
}