"use client";

import type { ReactNode } from "react";
import { FiArrowRight } from "react-icons/fi";
import Button, { type ButtonProps } from "./Button";

interface CTAButtonProps extends Omit<ButtonProps, "rightIcon"> {
    label: string;
    rightIcon?: ReactNode;
}

export default function CTAButton({ label, rightIcon, variant = "primary", ...rest }: CTAButtonProps) {
    const defaultRightIcon = (
        <FiArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform duration-200" />
    );

    return <Button label={label} rightIcon={rightIcon ?? defaultRightIcon} variant={variant} {...rest} />;
}
