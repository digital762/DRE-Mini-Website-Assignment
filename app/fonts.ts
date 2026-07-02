import localFont from "next/font/local";
import { Poppins, Cormorant_Garamond } from "next/font/google";

// IvyMode — brand display serif. Weight 400 for headers; 300 only for
// large display moments. Never bold in UI copy, but the face ships full
// weights for completeness.
export const ivyMode = localFont({
  src: [
    { path: "../public/fonts/ivymode/IvyMode-Thin.ttf", weight: "100", style: "normal" },
    { path: "../public/fonts/ivymode/IvyMode-ThinItalic.ttf", weight: "100", style: "italic" },
    { path: "../public/fonts/ivymode/IvyMode-Light.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/ivymode/IvyMode-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "../public/fonts/ivymode/IvyMode-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/ivymode/IvyMode-Italic.ttf", weight: "400", style: "italic" },
    { path: "../public/fonts/ivymode/IvyMode-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/ivymode/IvyMode-SemiBoldItalic.ttf", weight: "600", style: "italic" },
    { path: "../public/fonts/ivymode/IvyMode-Bold.ttf", weight: "700", style: "normal" },
    { path: "../public/fonts/ivymode/IvyMode-BoldItalic.ttf", weight: "700", style: "italic" },
  ],
  variable: "--next-ivymode",
  display: "swap",
});

// Poppins — body/UI text.
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--next-poppins",
  display: "swap",
});

// Cormorant Garamond — the design system's documented fallback for IvyEpic,
// used for subheads and editorial moments.
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--next-cormorant",
  display: "swap",
});
