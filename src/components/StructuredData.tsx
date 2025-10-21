export default function StructuredData() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Artur Myszkowski",
        jobTitle: "Senior Software Engineer",
        url: "https://arturmyszkowski.pl",
        image: "https://arturmyszkowski.pl/images/profile.jpeg",
        sameAs: ["https://github.com/rthrs", "https://linkedin.com/in/artur-myszkowski"],
        alumniOf: {
            "@type": "EducationalOrganization",
            name: "University of Warsaw",
            url: "https://www.mimuw.edu.pl/en",
            address: {
                "@type": "PostalAddress",
                addressLocality: "Warsaw",
                addressCountry: "Poland"
            }
        },
        knowsAbout: [
            "React",
            "TypeScript",
            "JavaScript",
            "Next.js",
            "WebGL",
            "Three.js",
            "WebAssembly",
            "Data Visualization",
            "Network Analysis",
            "Graph Theory",
            "Frontend Development",
            "Full-Stack Development",
            "Web Performance",
            "Computer Science"
        ],
        description:
            "Senior Software Engineer with 8+ years of experience and Master's degree in Computer Science from University of Warsaw. Specializing in React, TypeScript, WebGL, WebAssembly, and high-performance web applications with interactive data visualization.",
        hasCredential: {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "degree",
            name: "Master's Degree in Computer Science",
            recognizedBy: {
                "@type": "EducationalOrganization",
                name: "University of Warsaw"
            }
        }
    };

    const profilePageSchema = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        mainEntity: {
            "@type": "Person",
            name: "Artur Myszkowski",
            jobTitle: "Senior Software Engineer",
            url: "https://arturmyszkowski.pl"
        },
        breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://arturmyszkowski.pl"
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "About",
                    item: "https://arturmyszkowski.pl#about"
                },
                {
                    "@type": "ListItem",
                    position: 3,
                    name: "Skills",
                    item: "https://arturmyszkowski.pl#frontend-expertise"
                },
                {
                    "@type": "ListItem",
                    position: 4,
                    name: "Projects",
                    item: "https://arturmyszkowski.pl#featured-projects"
                },
                {
                    "@type": "ListItem",
                    position: 5,
                    name: "Resume",
                    item: "https://arturmyszkowski.pl#resume"
                },
                {
                    "@type": "ListItem",
                    position: 6,
                    name: "Contact",
                    item: "https://arturmyszkowski.pl#contact"
                }
            ]
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Artur Myszkowski Portfolio",
        url: "https://arturmyszkowski.pl",
        description:
            "Personal portfolio of Artur Myszkowski, Senior Software Engineer specializing in React, TypeScript, and high-performance web applications.",
        author: {
            "@type": "Person",
            name: "Artur Myszkowski"
        },
        inLanguage: "en-US"
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
            />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        </>
    );
}
