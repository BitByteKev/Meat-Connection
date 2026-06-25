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
  UtensilsCrossed, X, RotateCcw, Quote,
} from 'lucide'

// Product / showcase / hero / logo images (decoded from the former base64 globals)
import mc_logo from './assets-img/mc_logo.webp'
import mc_paleta from './assets-img/mc_paleta.webp'
import product_tritip from './assets-img/product_tritip.webp'
import mc_img_tritip from './assets-img/mc_img_tritip.webp'
import mc_img_ribeye from './assets-img/mc_img_ribeye.webp'
import mc_img_newyork from './assets-img/mc_img_newyork.webp'
import mc_img_topround from './assets-img/mc_img_topround.webp'
import mc_img_paleta from './assets-img/mc_img_paleta.webp'
import brand_wagyu from './assets-img/mc_brand_wagyu.webp'
import brand_kobe from './assets-img/mc_brand_kobe.webp'
import brand_jacks from './assets-img/mc_brand_jacks.webp'
import brand_stone from './assets-img/mc_brand_stone.webp'
import brand_margaret from './assets-img/mc_brand_margaret.webp'
import brand_masami from './assets-img/mc_brand_masami.webp'

window.React = React
window.ReactDOM = ReactDOMClient
window.lucide = {
  createElement,
  ArrowLeft, ArrowRight, BedDouble, CheckCircle2, ChefHat, Facebook, Flag,
  Instagram, Menu, MessageCircle, Minus, Package, PartyPopper, Plane, Plus,
  ShieldCheck, ShoppingCart, Slice, Snowflake, Store, Trash2, Truck,
  UtensilsCrossed, X, RotateCcw, Quote,
}

window.MC_LOGO = mc_logo
window.MC_PALETA = mc_paleta
window.MC_PRODUCT_TRITIP = product_tritip
window.MC_IMG = {
  tritip: mc_img_tritip,
  ribeye: mc_img_ribeye,
  newyork: mc_img_newyork,
  topround: mc_img_topround,
  paleta: mc_img_paleta,
}
window.MC_BRAND = {
  wagyu: brand_wagyu,
  kobe: brand_kobe,
  jacks: brand_jacks,
  stone: brand_stone,
  margaret: brand_margaret,
  masami: brand_masami,
}
