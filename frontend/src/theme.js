import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  "colorSchemes": {
    "light": {
      "palette": {
        "primary": {
          "50": "#eee8f2",
          "100": "#d4c6de",
          "200": "#b8a0c9",
          "300": "#9d7ab4",
          "400": "#895ea3",
          "500": "#764393",
          "600": "#6e3e8e",
          "700": "#4d4470",
          "800": "#443b63",
          "900": "#352c4b",
          "solidHoverBg": "var(--joy-palette-primary-outlinedColor)"
        },
        "neutral": {
          "50": "#e8eaed",
          "100": "#c5cbd5",
          "200": "#a1a9b9",
          "300": "#7e889b",
          "400": "#646f88",
          "500": "#4a5777",
          "600": "#434f6e",
          "700": "#3b4663",
          "800": "##343c56",
          "900": "#292c3c"
        },
        "danger": {
          "50": "#fde3e8",
          "100": "#f9b7c5",
          "200": "#f3899f",
          "300": "#ec5a7b",
          "400": "#e6365f",
          "500": "#df0f46",
          "600": "#cf0745",
          "700": "#bb0042",
          "800": "#a70040",
          "900": "#85003b"
        },
        "success": {
          "50": "#e8fde9",
          "100": "#c7f8c7",
          "200": "#9df3a2",
          "300": "#6aee78",
          "400": "#28e855",
          "500": "#00e22d",
          "600": "#00d025",
          "700": "#00bb1a",
          "800": "#00a60a",
          "900": "#008100"
        },
        "warning": {
          "50": "#f9e9e7",
          "100": "#faccbe",
          "200": "#f8ab94",
          "300": "#f58b69",
          "400": "#f47249",
          "500": "#f35b2c",
          "600": "#e85528",
          "700": "#da4e23",
          "800": "#cc4820",
          "900": "#b23c1a"
        }
      }
    },
    "dark": {
      "palette": {
        "primary": {
          "50": "#feeeea",
          "100": "#fdded4",
          "200": "#fbbdaa",
          "300": "#fbac95",
          "400": "#f76a3f",
          "500": "#f6592a",
          "600": "#c54722",
          "700": "#943519",
          "800": "#622411",
          "900": "#311208"
        },
        "neutral": {
          "50": "#000000",
          "100": "#f4f4f5",
          "200": "#e4e4e7",
          "300": "#d4d4d8",
          "400": "#a1a1aa",
          "500": "#71717a",
          "600": "#52525b",
          "700": "#3f3f46",
          "800": "#27272a",
          "900": "#18181b"
        },
        "danger": {
          "50": "#fef2f2",
          "100": "#fee2e2",
          "200": "#fecaca",
          "300": "#fca5a5",
          "400": "#f87171",
          "500": "#ef4444",
          "600": "#dc2626",
          "700": "#b91c1c",
          "800": "#991b1b",
          "900": "#7f1d1d"
        },
        "success": {
          "50": "#f7fee7",
          "100": "#ecfccb",
          "200": "#d9f99d",
          "300": "#bef264",
          "400": "#a3e635",
          "500": "#84cc16",
          "600": "#65a30d",
          "700": "#4d7c0f",
          "800": "#3f6212",
          "900": "#365314"
        },
        "warning": {
          "50": "#fefce8",
          "100": "#fef9c3",
          "200": "#fef08a",
          "300": "#fde047",
          "400": "#facc15",
          "500": "#eab308",
          "600": "#ca8a04",
          "700": "#a16207",
          "800": "#854d0e",
          "900": "#713f12"
        }
      }
    }
  }
});

export default theme;