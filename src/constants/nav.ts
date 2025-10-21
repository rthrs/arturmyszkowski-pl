export interface NavItem {
    label: string;
    id: string;
}

export const NAV_ITEMS: NavItem[] = [
    { label: "About", id: "about" },
    { label: "Skills", id: "frontend-expertise" },
    { label: "Projects", id: "featured-projects" },
    { label: "Resume", id: "resume" },
    { label: "Contact", id: "contact" }
];
