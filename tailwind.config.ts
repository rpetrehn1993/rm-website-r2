import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
      "Times New Roman": [
            "Times New Roman"
      ],
      "Helvetica Neue": [
            "Helvetica Neue"
      ],
      "Degular Variable": [
            "Degular Variable"
      ]
},
      fontSize: {
      "12": [
            "12px"
      ],
      "16": [
            "16px"
      ],
      "20": [
            "20px"
      ],
      "24": [
            "24px"
      ],
      "30": [
            "30px"
      ],
      "32": [
            "32px"
      ],
      "36": [
            "36px"
      ],
      "40": [
            "40px"
      ],
      "48": [
            "48px"
      ],
      "50": [
            "50px"
      ],
      "64": [
            "64px"
      ],
      "128": [
            "128px"
      ],
      "22.5": [
            "22.5px"
      ],
      "22.501800537109375": [
            "22.501800537109375px"
      ]
},
      spacing: {},
      borderRadius: {},
    },
  },
  plugins: [],
};

