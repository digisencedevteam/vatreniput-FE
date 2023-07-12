import { Palette, PaletteColor, PaletteColorOptions } from "@mui/material";

declare module "@mui/material/styles/createPalette" {
    interface PaletteColor {
        formBackground?: string;
        textFieldBorder?: string;
    }
  
    interface Palette {
        secondary: PaletteColor;
        primary: PaletteColor;
    }

    interface PaletteOptions {
        secondary?: PaletteColorOptions & { formBackground?: string; textFieldBorder?: string };
        primary?: PaletteColorOptions & { formBackground?: string; textFieldBorder?: string };
    }
}