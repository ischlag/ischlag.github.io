# Imanol Schlag - Personal Website

Personal academic website built with Jekyll, featuring research publications, teaching activities, and professional updates.

## About

Source code for [ischlag.github.io](https://ischlag.github.io), the personal website of Dr. Imanol Schlag, Research Scientist at the ETH AI Center and co-lead of [Apertus](https://arxiv.org/abs/2509.14233), the LLM effort of the Swiss AI Initiative.

## Sections

- **About** - Bio, research focus, news, and selected publications
- **Research** - Full publication list organised by research theme
- **Team** - Current team members and research collaborations
- **Teaching** - Courses and teaching activities at ETH Zurich
- **CV** - Academic curriculum vitae

## Technical Stack

- **Jekyll** - Static site generator
- **GitHub Pages** - Hosting and deployment
- **SCSS** - Styling with responsive design
- **Publications** - `_data/publications.json`, rendered on the Research page

## Local Development

```bash
# Install dependencies
bundle install

# Start development server
bundle exec jekyll serve

# View at http://localhost:4000
```

## Content Management

- **Publications**: Edit `_data/publications.json` and add the key to the matching theme list in `research/index.md`
- **News**: Update the news section in `index.md`; items older than 12 months go inside the "Show older news" block
- **Team/Teaching/CV**: Edit the corresponding `index.md` files

## License

Content © 2026 Imanol Schlag. All rights reserved.

Code is available under MIT License for educational and non-commercial use.
