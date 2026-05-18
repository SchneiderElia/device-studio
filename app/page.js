/**
 * Device Studio - Professional Multi-Device Testing Platform
 * Copyright (C) 2026 nologosolobrand-ES
 * Released under the GNU General Public License v3.0
 */

"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  Laptop, 
  RotateCw, 
  ExternalLink, 
  Search, 
  Maximize, 
  Minimize,
  Settings2,
  RefreshCcw,
  Eye,
  EyeOff,
  Wifi,
  Battery,
  Signal,
  Share,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Star,
  Globe,
  Layout,
  Camera,
  Tv,
  Terminal,
  Code,
  Link,
  QrCode
} from "lucide-react";
import * as htmlToImage from "html-to-image";

const DeviceFrame = ({ device, url, scale, isRotated, showBrowserBar, id, iframeKey, isMixMode, isComparisonMode }) => {
  const frameRef = useRef(null);
  const deviceData = device;
  const dWidth = isRotated ? deviceData.height : deviceData.width;
  const dHeight = isRotated ? deviceData.width : deviceData.height;

  const mixScale = deviceData.type === 'mobile' ? 0.8 : deviceData.type === 'tablet' ? 0.6 : 0.5;
  const typeScale = (deviceData.type === 'mobile' || deviceData.type === 'tablet') ? 0.9 : 1;
  const currentScale = scale * (isMixMode ? mixScale : isComparisonMode ? 0.7 : 1) * typeScale;
  
  const browserBarHeight = (deviceData.type === "mobile" || deviceData.type === "tablet") && showBrowserBar ? 60 : 0;
  const chromeHeight = 80;
  const totalHeight = dHeight + browserBarHeight + (deviceData.type === 'laptop' || deviceData.type === 'desktop' ? chromeHeight : 0);

  return (
    <div 
      style={{ width: `${dWidth * currentScale}px`, height: `${totalHeight * currentScale}px`, position: 'relative' }}
      className="flex items-center justify-center shrink-0"
    >
      <div 
        ref={frameRef}
        className="absolute transition-all duration-300 ease-in-out bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col shrink-0 shadow-sm"
        style={{ transform: `scale(${currentScale})`, transformOrigin: "top center", top: 0 }}
        data-device-id={id}
      >
        {deviceData.type === "mobile" || deviceData.type === "tablet" ? (
          <div className="flex flex-col shrink-0 z-20">
            <div className={`h-8 flex items-center justify-between px-6 ${deviceData.name.toLowerCase().includes("ipad") || deviceData.name.toLowerCase().includes("iphone") ? "bg-white dark:bg-zinc-950" : "bg-[#f1f3f4] dark:bg-[#202124]"}`}>
              <div className="text-[10px] font-bold">9:41</div>
              <div className="flex items-center gap-1.5"><Signal size={10} /><Wifi size={10} /><Battery size={12} /></div>
            </div>
            {((!deviceData.name.toLowerCase().includes("iphone") && !deviceData.name.toLowerCase().includes("ipad")) || (deviceData.type === "tablet" && deviceData.name.toLowerCase().includes("ipad"))) && (
              <div className={`h-12 flex items-center px-4 gap-3 ${deviceData.name.toLowerCase().includes("ipad") ? "bg-zinc-100 dark:bg-zinc-900 border-b border-black/5" : "bg-[#f1f3f4] dark:bg-[#202124] border-b border-black/10"}`}>
                <div className="flex items-center gap-4 text-zinc-400"><ChevronLeft size={18} /><ChevronRight size={18} /><RefreshCcw size={14} /></div>
                <div className={`flex-1 h-8 rounded-lg flex items-center px-4 gap-2 ${deviceData.name.toLowerCase().includes("ipad") ? "bg-white dark:bg-zinc-800" : "bg-white dark:bg-[#35363a]"}`}>
                  <div className="text-[11px] text-zinc-500 truncate w-full text-center">{url.replace(/^https?:\/\/(www\.)?/, '') || "website.com"}</div>
                </div>
                <div className="flex items-center gap-3 text-zinc-400"><Share size={16} /><MoreVertical size={18} /></div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col shrink-0 z-20">
            <div className="h-12 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-4 gap-4">
              <div className="flex gap-1.5 w-12"><div className="w-3 h-3 rounded-full bg-[#ff5f57]" /><div className="w-3 h-3 rounded-full bg-[#febc2e]" /><div className="w-3 h-3 rounded-full bg-[#28c840]" /></div>
              <div className="flex items-center gap-3 text-zinc-400"><ChevronLeft size={18} /><ChevronRight size={18} /><RefreshCcw size={14} /></div>
              <div className="flex-1 h-8 bg-white dark:bg-zinc-800 rounded-lg border border-black/5 flex items-center px-4 gap-2"><Star size={12} className="text-zinc-300" /><div className="flex-1 text-[11px] text-zinc-500 truncate font-mono">{url || "https://your-preview-url.com"}</div></div>
              <div className="w-24 flex justify-end gap-3 text-zinc-400"><Share size={16} /><Maximize size={16} /></div>
            </div>
            <div className="h-8 bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-4 gap-4 overflow-hidden">
              <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-medium">
                <div className="flex items-center gap-1.5 hover:text-white transition-colors"><Globe size={10} /><span>Google</span></div>
                <div className="flex items-center gap-1.5 hover:text-white transition-colors"><Globe size={10} /><span>GitHub</span></div>
                <div className="flex items-center gap-1.5 hover:text-white transition-colors"><Layout size={10} /><span>Figma</span></div>
              </div>
            </div>
          </div>
        )}
        <div className="relative bg-white dark:bg-zinc-900 overflow-hidden" style={{ width: `${dWidth}px`, height: `${dHeight}px` }}>
          {url ? (
            <iframe 
              key={iframeKey}
              src={url} 
              className="w-full h-full border-none no-scrollbar" 
              style={{ width: '100%', height: '100%' }}
              title="Preview" 
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-zinc-500">
              <Monitor size={32} className="mb-4 opacity-20" /><h2 className="text-sm font-bold mb-1">Device Preview</h2><p className="text-[10px]">Enter a URL to start testing.</p>
            </div>
          )}
          {showBrowserBar && (deviceData.type === "mobile" || deviceData.type === "tablet") && (
            <div className={`absolute ${deviceData.type === 'tablet' ? 'bottom-10' : 'bottom-6'} left-1/2 -translate-x-1/2 w-[92%] h-12 bg-white/85 dark:bg-zinc-900/85 backdrop-blur-xl rounded-2xl border border-black/5 flex items-center px-4 gap-3 z-10 shadow-lg`}>
              <div className="text-[10px] font-medium text-zinc-500">AA</div>
              <div className="flex-1 flex items-center justify-center gap-1.5 min-w-0">
                <div className="w-3 h-3 rounded-full bg-zinc-200" />
                <div className="text-[11px] text-zinc-700 dark:text-zinc-300 truncate font-medium">{url.replace(/^https?:\/\/(www\.)?/, '') || "website.com"}</div>
              </div>
              <Share size={14} className="text-zinc-500" />
            </div>
          )}
          {showBrowserBar && (deviceData.type === "mobile" || deviceData.type === "tablet") && <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/20 dark:bg-white/20 rounded-full z-10" />}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [url, setUrl] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  
  const [device, setDevice] = useState({ name: "MacBook Air", width: 1440, height: 900, type: "laptop" });
  const [isRotated, setIsRotated] = useState(false);
  const [scale, setScale] = useState(1);
  const [autoScale, setAutoScale] = useState(true);
  const [customWidth, setCustomWidth] = useState(1440);
  const [customHeight, setCustomHeight] = useState(900);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showUI, setShowUI] = useState(true);
  const [screenshotBlob, setScreenshotBlob] = useState(null);
  const [isComparisonMode, setIsComparisonMode] = useState(false);
  const [comparisonDevices, setComparisonDevices] = useState([
    { name: "iPhone 16", width: 393, height: 852, type: "mobile" },
    { name: "iPad Pro", width: 1032, height: 1376, type: "tablet" }
  ]);
  const [isMixMode, setIsMixMode] = useState(false);
  const [mixCategory, setMixCategory] = useState("mobile");
  const [showConsole, setShowConsole] = useState(false);
  const [consoleTab, setConsoleTab] = useState("console");
  const [htmlSource, setHtmlSource] = useState("Loading source code...");
  const [isSyncEnabled, setIsSyncEnabled] = useState(false);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [secondDevice, setSecondDevice] = useState(null);
  const [activeSlot, setActiveSlot] = useState(1);
  const [copied, setCopied] = useState(false);
  const [localIp, setLocalIp] = useState("");
  const [showBrowserBar, setShowBrowserBar] = useState(true);
  const menuTimeoutRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const savedUrl = localStorage.getItem('ds_url');
    const savedDevice = localStorage.getItem('ds_device');
    const savedCustomWidth = localStorage.getItem('ds_custom_width');
    const savedCustomHeight = localStorage.getItem('ds_custom_height');
    const savedAutoScale = localStorage.getItem('ds_auto_scale');
    const savedIsRotated = localStorage.getItem('ds_is_rotated');
    const savedShowUI = localStorage.getItem('ds_show_ui');
    const savedShowBrowserBar = localStorage.getItem('ds_show_browser_bar');
    const savedLocalIp = localStorage.getItem('ds_local_ip');

    if (savedUrl) { setUrl(savedUrl); setInputUrl(savedUrl); }
    if (savedDevice) setDevice(JSON.parse(savedDevice));
    if (savedCustomWidth) setCustomWidth(parseInt(savedCustomWidth));
    if (savedCustomHeight) setCustomHeight(parseInt(savedCustomHeight));
    if (savedAutoScale) setAutoScale(savedAutoScale === 'true');
    if (savedIsRotated) setIsRotated(savedIsRotated === 'true');
    if (savedShowUI) setShowUI(savedShowUI === 'true');
    if (savedShowBrowserBar) setShowBrowserBar(savedShowBrowserBar === 'true');
    if (savedLocalIp) setLocalIp(savedLocalIp);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('ds_url', url);
    localStorage.setItem('ds_device', JSON.stringify(device));
    localStorage.setItem('ds_custom_width', customWidth.toString());
    localStorage.setItem('ds_custom_height', customHeight.toString());
    localStorage.setItem('ds_auto_scale', autoScale.toString());
    localStorage.setItem('ds_is_rotated', isRotated.toString());
    localStorage.setItem('ds_show_ui', showUI.toString());
    localStorage.setItem('ds_show_browser_bar', showBrowserBar.toString());
    localStorage.setItem('ds_local_ip', localIp);
  }, [url, device, customWidth, customHeight, autoScale, isRotated, showUI, showBrowserBar, localIp, mounted]);

  const handleDeviceChange = (p) => {
    if (activeSlot === 1) {
      setDevice(p);
      if (p.type === "mobile" || p.type === "tablet") {
        setCustomWidth(p.width);
        setCustomHeight(p.height);
      }
    } else {
      setSecondDevice(p);
    }
    setIframeKey(k => k + 1);
  };

  const detectLocalIp = async () => {
    try {
      const response = await fetch('/api/get-ip');
      const data = await response.json();
      if (data.ip && data.ip.startsWith("192.168.")) {
        setLocalIp(data.ip.replace("192.168.", ""));
      }
    } catch (e) { console.error("IP Detection failed", e); }
  };

  const containerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Centralized Sync Listener
  useEffect(() => {
    if (!isSyncEnabled) return;

    const handleMessage = (e) => {
      if (!e.data || typeof e.data !== 'object' || !e.data.type) return;

      const broadcast = (data) => {
        const frames = document.querySelectorAll('iframe');
        frames.forEach(frame => {
          // IMPORTANT: Do not send the message back to the source frame
          // We identify the source by comparing the contentWindow
          if (frame.contentWindow && frame.contentWindow !== e.source) {
            frame.contentWindow.postMessage(data, '*');
          }
        });
      };

      if (e.data.type === 'scroll-from-client') {
        broadcast({ type: 'scroll-sync', y: e.data.y });
      }
      if (e.data.type === 'click-from-client') {
        broadcast({ type: 'click-sync', selector: e.data.selector });
      }
      if (e.data.type === 'input-from-client') {
        broadcast({ type: 'input-sync', selector: e.data.selector, value: e.data.value });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isSyncEnabled]);

  useEffect(() => {
    const formatHTML = (html) => {
      let formatted = '';
      let reg = /(>)(<)(\/*)/g;
      html = html.replace(reg, '$1\r\n$2$3');
      let pad = 0;
      html.split('\r\n').forEach(function(node) {
        let indent = 0;
        if (node.match( /.+<\/\w[^>]*>$/ )) indent = 0;
        else if (node.match( /^<\/\w/ )) { if (pad !== 0) pad -= 1; }
        else if (node.match( /^<\w[^>]*[^\/]>.*$/ )) indent = 1;
        else indent = 0;
        let padding = '';
        for (let i = 0; i < pad; i++) padding += '  ';
        formatted += padding + node + '\r\n';
        pad += indent;
      });
      return formatted;
    };

    const highlightHTML = (html) => {
      if (!html) return "";
      return html
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/(&lt;)(\!DOCTYPE.*?)&gt;/g, '<span class="text-zinc-500 font-italic">$1$2&gt;</span>')
        .replace(/(&lt;)([\w:.-]+)/g, '$1<span class="text-indigo-400">$2</span>')
        .replace(/(&lt;\/)([\w:.-]+)/g, '$1<span class="text-indigo-400">$2</span>')
        .replace(/(\s)([\w:.-]+)(=)/g, '$1<span class="text-sky-300">$2</span>$3')
        .replace(/(")(.*?)(")/g, '$1<span class="text-amber-200">$2</span>$3')
        .replace(/(&lt;!--.*?--&gt;)/g, '<span class="text-green-600/50">$1</span>');
    };

    const fetchSource = async () => {
      setHtmlSource("Fetching source code...");
      try {
        let response = await fetch(url);
        if (!response.ok) throw new Error();
        let text = await response.text();
        setHtmlSource(highlightHTML(formatHTML(text)));
      } catch (err) {
        try {
          const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
          const response = await fetch(proxyUrl);
          const data = await response.json();
          setHtmlSource(highlightHTML(formatHTML(data.contents || "Could not retrieve source code.")));
        } catch (err) {
          setHtmlSource("Error: Could not fetch source code due to CORS restrictions.");
        }
      }
    };
    if (url) fetchSource();
  }, [url]);

  const presets = [
    { name: "Small Phone (Old Gen)", width: 320, height: 568, type: "mobile" },
    { name: "Compact Phone (360px)", width: 360, height: 740, type: "mobile" },
    { name: "iPhone 13/14 Mini", width: 375, height: 812, type: "mobile" },
    { name: "iPhone 15/16/17", width: 393, height: 740, type: "mobile" },
    { name: "iPhone 16/17 Pro", width: 402, height: 760, type: "mobile" },
    { name: "Google Pixel 9/10 Pro", width: 412, height: 810, type: "mobile" },
    { name: "iPhone 16/17 Pro Max", width: 440, height: 830, type: "mobile" },
    { name: "Google Pixel 9/10 Pro XL", width: 448, height: 870, type: "mobile" },
    { name: "Galaxy S25/S26 Ultra", width: 450, height: 850, type: "mobile" },
    { name: "Phablet / Large Mobile", width: 540, height: 960, type: "mobile" },
    { name: "Small Tablet (7-inch)", width: 600, height: 960, type: "tablet" },
    { name: "Galaxy Z Fold (Open)", width: 768, height: 1024, type: "tablet" },
    { name: "iPad Mini 7", width: 768, height: 1024, type: "tablet" },
    { name: "Samsung Galaxy Tab S10", width: 800, height: 1280, type: "tablet" },
    { name: "iPad Air 11 (M3)", width: 820, height: 1180, type: "tablet" },
    { name: "iPad Pro 11 (M4)", width: 834, height: 1210, type: "tablet" },
    { name: "iPad Pro 13 (M4/M5)", width: 1032, height: 1376, type: "tablet" },
    { name: "Legacy Monitor / iPad Land.", width: 1024, height: 768, type: "desktop" },
    { name: "Small Laptop (Netbook)", width: 1152, height: 720, type: "laptop" },
    { name: "Steam Deck / ROG Ally", width: 1280, height: 800, type: "laptop" },
    { name: "MacBook Air 13 (M3)", width: 1440, height: 900, type: "laptop" },
    { name: "MacBook Pro 14 (M4)", width: 1512, height: 982, type: "laptop" },
    { name: "Surface Pro 11", width: 1536, height: 1024, type: "laptop" },
    { name: "MacBook Pro 16 (M4)", width: 1728, height: 1117, type: "laptop" },
    { name: "Dell XPS 13 (FHD+)", width: 1920, height: 1200, type: "laptop" },
    { name: "FHD Monitor", width: 1920, height: 1080, type: "desktop" },
    { name: "iMac 24-inch", width: 2240, height: 1260, type: "desktop" },
    { name: "QHD / Studio Display", width: 2560, height: 1440, type: "desktop" },
    { name: "Pro Display XDR (6K)", width: 3008, height: 1692, type: "desktop" },
    { name: "Ultrawide 21:9", width: 3440, height: 1440, type: "desktop" },
    { name: "4K Monitor", width: 3840, height: 2160, type: "desktop" },
  ];

  const displayWidth = isRotated ? device.height : device.width;
  const displayHeight = isRotated ? device.width : device.height;

  useEffect(() => {
    const CHROME_HEIGHT = 32;
    const BORDER_WIDTH = 2;
    const calculateScale = () => {
      if (autoScale && containerRef.current) {
        const container = containerRef.current;
        const padding = 60;
        const availableWidth = container.clientWidth - padding;
        const availableHeight = container.clientHeight - padding;
        const totalWidth = displayWidth + BORDER_WIDTH;
        const totalHeight = displayHeight + CHROME_HEIGHT + BORDER_WIDTH;
        const scaleW = availableWidth / totalWidth;
        const scaleH = availableHeight / totalHeight;
        setScale(Math.min(scaleW, scaleH, 1));
      } else if (!autoScale) {
        setScale(1);
      }
    };
    if (mounted) {
      calculateScale();
      const timer = setTimeout(calculateScale, 100);
      window.addEventListener("resize", calculateScale);
      return () => {
        window.removeEventListener("resize", calculateScale);
        clearTimeout(timer);
      };
    }
  }, [device, autoScale, isRotated, displayWidth, displayHeight, mounted]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isMixMode) return;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        container.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [isMixMode]);

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    let formattedUrl = inputUrl.trim();
    if (formattedUrl && !formattedUrl.startsWith("http")) formattedUrl = "https://" + formattedUrl;
    setUrl(formattedUrl);
  };

  const handleMouseEnter = (menuId) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setActiveMenu(menuId);
  };

  const handleMouseLeave = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    menuTimeoutRef.current = setTimeout(() => setActiveMenu(null), 300);
  };

  const handleScreenshot = async () => {
    const element = containerRef.current;
    if (!element) return;
    try {
      const blob = await htmlToImage.toBlob(element, { quality: 1, pixelRatio: 2 });
      setScreenshotBlob(blob);
    } catch (err) { console.error("Screenshot error:", err); }
  };

  if (!mounted) return null;

  return (
    <div className="relative h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 overflow-hidden font-sans no-scrollbar">
      <div className={`absolute top-6 left-8 h-14 bg-zinc-900/90 backdrop-blur-xl rounded-full border border-white/10 flex items-center px-4 gap-3 z-50 transition-all duration-500 ${showUI ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white"><Monitor size={18} strokeWidth={2.5} /></div>
        <h1 className="text-xs font-bold leading-none text-white whitespace-nowrap">Device Studio</h1>
      </div>

      <header className={`absolute top-6 right-8 h-14 bg-zinc-900/90 backdrop-blur-xl rounded-full border border-white/10 flex items-center px-3 gap-2 z-50 transition-all duration-500 ${showUI ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <form onSubmit={handleUrlSubmit} className="relative flex items-center transition-all duration-500 w-40 focus-within:w-80 group/search">
          <div className="absolute left-3 text-zinc-500 group-focus-within/search:text-indigo-400"><Search size={14} /></div>
          <input type="text" value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} placeholder="Enter URL..." className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-indigo-500 transition-all" />
        </form>
        <button onClick={handleUrlSubmit} className="p-2 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-all"><RefreshCcw size={16} /></button>
        <a href={url} target="_blank" className="p-2 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-all"><ExternalLink size={16} /></a>
      </header>

      <main 
        ref={containerRef} 
        className={`flex h-full w-full items-center ${isMixMode ? "justify-start overflow-x-auto overflow-y-hidden" : "justify-center"} p-4 md:p-10 no-scrollbar ${!isMixMode && autoScale ? "overflow-hidden" : "overflow-auto scroll-smooth"}`}
      >
        <div className={`flex items-center ${isMixMode ? "justify-start h-full" : "justify-center"} gap-12 transition-all duration-700 ${isMixMode ? "min-w-max px-64" : ""}`}>
          {isMixMode ? (
            presets.filter(p => mixCategory === 'desktop' ? (p.type === 'desktop' || p.type === 'laptop') : p.type === mixCategory).map((p) => (
              <div key={p.name} className="flex flex-col items-start gap-1.5 relative">
                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest ml-1">{p.name} <span className="opacity-90 ml-2 font-mono">({isRotated ? p.height : p.width}×{isRotated ? p.width : p.height})</span></span>
                <DeviceFrame 
                  id={`mix-${p.name}`}
                  device={p} 
                  url={url} 
                  scale={scale} 
                  isRotated={isRotated}
                  showBrowserBar={showBrowserBar}
                  isSyncEnabled={isSyncEnabled}
                  isMixMode={true}
                  isComparisonMode={false}
                />
              </div>
            ))
          ) : (
            <>
              <DeviceFrame 
                id="main-device"
                device={device} 
                url={url} 
                scale={scale} 
                isRotated={isRotated}
                showBrowserBar={showBrowserBar}
                iframeKey={iframeKey}
                isMixMode={false}
                isComparisonMode={isComparisonMode}
              />
              {isComparisonMode && (
                <DeviceFrame 
                  id="comp-2"
                  device={secondDevice || presets[0]} 
                  url={url} 
                  scale={scale} 
                  isRotated={isRotated}
                  showBrowserBar={showBrowserBar}
                  iframeKey={iframeKey}
                  isMixMode={false}
                  isComparisonMode={true}
                />
              )}
            </>
          )}
        </div>
      </main>

      <div className={`absolute bottom-8 left-8 z-50 transition-all duration-500 ${showUI ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="px-6 py-2 bg-zinc-900/90 backdrop-blur-xl rounded-full border border-white/10 flex items-center gap-6 text-[10px] font-bold uppercase tracking-tighter text-white">
          <div className="flex flex-col"><span className="text-zinc-500 text-[8px]">Resolution</span><span>{displayWidth} × {displayHeight}</span></div>
          <div className="w-px h-6 bg-white/10" />
          <div className="flex flex-col"><span className="text-zinc-500 text-[8px]">Device</span><span className="text-indigo-400">{device.name}</span></div>
          <div className="w-px h-6 bg-white/10" />
          <div className="flex flex-col">
            <span className="text-zinc-500 text-[8px]">Zoom</span>
            <div className="flex items-center gap-3">
              <span className="w-8">{Math.round(scale * 100)}%</span>
              <input 
                type="range" 
                min="0.1" 
                max="2" 
                step="0.01" 
                value={scale} 
                onChange={(e) => { setScale(parseFloat(e.target.value)); setAutoScale(false); }}
                className="w-20 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500"
              />
              <button 
                onClick={() => setAutoScale(true)} 
                className="flex items-center gap-1.5 px-2 py-1 bg-white/5 hover:bg-white/10 rounded-lg text-[8px] text-zinc-400 hover:text-white transition-all"
              >
                <RefreshCcw size={10} /> Reset Default
              </button>
            </div>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <button onClick={() => setShowSyncModal(true)} className="p-1 hover:bg-white/10 rounded-full text-zinc-400 hover:text-indigo-400 transition-all group" title="Sync & Bridge Settings">
            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-50">
        <div className={`px-2 py-2 bg-zinc-900/90 backdrop-blur-xl rounded-full border border-white/10 flex items-center gap-1 transition-all duration-500 ${!showUI ? "w-12 h-12 justify-center" : ""}`}>
          {showUI && (
            <>
              {(isMixMode || isComparisonMode) && (
                <div className="flex items-center bg-black/20 rounded-full p-1 mr-2">
                  <button onClick={() => isMixMode ? setMixCategory("mobile") : setActiveSlot(1)} className={`px-3 py-1 rounded-full text-[9px] font-bold transition-all ${(isMixMode ? mixCategory === "mobile" : activeSlot === 1) ? "bg-indigo-600 text-white" : "text-zinc-500"}`}>{isMixMode ? "Mobiles" : "Left"}</button>
                  <button onClick={() => isMixMode ? setMixCategory("tablet") : setActiveSlot(2)} className={`px-3 py-1 rounded-full text-[9px] font-bold transition-all ${(isMixMode ? mixCategory === "tablet" : activeSlot === 2) ? "bg-indigo-600 text-white" : "text-zinc-500"}`}>{isMixMode ? "Tablets" : "Right"}</button>
                  {isMixMode && <button onClick={() => setMixCategory("desktop")} className={`px-3 py-1 rounded-full text-[9px] font-bold transition-all ${mixCategory === "desktop" ? "bg-indigo-600 text-white" : "text-zinc-500"}`}>Desktops</button>}
                </div>
              )}
              {!isMixMode && [
                { id: "mobile", icon: Smartphone, label: "Mobile" },
                { id: "tablet", icon: Tablet, label: "Tablet" },
                { id: "desktop", icon: Monitor, label: "Desk" },
                { id: "xl", icon: Tv, label: "XL" }
              ].map((cat) => (
                <div key={cat.id} className="relative" onMouseEnter={() => handleMouseEnter(cat.id)} onMouseLeave={handleMouseLeave}>
                  <button className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase transition-all hover:bg-white/10 ${device.type === cat.id || (cat.id === 'desktop' && (device.type === 'laptop' || device.type === 'desktop')) ? "text-indigo-400" : "text-zinc-400"}`}>
                    <cat.icon size={14} />{cat.label}
                  </button>
                  <div className={`absolute bottom-full right-0 mb-4 w-64 bg-zinc-900/95 backdrop-blur-2xl rounded-2xl border border-white/10 transition-all duration-200 overflow-hidden ${activeMenu === cat.id ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    <div className="p-2 max-h-[400px] overflow-y-auto custom-scrollbar">
                      <div className="px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase border-b border-white/5 mb-1">Select {cat.label}</div>
                      {presets.filter(p => cat.id === 'desktop' ? (p.type === 'desktop' || p.type === 'laptop') : p.type === cat.id).map(p => (
                        <button key={p.name} onClick={() => { handleDeviceChange(p); setActiveMenu(null); }} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[11px] transition-all ${(activeSlot === 1 ? device.name : secondDevice?.name) === p.name ? "bg-indigo-500 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}>
                          <span>{p.name}</span><span className="text-[9px] opacity-50">{p.width}×{p.height}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <div className="w-px h-6 bg-white/10 mx-1" />
              <div className="relative" onMouseEnter={() => handleMouseEnter('settings')} onMouseLeave={handleMouseLeave}>
                <button className={`p-2 rounded-full transition-all ${activeMenu === 'settings' ? "text-white bg-white/10" : "text-zinc-400 hover:bg-white/10"}`}><Settings2 size={18} /></button>
                <div className={`absolute bottom-full right-0 mb-4 w-64 bg-zinc-900/95 backdrop-blur-2xl rounded-2xl border border-white/10 transition-all duration-200 overflow-hidden p-4 ${activeMenu === 'settings' ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                  <div className="space-y-4">
                    <div><h4 className="text-[10px] font-bold text-zinc-500 uppercase mb-3">Display</h4><div className="space-y-2">
                      <button onClick={() => setAutoScale(!autoScale)} className="w-full flex items-center justify-between px-3 py-2 bg-white/5 rounded-xl text-xs text-zinc-300"><span>Fit to Screen</span><div className={`w-8 h-4 rounded-full relative ${autoScale ? "bg-indigo-500" : "bg-zinc-700"}`}><div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${autoScale ? "right-0.5" : "left-0.5"}`} /></div></button>
                      <button onClick={() => setIsRotated(!isRotated)} className="w-full flex items-center justify-between px-3 py-2 bg-white/5 rounded-xl text-xs text-zinc-300"><span>Orientation</span><RotateCw size={14} className={isRotated ? "rotate-90 text-indigo-400" : ""} /></button>
                      <button onClick={() => setShowBrowserBar(!showBrowserBar)} className="w-full flex items-center justify-between px-3 py-2 bg-white/5 rounded-xl text-xs text-zinc-300"><span>Browser Bar</span><div className={`w-8 h-4 rounded-full relative ${showBrowserBar ? "bg-indigo-500" : "bg-zinc-700"}`}><div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${showBrowserBar ? "right-0.5" : "left-0.5"}`} /></div></button>
                    </div></div>
                    <div><h4 className="text-[10px] font-bold text-zinc-500 uppercase mb-3">Custom</h4><div className="grid grid-cols-2 gap-2">
                      <input type="number" value={customWidth} onChange={(e) => { setCustomWidth(parseInt(e.target.value)); setDevice({ ...device, width: parseInt(e.target.value), name: "Custom", type: "desktop" }); }} className="w-full px-2 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs" />
                      <input type="number" value={customHeight} onChange={(e) => { setCustomHeight(parseInt(e.target.value)); setDevice({ ...device, height: parseInt(e.target.value), name: "Custom", type: "desktop" }); }} className="w-full px-2 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs" />
                    </div></div>
                  </div>
                </div>
              </div>
              <button onClick={() => { setIsMixMode(!isMixMode); setIsComparisonMode(false); }} className={`p-2 rounded-full transition-all ${isMixMode ? "text-indigo-400 bg-white/10" : "text-zinc-400 hover:bg-white/10"}`} title="Mix Mode"><Maximize size={18} /></button>
              <button onClick={() => { setIsComparisonMode(!isComparisonMode); setIsMixMode(false); if (!secondDevice) setSecondDevice(presets[0]); }} className={`p-2 rounded-full transition-all ${isComparisonMode ? "text-indigo-400 bg-white/10" : "text-zinc-400 hover:bg-white/10"}`} title="Comparison Mode"><Layout size={18} /></button>
              <button onClick={() => setIsSyncEnabled(!isSyncEnabled)} className={`p-2 rounded-full transition-all ${isSyncEnabled ? "text-indigo-400 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.3)]" : "text-zinc-400 hover:bg-white/10"}`} title="Sync Scroll"><Link size={18} className={isSyncEnabled ? "rotate-45 transition-transform" : ""} /></button>
              <button onClick={() => setShowQrModal(true)} className={`p-2 rounded-full transition-all ${showQrModal ? "text-indigo-400 bg-white/10" : "text-zinc-400 hover:bg-white/10"}`} title="Show QR Code"><QrCode size={18} /></button>
              <button onClick={() => setShowConsole(!showConsole)} className={`p-2 rounded-full transition-all ${showConsole ? "text-indigo-400 bg-white/10" : "text-zinc-400 hover:bg-white/10"}`} title="Debug Console"><Terminal size={18} /></button>
              <button onClick={handleScreenshot} className="p-2 rounded-full text-zinc-400 hover:bg-white/10 hover:text-white transition-all" title="Take Screenshot"><Camera size={18} /></button>
            </>
          )}
          <button onClick={() => setShowUI(!showUI)} className={`p-2 rounded-full transition-all ${showUI ? "text-zinc-400 hover:bg-white/10" : "text-indigo-400 bg-white/10 scale-110"}`}>{showUI ? <Eye size={18} /> : <EyeOff size={18} />}</button>
        </div>
      </div>

      <div className={`absolute bottom-0 left-0 right-0 z-[60] bg-zinc-950/90 backdrop-blur-3xl border-t border-white/10 transition-all duration-500 ease-in-out ${showConsole ? "h-64 translate-y-0" : "h-0 translate-y-full pointer-events-none"}`}>
        <div className="h-full flex flex-col p-4 font-mono">
          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
            <div className="flex items-center gap-6">
              <button onClick={() => setConsoleTab("console")} className={`flex items-center gap-2 text-[10px] font-bold uppercase transition-colors ${consoleTab === "console" ? "text-indigo-400" : "text-zinc-500 hover:text-zinc-300"}`}><Terminal size={14} /><span>Console</span></button>
              <button onClick={() => setConsoleTab("elements")} className={`flex items-center gap-2 text-[10px] font-bold uppercase transition-colors ${consoleTab === "elements" ? "text-indigo-400" : "text-zinc-500 hover:text-zinc-300"}`}><Code size={14} /><span>Elements</span></button>
            </div>
            <div className="flex items-center gap-4 text-[9px] text-zinc-500 uppercase font-bold"><span className="opacity-50 truncate max-w-[200px] text-white">{url}</span><div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> System: Online</div><button onClick={() => setShowConsole(false)} className="hover:text-white transition-colors">Close</button></div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar text-[11px]">
            {consoleTab === "console" ? (
              <div className="space-y-1.5">
                <div className="flex gap-4 text-zinc-500"><span className="w-20 shrink-0 text-indigo-400">INFO</span><span>Build 2.5.0 loaded. {isSyncEnabled ? "Universal Sync Active" : "Normal Mode"}</span></div>
                <div className="flex gap-4 text-zinc-500"><span className="w-20 shrink-0 text-green-400">SUCCESS</span><span>Target: {url || "Empty"}</span></div>
                {isSyncEnabled && <div className="flex gap-4 text-zinc-500"><span className="w-20 shrink-0 text-yellow-500">SYNC</span><span>Professional Bridge Active (postMessage)</span></div>}
              </div>
            ) : (
              <div className="h-full bg-black/40 p-6 rounded-2xl border border-white/5 shadow-inner overflow-auto custom-scrollbar">
                <pre className="text-zinc-400 whitespace-pre font-mono text-[11px] leading-relaxed selection:bg-indigo-500/30" dangerouslySetInnerHTML={{ __html: htmlSource }} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sync Setup Modal */}
      {showSyncModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-2xl bg-zinc-900/90 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
            <div className="p-8 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                  <Link size={24} className="rotate-45" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Sync Setup</h2>
                  <p className="text-xs text-zinc-500 font-medium">Professional Bridge Connection</p>
                </div>
              </div>
              <button onClick={() => setShowSyncModal(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 transition-all"><Maximize size={18} className="rotate-45" /></button>
            </div>
            
            <div className="px-8 py-4 space-y-6 flex-1 overflow-y-auto max-h-[60vh] custom-scrollbar">
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-zinc-300 flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-[10px]">1</div>
                  How to enable Sync
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed pl-7">
                  To synchronize scrolling across different ports (e.g., localhost:3000 to 3001), add this script to your <span className="text-indigo-400">layout.jsx</span> (Server Component).
                </p>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-2xl opacity-10 group-hover:opacity-20 transition-all blur" />
                <div className="relative bg-black/50 rounded-xl border border-white/5 p-6 font-mono text-[10px] leading-relaxed overflow-x-auto text-zinc-300 custom-scrollbar">
                  <div className="text-zinc-500 mb-2">// 1. Import at the top of layout.jsx</div>
                  <div className="text-indigo-300 mb-4">import Script from 'next/script';</div>
                  <div className="text-zinc-500 mb-2">// 2. Paste inside the body tag</div>
                  <pre className="text-zinc-300 whitespace-pre">{`<Script id="device-studio-bridge" strategy="afterInteractive">
  {\`
    (function() {
      if (window.self === window.top) return;
      let isSyncing = false;
      let lastY = 0;

      function getPath(el) {
        if (el.id) return '#' + el.id;
        let path = [];
        while (el && el.nodeType === Node.ELEMENT_NODE) {
          let selector = el.nodeName.toLowerCase();
          let sibling = el.previousElementSibling;
          let index = 1;
          while (sibling) {
            if (sibling.nodeName === el.nodeName) index++;
            sibling = sibling.previousElementSibling;
          }
          path.unshift(selector + ":nth-of-type(" + index + ")");
          el = el.parentNode;
        }
        return path.join(" > ");
      }

      window.addEventListener('message', e => {
        if (e.data.type === 'scroll-sync') {
          isSyncing = true;
          window.scrollTo(0, e.data.y);
          lastY = e.data.y;
          setTimeout(() => { isSyncing = false; }, 50);
        }
        if (e.data.type === 'click-sync') {
          isSyncing = true;
          const el = document.querySelector(e.data.selector);
          if (el) el.click();
          setTimeout(() => { isSyncing = false; }, 50);
        }
        if (e.data.type === 'input-sync') {
          isSyncing = true;
          const el = document.querySelector(e.data.selector);
          if (el) {
            el.value = e.data.value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
          }
          setTimeout(() => { isSyncing = false; }, 50);
        }
      });

      const style = document.createElement('style');
      style.textContent = '::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; } * { -ms-overflow-style: none !important; scrollbar-width: none !important; }';
      document.head.appendChild(style);

      window.addEventListener('scroll', () => {
        if (isSyncing || Math.abs(window.scrollY - lastY) < 2) return;
        lastY = window.scrollY;
        window.parent.postMessage({ type: 'scroll-from-client', y: window.scrollY }, '*');
      }, { passive: true });

      document.addEventListener('click', e => {
        if (isSyncing) return;
        const selector = getPath(e.target);
        window.parent.postMessage({ type: 'click-from-client', selector }, '*');
      }, true);

      document.addEventListener('input', e => {
        if (isSyncing) return;
        const selector = getPath(e.target);
        window.parent.postMessage({ type: 'input-from-client', selector, value: e.target.value }, '*');
      }, true);
    })();
  \`}
</Script>`}</pre>
                </div>
              </div>

              <div className="bg-indigo-500/10 rounded-2xl p-4 border border-indigo-500/20 flex items-start gap-4">
                <div className="p-2 bg-indigo-500 rounded-xl text-white"><Settings2 size={16} /></div>
                <div className="space-y-1">
                  <p className="text-[11px] font-bold text-indigo-300">Why this way?</p>
                  <p className="text-[10px] text-zinc-400 leading-tight">Next.js Server Components don't have access to <span className="text-zinc-300">window</span>. The <span className="text-zinc-300">next/script</span> component is the safe way to inject the bridge.</p>
                </div>
              </div>
            </div>

            <div className="p-8 pt-4 flex gap-4">
              <button 
                onClick={() => {
                  const turboCode = `import Script from 'next/script';\n\n<Script id="device-studio-bridge" strategy="afterInteractive">\n  {\`\n    (function() {\n      if (window.self === window.top) return;\n      let isSyncing = false;\n      let lastY = 0;\n\n      function getPath(el) {\n        if (el.id) return '#' + el.id;\n        let path = [];\n        while (el && el.nodeType === Node.ELEMENT_NODE) {\n          let selector = el.nodeName.toLowerCase();\n          let sibling = el.previousElementSibling;\n          let index = 1;\n          while (sibling) {\n            if (sibling.nodeName === el.nodeName) index++;\n            sibling = sibling.previousElementSibling;\n          }\n          path.unshift(selector + ":nth-of-type(" + index + ")");\n          el = el.parentNode;\n        }\n        return path.join(" > ");\n      }\n\n      window.addEventListener('message', e => {\n        if (e.data.type === 'scroll-sync') {\n          isSyncing = true;\n          window.scrollTo(0, e.data.y);\n          lastY = e.data.y;\n          setTimeout(() => { isSyncing = false; }, 50);\n        }\n        if (e.data.type === 'click-sync') {\n          isSyncing = true;\n          const el = document.querySelector(e.data.selector);\n          if (el) el.click();\n          setTimeout(() => { isSyncing = false; }, 50);\n        }\n        if (e.data.type === 'input-sync') {\n          isSyncing = true;\n          const el = document.querySelector(e.data.selector);\n          if (el) {\n            el.value = e.data.value;\n            el.dispatchEvent(new Event('input', { bubbles: true }));\n          }\n          setTimeout(() => { isSyncing = false; }, 50);\n        }\n      });\n\n      const style = document.createElement('style');\n      style.textContent = '::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; } * { -ms-overflow-style: none !important; scrollbar-width: none !important; }';\n      document.head.appendChild(style);\n\n      window.addEventListener('scroll', () => {\n        if (isSyncing || Math.abs(window.scrollY - lastY) < 2) return;\n        lastY = window.scrollY;\n        window.parent.postMessage({ type: 'scroll-from-client', y: window.scrollY }, '*');\n      }, { passive: true });\n\n      document.addEventListener('click', e => {\n        if (isSyncing) return;\n        const selector = getPath(e.target);\n        window.parent.postMessage({ type: 'click-from-client', selector }, '*');\n      }, true);\n\n      document.addEventListener('input', e => {\n        if (isSyncing) return;\n        const selector = getPath(e.target);\n        window.parent.postMessage({ type: 'input-from-client', selector, value: e.target.value }, '*');\n      }, true);\n    })();\n  \`}\n</Script>`;
                  navigator.clipboard.writeText(turboCode);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className={`flex-1 py-4 ${copied ? "bg-green-600" : "bg-indigo-600 hover:bg-indigo-500"} text-white rounded-2xl font-bold text-xs transition-all shadow-[0_4px_15px_rgba(79,70,229,0.3)] flex items-center justify-center gap-3`}
              >
                {copied ? <div className="flex items-center gap-2">Copied! <Star size={16} fill="currentColor" /></div> : <><Code size={16} /> Copy Turbo Bridge Code</>}
              </button>
              <button onClick={() => setShowSyncModal(false)} className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold text-xs border border-white/10 transition-all">Got it</button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-sm bg-zinc-900/90 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300 text-center">
            <div className="p-8 pb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Scan QR</h2>
              <button onClick={() => setShowQrModal(false)} className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 transition-all"><Maximize size={18} className="rotate-45" /></button>
            </div>
            
            <div className="px-8 py-6 space-y-6 flex flex-col items-center">
              <div className="relative p-4 bg-white rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.1)] group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-sky-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                {url ? (
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(url.replace("localhost", localIp ? "192.168." + localIp : "localhost"))}&bgcolor=ffffff&color=18181b`} 
                    alt="QR Code"
                    className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 select-none"
                  />
                ) : (
                  <div className="w-56 h-56 flex flex-col items-center justify-center text-zinc-400 gap-2 font-bold text-[10px] uppercase tracking-widest">
                    <Search size={32} className="opacity-20 mb-2" />
                    Enter URL first
                  </div>
                )}
              </div>
              
              <div className="w-full space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block">Network IP (192.168.x.x)</label>
                    <button onClick={detectLocalIp} className="text-[9px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest flex items-center gap-1 transition-colors">
                      <RefreshCcw size={10} /> Auto-Detect
                    </button>
                  </div>
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-indigo-500 transition-all">
                    <div className="bg-white/5 px-3 py-2.5 text-xs text-zinc-500 font-mono border-r border-white/10">192.168.</div>
                    <input 
                      type="text" 
                      value={localIp} 
                      onChange={(e) => setLocalIp(e.target.value)}
                      placeholder="1.15" 
                      className="flex-1 bg-transparent py-2.5 px-4 text-xs text-white focus:outline-none font-mono"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-zinc-400 leading-tight">Your phone will connect to <span className="text-white">192.168.{localIp || "x.x"}</span></p>
              </div>
            </div>

            <div className="p-8 pt-2 flex flex-col gap-3">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(url);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className={`w-full py-4 ${copied ? "bg-green-600" : "bg-zinc-800 hover:bg-zinc-700"} text-white rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-3`}
              >
                {copied ? "URL Copied! ✅" : <><Link size={14} /> Copy Current URL</>}
              </button>
              <button onClick={() => setShowQrModal(false)} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-xs transition-all">Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
