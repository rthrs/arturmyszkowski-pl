"use client";

import { FiArrowRight } from "react-icons/fi";
import Button, { type ButtonProps } from "./Button";
import { scrollToSection } from "@/utils/scroll";

interface ScrollButtonProps extends Omit<ButtonProps, "rightIcon" | "onClick"> {
    label: string;
    targetSection: string;
}

export default function ScrollButton({ label, targetSection, ...rest }: ScrollButtonProps) {
    const icon = <FiArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform duration-200" />;

    return <Button label={label} rightIcon={icon} onClick={() => scrollToSection(targetSection)} {...rest} />;
}
