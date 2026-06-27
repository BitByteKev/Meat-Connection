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
import mc_paleta from './assets-img/mc_paleta.webp'
import mc_destacado from '../images/corte-destacado.webp'
import brand_wagyu from './assets-img/mc_brand_wagyu.webp'
import brand_kobe from './assets-img/mc_brand_kobe.webp'
import brand_jacks from './assets-img/mc_brand_jacks.webp'
import brand_stone from './assets-img/mc_brand_stone.webp'
import brand_margaret from './assets-img/mc_brand_margaret.webp'
import brand_masami from './assets-img/mc_brand_masami.webp'

// Product photos — derived from products.json + an images glob (see ./products.js),
// so the admin can assign any photo in /images without touching code.
import { MC_IMG } from './products.js'

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
window.MC_PALETA = mc_paleta
window.MC_DESTACADO = mc_destacado
window.MC_IMG = MC_IMG
window.MC_BRAND = {
  wagyu: brand_wagyu,
  kobe: brand_kobe,
  jacks: brand_jacks,
  stone: brand_stone,
  margaret: brand_margaret,
  masami: brand_masami,
}
