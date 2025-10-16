export default function Divider() {
    return (
        <div
            className="
                section-divider
                [--section-slant:theme(--section-slant-mobile)]
                md:[--section-slant:theme(--section-slant-tablet)]
                lg:[--section-slant:theme(--section-slant-desktop)]
            "
        />
    );
}
