import { FiGithub, FiMail, FiLinkedin, FiFileText } from "react-icons/fi";
import type { IconType } from "react-icons";

export interface SocialLink {
    id: string;
    href: string;
    label: string;
    icon: IconType;
    target?: string;
    rel?: string;
}

export const SOCIAL_LINKS = {
    github: {
        id: "github",
        href: "https://github.com/rthrs",
        label: "GitHub",
        icon: FiGithub,
        target: "_blank",
        rel: "noopener noreferrer"
    },
    linkedin: {
        id: "linkedin",
        href: "https://www.linkedin.com/in/artur-myszkowski",
        label: "LinkedIn",
        icon: FiLinkedin,
        target: "_blank",
        rel: "noopener noreferrer"
    },
    email: {
        id: "email",
        href: "mailto:contact@arturmyszkowski.pl",
        label: "contact@arturmyszkowski.pl",
        icon: FiMail
    },
    resume: {
        id: "resume",
        href: "/documents/Artur_Myszkowski_Resume_2026_01-public.pdf",
        label: "Resume",
        icon: FiFileText,
        target: "_blank",
        rel: "noopener noreferrer"
    }
} as const;

export const HERO_SOCIAL_LINKS: SocialLink[] = [
    SOCIAL_LINKS.github,
    SOCIAL_LINKS.linkedin,
    { ...SOCIAL_LINKS.email, label: "Email" },
    SOCIAL_LINKS.resume
];

export const CONTACT_LINKS: SocialLink[] = [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.email];
