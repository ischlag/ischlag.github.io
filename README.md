# Imanol Schlag - Personal Website

Personal academic website built with Jekyll and Claude Code, featuring research publications, teaching activities, and professional updates.

## About

This is the source code for [ischlag.github.io](https://ischlag.github.io), the personal website of Dr. Imanol Schlag, Research Scientist at the ETH AI Center and co-leader of the LLM effort of the Swiss AI Initiative.

## Features

- **Research Publications** - Organized by thematic areas with direct links
- **Teaching Portfolio** - Current courses and teaching activities at ETH Zurich
- **News & Updates** - Latest talks, publications, and professional activities
- **Team & Collaborations** - Current team members and research partnerships
- **Exploration Articles** - Long-form content with comment system via GitHub PRs
- **Article Versioning** - Semantic versioning system for content updates

## Technical Stack

- **Claude Code** - For development
- **Jekyll** - Static site generator
- **GitHub Pages** - Hosting and deployment
- **SCSS** - Styling with responsive design
- **JavaScript** - Interactive features and comment system
- **JSON** - Publication and content management

## Local Development

```bash
# Install dependencies
bundle install

# Start development server
bundle exec jekyll serve

# View at http://localhost:4000
```

## Content Management

- **Publications**: Edit `_data/publications.json`
- **News**: Update the news section in `index.md`
- **Articles**: Add to `_articles/` directory with versioning support
- **Explorations**: Add to `explorations/` directory

## License

Content © 2025 Imanol Schlag. All rights reserved.

Code is available under MIT License for educational and non-commercial use.