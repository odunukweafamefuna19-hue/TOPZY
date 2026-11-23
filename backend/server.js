import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { createClient } from "@supabase/supabase-js";

const app = express();
const port = Number(process.env.PORT || 4000);
app.use(helmet());
app.use(cors({ origin: (process.env.FRONTEND_ORIGIN || "http://localhost:5500").split(",").map(s=>s.trim()), credentials: true }));
app.use(express.json({ limit: "100kb" }));

const supabaseReady = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY);
const supabase = supabaseReady ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY) : null;

const plannedGames = [
  ["free-fire","Free Fire","Diamonds"],["pubg-mobile","PUBG Mobile","UC"],["call-of-duty-mobile","Call of Duty Mobile","CP"],
  ["mobile-legends","Mobile Legends","Diamonds"],["genshin-impact","Genshin Impact","Genesis Crystals"],["honkai-star-rail","Honkai: Star Rail","Oneiric Shards"],
  ["roblox","Roblox","Robux"],["fc-mobile","EA SPORTS FC Mobile","FC Points"],["efootball","eFootball","Coins"],
  ["clash-of-clans","Clash of Clans","Gems"],["clash-royale","Clash Royale","Gems"],["fortnite","Fortnite","V-Bucks"],
  ["valorant","Valorant","VP"],["league-of-legends","League of Legends","RP"],["arena-of-valor","Arena of Valor","Vouchers"],
  ["blood-strike","Blood Strike","Gold"],["delta-force","Delta Force","Delta Coins"],["wuthering-waves","Wuthering Waves","Lunites"],
  ["zenless-zone-zero","Zenless Zone Zero","Monochromes"],["stumble-guys","Stumble Guys","Gems"]
].map(([slug,name,currency],i)=>({id:i+1,slug,name,currency,status:"planned",available:false}));

app.get("/health", (_req,res)=>res.json({ok:true,service:"TOPZY API",supabaseConfigured:supabaseReady}));
app.get("/api/v1/games", async (_req,res)=>{
  if (!supabaseReady) return res.json({games:plannedGames,source:"planned-catalogue"});
  const {data,error}=await supabase.from("games").select("id,slug,name,currency,status").order("name");
  if(error) return res.status(500).json({error:"Could not load game catalogue."});
  res.json({games:data,source:"database"});
});
app.get("/api/v1/games/:slug", async (req,res)=>{
  const game=plannedGames.find(g=>g.slug===req.params.slug);
  if(!game) return res.status(404).json({error:"Game not found."});
  res.json({game});
});
app.get("/api/v1/packages/:gameSlug", (_req,res)=>res.json({packages:[],message:"Packages will appear after verified supplier products are configured."}));
app.post("/api/v1/player/validate", (_req,res)=>res.status(501).json({ok:false,error:"Player validation is not configured for this game yet."}));
app.use((err,_req,res,_next)=>{console.error(err);res.status(500).json({error:"Unexpected server error."});});
app.listen(port,()=>console.log(`TOPZY API listening on ${port}`));
