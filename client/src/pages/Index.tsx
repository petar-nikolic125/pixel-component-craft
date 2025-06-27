/* ========================================================================
 *  Landing – Index.tsx   ( Ultimate Single-Scroll Landing Page )
 * ===================================================================== */

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { Navigation } from "@/components/layout/Navigation";
import HeroFX from "@/components/ui/HeroFX";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
    ArrowRight,
    Palette,
    Code,
    Sparkles,
    ShieldCheck,
    Hexagon,
    Zap, 
    Layers, 
    Download, 
    Eye,
    Settings, 
    Lock, 
    Rocket, 
    Globe, 
    Shield, 
    Users,
    BarChart3, 
    Clock, 
    Smartphone, 
    Cloud,
    Check, 
    X, 
    Crown,
    Star, 
    TrendingUp,
    Edit3,
    Book,
    Database,
    ChevronRight, 
    Search, 
    FileCode,
    Terminal,
    Package, 
    GitBranch
} from "lucide-react";

/* — star-dots — */
const dots = [
    { x: " 6%", y: "12%", s: 1 },
    { x: "18%", y: "82%", s: 2 },
    { x: "34%", y: "28%", s: 1 },
    { x: "57%", y: "63%", s: 1 },
    { x: "72%", y: "20%", s: 2 },
    { x: "86%", y: "76%", s: 1 },
];

/* ===================================================================== */
/*  DATA ARRAYS FOR UNIFIED SECTIONS                                    */
/* ===================================================================== */

const mainFeatures = [
    {
        icon: <Zap className="w-8 h-8" />,
        title: "Lightning Fast",
        description: "Build pages in minutes with our intuitive drag-and-drop interface. No coding required.",
        badge: "Performance"
    },
    {
        icon: <Palette className="w-8 h-8" />,
        title: "Beautiful Templates",
        description: "Start with professionally designed templates and customize every aspect to match your brand.",
        badge: "Design"
    },
    {
        icon: <Code className="w-8 h-8" />,
        title: "Clean Code Export",
        description: "Export production-ready HTML, CSS, React components, or integrate with your favorite framework.",
        badge: "Developer"
    },
    {
        icon: <Layers className="w-8 h-8" />,
        title: "Advanced Layers",
        description: "Manage complex layouts with our Photoshop-grade layer system. Group, lock, and organize with ease.",
        badge: "Pro"
    },
    {
        icon: <Download className="w-8 h-8" />,
        title: "Multiple Export Options",
        description: "Export as PNG, HTML/CSS, React components, or push directly to GitHub and CodePen.",
        badge: "Export"
    },
    {
        icon: <Eye className="w-8 h-8" />,
        title: "Live Preview",
        description: "See your changes in real-time. Toggle between edit and preview modes instantly.",
        badge: "Preview"
    },
    {
        icon: <Settings className="w-8 h-8" />,
        title: "Component Library",
        description: "Access 40+ pre-built components including heroes, features, testimonials, forms, and more.",
        badge: "Components"
    },
    {
        icon: <Lock className="w-8 h-8" />,
        title: "Version Control",
        description: "Never lose your work with automatic saves and comprehensive undo/redo history.",
        badge: "Safety"
    },
    {
        icon: <Rocket className="w-8 h-8" />,
        title: "One-Click Deploy",
        description: "Deploy your landing pages instantly with our integrated hosting. Get a free subdomain or use your own.",
        badge: "Deploy"
    },
    {
        icon: <Globe className="w-8 h-8" />,
        title: "SEO Optimized",
        description: "Built-in SEO best practices ensure your pages rank well in search engines.",
        badge: "SEO"
    },
    {
        icon: <Shield className="w-8 h-8" />,
        title: "Enterprise Security",
        description: "Bank-level encryption and security practices keep your designs and data safe.",
        badge: "Security"
    },
    {
        icon: <Users className="w-8 h-8" />,
        title: "Team Collaboration",
        description: "Work together in real-time. Share projects, leave comments, and manage permissions.",
        badge: "Teams"
    }
];

const advancedFeatures = [
    {
        icon: <BarChart3 className="w-6 h-6" />,
        title: "Analytics Integration",
        description: "Connect Google Analytics, Mixpanel, or your favorite analytics tool with one click."
    },
    {
        icon: <Clock className="w-6 h-6" />,
        title: "Scheduled Publishing",
        description: "Schedule your pages to go live at the perfect time for your audience."
    },
    {
        icon: <Smartphone className="w-6 h-6" />,
        title: "Mobile-First Design",
        description: "Every component is optimized for mobile devices out of the box."
    },
    {
        icon: <Cloud className="w-6 h-6" />,
        title: "Cloud Storage",
        description: "All your projects backed up in the cloud with unlimited storage on premium plans."
    }
];

const pricingPlans = [
    {
        name: 'Free',
        icon: <Sparkles className="w-6 h-6" />,
        price: { monthly: 0, yearly: 0 },
        description: 'Perfect for trying out ComponentForge',
        features: [
            { text: '3 active projects', included: true },
            { text: 'Basic components library', included: true },
            { text: 'HTML/CSS export', included: true },
            { text: 'Community support', included: true },
            { text: 'ComponentForge subdomain', included: true },
            { text: 'React export', included: false },
            { text: 'Custom domains', included: false },
            { text: 'Team collaboration', included: false },
            { text: 'Priority support', included: false },
            { text: 'Advanced components', included: false }
        ],
        cta: 'Start Free',
        highlighted: false
    },
    {
        name: 'Premium',
        icon: <Rocket className="w-6 h-6" />,
        price: { monthly: 29, yearly: 290 },
        description: 'For professionals and growing teams',
        features: [
            { text: 'Unlimited projects', included: true },
            { text: 'Full components library', included: true },
            { text: 'HTML/CSS export', included: true },
            { text: 'React & Vue export', included: true },
            { text: 'Custom domains', included: true },
            { text: 'Team collaboration (5 users)', included: true },
            { text: 'Priority email support', included: true },
            { text: 'Advanced components', included: true },
            { text: 'GitHub integration', included: true },
            { text: 'White-label export', included: false }
        ],
        cta: 'Start Premium',
        highlighted: true
    },
    {
        name: 'Enterprise',
        icon: <Crown className="w-6 h-6" />,
        price: { monthly: 99, yearly: 990 },
        description: 'For large teams and organizations',
        features: [
            { text: 'Everything in Premium', included: true },
            { text: 'Unlimited team members', included: true },
            { text: 'White-label export', included: true },
            { text: 'Custom integrations', included: true },
            { text: 'Dedicated support', included: true },
            { text: 'SLA guarantee', included: true },
            { text: 'Custom training', included: true },
            { text: 'Priority feature requests', included: true },
            { text: 'Advanced security', included: true },
            { text: 'Custom contracts', included: true }
        ],
        cta: 'Contact Sales',
        highlighted: false
    }
];

const templateCategories = [
    {
        name: 'SaaS Pro',
        icon: '💼',
        description: 'Modern SaaS landing page with pricing tables and feature grids',
        rating: 4.9,
        downloads: '12.5k',
        badge: 'Popular',
        badgeColor: 'bg-purple-500'
    },
    {
        name: 'Creative Agency',
        icon: '🎨',
        description: 'Bold and creative design for digital agencies',
        rating: 4.8,
        downloads: '8.9k',
        badge: 'New',
        badgeColor: 'bg-green-500'
    },
    {
        name: 'Startup Launch',
        icon: '🚀',
        description: 'Perfect for product launches and funding announcements',
        rating: 4.7,
        downloads: '6.2k',
        badge: 'Trending',
        badgeColor: 'bg-blue-500'
    },
    {
        name: 'Portfolio Pro',
        icon: '👤',
        description: 'Showcase your work with this professional portfolio template',
        rating: 4.9,
        downloads: '11.3k',
        badge: 'Featured',
        badgeColor: 'bg-amber-500'
    },
    {
        name: 'E-commerce Store',
        icon: '🛍️',
        description: 'Complete e-commerce solution with product galleries',
        rating: 4.6,
        downloads: '5.8k',
        badge: 'Updated',
        badgeColor: 'bg-teal-500'
    },
    {
        name: 'Blog & Magazine',
        icon: '📰',
        description: 'Content-focused design for blogs and publications',
        rating: 4.5,
        downloads: '4.1k',
        badge: 'Classic',
        badgeColor: 'bg-slate-500'
    }
];

const docSections = [
    {
        title: 'Getting Started',
        icon: <Zap className="w-6 h-6" />,
        description: 'Quick start guides and tutorials to get you building immediately',
        items: [
            { title: 'Introduction', href: '#intro' },
            { title: 'Quick Start', href: '#quick-start' },
            { title: 'Installation', href: '#installation' },
            { title: 'Your First Project', href: '#first-project' }
        ]
    },
    {
        title: 'Editor Guide',
        icon: <Layers className="w-6 h-6" />,
        description: 'Master the visual editor with comprehensive guides',
        items: [
            { title: 'Canvas Overview', href: '#canvas' },
            { title: 'Component Library', href: '#components' },
            { title: 'Layers & Groups', href: '#layers' },
            { title: 'Transform Tools', href: '#transform' },
            { title: 'Keyboard Shortcuts', href: '#shortcuts' }
        ]
    },
    {
        title: 'Components',
        icon: <Package className="w-6 h-6" />,
        description: 'Detailed documentation for all 40+ components',
        items: [
            { title: 'Hero Sections', href: '#hero' },
            { title: 'Feature Blocks', href: '#features' },
            { title: 'Buttons & CTAs', href: '#buttons' },
            { title: 'Forms', href: '#forms' },
            { title: 'Navigation', href: '#navigation' }
        ]
    },
    {
        title: 'Export & Deploy',
        icon: <Download className="w-6 h-6" />,
        description: 'Learn how to export and deploy your projects',
        items: [
            { title: 'HTML/CSS Export', href: '#html-export' },
            { title: 'React Components', href: '#react-export' },
            { title: 'GitHub Integration', href: '#github' },
            { title: 'Custom Hosting', href: '#hosting' }
        ]
    },
    {
        title: 'API Reference',
        icon: <Code className="w-6 h-6" />,
        description: 'Complete API documentation for developers',
        items: [
            { title: 'REST API', href: '#rest-api' },
            { title: 'Webhooks', href: '#webhooks' },
            { title: 'SDK Documentation', href: '#sdk' },
            { title: 'Rate Limits', href: '#limits' }
        ]
    },
    {
        title: 'Advanced Topics',
        icon: <Settings className="w-6 h-6" />,
        description: 'Advanced techniques and best practices',
        items: [
            { title: 'Custom CSS', href: '#custom-css' },
            { title: 'JavaScript Integration', href: '#javascript' },
            { title: 'Performance Tips', href: '#performance' },
            { title: 'SEO Best Practices', href: '#seo' }
        ]
    }
];

/* — tilt util (disabled < sm) — */
function useTilt(el: React.RefObject<HTMLElement>, max = 15) {
    useEffect(() => {
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const active = () => matchMedia("(min-width: 640px)").matches;
        const onScroll = () => {
            if (!el.current) return;
            if (!active()) {
                el.current.style.transform = "none";
                return;
            }
            const { top } = el.current.getBoundingClientRect();
            const tilt = Math.min(Math.max(top / 120, -max), max);
            el.current.style.transform = `rotateY(${tilt}deg)`;
        };
        onScroll();
        addEventListener("scroll", onScroll, { passive: true });
        addEventListener("resize", onScroll, { passive: true });
        return () => {
            removeEventListener("scroll", onScroll);
            removeEventListener("resize", onScroll);
        };
    }, [el, max]);
}

/* ===================================================================== */
/*  MAIN PAGE                                                            */
/* ===================================================================== */
export default function Index() {
    const heroSec = useRef<HTMLElement>(null);
    const heroTxt = useRef<HTMLDivElement>(null);
    useTilt(heroTxt);

    return (
        <>
            {/* Skip link */}
            <a
                href="#main"
                className="sr-only focus:not-sr-only fixed top-2 left-2 z-[999] px-4 py-2 rounded bg-indigo-700 text-white"
            >
                Skip to content
            </a>

            <StarGrid />
            <Navigation />
            <HeroFX anchor={heroSec} />

            {/* ================= HERO ========================================= */}
            <section
                ref={heroSec}
                id="main"
                aria-labelledby="hero-heading"
                className="relative isolate pt-40 pb-32 sm:pt-44 sm:pb-40 overflow-hidden z-20"
            >
                {/* back vignette */}
                <div
                    aria-hidden
                    className="absolute inset-0 backdrop-blur-[3px] bg-gradient-to-b from-black/30 via-black/10 to-black/40"
                />

                {/* neon frame */}
                <div
                    aria-hidden
                    className="absolute inset-4 sm:inset-8 rounded-[2rem] sm:rounded-[2.5rem] pointer-events-none ring-1 ring-white/10 before:absolute before:inset-0 before:rounded-[inherit] before:bg-[conic-gradient(from_180deg_at_50%_50%,#6366f1_0%,#ec4899_25%,#06b6d4_50%,#6366f1_100%)] before:opacity-30 before:blur-[6px]"
                />

                <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-14">
                    {/* headline (NO spin) */}
                    <header ref={heroTxt} className="will-change-transform motion-reduce:transform-none">
                        <h1
                            id="hero-heading"
                            className="text-[2.35rem] xs:text-[2.7rem] sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
                            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.12)" }}
                        >
                            Craft&nbsp;Your&nbsp;Digital
                            <br />
                            <span className="relative inline-block text-transparent bg-[conic-gradient(from_180deg_at_50%_50%,#e879f9_0%,#38bdf8_50%,#e879f9_100%)] bg-clip-text">
                Masterpiece
              </span>
                        </h1>

                        <p className="mt-8 sm:mt-10 text-base xs:text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-gray-200/90">
                            Drag, drop and deploy in seconds with a canvas that feels alive.
                        </p>
                    </header>

                    {/* CTA glass-bar */}
                    <div className="relative mx-auto flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-max px-6 sm:px-10 py-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_12px_45px_rgba(0,0,0,0.35)] after:absolute after:inset-0 after:rounded-[inherit] after:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18)_0%,transparent_70%)]">
                        <CtaButton
                            to="/editor"
                            icon={<Palette className="w-5 h-5" />}
                            text="Try the Editor"
                            gradient="from-fuchsia-500 to-sky-500"
                        />
                        <CtaButton
                            to="#docs"
                            icon={<Code className="w-5 h-5" />}
                            text="View Docs"
                            gradient="from-slate-900 to-slate-900"
                            outline
                        />
                    </div>

                    {/* features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 px-1 sm:px-2 mt-24 sm:mt-28">
                        {features.map((f) => (
                            <FeatureCard key={f.title} {...f} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= FEATURES SECTION ========================= */}
            <section id="features" className="py-20 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900">
                <div className="container mx-auto px-6">
                    {/* Features Hero */}
                    <div className="text-center mb-20">
                        <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
                            Feature-Rich Platform
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Everything You Need to Build
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                Stunning Landing Pages
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                            From drag-and-drop simplicity to advanced developer tools, ComponentForge gives you the power 
                            to create professional websites without limits.
                        </p>
                    </div>

                    {/* Main Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {mainFeatures.map((feature, index) => (
                            <div 
                                key={index}
                                className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:border-purple-500/50"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative">
                                    <div className="text-purple-400 mb-4">{feature.icon}</div>
                                    <Badge className="mb-3 bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                                        {feature.badge}
                                    </Badge>
                                    <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Advanced Features */}
                    <div className="bg-slate-800/30 rounded-2xl p-12">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-white mb-4">Plus Advanced Capabilities</h3>
                            <p className="text-xl text-gray-400">Take your projects to the next level</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {advancedFeatures.map((feature, index) => (
                                <div 
                                    key={index}
                                    className="flex gap-4 p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-700/30 rounded-lg hover:border-purple-500/30 transition-colors"
                                >
                                    <div className="text-purple-400 flex-shrink-0">{feature.icon}</div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                                        <p className="text-gray-400 text-sm">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= PRICING SECTION ========================== */}
            <section id="pricing" className="py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-green-500/20 text-green-300 border-green-500/30">
                            Simple Pricing
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Choose Your Plan
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Start free and scale as you grow. All plans include our core features.
                        </p>
                    </div>

                    <div className="flex justify-center mb-12">
                        <Tabs defaultValue="monthly" className="w-auto">
                            <TabsList className="bg-slate-800/50 border border-slate-700/50">
                                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                                <TabsTrigger value="yearly">Yearly <Badge className="ml-2 bg-green-500/20 text-green-300">-20%</Badge></TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {pricingPlans.map((plan, index) => (
                            <div 
                                key={index}
                                className={`relative bg-slate-800/50 backdrop-blur-sm border rounded-2xl p-8 ${
                                    plan.highlighted ? 'border-purple-500/50 ring-1 ring-purple-500/20' : 'border-slate-700/50'
                                }`}
                            >
                                {plan.highlighted && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <Badge className="bg-purple-500 text-white">Most Popular</Badge>
                                    </div>
                                )}
                                <div className="text-center mb-8">
                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <div className="text-purple-400">{plan.icon}</div>
                                        <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                                    </div>
                                    <div className="text-4xl font-bold text-white mb-2">
                                        ${plan.price.monthly}
                                        <span className="text-lg text-gray-400">/month</span>
                                    </div>
                                    <p className="text-gray-400">{plan.description}</p>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, fIndex) => (
                                        <li key={fIndex} className="flex items-center gap-3">
                                            {feature.included ? (
                                                <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                                            ) : (
                                                <X className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                            )}
                                            <span className={feature.included ? 'text-gray-300' : 'text-gray-500'}>
                                                {feature.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <Button 
                                    className={`w-full ${
                                        plan.highlighted 
                                            ? 'bg-purple-600 hover:bg-purple-700' 
                                            : 'bg-slate-700 hover:bg-slate-600'
                                    }`}
                                >
                                    {plan.cta}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= TEMPLATES SECTION ======================== */}
            <section id="templates" className="py-20 bg-slate-800/30">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
                            Template Library
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Professional Templates
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Start with beautifully designed templates and customize them to match your brand.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {templateCategories.map((template, index) => (
                            <div 
                                key={index}
                                className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300"
                            >
                                <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                    <div className="text-6xl text-purple-400/50">{template.icon}</div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-xl font-semibold text-white">{template.name}</h3>
                                        <Badge className={`${template.badgeColor} text-white text-xs`}>
                                            {template.badge}
                                        </Badge>
                                    </div>
                                    <p className="text-gray-400 mb-4">{template.description}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Star className="w-4 h-4 text-yellow-400" />
                                            {template.rating}
                                            <span>•</span>
                                            <Download className="w-4 h-4" />
                                            {template.downloads}
                                        </div>
                                        <Button size="sm" variant="outline" className="border-purple-500/30 text-purple-300">
                                            <Eye className="w-4 h-4 mr-2" />
                                            Preview
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= DOCS SECTION ============================= */}
            <section id="docs" className="py-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <Badge className="mb-4 bg-amber-500/20 text-amber-300 border-amber-500/30">
                            Documentation
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Everything You Need to Know
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Comprehensive guides, tutorials, and API reference to get you started quickly.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {docSections.map((section, index) => (
                            <div 
                                key={index}
                                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 hover:border-purple-500/50 transition-colors"
                            >
                                <div className="text-purple-400 mb-4">{section.icon}</div>
                                <h3 className="text-xl font-semibold text-white mb-3">{section.title}</h3>
                                <p className="text-gray-400 mb-6">{section.description}</p>
                                <div className="space-y-2">
                                    {section.items.map((item, itemIndex) => (
                                        <Link 
                                            key={itemIndex}
                                            to={item.href}
                                            className="flex items-center gap-2 text-sm text-gray-300 hover:text-purple-400 transition-colors"
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                            {item.title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= FOOTER SECTION =========================== */}
            <Footer />
        </>
    );
}

/* ---------- Star grid, buttons, cards, footer (unchanged) ------------ */

function StarGrid() {
    return (
        <div className="fixed inset-0 -z-10">
            <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[length:4px_4px]" />
            {dots.map(({ x, y, s }, i) => (
                <span
                    key={i}
                    className="absolute block rounded-full bg-white animate-ping"
                    style={{
                        width: s,
                        height: s,
                        left: x,
                        top: y,
                        animationDuration: `${4 + Math.random() * 4}s`,
                        animationDelay: `-${Math.random() * 4}s`,
                    }}
                />
            ))}
        </div>
    );
}

function CtaButton({
                       to,
                       icon,
                       text,
                       gradient,
                       outline,
                   }: {
    to: string;
    icon: JSX.Element;
    text: string;
    gradient: string;
    outline?: boolean;
}) {
    const handleClick = (e: React.MouseEvent) => {
        if (to.startsWith('#')) {
            e.preventDefault();
            const sectionId = to.replace('#', '');
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    };

    const buttonContent = (
        <>
            <span
                className={`absolute inset-0 rounded-full ${
                    outline
                        ? "border border-white/20 bg-white/5 hover:bg-white/10"
                        : `bg-gradient-to-br ${gradient} hover:brightness-110`
                }`}
            />
            <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                {icon}
                {text}
                {/* subtle arrow animation */}
                <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
            </span>
            <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent rotate-12 blur-md animate-[slide_2.8s_linear_infinite] motion-reduce:hidden"
            />
        </>
    );

    if (to.startsWith('#')) {
        return (
            <a
                href={to}
                onClick={handleClick}
                className="relative overflow-hidden w-full sm:w-auto justify-center px-8 sm:px-9 py-4 rounded-full font-semibold flex items-center gap-3 transition-transform active:scale-95 cursor-pointer"
            >
                {buttonContent}
            </a>
        );
    }

    return (
        <Link
            to={to}
            className="relative overflow-hidden w-full sm:w-auto justify-center px-8 sm:px-9 py-4 rounded-full font-semibold flex items-center gap-3 transition-transform active:scale-95"
        >
            {buttonContent}
        </Link>
    );
}

function FeatureCard({
                         icon: Icon,
                         color,
                         title,
                         desc,
                     }: {
    icon: any;
    color: string;
    title: string;
    desc: string;
}) {
    return (
        <Card className="relative h-[180px] sm:h-[190px] backdrop-blur-md bg-white/3 border border-white/10 overflow-hidden shadow-lg shadow-black/40 group">
            <div aria-hidden className="absolute inset-0 grid place-content-center pointer-events-none">
                <Icon className={`w-16 h-16 ${color} opacity-15 animate-spin-slow group-hover:opacity-30`} />
            </div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5 sm:px-6">
                <Icon className={`w-11 h-11 sm:w-12 sm:h-12 mb-3 sm:mb-4 ${color}`} />
                <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">{desc}</p>
            </div>
        </Card>
    );
}

const features = [
    { icon: Sparkles, color: "text-fuchsia-400", title: "Lightning Fast", desc: "Build in minutes—never hours." },
    { icon: ShieldCheck, color: "text-sky-400", title: "Production Ready", desc: "Export clean, optimized code instantly." },
    { icon: Hexagon, color: "text-amber-400", title: "Premium Quality", desc: "Pixel-perfect, professional-grade UI." },
];

/* ---------- footer (unchanged) ---------- */

function Footer() {
    return (
        <footer className="relative border-t border-white/10 mt-32 sm:mt-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-sm text-gray-300">
                <div className="sm:col-span-2 space-y-4">
                    <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text text-transparent">
                        ComponentForge
                    </h2>
                    <p>
                        The ultimate drag-and-drop editor for creating jaw-dropping landing pages. Build, customize and deploy with ease.
                    </p>
                </div>

                <FooterNav
                    label="Product"
                    links={[
                        ["/editor", "Editor"],
                        ["/features", "Features"],
                        ["/pricing", "Pricing"],
                        ["/templates", "Templates"],
                        ["/docs", "Documentation"],
                    ]}
                />
                <FooterNav
                    label="Company"
                    links={[
                        ["/about", "About"],
                        ["/blog", "Blog"],
                        ["/contact", "Contact"],
                        ["/support", "Support"],
                    ]}
                />
            </div>
            <Seal />
            <p className="text-center text-gray-400 pt-10 pb-14 text-xs">© 2025 ComponentForge. All rights reserved.</p>
        </footer>
    );
}

function FooterNav({ label, links }: { label: string; links: [string, string][] }) {
    return (
        <nav aria-label={label} className="space-y-2">
            <h3 className="font-semibold text-white mb-1">{label}</h3>
            {links.map(([href, txt]) => (
                <FooterLink key={href} to={href}>
                    {txt}
                </FooterLink>
            ))}
        </nav>
    );
}

function FooterLink({ to, children }: { to: string; children: string }) {
    return (
        <Link
            to={to}
            className="block hover:text-white transition-colors focus-visible:outline-none focus-visible:ring focus-visible:ring-violet-400 rounded-sm"
        >
            {children}
        </Link>
    );
}

function Seal() {
    return (
        <div className="flex justify-center">
            <div className="relative w-[460px] max-w-full rounded-md overflow-hidden shadow-[0_8px_38px_rgba(0,0,0,0.4)]">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#3b3b3b_0_2px,#2f2f2f_2px_4px)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.28)_0%,transparent_70%)] mix-blend-screen" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/45" />
                <div className="absolute inset-0 rounded-md ring-1 ring-white/15" />
                <div className="relative z-10 px-8 py-10 text-center font-serif tracking-wide">
                    <p className="text-xl italic text-gray-100">Designed by</p>
                    <h3 className="mt-1 text-4xl md:text-5xl font-light text-gray-200">Petar Nikolić</h3>
                    <p className="mt-4 text-sm uppercase tracking-[0.35em] font-semibold text-gray-300">Engineering Software</p>
                </div>
                <span
                    aria-hidden
                    className="absolute -left-1/2 top-0 w-1/2 h-full bg-[conic-gradient(from_0deg_at_50%_50%,#ff00ff,#00ffff,#ffff00,#ff00ff)] opacity-20 blur-[6px] animate-[slide_6s_linear_infinite] motion-reduce:hidden"
                />
            </div>
        </div>
    );
}
