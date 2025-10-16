import { FEATURES } from "@/constants/features";

export default function Footer() {
    const slantClasses = FEATURES.SLANT_ENABLED
        ? `
            slant-top 
            [--slant:theme(--section-slant-mobile)] 
            md:[--slant:theme(--section-slant-tablet)] 
            lg:[--slant:theme(--section-slant-desktop)]
        `
        : "";

    return (
        <footer className={`py-16 px-6 bg-black ${slantClasses}`}>
            <div className="max-w-4xl mx-auto text-center text-sm">
                <p className="text-gray-400 mb-1">© 2025 Artur Myszkowski</p>
                <p className="text-gray-400 text-xs">
                    Built with{" "}
                    <a
                        href="https://nextjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline decoration-blue-500/50 hover:decoration-blue-400/70"
                    >
                        Next.js
                    </a>
                    {", "}
                    <a
                        href="https://tailwindcss.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 underline decoration-cyan-500/50 hover:decoration-cyan-400/70"
                    >
                        Tailwind CSS
                    </a>
                    {", "}
                    <a
                        href="https://www.framer.com/motion/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 transition-colors duration-200 underline decoration-purple-500/50 hover:decoration-purple-400/70"
                    >
                        Framer Motion
                    </a>
                    {" and "}
                    <a
                        href="https://threejs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200 underline decoration-emerald-500/50 hover:decoration-emerald-400/70"
                    >
                        Three.js
                    </a>
                </p>
            </div>
        </footer>
    );
}
