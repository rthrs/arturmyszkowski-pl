export interface NavItem {
    label: string;
    id: string;
}

export const NAV_ITEMS: NavItem[] = [
    { label: "About", id: "about" },
    { label: "Skills", id: "frontend-expertise" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "resume" },
    { label: "Contact", id: "contact" }
];
