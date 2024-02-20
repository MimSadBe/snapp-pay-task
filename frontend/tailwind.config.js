/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            container: {
                center: true,
                padding: "1rem",
            },
            colors: {
                "main-color": "#0b84f5",
                "box-color": "#1c1c1e",
                "gray-color": "#8f8f91"
            }
        },
    },
    plugins: [],
}

