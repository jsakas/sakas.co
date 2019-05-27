import { rgba, lighten } from 'polished';

export * from './base';

export const color_primary = '#006E6D';
export const color_secondary = '#008773';
export const color_tertiary = '#002D3F';

export const font_primary = '\'Open Sans\', sans-serif';
export const font_secondary = '\'Kanit\', sans-serif';
export const font_mono = '\'IBM Plex Mono\', sans-serif';

export const id = 'light';

export const color_text = '#555';
export const color_background = '#f1f1f1';

export const color_menu_text = color_background;
export const color_menu_bg = rgba(color_primary, .9);
export const color_menu_bg_hover = rgba(color_primary, .7);

export const color_exp_border = rgba(color_secondary, .3);
export const color_exp_border_hover = rgba(color_secondary, .8);
export const color_exp_text = color_background;
export const color_exp_bg = rgba(color_secondary, .8);
export const color_exp_title = lighten(.05, color_primary);
export const color_exp_button_bg = rgba(color_primary, .7);
export const color_exp_button_bg_hover = rgba(color_primary, 1);
export const color_canvas_loader_1 = lighten(.05, color_primary);
export const color_canvas_loader_2 = color_text;
