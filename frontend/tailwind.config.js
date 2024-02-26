/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
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
                "box-color": "#eeeeee",
                "border-bottom-color": "#cacaca",
                "background-id": "#f2f1f7",
                "gray-color": "#8f8f91"
            }
        },
    },
    plugins: [],
}

