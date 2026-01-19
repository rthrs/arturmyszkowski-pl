import { FEATURES } from "@/constants/features";
import ExternalLinkIndicator from "@/components/ui/ExternalLinkIndicator";

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
        <footer role="contentinfo" className={`py-16 px-6 bg-black ${slantClasses}`}>
            <div className="max-w-4xl mx-auto text-center text-sm">
                <p className="text-gray-400 mb-1">© 2026 Artur Myszkowski</p>
                <p className="text-gray-400 text-xs">
                    Built with{" "}
                    <a
                        href="https://nextjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline decoration-blue-500/50 hover:decoration-blue-400/70"
                    >
                        Next.js
                        <ExternalLinkIndicator />
                    </a>
                    {", "}
                    <a
                        href="https://tailwindcss.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200 underline decoration-cyan-500/50 hover:decoration-cyan-400/70"
                    >
                        Tailwind CSS
                        <ExternalLinkIndicator />
                    </a>
                    {", "}
                    <a
                        href="https://www.framer.com/motion/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 transition-colors duration-200 underline decoration-purple-500/50 hover:decoration-purple-400/70"
                    >
                        Framer Motion
                        <ExternalLinkIndicator />
                    </a>
                    {" and "}
                    <a
                        href="https://threejs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200 underline decoration-emerald-500/50 hover:decoration-emerald-400/70"
                    >
                        Three.js
                        <ExternalLinkIndicator />
                    </a>
                </p>
            </div>
        </footer>
    );
}
