interface GradientBackgroundProps {
    direction?: "top" | "bottom";
}

export default function GradientBackground({ direction = "bottom" }: GradientBackgroundProps) {
    const gradientClasses = {
        top: "bg-gradient-to-b from-slate-950/80 to-transparent",
        bottom: "bg-gradient-to-t from-slate-950/80 to-transparent"
    };

    return <div className={`absolute -z-10 inset-0 ${gradientClasses[direction]}`} />;
}
