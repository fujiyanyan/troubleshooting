/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { 
  Monitor, 
  Mic, 
  Activity,
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft, 
  Home, 
  History,
  RefreshCw, 
  Copy,
  ExternalLink,
  Edit,
  Download,
  Info,
  Laptop,
  Settings,
  Wrench,
  AlertCircle,
  Power,
  MicOff,
  VolumeX,
  PartyPopper,
  Sparkles,
  PlayCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";

// --- Base64 Images ---
// The following paths are placeholders. 
// If you upload actual images to the 'public' folder with these names, they will be displayed.
const IMG1 = "/display_settings.png"; 
const IMG2 = "/adapter_properties.png";
const IMG3 = "/mode_selection.png";
const IMG4 = "/switcher_photo.png";
const IMG5 = "/mixer_knobs.png"; // For audio knobs reference
const IMG6 = "/mic_body.png";   // For mic lamp check
const IMG7 = "/mac_sound.png";  // For mac sound settings

// --- Visual Components ---
// --- Mockup Components ---
const WindowsSettingsMockup = ({ screen }: { screen: "display" | "properties" | "modes" }) => (
  <div className="w-full bg-[#f0f0f0] border border-slate-400 rounded shadow-md overflow-hidden flex flex-col font-sans text-slate-800">
    <div className="bg-white px-2 py-1 border-b border-slate-300 flex items-center justify-between text-[10px] font-bold">
      <div className="flex items-center gap-1.5">
        <Monitor className="w-3 h-3 text-blue-600" />
        <span>ディスプレイの詳細設定</span>
      </div>
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
      </div>
    </div>
    <div className="p-3 bg-slate-50 min-h-[140px]">
      {screen === "display" && (
        <div className="space-y-3">
          <div className="bg-white p-2 rounded border border-slate-300">
            <p className="text-[9px] text-slate-500">ディスプレイの情報を確認する対象を選択します</p>
            <div className="w-full mt-1 p-1.5 border border-slate-400 rounded flex justify-between items-center text-[10px] bg-slate-50">
              <span className="font-bold">ディスプレイ 2: FDWX1905W</span>
              <ChevronRight className="w-3 h-3 rotate-90" />
            </div>
          </div>
          <div className="bg-white p-2 rounded border border-slate-300 space-y-1">
            <p className="text-[10px] font-bold border-b pb-1">ディスプレイ 2 の情報</p>
            <div className="text-[9px] text-slate-600 space-y-0.5 pt-1">
              <p>デスクトップ モード: 1920 x 1080, 60 Hz</p>
              <p>有効な信号モード: 1920 x 1080, 60 Hz</p>
              <button className="text-blue-700 hover:underline mt-1.5 block font-bold">
                ディスプレイ 2 のアダプターのプロパティを表示します
              </button>
            </div>
          </div>
        </div>
      )}
      {screen === "properties" && (
        <div className="bg-white p-3 rounded border border-slate-400 shadow-sm max-w-[240px] mx-auto">
          <div className="flex gap-2 text-[9px] border-b mb-2">
            <span className="font-bold border-b-2 border-slate-700 pb-1">アダプター</span>
            <span className="text-slate-400">モニター</span>
            <span className="text-slate-400">色の管理</span>
          </div>
          <div className="space-y-1.5 text-[9px]">
            <p className="text-slate-500 font-bold">アダプターの種類</p>
            <div className="flex gap-2 items-center bg-slate-50 p-1 border rounded">
              <Laptop className="w-4 h-4 text-slate-400" />
              <span>Intel(R) Iris(R) Xe Graphics</span>
            </div>
            <button className="w-full mt-4 bg-slate-200 border border-slate-400 py-1 rounded hover:bg-slate-300 font-bold">
              モードの一覧(L)
            </button>
          </div>
        </div>
      )}
      {screen === "modes" && (
        <div className="bg-white p-2 rounded border border-slate-400 shadow-xl max-w-[220px] mx-auto scale-110">
          <p className="text-[10px] font-bold mb-1.5 border-b pb-1">有効なモードの一覧</p>
          <div className="border border-slate-300 h-28 overflow-y-auto bg-slate-50 text-[8px]">
            {[
              "1920 x 1080, True Color (32ビット), 60 Hz",
              "1920 x 1080, True Color (32ビット), 50 Hz",
              "1280 x 720, True Color (32ビット), 60 Hz",
              "1280 x 720, True Color (32ビット), 50 Hz",
              "1024 x 768, True Color (32ビット), 60 Hz",
            ].map((m, i) => (
              <div 
                key={i} 
                className={`px-2 py-1 ${m.includes("1280 x 720") && m.includes("50 Hz") ? "bg-blue-600 text-white font-bold" : "hover:bg-blue-100"}`}
              >
                {m}
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-1.5 mt-2">
            <button className="px-3 py-0.5 bg-slate-200 border border-slate-400 rounded text-[9px] font-bold">OK</button>
            <button className="px-3 py-0.5 bg-white border border-slate-400 rounded text-[9px]">キャンセル</button>
          </div>
        </div>
      )}
    </div>
  </div>
);

const SwitcherMockup = ({ highlight }: { highlight?: "power" | "projector" | "hdmi1" | "hdmi4" | "volume" | "av-power" | "mic-mute" | "vol-mute" }) => (
  <div className="w-full max-w-[420px] mx-auto bg-[#e5e7eb] p-2 rounded-sm border-2 border-[#b1b5bb] shadow-2xl font-sans relative select-none text-[#1d3557]">
    {/* Metal Frame Inner */}
    <div className="border border-[#9ca3af] bg-[#8ecae6] p-4 rounded-[1px] relative">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-[14px] font-black italic tracking-tighter">LAND</span>
          <span className="text-[9px] font-bold">computer</span>
        </div>
        <div className="text-[10px] font-bold opacity-70">LMS-GC53U</div>
      </div>

      {/* Row 1: Projector & Function & Power */}
      <div className="grid grid-cols-12 gap-1 mb-6">
        <div className="col-span-2">
          <div className="bg-[#3e5c76] text-white text-[7px] px-1 py-0.5 font-bold mb-1 w-fit">プロジェクター</div>
          <div className={`w-10 h-10 bg-white border border-[#1d3557] rounded-sm flex items-center justify-center shadow-sm transition-all ${highlight === "projector" ? "ring-4 ring-orange-400 border-orange-500 bg-orange-50 translate-y-[-2px]" : ""}`}>
            <Monitor className={`w-6 h-6 ${highlight === "projector" ? "text-orange-600 scale-110" : "text-slate-700"}`} />
          </div>
        </div>
        
        <div className="col-span-7">
          <div className="bg-[#3e5c76] text-white text-[7px] px-1 py-0.5 font-bold mb-1 w-full text-center">ファンクション</div>
          <div className="flex gap-1 relative bg-white/30 p-1 border border-[#3e5c76]/30 rounded-sm">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex-1 h-10 bg-white border border-[#1d3557] rounded-sm shadow-sm" />
            ))}
            {/* Label Tape Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/95 px-6 py-0.5 border border-slate-200 text-[10px] font-bold text-slate-600 shadow-sm transform -rotate-1">未使用</div>
            </div>
          </div>
        </div>

        <div className="col-span-3 flex flex-col items-center">
          <div className="text-[8px] font-black mb-1">電源</div>
          <div className="relative">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_5px_red]" />
            <div className={`w-11 h-11 rounded-full bg-white border-2 border-[#1d3557] flex items-center justify-center shadow-md active:bg-slate-100 transition-all ${highlight === "power" ? "ring-4 ring-red-400 border-red-600 bg-red-50 scale-110" : ""}`}>
              <Power className={`w-6 h-6 ${highlight === "power" ? "text-red-600 animate-pulse" : "text-slate-800"}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Volume Control */}
      <div className="mb-6">
        <div className="bg-[#3e5c76] text-white text-[7px] px-2 py-0.5 font-bold mb-1 w-fit">ボリューム制御</div>
        <div className="flex items-center gap-2 bg-white/20 p-2 border border-[#3e5c76]/20 rounded-sm font-black">
          <div className="flex flex-col items-center gap-1">
             <div className={`w-12 h-10 bg-white border border-[#1d3557] rounded-sm flex flex-col items-center justify-center text-[6px] font-black leading-tight text-center transition-all ${highlight === "av-power" ? "ring-2 ring-blue-400 border-blue-600" : ""}`}>
               <span>AV機器</span>
               <span>電源</span>
             </div>
          </div>
          <div className={`w-11 h-10 bg-white border border-[#1d3557] rounded-sm flex items-center justify-center transition-all ${highlight === "mic-mute" ? "ring-2 ring-blue-400 border-blue-600" : ""}`}>
            <MicOff className="w-5 h-5 text-slate-700" />
          </div>
          <div className={`w-11 h-10 bg-white border border-[#1d3557] rounded-sm flex items-center justify-center transition-all ${highlight === "vol-mute" ? "ring-2 ring-blue-400 border-blue-600" : ""}`}>
            <VolumeX className="w-5 h-5 text-slate-700" />
          </div>
          <div className={`flex-1 h-10 bg-white border-2 border-[#1d3557] rounded-full flex items-center justify-between px-6 font-black text-xl transition-all ${highlight === "volume" ? "ring-2 ring-blue-400 border-blue-600 text-slate-900 bg-blue-50" : "text-slate-400"}`}>
            <span>−</span>
            <span>＋</span>
          </div>
        </div>
      </div>

      {/* Row 3: Screen Selection & PinP */}
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-9">
          <div className="flex items-center gap-2 mb-1">
            <div className="bg-[#3e5c76] text-white text-[7px] px-2 py-0.5 font-bold">画面選択</div>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-2 h-2.5 bg-[#3e5c76]/40" />)}
            </div>
          </div>
          <div className="bg-white/30 p-2 border border-[#3e5c76]/30 rounded-sm flex gap-1.5 justify-between">
            {[
              { n: "HDMI1", id: "hdmi1" },
              { n: "ブルーレイ" },
              { n: "未使用" },
              { n: "HDMI4", id: "hdmi4" },
              { n: "RGB" },
              { n: "ﾌﾞﾗｯｸｱｳﾄ", id: "blackout" }
            ].map((btn, i) => (
              <div 
                key={i} 
                className={`flex-1 min-w-0 h-12 bg-white border border-[#1d3557] rounded-sm flex flex-col items-center justify-center text-[7px] font-black transition-all relative shadow-sm ${
                  highlight === btn.id ? "ring-2 ring-blue-500 border-blue-600 bg-blue-50 z-10 translate-y-[-1px] shadow-lg shadow-blue-400/20" : ""
                }`}
              >
                {/* Simulation of the LED lamp */}
                {highlight === btn.id && (
                  <div className="absolute top-1 w-1.5 h-1.5 bg-[#00ffff] rounded-full shadow-[0_0_8px_#00ffff]" />
                )}
                {/* Default HDMI1 LED if no specific highlight */}
                {!highlight && btn.n === "HDMI1" && (
                   <div className="absolute top-1 w-1 h-1 bg-blue-500 rounded-full opacity-50" />
                )}
                <span className="leading-none text-center">{btn.n}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-3">
          <div className="bg-[#3e5c76] text-white text-[7px] px-2 py-0.5 font-bold mb-1 w-full text-center">PinP</div>
          <div className="flex flex-col h-[70px] gap-1">
             <div className="flex-1 bg-white border border-[#1d3557] rounded-sm flex items-center justify-center text-[7px] font-black leading-tight text-center p-0.5">
               表示<br/>切替
             </div>
             <div className={`flex-1 bg-white border border-[#1d3557] rounded-sm flex items-center justify-center text-[7px] font-black leading-tight text-center p-0.5 ${highlight === "hdmi1" ? "border-orange-400 bg-orange-50" : ""}`}>
               二画面<br/>表示
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MixerMockup = ({ highlight }: { highlight?: "pc-audio" | "mic-gain" }) => (
  <div className="w-full max-w-[360px] mx-auto bg-[#eaddd0] rounded-lg shadow-2xl relative font-sans overflow-hidden border-2 border-[#b8b0a8]">
    {/* Rack Unit Mounting Holes */}
    <div className="absolute left-1 top-0 bottom-0 w-4 flex flex-col justify-around py-4 opacity-30">
      <div className="w-2.5 h-2.5 rounded-full bg-slate-400 shadow-inner" />
      <div className="w-2.5 h-2.5 rounded-full bg-slate-400 shadow-inner" />
    </div>
    <div className="absolute right-1 top-0 bottom-0 w-4 flex flex-col justify-around py-4 opacity-30">
      <div className="w-2.5 h-2.5 rounded-full bg-slate-400 shadow-inner" />
      <div className="w-2.5 h-2.5 rounded-full bg-slate-400 shadow-inner" />
    </div>

    {highlight === "pc-audio" ? (
      /* RAMSA / Analog Mixer Section for PC Audio */
      <div className="bg-[#343a40] p-6 text-slate-300 min-h-[300px] flex flex-col justify-center">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] pointer-events-none" />
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-8">
            <span className="text-[12px] font-black text-slate-500 tracking-widest bg-red-900/20 px-2 py-0.5 rounded border border-red-500/20">RAMSA</span>
            <span className="text-[8px] font-mono opacity-50 uppercase tracking-widest">MASTER OUTPUT</span>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-black/60 rounded-full blur-xl transform translate-y-2 scale-90" />
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#495057] to-[#1a1c1e] border-4 border-blue-400 flex items-center justify-center shadow-2xl relative rotate-45 ring-8 ring-blue-500/5">
                <div className="w-2 h-10 bg-red-600 absolute top-2 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
                <div className="w-6 h-6 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center shadow-inner">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <span className="text-[14px] font-black tracking-[0.2em] uppercase text-blue-400 drop-shadow-sm">PC 音声</span>
              <p className="text-[9px] text-slate-500 mt-2 font-bold uppercase tracking-widest">CH 7/8 Stereo Input</p>
            </div>
          </div>
        </div>
      </div>
    ) : (
      /* Panasonic Wireless Receiver Section (Replicating user image) */
      <div className="bg-[#f0f0f0] p-4 min-h-[300px]">
        {/* Antennas / Brand Section */}
        <div className="flex justify-between items-start mb-6 px-2">
          <div className="flex gap-4">
            <div className="text-[9px] font-black text-slate-600 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2">1</span>
                <div className="w-3.5 h-1.5 bg-green-500 rounded-sm shadow-[0_0_4px_#22c55e]" />
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="w-2">2</span>
                <div className="w-3.5 h-1.5 bg-slate-400 rounded-sm" />
              </div>
              <p className="text-[7px] mt-1">アンテナ</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter italic">Panasonic</p>
            <p className="text-[7px] font-bold text-slate-500">WX-SR204</p>
          </div>
        </div>

        {/* 4 Channels Grid - Replicating the "4 knobs + 5-step LED" layout */}
        <div className="grid grid-cols-4 gap-2 px-1">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex flex-col items-center">
               <div className="text-[7px] font-bold text-slate-500 mb-1.5 font-mono tracking-tighter">CH {i}</div>
               
               <div className="flex items-start gap-1 justify-center w-full">
                 {/* 5-step Received Level LEDs */}
                 <div className="flex flex-col gap-0.5 pt-0.5">
                    {[...Array(5)].map((_, step) => (
                      <div 
                        key={step} 
                        className={`w-2 h-1.5 rounded-[1px] ${
                          (i === 1 && step >= 1) || (i !== 1 && step >= 4) // Sample active levels
                          ? "bg-green-500 shadow-[0_0_2px_#22c55e]" 
                          : "bg-slate-300"
                        }`} 
                      />
                    ))}
                    <span className="text-[4px] font-black text-slate-400 mt-1 uppercase text-center leading-none">受信<br/>Lvl</span>
                 </div>

                 {/* The Knob */}
                 <div className="relative group/knob">
                   <div className={`w-14 h-14 rounded-full bg-white border-2 flex items-center justify-center shadow-lg transition-all ${highlight === "mic-gain" ? "border-orange-400 ring-2 ring-orange-500/20 scale-105" : "border-slate-300"}`}>
                     {/* Scale markings on the knob border */}
                     <div className="absolute inset-0 rounded-full border border-slate-100" />
                     {/* Notch on the knob */}
                     <div className="absolute w-1 h-4 bg-slate-800 top-1 rounded-full transform rotate-[-45deg]" />
                     {/* Center detail */}
                     <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 shadow-inner" />
                   </div>
                   {/* 0-10 Scale */}
                   <div className="absolute -bottom-1 left-0 right-0 flex justify-between text-[5px] font-bold text-slate-400 px-1.5">
                     <span>0</span>
                     <span>10</span>
                   </div>
                 </div>
               </div>
               
               <p className="text-[7px] font-black text-slate-600 mt-3">音量</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

const MicBodyMockup = ({ state }: { state?: "ok" | "low" | "error" }) => (
  <div className="w-full max-w-[280px] mx-auto bg-slate-50 p-6 rounded-2xl flex flex-col items-center gap-6 shadow-lg border border-slate-200">
    <div className="relative">
      {/* Panasonic WX-ST250 Body */}
      <div className="w-24 h-64 bg-[#1a1a1a] rounded-[48px] border-4 border-slate-800 shadow-2xl relative flex flex-col items-center pt-10 overflow-hidden">
        {/* Top Grill Simulation (Hidden but implied) */}
        <div className="absolute top-0 w-full h-8 bg-slate-900 border-b border-white/5" />

        {/* Brand & Model */}
        <div className="text-center mb-6 space-y-0.5">
          <p className="text-white text-[12px] font-black tracking-tight leading-none uppercase">Panasonic</p>
          <p className="text-slate-400 text-[8px] font-bold tracking-widest leading-none">WX-ST250</p>
        </div>

        {/* Indicator & Switch Panel */}
        <div className="w-[70px] h-[120px] bg-[#121212] rounded-2xl border border-white/10 shadow-inner p-3 flex flex-col items-center">
           {/* LCD/Label Area */}
           <div className="grid grid-cols-2 gap-4 mb-4 border-b border-white/5 pb-3 w-full">
             <div className="flex flex-col items-center gap-1">
               <span className="text-[7px] font-bold text-slate-500">電源</span>
               <div className={`w-3.5 h-3.5 rounded-full border border-black/40 transition-all ${
                 state === "error" ? "bg-red-500 shadow-[0_0_8px_#ef4444]" : "bg-green-500 shadow-[0_0_10px_#22c55e]"
               }`} />
             </div>
             <div className="flex flex-col items-center gap-1">
               <span className="text-[7px] font-bold text-slate-500">充電</span>
               <div className={`w-3.5 h-3.5 rounded-full border border-black/40 ${
                 state === "low" ? "bg-orange-500 shadow-[0_0_8px_#f97316]" : "bg-slate-700"
               }`} />
             </div>
           </div>

           {/* The Large Slide Switch */}
           <div className="relative mt-2 flex flex-col items-center">
             <div className="text-[8px] font-black text-slate-400 mb-1 uppercase tracking-tighter">入</div>
             <div className="w-9 h-14 bg-[#080808] rounded-md border border-white/5 flex flex-col items-center py-1">
                <div className={`w-7 h-9 bg-slate-800 rounded border border-slate-600 shadow-md transition-all flex flex-col items-center justify-around py-1 ${
                  state === "ok" ? "-translate-y-1" : "translate-y-2 opacity-50"
                 }`}>
                  <div className="w-4 h-0.5 bg-slate-900 rounded-full opacity-30" />
                  <div className="w-4 h-0.5 bg-slate-900 rounded-full opacity-30" />
                  <div className="w-4 h-0.5 bg-slate-900 rounded-full opacity-30" />
                </div>
             </div>
             <div className="flex items-center gap-3 mt-1.5 opacity-40">
                <span className="text-[6px] text-slate-600 font-black">切</span>
                <span className="text-[6px] text-slate-600 font-black py-0.5 px-1 border border-slate-600/50 rounded-sm">ロック</span>
             </div>
           </div>
        </div>

        {/* Shine effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
        <div className="absolute bottom-[-10px] w-full h-24 bg-gradient-to-t from-black to-transparent opacity-60" />
      </div>
    </div>

    <div className="text-center space-y-1.5">
      <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">ワイヤレスマイク状態確認</p>
      <div className="flex flex-col items-center gap-1 mt-2">
        <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
          state === "ok" ? "bg-green-100 text-green-700" : 
          "bg-red-100 text-red-700 animate-pulse border border-red-200"
        }`}>
          {state === "ok" ? "正常" : state === "low" ? "充電中/残量少" : "異常（点滅）"}
        </span>
        {state === "error" && (
          <p className="text-[9px] font-bold text-red-600 animate-bounce mt-1">
            点滅の場合は使用しないでください
          </p>
        )}
      </div>
    </div>
  </div>
);

const MacSoundSettingsMockup = ({ target }: { target: "AppleTV" | "FDWX" }) => (
  <div className="w-full max-w-[300px] mx-auto bg-[#ececec] rounded-xl border border-[#d1d1d1] shadow-xl overflow-hidden font-sans text-slate-800">
    <div className="bg-[#f6f6f6] px-4 py-2 border-b border-slate-300 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
      </div>
      <span className="text-[10px] font-bold text-slate-500">サウンド</span>
      <div className="w-8" />
    </div>
    <div className="p-4 space-y-4">
      <div className="flex gap-4 border-b border-slate-200 pb-2 text-[10px] font-bold">
        <span className="text-blue-600 border-b-2 border-blue-600 pb-2">出力</span>
        <span className="text-slate-400">入力</span>
        <span className="text-slate-400">サウンドエフェクト</span>
      </div>
      <div className="space-y-1">
        <p className="text-[9px] font-bold text-slate-500 mb-2">サウンドを出力する装置を選択:</p>
        <div className="border border-slate-300 rounded overflow-hidden bg-white">
          {[
            { name: "内蔵スピーカー", type: "内蔵" },
            { name: "Theater AppleTV", type: "AirPlay", id: "AppleTV" },
            { name: "FDWX1905W", type: "DisplayPort", id: "FDWX" }
          ].map((device, i) => (
            <div 
              key={i} 
              className={`px-3 py-1.5 flex justify-between items-center text-[10px] border-b border-slate-100 last:border-0 ${target === device.id ? "bg-blue-600 text-white font-bold" : "text-slate-700"}`}
            >
              <span>{device.name}</span>
              <span className={`text-[8px] opacity-60 ${target === device.id ? "text-blue-100" : ""}`}>{device.type}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-slate-100 p-3 rounded border border-slate-200">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[9px] font-bold">主音量:</span>
          <div className="w-40 h-1.5 bg-slate-300 rounded-full relative">
            <div className="absolute left-0 top-0 h-full w-[80%] bg-slate-500 rounded-full" />
            <div className="absolute left-[80%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-slate-400 rounded-full shadow-sm" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-[9px] text-slate-500">
          <input type="checkbox" checked readOnly className="rounded-sm" />
          <span>メニューバーに音量を表示</span>
        </div>
      </div>
    </div>
  </div>
);

const StepImage = ({ type, alt, highlight }: { type: string, alt: string, highlight?: any }) => {
  const getSrc = () => {
    switch(type) {
      case "IMG1": return IMG1;
      case "IMG2": return IMG2;
      case "IMG3": return IMG3;
      case "IMG4": return IMG4;
      case "IMG5": return IMG5;
      case "IMG6": return IMG6;
      case "IMG7": return IMG7;
      default: return "";
    }
  };

  const src = getSrc();

  // Mockup selector based on type
  const Mockup = () => {
    switch(type) {
      case "IMG1": return <WindowsSettingsMockup screen="display" />;
      case "IMG2": return <WindowsSettingsMockup screen="properties" />;
      case "IMG3": return <WindowsSettingsMockup screen="modes" />;
      case "IMG4": return <SwitcherMockup highlight={highlight} />;
      case "IMG5": return <MixerMockup highlight={highlight} />;
      case "IMG6": return <MicBodyMockup state={highlight} />;
      case "IMG7": return <MacSoundSettingsMockup target={highlight || "AppleTV"} />;
      default: return <Monitor className="w-12 h-12 text-gray-400" />;
    }
  };

  return (
    <div className="relative group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
       <div className="absolute top-2 left-3 flex gap-1.5 z-10">
        <div className="w-2 h-2 rounded-full bg-slate-300" />
        <div className="w-2 h-2 rounded-full bg-slate-300" />
        <div className="w-2 h-2 rounded-full bg-slate-300/30" />
      </div>

      <div className="p-4 bg-slate-100/50">
        <div>
          <Mockup />
        </div>
      </div>

      {/* Actual Image Overlay (Shows if file exists in public/) */}
      <img 
        src={src} 
        alt={alt} 
        className="absolute inset-0 w-full h-full object-contain bg-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" 
        onError={(e) => (e.currentTarget.style.display = 'none')}
      />

      <div className="bg-slate-900 px-3 py-2 border-t border-slate-800">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center flex items-center justify-center gap-2">
          <Wrench className="w-3 h-3" />
          {alt}
        </p>
      </div>
    </div>
  );
};
const COMMON_FIRST_STEPS = [
  {
    txt: "スイッチャーの主電源が入っているか確認",
    note: "パネル右上の「電源」ボタン周りの赤いランプが点灯しているか確認してください。消えている場合はボタンを押して電源を入れます。",
    imageData: "IMG4",
    imageAlt: "卓上スイッチャー — 電源ボタンの確認",
    highlight: "power"
  },
  {
    txt: "プロジェクターの電源が入っているか確認",
    note: "パネル左上の「プロジェクター」ボタンが点灯しているか、または実際にレンズから光が出ているか確認してください。",
    imageData: "IMG4",
    imageAlt: "卓上スイッチャー — プロジェクターボタンの確認",
    highlight: "projector"
  },
  {
    txt: "卓上スイッチャー（LMS-GC53U）の入力とPCの接続先を確認",
    note: "演台から出ている有線ケーブル（固定）を使用する場合は「HDMI4」に接続し、スイッチャーのボタンも「HDMI4」を選択してください。",
    imageData: "IMG4",
    imageAlt: "卓上スイッチャー — HDMI4 接続と選択",
    highlight: "hdmi4"
  },
  {
    txt: "スイッチャーで「ブラックアウト」が押されていないか確認",
    note: "スイッチャーのボタンのうち「ブラックアウト」が点灯していると映像が遮断されます。他のボタン（HDMI4など）を押して解除してください。",
    imageData: "IMG4",
    imageAlt: "スイッチャー — ブラックアウトの確認",
    highlight: "blackout"
  },
];

const WIN_STEPS = [
  {
    txt: "モニターを認識しているか確認する (DWX1905W)",
    note: "PCとケーブルが物理的に繋がっており、Windows側の「ディスプレイ設定」で「DWX1905W (ディスプレイ2)」が認識されているか確認します。",
    winSteps: [
      "① デスクトップで右クリック → 「ディスプレイ設定」を開く",
      "② 画面に「1」と「2」の四角が表示されており、「2」を選択できるか確認",
      "③ 下にスクォールして「マルチ ディスプレイ」の設定で「表示画面を拡張する」になっているか確認",
    ],
    imageData: "IMG1",
    imageAlt: "Windows ディスプレイ設定画面 — モニターの認識確認",
  },
  {
    txt: "ケーブル・変換器の交換を試す",
    note: "モニターが認識されない、またはノイズが入る場合は、物理的な接触不良やアダプタの故障が疑われます。",
    winSteps: [
      "① HDMIケーブルを一度抜き、奥まで挿し直す",
      "② USB Type-C 変換アダプタを使用している場合、別のものに交換して試す",
      "③ 可能であれば予備のHDMIケーブルで直接接続して試す",
    ],
  },
  {
    txt: "（モニター認識時）解像度を1280×720 (50Hz) に設定する",
    note: "プロジェクターとの相性により、高い解像度では映らない場合があります。",
    winSteps: [
      "① 「ディスプレイの詳細設定」 をクリック",
      "② リストから 「FDWX1905W (ディスプレイ2)」 を選択",
      "③ 「ディスプレイ2のアダプターのプロパティを表示します」 をクリック",
      "④ 「アダプター」タブの 「モードの一覧(L)」 をクリック",
      "⑤ 【1280×720, True Color (32ビット), 50ヘルツ】 を選択してOK",
    ],
    winWarn: "※必ず「50Hz」を選択してください。",
    images: [
      { data: "IMG1", alt: "ディスプレイ詳細設定 — FDWX1905Wを選択" },
      { data: "IMG2", alt: "プロパティ画面 — モードの一覧をクリック" },
      { data: "IMG3", alt: "モード一覧 — 1280×720, 50Hzを選択" },
    ],
  },
];

const WIN_ESC = [
  { icon: <Laptop className="w-5 h-5" />, txt: "予備PC・別のPCに変えてください", sub: "自分のPC特有の相性問題の可能性があります" },
];

const MAC_STEPS = [
  {
    txt: "Apple TV (HDMI1) を使ったワイヤレス投影を試す",
    note: "シアターでは HDMI1 が Apple TV に割り振られています。有線で映らない場合でも、ワイヤレスなら安定して映ることがあります。",
    winSteps: [
      "① スイッチャーの入力を「HDMI1」に切り替える",
      "② Macのコントロールセンター（右上）から「画面ミラーリング」を選択",
      "③ 「Theater AppleTV」を選択して接続（パスコードが表示されたら入力）",
      "④ 投影中は画面上部に紫色（または青色）のアイコンが表示されます",
    ],
    winWarn: "※プレゼン交代時もケーブルの抜き差し不要で、スムーズに切り替え可能です。",
    imageData: "IMG4",
    imageAlt: "スイッチャー — HDMI1 を選択",
    highlight: "hdmi1"
  },
  {
    txt: "ディスプレイ設定から解像度を「1280×720 (50Hz)」に変更する",
    note: "Macの設定メニューから解像度を選択し、1280x720またはそれより低い数値に変更してください。",
  },
  {
    txt: "有線ケーブル接続を試す（HDMI4に切り替え）",
    note: "ワイヤレスで映らない場合は、演台の有線ケーブルを直接挿し、卓上スイッチャーの入力を「HDMI4」に切り替えてください。",
    imageData: "IMG4",
    imageAlt: "卓上スイッチャー — HDMI4 を選択",
    highlight: "hdmi4"
  }
];

const MAC_ESC = [
  { icon: <Laptop className="w-5 h-5" />, txt: "予備PC・別のPCに変えてください", sub: "可能であれば別の端末で投影を試してください" },
];

const VIDEO_SYMPTOMS = [
  {
    id: "v_os", icon: <Monitor className="w-6 h-6" />,
    txt: "シアターのプロジェクターにPCが映らない",
    osSelect: true,
  },
  {
    id: "v_black", icon: <AlertCircle className="w-6 h-6" />,
    txt: "映像が途切れる・ノイズが入る",
    steps: [
      { txt: "ケーブルの抜き差しを試す", note: "変換アダプタがしっかり刺さっているか確認" },
      { txt: "解像度を1280×720(50Hz)まで落とす", note: "リフレッシュレートを下げると安定する場合があります" },
      { txt: "別のHDMIケーブルに交換する" },
    ],
    esc: [
      { icon: <Laptop className="w-5 h-5" />, txt: "別のPCや予備PCに切り替える", sub: "端末による相性の可能性があります" },
    ],
  },
];

const COMMON_MIC_STEPS = [
  {
    txt: "PCからの音がシアターのスピーカーから流れるか確認",
    note: "PCで適当な音声を再生し、外部スピーカーから音が出るか確認してください。",
    imageData: "IMG1",
    imageAlt: "Windowsサウンド設定 / Macサウンド設定",
  },
  {
    txt: "マイクからの音がシアターのスピーカーから流れるか確認",
    note: "マイクのスイッチを入れ、声を出しながらスピーカーから拡声されているか確認してください。",
    imageData: "IMG6",
    imageAlt: "マイク本体の確認",
    highlight: "ok"
  }
];

const WIN_MIC_STEPS = [
  {
    txt: "PCの音声出力先が期待通りになっているか確認",
    note: "有線接続時は「FDWX1905W」を選択してください。",
    imageData: "IMG1",
    imageAlt: "Windows サウンド設定 — FDWX1905W を選択"
  },
  { 
    txt: "音声調整はミキサーの「PC音声」つまみで行う", 
    note: "PCの音量はRAMSAミキサーの 「PC音声」とラベルされた赤いつまみで調整してください。",
    imageData: "IMG5",
    imageAlt: "ミキサー — PC音声つまみ",
    highlight: "pc-audio"
  },
  { 
    txt: "マイクの音量が小さい場合はレシーバーのゲインのつまみを回す", 
    note: "Panasonicワイヤレスレシーバーの各チャンネルにある音量つまみ（4つ並んでいるもの）で調整してください。注意：大きくしすぎるとマイク同士のハウリングになるので注意",
    imageData: "IMG5",
    imageAlt: "ワイヤレスレシーバー — 音量つまみ",
    highlight: "mic-gain"
  },
  { 
    txt: "マイク本体のスイッチと電池を確認", 
    note: "マイク本体のスイッチを「入」にし、ランプが赤く点滅していないか確認してください。点滅の場合は使用しないでください。",
    imageData: "IMG6",
    imageAlt: "マイク本体の電池・ランプ確認",
    highlight: "error"
  },
];

const MAC_MIC_STEPS = [
  {
    txt: "PCの音声出力先がtheaterのスピーカーになっているか確認",
    note: "無線投影時は「Theater AppleTV」、有線時は「FDWX1905W」を選択してください。",
    imageData: "IMG7",
    imageAlt: "Mac サウンド設定 — 出力先の選択",
    highlight: "AppleTV"
  },
  { 
    txt: "音声調整はミキサーの「PC音声」つまみで行う", 
    note: "PCの音量はRAMSAミキサーの「PC音声」とラベルされた赤いつまみで調整してください。",
    imageData: "IMG5",
    imageAlt: "ミキサー — PC音声つまみ",
    highlight: "pc-audio"
  },
  { 
    txt: "マイクの音量が小さい場合はレシーバーのゲインのつまみを回す", 
    note: "Panasonicワイヤレスレシーバーの各チャンネルにある音量つまみ（4つ並んでいるもの）で調整してください。注意：大きくしすぎるとマイク同士のハウリングになるので注意",
    imageData: "IMG5",
    imageAlt: "ワイヤレスレシーバー — 音量つまみ",
    highlight: "mic-gain"
  },
  { 
    txt: "マイク本体のスイッチと電池を確認", 
    note: "マイク本体のスイッチを「入」にし、ランプが赤く点滅していないか確認してください。点滅の場合は使用しないでください。",
    imageData: "IMG6",
    imageAlt: "マイク本体の電池・ランプ確認",
    highlight: "error"
  },
];

const MIC_ESC = [
  { icon: <Mic className="w-5 h-5" />, txt: "予備マイク（有線等）を使用", sub: "演台内またはラック内を確認" },
];

const MIC_SYMPTOMS = [
  {
    id: "m1", icon: <Mic className="w-6 h-6" />, txt: "マイク・PCから音が出ない (シアター)",
    osSelect: true,
  },
];

// --- Types ---
type View = "home" | "symptoms" | "steps" | "esc" | "history" | "rehearsal";
type OS = "win" | "mac" | null;

interface SupportLog {
  id: string;
  date: string;
  time: string;
  result: "resolved" | "escalated";
  equipment: string;
  symptom: string;
  os: string;
  steps: string[];
  notes?: string;
  staffResolution?: string;
}

export default function App() {
  const [view, setView] = useState<View>("home");
  const [eqType, setEqType] = useState<"video" | "audio" | null>(null);
  const [selectedSymptom, setSelectedSymptom] = useState<any>(null);
  const [selectedOS, setSelectedOS] = useState<OS>(null);
  const [checkedSteps, setCheckedSteps] = useState<boolean[]>([]);
  const [reasonInput, setReasonInput] = useState("");
  const [showReasonForm, setShowReasonForm] = useState(false);
  const [pendingResult, setPendingResult] = useState<"resolved" | "escalated" | null>(null);
  const [historyLogs, setHistoryLogs] = useState<SupportLog[]>([]);
  const [resolutionInputs, setResolutionInputs] = useState<Record<string, string>>({});
  
  // Rehearsal Mode State
  const [rehearsalStep, setRehearsalStep] = useState(0);
  const [showRehearsalSolution, setShowRehearsalSolution] = useState(false);
  const [rehearsalOS, setRehearsalOS] = useState<OS>(null);
  
  const ALL_REHEARSAL_STEPS = [
    {
      category: "Hardware Power",
      title: "スイッチャー電源",
      check: "スイッチャー（LMS-GC53U）の電源が入っていますか？",
      description: "右上の電源ボタン横が赤く点灯しているか確認してください。",
      solution: COMMON_FIRST_STEPS[0],
      imageData: "IMG4",
      imageAlt: "スイッチャーの電源",
      highlight: "power"
    },
    {
      category: "Hardware Power",
      title: "プロジェクター電源",
      check: "プロジェクターが稼働していますか？",
      description: "左上の「プロジェクター」ボタンが青く点灯しているか確認してください。",
      solution: COMMON_FIRST_STEPS[1],
      imageData: "IMG4",
      imageAlt: "プロジェクターの電源",
      highlight: "projector"
    },
    {
      os: "win",
      category: "Video Connection",
      title: "入力切替 (HDMI4)",
      check: "「HDMI4」が青く点灯していますか？",
      description: "Windows PCを有線接続する場合、HDMI4を選択する必要があります。",
      solution: COMMON_FIRST_STEPS[2],
      imageData: "IMG4",
      imageAlt: "HDMI4入力の選択",
      highlight: "hdmi4"
    },
    {
      os: "win",
      category: "PC Setup",
      title: "ディスプレイ認識",
      check: "PC側で外部ディスプレイ(DWX1905W)を認識していますか？",
      description: "「設定」→「ディスプレイ」で2枚目のモニターが表示されているか確認してください。",
      solution: WIN_STEPS[0],
      imageData: "IMG1",
      imageAlt: "ディスプレイ設定画面"
    },
    {
      os: "win",
      category: "PC Setup",
      title: "リフレッシュレート設定",
      check: "解像度が 1280x720 (50Hz) に設定されていますか？",
      description: "50Hzでないと、映像が安定しない場合があります。",
      solution: WIN_STEPS[2],
      imageData: "IMG3",
      imageAlt: "リフレッシュレートの設定"
    },
    {
      os: "mac",
      category: "Wireless Connection",
      title: "Apple TV 接続 (HDMI1)",
      check: "Apple TV（HDMI1）経由でワイヤレス投影できますか？",
      description: "Macのコントロールセンターから「Theater AppleTV」を選択してください。",
      solution: MAC_STEPS[0],
      imageData: "IMG4",
      imageAlt: "HDMI1 選択",
      highlight: "hdmi1"
    },
    {
      category: "Audio System",
      title: "PC音声つまみ",
      check: "ミキサーの「PC音声」つまみが上がっていますか？",
      description: "赤いつまみの右隣、ラベルがある箇所を確認してください。",
      solution: WIN_MIC_STEPS[1],
      imageData: "IMG5",
      imageAlt: "PC音声つまみ",
      highlight: "pc-audio"
    },
    {
      os: "win",
      category: "Audio System",
      title: "PC音声出力先確認 (Win)",
      check: "PCの音声出力先がtheaterのスピーカーになっていますか？",
      description: "PC側のサウンド設定から、出力先が外部モニター「FDWX1905W」になっていることを確認してください。",
      solution: WIN_MIC_STEPS[0],
      imageData: "IMG1",
      imageAlt: "Windows 出力デバイスの確認"
    },
    {
      os: "mac",
      category: "Audio System",
      title: "PC音声出力先確認 (Mac)",
      check: "PCの音声出力先がtheaterのスピーカーになっていますか？",
      description: "Macのサウンド設定から、無線投影時は「Theater AppleTV」、有線接続時は「FDWX1905W」を選択してください。",
      solution: MAC_MIC_STEPS[0],
      imageData: "IMG7",
      imageAlt: "Mac 出力デバイスの確認",
      highlight: "AppleTV"
    },
    {
      category: "Audio Test",
      title: "PC音声出力テスト",
      check: "PCからの音がスピーカーから流れますか？",
      description: "適当な動画や音声を再生して、シアター内のスピーカーから音が出るか確認してください。",
      solution: WIN_MIC_STEPS[1]
    },
    {
      category: "Audio System",
      title: "マイク入力（ゲイン）",
      check: "マイクの「白いつまみ」は調整されていますか？",
      description: "各チャンネルの下側にある白いツマミで入力感度を調整します。",
      solution: WIN_MIC_STEPS[2],
      imageData: "IMG5",
      imageAlt: "マイクゲインつまみ",
      highlight: "mic-gain"
    },
    {
      category: "Audio Test",
      title: "マイク音声出力テスト",
      check: "マイクの音がスピーカーから流れますか？",
      description: "実際に声を出してみて、スピーカーから拡声されているか確認してください。",
      solution: WIN_MIC_STEPS[2]
    },
    {
      category: "Audio System",
      title: "ワイヤレスマイク電池",
      check: "マイクの電池残量は十分ですか？",
      description: "マイク本体のランプが赤く点滅していないか確認してください。点滅の場合は使用しないでください。",
      solution: WIN_MIC_STEPS[3],
      imageData: "IMG6",
      imageAlt: "マイク本体の電池・ランプ確認",
      highlight: "low"
    }
  ];

  const REHEARSAL_STEPS = ALL_REHEARSAL_STEPS.filter(s => !s.os || s.os === rehearsalOS);

  // Logic Helpers
  const isCommonFinished = () => {
    if (!selectedSymptom?.osSelect) return true;
    const commonStepCount = eqType === "video" ? COMMON_FIRST_STEPS.length : COMMON_MIC_STEPS.length;
    for (let i = 0; i < commonStepCount; i++) {
      if (!checkedSteps[i]) return false;
    }
    return true;
  };

  const getCurrentSteps = () => {
    if (!selectedSymptom) return [];
    if (selectedSymptom.osSelect) {
      if (!isCommonFinished()) return eqType === "video" ? COMMON_FIRST_STEPS : COMMON_MIC_STEPS;
      if (!selectedOS) return []; // Waiting for OS selection
      if (eqType === "video") return selectedOS === "win" ? WIN_STEPS : MAC_STEPS;
      return selectedOS === "win" ? WIN_MIC_STEPS : MAC_MIC_STEPS;
    }
    return selectedSymptom.steps || [];
  };

  const getEscOptions = () => {
    if (!selectedSymptom) return [];
    if (selectedSymptom.osSelect) {
      if (!selectedOS) return [];
      if (eqType === "video") return selectedOS === "win" ? WIN_ESC : MAC_ESC;
      return MIC_ESC;
    }
    return selectedSymptom.esc || [];
  };

  const handleSymptomClick = (sym: any) => {
    setSelectedSymptom(sym);
    if (sym.osSelect) {
      const commonLen = eqType === "video" ? COMMON_FIRST_STEPS.length : COMMON_MIC_STEPS.length;
      setCheckedSteps(new Array(commonLen + Math.max(WIN_STEPS.length, MAC_STEPS.length, WIN_MIC_STEPS.length, MAC_MIC_STEPS.length)).fill(false));
    } else {
      setCheckedSteps(new Array(sym.steps.length).fill(false));
    }
    setView("steps");
  };

  const handleOSSelect = (os: OS) => {
    setSelectedOS(os);
  };

  const saveLog = (result: "resolved" | "escalated", userNotes?: string) => {
    const steps = getCurrentSteps();
    const tried = steps.filter((_, i: number) => checkedSteps[i]).map((s: any) => s.txt);
    const now = new Date();
    const newLog: SupportLog = {
      id: Math.random().toString(36).substr(2, 9),
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      result,
      equipment: eqType === "video" ? "映像・接続" : "マイク・音響",
      symptom: selectedSymptom?.txt,
      os: selectedOS?.toUpperCase() || "N/A",
      steps: tried,
      notes: userNotes
    };

    const logs = JSON.parse(localStorage.getItem("av_trouble_log") || "[]");
    localStorage.setItem("av_trouble_log", JSON.stringify([newLog, ...logs]));
  };

  const finalizeSession = () => {
    if (pendingResult) {
      saveLog(pendingResult, reasonInput);
      setReasonInput("");
      setShowReasonForm(false);
      setPendingResult(null);
      setSelectedOS(null);
      setSelectedSymptom(null);
      setView("home");
    }
  };

  const generateRehearsalReport = () => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const currentItem = REHEARSAL_STEPS[rehearsalStep];
    
    return `@Fujikawa Ryo 藤川瞭(学務/司書/社会)
【リハーサル トラブル報告】${date} ${time}

■ 項目：${currentItem.title} (${currentItem.category})
■ 状況：${currentItem.check} に対し「問題あり」
■ 内容：${currentItem.description}

■ OS：${rehearsalOS?.toUpperCase() || "不明"}
■ 提示された解決策：${(currentItem.solution as any).txt}

上記を確認・実行しましたが解決できませんでした。`;
  };

  const generateEscText = () => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const eqName = eqType === "video" ? "映像・接続設備" : "マイク・音響設備";
    const steps = getCurrentSteps();
    const triedList = steps.filter((_, i) => checkedSteps[i]).map((s: any) => s.txt);
    
    return `@Fujikawa Ryo 藤川瞭(学務/司書/社会)
【機材トラブル 対応依頼】${date} ${time}

■ 機材：${eqName}
■ 症状：${selectedSymptom?.txt}${selectedOS ? `（${selectedOS.toUpperCase()}）` : ""}

■ ここまで試した手順：
${triedList.length > 0 ? triedList.map((t, i) => `  ${i + 1}. ${t}`).join("\n") : "  (チェックされた手順なし)"}

上記を試しましたが解決できませんでした。
対応をお願いします。`;
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: "user", parts: [{ text: chatInput }] };
    setChatMessages([...chatMessages, userMsg]);
    setAiInput("");
    setIsTyping(true);

    const response = await askGemini(chatInput, chatMessages, { 
      eqType: eqType === "video" ? "映像・PC接続" : "マイク・音響",
      os: selectedOS || "不明"
    });
    const aiMsg = { role: "model", parts: [{ text: response }] };
    setChatMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  useEffect(() => {
    if (view === "history") {
      const saved = JSON.parse(localStorage.getItem("av_trouble_log") || "[]");
      setHistoryLogs(saved);
    }
  }, [view]);

  const handleUpdateResolution = (id: string) => {
    const resolution = resolutionInputs[id];
    if (!resolution?.trim()) return;

    const updated = historyLogs.map(l => l.id === id ? { ...l, staffResolution: resolution } : l);
    setHistoryLogs(updated);
    localStorage.setItem("av_trouble_log", JSON.stringify(updated));
    
    // Clear input
    setResolutionInputs(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [rehearsalStep, view]);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  // --- Components ---
  const Header = ({ showBack = true }) => (
    <div className="bg-[#1E2A3A] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-xl border-b border-white/5">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          <span className="mono-label text-blue-400 font-bold opacity-100">SYSTEM ONLINE</span>
        </div>
        <div className="h-6 w-[1px] bg-slate-700 mx-1" />
        {showBack && (
          <button 
            onClick={() => {
              if (view === "rehearsal") {
                if (showRehearsalSolution) {
                  setShowRehearsalSolution(false);
                } else if (rehearsalStep > 0) {
                  // If we are at the OS selection step (step 2), and going back
                  if (rehearsalStep === 2 && rehearsalOS) {
                    setRehearsalOS(null);
                  } else {
                    setRehearsalStep(rehearsalStep - 1);
                  }
                } else {
                  setView("home");
                }
              } else if (view === "history" || view === "esc") {
                setView("home");
                setSelectedOS(null);
                setSelectedSymptom(null);
              } else if (view === "steps" && selectedSymptom.osSelect && selectedOS) {
                setSelectedOS(null);
              } else if (view === "steps") {
                setView("symptoms");
              } else {
                setView("home");
              }
            }}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all border border-slate-700 hover:border-slate-500 active:scale-90"
            title="戻る"
          >
            <ArrowLeft className="w-5 h-5 font-bold" />
          </button>
        )}
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-black tracking-tighter text-white ml-2">Theater Troubleshooting</h1>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => { setView("home"); setSelectedOS(null); setSelectedSymptom(null); setChatMessages([]); setRehearsalOS(null); setRehearsalStep(0); }} 
          className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 hover:border-slate-500 transition-all active:scale-95"
          title="トップ"
        >
          <Home className="w-5 h-5 text-slate-300" />
        </button>
      </div>
    </div>
  );

  const getImgSrc = (key: string) => {
    if (key === "IMG1") return IMG1;
    if (key === "IMG2") return IMG2;
    if (key === "IMG3") return IMG3;
    if (key === "IMG4") return IMG4;
    if (key === "IMG5") return IMG5;
    return "";
  }

  const exportLogsAsCSV = () => {
    if (historyLogs.length === 0) return;
    
    // Header for CSV
    const headers = ["ID", "Date", "Time", "Result", "Symptom", "OS", "AI Consulted", "Steps Tried", "User Notes", "Final Resolution"];
    
    // Convert logs to rows
    const rows = historyLogs.map(log => [
      log.id,
      log.date,
      log.time,
      log.result,
      `"${log.symptom.replace(/"/g, '""')}"`,
      log.os,
      log.aiConsulted ? "Yes" : "No",
      `"${log.steps.join(' | ').replace(/"/g, '""')}"`,
      `"${(log.notes || "").replace(/"/g, '""')}"`,
      `"${(log.staffResolution || "").replace(/"/g, '""')}"`
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    
    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `AV_Support_Log_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Views ---

  if (view === "history") {
    return (
      <div className="max-w-[1000px] mx-auto min-h-screen pb-20 bg-slate-900">
        <Header showBack={true} />
        <div className="p-8 space-y-8 fade-in">
          <div className="flex items-end justify-between border-b border-white/10 pb-6">
            <div>
              <p className="mono-label text-blue-400 font-bold mb-2">System Audit Records</p>
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase">対応履歴 / Logs</h2>
              <p className="text-slate-500 text-sm mt-2 font-medium">過去のトラブル対応状況を確認・管理できます。</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={exportLogsAsCSV}
                className="text-[10px] font-bold text-blue-400 hover:bg-blue-600/20 px-4 py-2 rounded-xl transition-all uppercase tracking-widest border border-blue-600/30 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <button 
                onClick={() => {
                  if (confirm("全ての履歴を削除しますか？")) {
                    localStorage.removeItem("av_trouble_log");
                    setHistoryLogs([]);
                  }
                }}
                className="text-[10px] font-bold text-red-400 hover:bg-red-600/20 px-4 py-2 rounded-xl transition-all uppercase tracking-widest border border-red-600/30"
              >
                Clear All
              </button>
            </div>
          </div>

          {historyLogs.length === 0 ? (
            <div className="py-32 text-center space-y-6">
              <div className="w-24 h-24 bg-slate-800 rounded-3xl flex items-center justify-center mx-auto text-slate-600 border border-slate-700">
                <History className="w-12 h-12 opacity-20" />
              </div>
              <div className="space-y-1">
                <p className="text-xl font-black text-white">履歴はありません</p>
                <p className="text-slate-500 text-sm">トラブル報告が記録されるとここに表示されます</p>
              </div>
              <button 
                onClick={() => setView("home")}
                className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> トップに戻る
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {historyLogs.map((log) => (
                <div key={log.id} className="hardware-card border-slate-800 bg-slate-800/40 overflow-hidden group">
                  <div className={`h-1.5 w-full ${log.result === "resolved" ? "bg-green-500" : "bg-red-500"} opacity-70`} />
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-2xl ${log.result === "resolved" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"} border border-current/20 shadow-lg`}>
                          {log.result === "resolved" ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <p className="text-[10px] font-mono text-blue-400/60 leading-none">{log.date} @ {log.time}</p>
                            <span className="w-1 h-1 rounded-full bg-slate-700" />
                            <p className="text-[10px] font-mono text-slate-500 leading-none">ID: {(log.id || "").toUpperCase()}</p>
                          </div>
                          <h4 className="font-black text-white text-2xl leading-tight tracking-tight">{log.symptom || "不明な症状"}</h4>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end gap-2">
                        <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border ${log.result === "resolved" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}>
                          {log.result === "resolved" ? "Resolved" : "Escalated"}
                        </span>
                        <button 
                          onClick={() => {
                            const text = `【シアター対応ログ報告】\n日時：${log.date} ${log.time}\n症状：${log.symptom}\n機器：${log.equipment}\n環境：${log.os}\n結果：${log.result === "resolved" ? "解決済み" : "エスカレーション"}\n実施ステップ：\n${log.steps.map(s => `・${s}`).join('\n')}\n${log.notes ? `メモ：${log.notes}\n` : ""}${log.staffResolution ? `最終解決策：${log.staffResolution}` : ""}`;
                            navigator.clipboard.writeText(text);
                            window.open("https://kamiyamamarugoto.slack.com/archives/C07S87L5UCR", "_blank");
                          }}
                          className="flex items-center gap-1.5 text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors bg-blue-400/5 px-2 py-1 rounded-lg border border-blue-400/20"
                        >
                          <MessageSquare className="w-3 h-3" />
                          Slackで報告
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5 shadow-inner">
                        <p className="text-[9px] font-black text-slate-500 uppercase mb-2 tracking-widest">Equipment</p>
                        <p className="text-sm font-bold text-white">{log.equipment}</p>
                      </div>
                      <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5 shadow-inner">
                        <p className="text-[9px] font-black text-slate-500 uppercase mb-2 tracking-widest">Environment</p>
                        <p className="text-sm font-bold text-white">{log.os}</p>
                      </div>
                      <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5 shadow-inner">
                        <p className="text-[9px] font-black text-slate-500 uppercase mb-2 tracking-widest">AI Support</p>
                        <p className="text-sm font-bold text-white">{log.aiConsulted ? "CONSULTED" : "N/A"}</p>
                      </div>
                      <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5 shadow-inner">
                        <p className="text-[9px] font-black text-slate-500 uppercase mb-2 tracking-widest">Protocol</p>
                        <p className="text-sm font-bold text-white">{log.steps.length} Steps</p>
                      </div>
                    </div>

                    {log.steps.length > 0 && (
                      <div className="mb-8">
                        <p className="text-[9px] font-black text-slate-500 uppercase mb-3 tracking-widest">Executed Protocol Steps</p>
                        <div className="flex flex-wrap gap-2">
                          {log.steps.map((s, idx) => (
                            <span key={idx} className="text-[11px] bg-white/5 text-slate-300 px-3 py-1.5 rounded-xl font-bold border border-white/10">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      {log.notes && (
                        <div className="p-5 bg-blue-600/10 border border-blue-600/20 rounded-2xl text-white">
                          <p className="text-[10px] font-black text-blue-400 uppercase mb-2 tracking-widest">User Feedback / Cause</p>
                          <p className="text-sm leading-relaxed">{log.notes}</p>
                        </div>
                      )}

                      {/* Staff Resolution Section */}
                      {log.result === "escalated" && (
                        <div className="mt-6 pt-6 border-t border-white/10">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400">
                              <Wrench className="w-4 h-4" />
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">スタッフ対応記録 / Final Resolution</p>
                          </div>
                          
                          {log.staffResolution ? (
                            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl relative group/res">
                              <p className="text-sm text-slate-200 leading-relaxed">{log.staffResolution}</p>
                              <button 
                                onClick={() => {
                                  setResolutionInputs(prev => ({ ...prev, [log.id]: log.staffResolution! }));
                                  const updated = historyLogs.map(l => l.id === log.id ? { ...l, staffResolution: undefined } : l);
                                  setHistoryLogs(updated);
                                }}
                                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-xl opacity-0 group-hover/res:opacity-100 transition-all active:scale-95"
                                title="編集"
                                id={`edit-log-${log.id}`}
                              >
                                <Edit className="w-4 h-4 text-white" />
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <textarea 
                                value={resolutionInputs[log.id] || ""}
                                onChange={(e) => setResolutionInputs(prev => ({ ...prev, [log.id]: e.target.value }))}
                                placeholder="最終的な解決策や対応内容を入力してください..."
                                className="w-full bg-slate-900 border-2 border-white/5 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:ring-4 focus:ring-blue-600/20 placeholder:text-slate-600 transition-all min-h-[100px]"
                              />
                              <button 
                                onClick={() => handleUpdateResolution(log.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-black px-6 py-4 rounded-2xl transition-all active:scale-95 flex items-center gap-3 shadow-lg shadow-blue-600/20"
                                id={`save-log-${log.id}`}
                              >
                                <CheckCircle2 className="w-4 h-4" /> 解決策を保存する
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (view === "home") {
    return (
      <div className="max-w-[1200px] mx-auto min-h-screen pb-20 bg-slate-900">
        <Header showBack={false} />
        <div className="p-8 space-y-12 fade-in max-w-[800px] mx-auto">
          {/* Preparation Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 px-2">
              <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
              <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">Preparation / 事前準備</h2>
            </div>
            
            <button 
              onClick={() => { setView("rehearsal"); setRehearsalStep(0); setShowRehearsalSolution(false); setRehearsalOS(null); }}
              className="w-full group relative overflow-hidden p-8 rounded-[40px] bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-900/40 border border-white/20 transition-all active:scale-[0.98] hover:shadow-blue-500/30"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 -rotate-12 translate-x-4 -translate-y-4">
                <CheckCircle2 className="w-48 h-48" />
              </div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="text-left space-y-2">
                  <p className="mono-label text-blue-200 font-bold tracking-widest text-[10px] uppercase">Event Readiness</p>
                  <h3 className="text-3xl font-black tracking-tighter">本番前リハーサル</h3>
                  <p className="text-blue-100 text-sm font-medium opacity-80 decoration-blue-300 underline-offset-4 decoration-2">全項目を順に確認し、トラブルを未然に防ぎます</p>
                </div>
                <div className="bg-white/20 p-5 rounded-[28px] backdrop-blur-md shadow-inner group-hover:scale-110 transition-transform">
                  <PlayCircle className="w-10 h-10" />
                </div>
              </div>
            </button>
          </section>

          {/* Troubleshooting Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-red-500 rounded-full" />
                <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">Troubleshooting / 症状から解決</h2>
              </div>
              <span className="text-[10px] font-bold text-red-500/50 italic">何か問題が起きた時はこちら</span>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <button 
                onClick={() => { setEqType("video"); setView("symptoms"); }}
                className="group hardware-card p-8 flex items-center gap-8 transition-all active:scale-[0.97] hover:ring-2 hover:ring-red-500/30 text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 rounded-full blur-3xl -mr-24 -mt-24 group-hover:bg-red-600/20 transition-all opacity-0 group-hover:opacity-100" />
                <div className="p-5 bg-red-600 rounded-xl text-white shadow-lg shadow-red-500/20 border border-red-400/30 group-hover:scale-105 transition-transform">
                  <Monitor className="w-10 h-10" />
                </div>
                <div className="relative z-10">
                  <p className="mono-label text-red-400 mb-2 font-bold tracking-widest text-[9px] uppercase">Visual Troubles</p>
                  <h3 className="font-black text-2xl mb-1 flex items-center gap-2 text-white">
                    映像が映らない場合
                  </h3>
                  <p className="text-sm text-slate-400 font-medium">プロジェクター・スイッチャーの不具合はこちら</p>
                </div>
                <ChevronRight className="ml-auto opacity-30 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-white" />
              </button>

              <button 
                onClick={() => { setEqType("audio"); setView("symptoms"); }}
                className="group hardware-card p-8 flex items-center gap-8 transition-all active:scale-[0.97] hover:ring-2 hover:ring-orange-500/30 text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-orange-600/10 rounded-full blur-3xl -mr-24 -mt-24 group-hover:bg-orange-600/20 transition-all opacity-0 group-hover:opacity-100" />
                <div className="p-5 bg-orange-600 rounded-xl text-white shadow-lg shadow-orange-500/20 border border-orange-400/30 group-hover:scale-105 transition-transform">
                  <Mic className="w-10 h-10" />
                </div>
                <div className="relative z-10">
                  <p className="mono-label text-orange-400 mb-2 font-bold tracking-widest text-[9px] uppercase">Audio Troubles</p>
                  <h3 className="font-black text-2xl mb-1 flex items-center gap-2 text-white">
                    音が出ない・鳴らない
                  </h3>
                  <p className="text-sm text-slate-400 font-medium">マイク・PC音声・ミキサーの不具合はこちら</p>
                </div>
                <ChevronRight className="ml-auto opacity-30 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-white" />
              </button>
            </div>
          </section>

        </div>
      </div>
    );
  }

  if (view === "symptoms") {
    const list = eqType === "video" ? VIDEO_SYMPTOMS : MIC_SYMPTOMS;
    return (
      <div className="max-w-[680px] mx-auto min-h-screen pb-20">
        <Header />
        <div className="p-6 space-y-6 fade-in">
          <div className="py-2">
            <h2 className="text-xl font-bold text-navy">具体的な症状は？</h2>
          </div>
          <div className="space-y-3">
            {list.map((sym) => (
              <button
                key={sym.id}
                onClick={() => handleSymptomClick(sym)}
                className="w-full bg-white px-5 py-4 rounded-xl shadow-sm hover:shadow flex items-center gap-4 transition-all active:scale-[0.98] text-left"
              >
                <span className="text-2xl">{sym.icon}</span>
                <span className="font-medium text-gray-800">{sym.txt}</span>
                <ChevronRight className="ml-auto w-5 h-5 text-gray-300" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === "steps") {
    const steps = getCurrentSteps();
    const commonFinished = isCommonFinished();
    
    // If common steps are done and it's an OS-select symptom but OS not selected, show OS select
    if (selectedSymptom.osSelect && commonFinished && !selectedOS) {
      return (
        <div className="max-w-[800px] mx-auto min-h-screen pb-20 bg-slate-50">
          <Header />
          <div className="p-10 space-y-12 fade-in text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-green-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-green-500/20 rotate-3 animate-bounce">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <div className="space-y-2">
                <p className="text-green-600 font-black tracking-widest uppercase text-xs">Phase 1 Complete</p>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter">基本チェック完了</h2>
                <p className="text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
                  物理的な接続確認が終わりました。<br/>
                  次に、使用しているPCのOSを選択してください。
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 max-w-xl mx-auto">
              <button 
                onClick={() => handleOSSelect("win")} 
                className="group bg-white p-6 rounded-[24px] border-2 border-slate-100 flex flex-col items-center gap-4 transition-all active:scale-95 hover:border-blue-600 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                  <Laptop className="w-8 h-8" />
                </div>
                <div>
                  <span className="font-black text-xl text-slate-900 tracking-tight block mb-1">Windows</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded">Microsoft</span>
                </div>
              </button>

              <button 
                onClick={() => handleOSSelect("mac")} 
                className="group bg-white p-6 rounded-[24px] border-2 border-slate-100 flex flex-col items-center gap-4 transition-all active:scale-95 hover:border-slate-900 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-inner">
                  <Laptop className="w-8 h-8" />
                </div>
                <div>
                  <span className="font-black text-xl text-slate-900 tracking-tight block mb-1">macOS</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded">Apple</span>
                </div>
              </button>
            </div>

            <div className="pt-8">
              <button 
                onClick={() => { setView("symptoms"); setSelectedSymptom(null); }}
                className="text-slate-400 hover:text-slate-600 font-bold text-xs flex items-center gap-2 mx-auto transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> 症状の選択に戻る
              </button>
            </div>
          </div>
        </div>
      );
    }

    const checkedCount = checkedSteps.filter(Boolean).length;
    // Total steps depends on if OS is selected
    const totalPossibleSteps = selectedSymptom.osSelect 
      ? (COMMON_FIRST_STEPS.length + (selectedOS === "win" ? WIN_STEPS.length : selectedOS === "mac" ? MAC_STEPS.length : 0))
      : steps.length;
    
    const progress = (checkedCount / totalPossibleSteps) * 100;

    return (
      <div className="max-w-[1200px] mx-auto min-h-screen pb-32 bg-slate-900/10">
        <Header />
        
        {/* Progress Bar */}
        <div className="h-2 w-full bg-slate-800 sticky top-[72px] z-10 shadow-lg">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)] transition-all duration-500"
          />
        </div>

        <div className="p-8 space-y-8 fade-in max-w-[900px] mx-auto">
          <div className="hardware-card p-6 flex items-center justify-between border-slate-700 bg-slate-800/40">
            <div>
              <p className="mono-label text-blue-400 font-bold mb-2">Diagnostic Scan</p>
              <h2 className="font-black text-white flex items-center gap-3 text-2xl tracking-tight">
                {selectedSymptom.txt}
                {selectedOS && <span className="text-xs bg-blue-600/30 px-3 py-1 rounded-full text-blue-300 font-bold border border-blue-600/20">{selectedOS.toUpperCase()}</span>}
              </h2>
            </div>
            <div className="text-right flex flex-col items-end">
              <p className="mono-label text-slate-500 mb-1">Queue status</p>
              <p className="font-black text-2xl text-white font-mono leading-none tracking-tighter">{checkedCount} / {totalPossibleSteps}</p>
            </div>
          </div>

          <div className="space-y-6">
            {steps.map((step: any, i: number) => {
              const actualIdx = (selectedSymptom.osSelect && commonFinished) ? (i + COMMON_FIRST_STEPS.length) : i;
              const isChecked = checkedSteps[actualIdx];

              const toggleStep = () => {
                const next = [...checkedSteps];
                next[actualIdx] = !next[actualIdx];
                setCheckedSteps(next);
              };

              return (
                <div key={i} className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isChecked ? "bg-slate-50 border-slate-200 opacity-60" : "bg-white border-slate-200 shadow-xl ring-1 ring-slate-200/50"}`}>
                  <div 
                    onClick={toggleStep}
                    className={`p-6 flex items-start gap-5 cursor-pointer hover:bg-slate-50/80 transition-colors ${isChecked ? "" : "border-b border-slate-100"}`}
                  >
                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                      <div className={`w-14 h-14 rounded-2xl border-2 flex flex-col items-center justify-center transition-all shadow-sm ${isChecked ? "bg-green-600 border-green-600 shadow-xl shadow-green-500/30 scale-95" : "border-blue-200 text-slate-400 bg-white hover:border-blue-500 hover:bg-blue-50/50"}`}>
                        {isChecked ? (
                          <CheckCircle2 className="w-8 h-8 text-white" />
                        ) : (
                          <>
                            <span className="text-xl font-black text-slate-800">
                              {(i + 1 + (commonFinished && selectedSymptom.osSelect ? (eqType === "video" ? COMMON_FIRST_STEPS.length : COMMON_MIC_STEPS.length) : 0))}
                            </span>
                            <span className="text-[8px] font-black text-blue-500 uppercase leading-none mt-0.5">CHECK</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className={`text-xl font-black tracking-tight leading-tight transition-all ${isChecked ? "line-through text-slate-400" : "text-slate-900"}`}>
                        {step.txt}
                      </p>
                      {step.note && !isChecked && (
                        <p className="mt-3 text-sm text-slate-600 font-medium leading-relaxed">
                          {step.note}
                        </p>
                      )}
                    </div>
                  </div>

                  {!isChecked && (
                    <div className="p-6 bg-slate-50/50 space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
                    {/* Step specific Windows UI steps */}
                    {step.winSteps && (
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 text-sm space-y-3 shadow-inner">
                        {step.winSteps.map((ws: string, idx: number) => (
                          <div key={idx} className="flex gap-3 items-start">
                            <span className="text-blue-600 font-black shrink-0 w-5 h-5 bg-blue-50 rounded-md flex items-center justify-center text-[10px]">{idx + 1}</span>
                            <p className="text-slate-700 font-medium">{ws.replace(/^[①-⑩]\s*/, "")}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {step.winWarn && (
                      <div className="flex items-center gap-3 text-xs bg-red-50 text-error font-bold p-3 rounded-xl border border-red-100/50">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{step.winWarn}</span>
                      </div>
                    )}

                    {/* Image handling */}
                    {step.imageData && (
                      <div className="rounded-2xl overflow-hidden border border-slate-200">
                        <StepImage type={step.imageData} alt={step.imageAlt} highlight={step.highlight} />
                      </div>
                    )}

                    {step.images && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {step.images.map((img: any, idx: number) => (
                          <div key={idx} className="rounded-xl overflow-hidden border border-slate-200">
                            <StepImage type={img.data} alt={img.alt} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )})}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="fixed bottom-0 left-0 right-0 p-3 bg-slate-900 shadow-[0_-10px_30px_rgba(0,0,0,0.3)] border-t border-white/5 flex justify-center z-20 backdrop-blur-md bg-opacity-95">
          {!showReasonForm ? (
            <div className="max-w-[600px] w-full flex gap-3">
              <button 
                onClick={() => {
                  setPendingResult("resolved");
                  setShowReasonForm(true);
                }}
                className="flex-[1.5] bg-green-600 hover:bg-green-700 text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 transition-all active:scale-95 text-sm"
              >
                <CheckCircle2 className="w-4 h-4" /> 解決した
              </button>
              <button 
                onClick={() => {
                  setPendingResult("escalated");
                  setView("esc");
                }}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-black py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 text-sm"
              >
                <AlertTriangle className="w-4 h-4 text-red-500" /> 解決しない
              </button>
            </div>
          ) : (
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="max-w-[800px] w-full bg-white p-8 rounded-[32px] shadow-2xl animate-in slide-in-from-bottom-8 border-t-8 border-green-500 relative overflow-hidden"
            >
               {/* Decoration */}
               <div className="absolute top-0 right-0 p-4 opacity-5 rotate-12">
                 <PartyPopper className="w-24 h-24 text-green-600" />
               </div>
               
               <div className="space-y-6 relative z-10">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 shadow-md">
                       <Sparkles className="w-7 h-7" />
                     </div>
                     <div>
                       <h3 className="font-black text-slate-900 text-2xl tracking-tight">
                         解決おめでとうございます！
                       </h3>
                       <p className="text-green-600 font-bold tracking-widest uppercase text-[9px]">Resolution Confirmed</p>
                     </div>
                   </div>
                   <button onClick={() => setShowReasonForm(false)} className="text-slate-300 hover:text-slate-500 p-2 transition-colors"><AlertCircle className="w-6 h-6 rotate-45" /></button>
                 </div>
                 
                 <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100/50">
                   <p className="text-slate-600 font-bold text-xs leading-relaxed">
                     今後の改善のため、今回のトラブルの原因を教えてください。
                   </p>
                 </div>
 
                   <div className="space-y-3">
                     <div className="relative">
                       <input 
                         type="text" 
                         value={reasonInput}
                         onChange={(e) => setReasonInput(e.target.value)}
                         onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                         placeholder="例：変換アダプタを交換した、HDMI4を選択した..."
                         className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/10 placeholder:text-slate-400 transition-all text-base font-medium"
                         autoFocus
                       />
                       <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold text-slate-300 pointer-events-none">
                         PRESS BUTTON TO SEND
                       </div>
                     </div>
                     <button 
                       onClick={finalizeSession}
                       className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-base"
                     >
                       <span>記録を完了して戻る (送信)</span>
                       <ChevronRight className="w-5 h-5" />
                     </button>
                   </div>
               </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  if (view === "rehearsal") {
    // OS Selection Step
    if (rehearsalStep === 2 && !rehearsalOS) {
      return (
        <div className="max-w-[800px] mx-auto min-h-screen pb-32 bg-slate-50">
          <Header />
          <div className="p-8 space-y-10 fade-in">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100 italic">
                OS Selection
              </span>
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-tight">
                使用するPCのOSを選択してください
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed">
                OSによって映像出力の設定手順が異なります。
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-8">
              <button 
                onClick={() => { setRehearsalOS("win"); window.scrollTo(0, 0); }}
                className="group relative overflow-hidden p-8 rounded-[40px] bg-white border-2 border-slate-100 shadow-xl transition-all hover:border-blue-500 hover:-translate-y-1 active:scale-[0.98]"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 bg-blue-600 rounded-full translate-x-4 -translate-y-4 w-32 h-32" />
                <div className="relative z-10 flex flex-col items-center gap-5">
                   <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                      <Monitor className="w-10 h-10" />
                   </div>
                   <div className="text-center">
                     <p className="text-2xl font-black text-slate-900 tracking-tight">Windows</p>
                     <p className="text-slate-400 text-xs font-bold mt-1">Surface, Let's note, etc.</p>
                   </div>
                </div>
              </button>

              <button 
                onClick={() => { setRehearsalOS("mac"); window.scrollTo(0, 0); }}
                className="group relative overflow-hidden p-8 rounded-[40px] bg-white border-2 border-slate-100 shadow-xl transition-all hover:border-slate-400 hover:-translate-y-1 active:scale-[0.98]"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 bg-slate-900 rounded-full translate-x-4 -translate-y-4 w-32 h-32" />
                <div className="relative z-10 flex flex-col items-center gap-5">
                   <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-slate-900/20 group-hover:scale-110 transition-transform">
                      <Laptop className="w-10 h-10" />
                   </div>
                   <div className="text-center">
                     <p className="text-2xl font-black text-slate-900 tracking-tight">Mac</p>
                     <p className="text-slate-400 text-xs font-bold mt-1">MacBook Pro / Air</p>
                   </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      );
    }

    const currentItem = REHEARSAL_STEPS[rehearsalStep];
    const isDone = rehearsalStep >= REHEARSAL_STEPS.length;
    const progress = (Math.min(rehearsalStep, REHEARSAL_STEPS.length) / REHEARSAL_STEPS.length) * 100;

    if (isDone) {
      return (
        <div className="max-w-[700px] mx-auto min-h-screen pb-20 bg-slate-50">
          <Header />
          <div className="p-12 text-center space-y-8 fade-in">
             <div className="w-24 h-24 bg-green-500 rounded-[40px] flex items-center justify-center mx-auto shadow-2xl shadow-green-500/30 scale-110">
               <CheckCircle2 className="w-14 h-14 text-white" />
             </div>
             <div className="space-y-3">
               <h2 className="text-5xl font-black text-slate-900 tracking-tighter">準備完了！</h2>
               <p className="text-slate-500 font-medium text-lg">全項目のチェックが完了しました。本番頑張ってください！</p>
             </div>
             <div className="pt-10 space-y-4">
                <button 
                  onClick={() => setView("home")}
                  className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl shadow-xl transition-all active:scale-95"
                >
                  トップに戻る
                </button>
                <button 
                  onClick={() => window.open("https://kamiyamamarugoto.slack.com/archives/C07S87L5UCR", "_blank")}
                  className="w-full bg-white border-2 border-slate-200 text-slate-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"
                >
                  <MessageSquare className="w-5 h-5" /> 解決しない場合の問い合わせ先
                </button>
             </div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-[800px] mx-auto min-h-screen pb-32 bg-slate-50">
        <Header />
        
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-slate-200 sticky top-[72px] z-10 shadow-sm">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]"
          />
        </div>

        <div className="p-8 space-y-6 fade-in">
          {/* Category Label */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100 italic">
              Step {rehearsalStep + 1} / {REHEARSAL_STEPS.length}
            </span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
              {currentItem.category}
            </span>
          </div>

          {!showRehearsalSolution ? (
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter leading-tight">
                  {currentItem.check}
                </h2>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  {currentItem.description}
                </p>
              </div>

              {(currentItem as any).imageData && (
                <div className="rounded-3xl overflow-hidden border-2 border-slate-200 shadow-sm">
                  <StepImage 
                    type={(currentItem as any).imageData} 
                    alt={(currentItem as any).imageAlt} 
                    highlight={(currentItem as any).highlight} 
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-5 pt-2">
                <button 
                  onClick={() => { setRehearsalStep(rehearsalStep + 1); window.scrollTo(0, 0); }}
                  className="flex flex-col items-center gap-4 p-8 bg-white border-2 border-slate-100 rounded-[32px] transition-all hover:border-green-500 hover:shadow-2xl hover:-translate-y-1 group"
                >
                  <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <span className="font-black text-xl text-slate-900 tracking-tight">問題なし</span>
                </button>

                <button 
                  onClick={() => setShowRehearsalSolution(true)}
                  className="flex flex-col items-center gap-4 p-8 bg-white border-2 border-slate-100 rounded-[32px] transition-all hover:border-red-500 hover:shadow-2xl hover:-translate-y-1 group"
                >
                  <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all shadow-inner">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <span className="font-black text-xl text-slate-900 tracking-tight">問題あり</span>
                </button>
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="bg-red-50 p-4 rounded-3xl border border-red-100 space-y-1">
                <div className="flex items-center gap-2 text-red-600 font-black text-[10px] uppercase tracking-widest">
                  <Wrench className="w-3 h-3" /> Recommended Solution
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  以下の解決策を実施してください
                </h3>
              </div>

              {/* SOLUTION CONTENT (Reusing Step Components) */}
              <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-xl space-y-4">
                <div className="space-y-2">
                  <p className="text-lg font-black text-slate-900 leading-tight">
                    {(currentItem.solution as any).txt}
                  </p>
                  <p className="text-slate-600 text-sm font-medium">
                    {(currentItem.solution as any).note}
                  </p>
                </div>

                {(currentItem.solution as any).winSteps && (
                  <div className="bg-slate-50 p-6 rounded-2xl space-y-3">
                    {(currentItem.solution as any).winSteps.map((ws: string, idx: number) => (
                      <div key={idx} className="flex gap-3">
                        <span className="text-blue-600 font-black shrink-0">{idx + 1}.</span>
                        <p className="text-sm font-medium text-slate-700">{ws.replace(/^[①-⑩]\s*/, "")}</p>
                      </div>
                    ))}
                  </div>
                )}

                {(currentItem.solution as any).imageData && (
                  <StepImage 
                    type={(currentItem.solution as any).imageData} 
                    alt={(currentItem.solution as any).imageAlt} 
                    highlight={(currentItem.solution as any).highlight} 
                  />
                )}
                
                <button 
                  onClick={() => {
                    setShowRehearsalSolution(false);
                    setRehearsalStep(rehearsalStep + 1);
                    window.scrollTo(0, 0);
                  }}
                  className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <CheckCircle2 className="w-6 h-6" /> 解決したので次へ進む
                </button>

                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Still not working?
                    </p>
                    <h4 className="text-sm font-black text-slate-900">対応依頼メッセージをコピーして報告</h4>
                  </div>
                  
                  <div className="relative group">
                    <textarea 
                      className="w-full h-32 bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-[11px] font-mono focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all shadow-inner"
                      readOnly
                      value={generateRehearsalReport()}
                    />
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(generateRehearsalReport());
                      }}
                      className="absolute top-2 right-2 bg-slate-900 text-white px-3 py-2 rounded-xl flex items-center gap-2 text-[10px] font-black hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                    >
                      <Copy className="w-3 h-3" />
                      COPY
                    </button>
                  </div>

                  <button 
                    onClick={() => window.open("https://kamiyamamarugoto.slack.com/archives/C07S87L5UCR", "_blank")}
                    className="w-full bg-slate-50 border-2 border-slate-200 text-slate-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-100 transition-all active:scale-[0.98]"
                  >
                    <MessageSquare className="w-5 h-5" /> Slackで問い合わせる
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  if (view === "esc") {
    const escOptions = getEscOptions();
    const escText = generateEscText();

    return (
      <div className="max-w-[680px] mx-auto min-h-screen pb-20 bg-gray-50">
        <Header />
        <div className="p-6 space-y-8 fade-in">
          <div className="text-center space-y-3 py-6">
            <div className="mx-auto w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mb-2">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-navy">復旧支援プロトコル</h2>
            <p className="text-gray-500 text-sm">セルフチェックでの解決が不可能です。以下の外部エスカレーションを実行してください。</p>
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <h3 className="font-bold text-navy flex items-center gap-2">
                <span className="bg-navy text-white w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-mono">01</span>
                代替案の試行
              </h3>
              <p className="text-[10px] text-slate-500">トラブルが解決しない場合、以下の代替案を試してください。</p>
              <div className="grid grid-cols-1 gap-3">
                {escOptions.map((opt: any, i: number) => (
                  <div key={i} className="hardware-card p-5 flex items-center gap-5 group hover:bg-navy/90 transition-all border border-white/5">
                    <div className="p-3 bg-white/5 rounded-xl text-white group-hover:bg-accent group-hover:text-white transition-all">
                      {opt.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-white text-lg">{opt.txt}</p>
                      <p className="text-sm opacity-50">{opt.sub}</p>
                    </div>
                    <ChevronRight className="opacity-20" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-bold text-navy flex items-center gap-2">
                <span className="bg-navy text-white w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-mono">02</span>
                対応依頼メッセージをコピー
              </h3>
              <p className="text-[10px] text-slate-500">以下のレポート内容をコピーしてください。Slackでの報告用に使用します。</p>
              
              <div className="relative group">
                <textarea 
                  className="w-full h-48 bg-white border-2 border-slate-200 rounded-2xl p-5 text-sm font-mono focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all shadow-inner"
                  readOnly
                  value={escText}
                />
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(escText);
                  }}
                  className="absolute top-4 right-4 bg-navy text-white px-4 py-3 rounded-xl flex items-center gap-2 text-xs font-black hover:bg-navy/80 transition-all shadow-lg active:scale-95 group/btn"
                >
                  <Copy className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                  MESSAGE COPY
                </button>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="font-bold text-navy flex items-center gap-2">
                <span className="bg-navy text-white w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-mono">03</span>
                09_pj_配信相談 に投稿
              </h3>
              <p className="text-[10px] text-slate-500">Slackを開き、コピーした内容を貼り付けて送信してください。</p>
              
              <div className="hardware-card p-6 flex items-center gap-6 group hover:bg-navy/90 transition-all border-2 border-blue-50 cursor-pointer"
                   onClick={() => window.open("https://kamiyamamarugoto.slack.com/archives/C07S87L5UCR", "_blank")}>
                <div className="p-4 bg-white/5 rounded-2xl text-white group-hover:bg-accent group-hover:text-white transition-all shadow-lg">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-black text-white text-xl">Slackを開く</p>
                  <p className="text-sm opacity-60">09_pj_配信相談 チャンネルへ遷移</p>
                </div>
                <ExternalLink className="w-5 h-5 text-white/30 group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>

          <button 
            onClick={() => { 
              setPendingResult("escalated");
              setShowReasonForm(true);
            }}
            className="w-full bg-white border-2 border-navy text-navy font-bold py-5 rounded-2xl shadow-xl hover:bg-navy hover:text-white transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            セッションを終了してトップに戻る
          </button>
          
          {showReasonForm && (
            <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
              <div className="max-w-[500px] w-full bg-white p-8 rounded-3xl shadow-2xl animate-in zoom-in-95">
                <div className="space-y-6">
                   <div className="flex items-center justify-between">
                     <h3 className="font-black text-slate-800 text-2xl tracking-tight">最終状況の記録</h3>
                     <button onClick={() => setShowReasonForm(false)} className="text-slate-400 hover:text-slate-600 p-2"><AlertCircle className="w-6 h-6 rotate-45" /></button>
                   </div>
                   <p className="text-slate-500 font-medium">解決しなかった原因や、担当者に伝えたいことがあれば入力してください。</p>
                   <textarea 
                     value={reasonInput}
                     onChange={(e) => setReasonInput(e.target.value)}
                     placeholder="例：アダプタが熱くなっていた、別のPCでもダメだった、など..."
                     className="w-full h-32 bg-slate-50 border-2 border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-red-500/10 placeholder:text-slate-400 transition-all font-sans text-lg"
                     autoFocus
                   />
                   <div className="flex gap-4">
                     <button 
                       onClick={() => setShowReasonForm(false)}
                       className="flex-1 bg-slate-100 text-slate-600 font-bold py-5 rounded-2xl hover:bg-slate-200 transition-colors"
                     >
                       キャンセル
                     </button>
                     <button 
                       onClick={finalizeSession}
                       className="flex-[2] bg-navy text-white font-black py-5 rounded-2xl shadow-xl shadow-navy/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-lg group"
                     >
                       <span>報告を送信して完了</span>
                       <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                     </button>
                   </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
