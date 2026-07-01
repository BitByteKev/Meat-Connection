// Wires up the globals the (formerly inline) app + design-system bundle expect.
// Must be imported BEFORE ds-bundle.js and app.jsx so window.React etc. exist
// when those modules evaluate.
import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
// Import only the icons the app actually uses so the bundle doesn't pull in
// all ~1,500 lucide icons. The Icon component looks them up via window.lucide[name].
import {
  createElement,
  ArrowLeft, ArrowRight, BedDouble, CheckCircle2, ChefHat, Facebook, Flag,
  Instagram, Menu, MessageCircle, Minus, Package, PartyPopper, Plane, Plus,
  ShieldCheck, ShoppingCart, Slice, Snowflake, Store, Trash2, Truck,
  UtensilsCrossed, X, RotateCcw, Quote, ZoomIn,
} from 'lucide'

// Brand / logo / hero images (decoded from the former base64 globals)
import mc_logo from './assets-img/mc_logo.webp'
import mc_logo_ink from '../assets/meat_connection_black_text.webp'
import mc_destacado from '../images/corte-destacado.webp'
import brand_wagyu from './assets-img/mc_brand_wagyu.webp'
import brand_jewel from './assets-img/mc_brand_jewel.png'
import brand_kingriver from './assets-img/mc_brand_kingriver.png'
import brand_lgrow from './assets-img/mc_brand_lgrow.png'
import brand_mackas from './assets-img/mc_brand_mackas.png'

// Product photos — derived from products.json + an images glob (see ./products.js),
// so the admin can assign any photo in /images without touching code.
import { MC_IMG, MC_IMAGES, MC_MARBLING } from './products.js'

window.React = React
window.ReactDOM = ReactDOMClient
window.lucide = {
  createElement,
  ArrowLeft, ArrowRight, BedDouble, CheckCircle2, ChefHat, Facebook, Flag,
  Instagram, Menu, MessageCircle, Minus, Package, PartyPopper, Plane, Plus,
  ShieldCheck, ShoppingCart, Slice, Snowflake, Store, Trash2, Truck,
  UtensilsCrossed, X, RotateCcw, Quote, ZoomIn,
}

window.MC_LOGO = mc_logo
window.MC_LOGO_INK = mc_logo_ink
window.MC_DESTACADO = mc_destacado
window.MC_IMG = MC_IMG
window.MC_IMAGES = MC_IMAGES
window.MC_MARBLING = MC_MARBLING
window.MC_BRAND = {
  wagyu: brand_wagyu,
  jewel: brand_jewel,
  kingriver: brand_kingriver,
  lgrow: brand_lgrow,
  mackas: brand_mackas,
}
