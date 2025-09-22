# Profile Setup Instructions

## Add Your Profile Photo

1. **Replace the placeholder**: Replace `public/profile-photo.jpg` with your actual profile photo
2. **Recommended specifications**:
    - Format: JPG, PNG, or WebP
    - Dimensions: 400x400px or larger (square aspect ratio)
    - File size: Under 1MB for optimal loading
    - Quality: High resolution, professional appearance

3. **Update the code**: In `src/app/page.tsx`, replace the placeholder div with:
    ```tsx
    <Image
        src="/profile-photo.jpg"
        alt="Artur Myszkowski"
        width={128}
        height={128}
        className="w-32 h-32 mx-auto mb-6 rounded-full object-cover"
        priority
    />
    ```

## Add Your Resume

1. **Add your resume**: Place your resume PDF in the `public/` folder
2. **Update the download link**: In `src/app/page.tsx`, update the resume download button:
    ```tsx
    <motion.a
        href="/resume.pdf"
        download="Artur_Myszkowski_Resume.pdf"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
    >
        <Download size={20} className="mr-2" />
        Download Resume
    </motion.a>
    ```

## Update Personal Information

1. **Social Links**: Update the URLs in the social links section:
    - GitHub: `https://github.com/yourusername`
    - LinkedIn: `https://linkedin.com/in/yourprofile`
    - Email: `your.email@domain.com`

2. **About Section**: Customize the about me content to reflect your personal story and experience

3. **Skills**: Update the skills array with your actual technical skills and descriptions

## Customize Styling

1. **Colors**: Modify the color scheme by updating Tailwind classes
2. **Typography**: Adjust fonts in `src/app/layout.tsx`
3. **Layout**: Fine-tune spacing and sizing throughout the components
