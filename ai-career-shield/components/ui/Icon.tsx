'use client';

import React from 'react';
import {
    Briefcase,
    GraduationCap,
    BookOpen,
    Target,
    Lock,
    ShieldCheck,
    TrendingUp,
    Clock,
    Check,
    TriangleAlert,
    Info,
    Zap,
    ArrowRight,
    Search,
    Brain,
    Shield,
    Download,
    Link2,
    X,
    BarChart3,
    Map,
    Paperclip,
    Star,
    Rocket,
    Scale,
    Copy,
    MessageSquare,
    Sparkles,
    FileText,
    Linkedin,
    ChevronDown,
    ChevronRight,
    CircleCheck,
    HelpCircle,
    Loader2
} from 'lucide-react';

const iconMap = {
    professional: Briefcase,
    student: GraduationCap,
    educator: BookOpen,
    audit: Target,
    locked: Lock,
    resilience: ShieldCheck,
    trending: TrendingUp,
    time: Clock,
    check: Check,
    warning: TriangleAlert,
    info: Info,
    help: HelpCircle,
    zap: Zap,
    arrowRight: ArrowRight,
    search: Search,
    brain: Brain,
    shield: Shield,
    download: Download,
    link: Link2,
    close: X,
    chart: BarChart3,
    map: Map,
    paperclip: Paperclip,
    star: Star,
    rocket: Rocket,
    scale: Scale,
    copy: Copy,
    message: MessageSquare,
    sparkles: Sparkles,
    file: FileText,
    linkedin: Linkedin,
    chevronDown: ChevronDown,
    chevronRight: ChevronRight,
    checkCircle: CircleCheck,
    target: Target,
    loader: Loader2,
} as const;

export type IconName = keyof typeof iconMap;

interface IconProps extends React.SVGAttributes<SVGElement> {
    name: IconName;
    size?: number | string;
    strokeWidth?: number;
    className?: string;
}

/**
 * A centralized Icon component that wraps lucide-react icons.
 * 
 * DESIGN RATIONALE:
 * - Enforces an 'outline' style for a professional, editorial look (Forbes-grade).
 * - Standardizes strokeWidth and shrink behavior.
 * - Provides semantic naming for common UI concepts.
 * - Accessibility by default: aria-hidden="true" unless overridden.
 */
export const Icon = ({
    name,
    size = 20,
    strokeWidth = 2,
    className,
    "aria-hidden": ariaHidden = "true",
    ...props
}: IconProps) => {
    const LucideIcon = iconMap[name];

    if (!LucideIcon) {
        console.warn(`Icon "${name}" not found in Icon.tsx mapping.`);
        return null;
    }

    return (
        <LucideIcon
            size={size}
            strokeWidth={strokeWidth}
            className={`shrink-0 ${className || ''}`}
            aria-hidden={ariaHidden}
            {...props}
        />
    );
};
