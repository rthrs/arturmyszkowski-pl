# Artur Myszkowski - Personal Website

A modern, minimalist personal website inspired by Cursor's aesthetic, built with Next.js 14, TypeScript, and Tailwind CSS. This website showcases your professional profile as a Senior Software Engineer with a sleek, dark-first design.

## 🚀 Features

- **Cursor-Inspired Design**: Minimalist, dark-first aesthetic with clean typography
- **Responsive**: Optimized for all devices (desktop, tablet, mobile)
- **Performance**: Fast loading with Next.js optimizations
- **SEO Optimized**: Proper meta tags and structured data
- **Accessibility**: WCAG compliant design patterns
- **Smooth Animations**: Subtle Framer Motion animations throughout
- **Analytics**: PostHog (cookie-free, privacy-first)

## 📋 Sections

- **Hero Section**: Professional photo, name, title, and social links
- **About Me**: Professional background and personal story
- **Skills**: Key technical skills with icons and descriptions
- **Resume**: Download link for your CV/resume
- **Contact**: Contact information and social media links

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter (sans-serif) + JetBrains Mono (monospace)
- **Deployment**: Vercel (recommended)

## 🚀 Getting Started

1. **Install dependencies**:

    ```bash
    npm install
    ```

2. **Set up environment variables** (optional, for analytics):

    Create a `.env.local` file in the root directory:

    ```bash
    NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
    NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
    ```

    See [ANALYTICS_SETUP.md](ANALYTICS_SETUP.md) for detailed PostHog setup instructions.

3. **Run the development server**:

    ```bash
    npm run dev
    ```

4. **Open your browser** and visit [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Personal Information

Update the following in `src/app/page.tsx`:

- Name and title in the hero section
- About me content
- Skills and descriptions
- Contact information and social links
- Profile photo (replace `public/profile-photo.jpg`)

### Styling

- Colors: Modify the Tailwind classes throughout the components
- Typography: Update font choices in `src/app/layout.tsx`
- Layout: Adjust spacing, sizing, and layout in the component classes

### Content

- **Profile Photo**: Replace `public/profile-photo.jpg` with your actual photo (recommended: 400x400px or larger)
- **Resume**: Add your actual resume PDF to the public folder and update the download link
- **Social Links**: Update GitHub, LinkedIn, and email links with your actual profiles

### Future Enhancements

The website is structured to easily add:

- **Blog Section**: Add MDX support for blog posts
- **Portfolio**: Create a projects showcase section
- **Contact Form**: Add a functional contact form with form handling

## 📁 Project Structure

```
├── public/
│   ├── profile-photo.jpg    # Your profile photo
│   └── resume.pdf          # Your resume (add this)
├── src/
│   └── app/
│       ├── layout.tsx      # Root layout and metadata
│       ├── page.tsx        # Main homepage
│       └── globals.css     # Global styles
└── package.json
```

## 📊 Analytics

This website uses **PostHog** for cookie-free, privacy-first analytics:

✅ **No cookies** - GDPR compliant, no consent banner needed  
✅ **Privacy-first** - Anonymous tracking only  
✅ **Feature-rich** - Events, insights, session replay

**Tracks:**

- Page views and visitor metrics
- Button clicks and user interactions
- Resume downloads
- Project link clicks (GitHub, live demos, papers)
- Social media link clicks

**Quick Setup**:

1. Sign up at [posthog.com](https://posthog.com/signup)
2. Get your Project API Key and Host
3. Add to environment variables:
    ```bash
    NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
    NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
    ```

**Full guide**: [ANALYTICS_SETUP.md](ANALYTICS_SETUP.md)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in project settings:
    - `NEXT_PUBLIC_POSTHOG_KEY`
    - `NEXT_PUBLIC_POSTHOG_HOST`
4. Deploy with zero configuration

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/arturmyszkowski-pl)

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Add environment variables in site settings:
    - `NEXT_PUBLIC_POSTHOG_KEY`
    - `NEXT_PUBLIC_POSTHOG_HOST`
3. Deploy

### Other Deployment Options

- **AWS Amplify**: Deploy directly from your repository
- **Railway**: Simple deployment with automatic builds

**Important**: Don't forget to add your PostHog environment variables to your deployment platform!

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
