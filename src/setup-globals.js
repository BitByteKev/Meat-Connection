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

// Brand / logo / hero images (decoded from the former base64 globals)
import mc_logo from './assets-img/mc_logo.webp'
import mc_paleta from './assets-img/mc_paleta.webp'
import brand_wagyu from './assets-img/mc_brand_wagyu.webp'
import brand_kobe from './assets-img/mc_brand_kobe.webp'
import brand_jacks from './assets-img/mc_brand_jacks.webp'
import brand_stone from './assets-img/mc_brand_stone.webp'
import brand_margaret from './assets-img/mc_brand_margaret.webp'
import brand_masami from './assets-img/mc_brand_masami.webp'

// Product photos — the real cut images from /images. Keyed by product id (see PRODUCTS in app.jsx).
import img_tritip   from '../images/TRI-TIP-WAGYU-JAPONES-A5-ALTO-MARMOLEO-1.webp'
import img_filete   from '../images/FILETE-WAGYU-JAPONES-A5-ALTO-MARMOLEO-2-e1749645167193.webp'
import img_ribeyeJp from '../images/RIB-EYE-WAGYU-JAPONES-A5-ALTO-MARMOLEO-1.webp'
import img_picana   from '../images/PICANA-WAGYU-JAPONES-A5-ALTO-MARMOLEO-1.webp'
import img_ribeye   from '../images/RIB-EYE-WAGYU-AUSTRALIANO-ALTO-MARMOLEO-3.webp'
import img_newyork  from '../images/NEW-YORK-WAGYU-AUSTRALIANO-ALTO-MARMOLEO-2.webp'
import img_tbone    from '../images/T-BONE-WAGYU-AUSTRALIANO-ALTO-MARMOLEO.webp'
import img_paleta   from '../images/PALETA-WAGYU-AUSTRALIANO-ALTO-MARMOLEO-1.webp'
import img_denver   from '../images/DENVER-WAGYU-AUSTRALIANO-ALTO-MARMOLEO2.webp'
import img_topround from '../images/TOP-ROUND-WAGYU-AUSTRALIANO-ALTO-MARMOLEO.webp'
import img_lengua   from '../images/LENGUA-WAGYU-AUSTRALIANO-ALTO-MARMOLEO-2.webp'
import img_nyangus  from '../images/new-york-black-angus.webp'
import img_salchicha from '../images/SALSICHA-WAGYU-AMERICANO-4PACK.webp'

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
window.MC_IMG = {
  // Wagyu Japonés A5
  tritip: img_tritip,
  filete: img_filete,
  ribeyeJp: img_ribeyeJp,
  picana: img_picana,
  // Wagyu Australiano
  ribeye: img_ribeye,
  newyork: img_newyork,
  tbone: img_tbone,
  paleta: img_paleta,
  denver: img_denver,
  topround: img_topround,
  lengua: img_lengua,
  // Carne Americana
  nyangus: img_nyangus,
  salchicha: img_salchicha,
}
window.MC_BRAND = {
  wagyu: brand_wagyu,
  kobe: brand_kobe,
  jacks: brand_jacks,
  stone: brand_stone,
  margaret: brand_margaret,
  masami: brand_masami,
}
