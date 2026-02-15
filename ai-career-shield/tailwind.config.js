/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                cta: {
                    DEFAULT: 'hsl(var(--cta))',
                    foreground: 'hsl(var(--cta-foreground))',
                }
            },
            fontFamily: {
                sans: ['var(--font-raleway)', 'var(--font-inter)', 'sans-serif'],
                serif: ['var(--font-lora)', 'serif'],
            },
        },
    },
    plugins: [],
}
