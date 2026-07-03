"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";

interface ColorItem {
  id: number;
  name: string;
  category: string;
  code: {
    pantone: string;
    rgb: number[];
    cmyk: number[];
  };
}

interface TileMapItem {
  name: string;
  rotationMap: number[][];
  patternMap: number[][];
}

interface TileItem {
  id: number;
  name: string;
  price: string;
  files?: { id: number; name: string; file: string }[];
  maps?: TileMapItem[];
}

interface CustomSVGItem {
  id: number;
  name: string;
  file: string;
  svgContent: string;
}

export default function Simulator() {
  const [cores, setCores] = useState<ColorItem[]>([]);
  const [ladrilhos, setLadrilhos] = useState<TileItem[]>([]);
  
  const [activeTile, setActiveTile] = useState<TileItem | null>(null);
  const [customSvgs, setCustomSvgs] = useState<CustomSVGItem[]>([]);
  const [activeSvgIndex, setActiveSvgIndex] = useState<number>(0);
  
  const [activeColor, setActiveColor] = useState<string>("#AF966D"); // Paint color
  const [blankPercentage, setBlankPercentage] = useState<number>(0);
  const [blankColor, setBlankColor] = useState<string>("#F1F0EE");
  const [isPaintingBlank, setIsPaintingBlank] = useState<boolean>(false);
  const [grout, setGrout] = useState<string>(""); // "" (none) or "rgb(225, 219, 217)"
  const [paginationType, setPaginationType] = useState<string>("Aleatória");
  const [selectedMap, setSelectedMap] = useState<TileMapItem | null>(null);

  // 10 columns, 5 rows grid
  const COLS = 10;
  const ROWS = 5;
  const TOTAL_CELLS = COLS * ROWS;

  const [patternGrid, setPatternGrid] = useState<number[][]>([]);
  const [rotationGrid, setRotationGrid] = useState<number[][]>([]);

  // Load colors and tiles from database
  useEffect(() => {
    fetch("/cores_ladrilharia.json")
      .then((res) => res.json())
      .then((data) => setCores(data))
      .catch((err) => console.error("Error loading colors:", err));

    fetch("/ladrilhos_ladrilharia.json")
      .then((res) => res.json())
      .then((data: TileItem[]) => {
        // Exclude LISA from tiles list because it doesn't have SVGs
        const filtered = data.filter((t) => t.name !== "LISA" && t.files && t.files.length > 0);
        setLadrilhos(filtered);
        if (filtered.length > 0) {
          setActiveTile(filtered[0]);
        }
      })
      .catch((err) => console.error("Error loading tiles:", err));
  }, []);

  // Fetch SVGs when active tile changes
  useEffect(() => {
    if (!activeTile || !activeTile.files) return;

    setCustomSvgs([]);
    setActiveSvgIndex(0);
    setSelectedMap(null);
    setPaginationType("Aleatória");

    const fetchPromises = activeTile.files.map((fileObj) =>
      fetch(`/svg/${fileObj.file}`)
        .then((res) => res.text())
        .then((text) => ({
          id: fileObj.id,
          name: fileObj.name,
          file: fileObj.file,
          svgContent: text,
        }))
    );

    Promise.all(fetchPromises)
      .then((svgs) => {
        setCustomSvgs(svgs);
        // Initialize maps and grid
        generateGridMaps(svgs, activeTile, "Aleatória", 0, null);
      })
      .catch((err) => console.error("Error loading SVGs:", err));
  }, [activeTile]);

  // Regenerate grid map when parameters change
  const generateGridMaps = (
    svgs: CustomSVGItem[],
    tile: TileItem,
    pType: string,
    bPercent: number,
    mapObj: TileMapItem | null
  ) => {
    if (!svgs || svgs.length === 0) return;

    let pGrid: number[][] = [];
    let rGrid: number[][] = [];

    if (pType === "Mapeada" && mapObj) {
      // Use predefined map
      // Predefined map has its own rotationMap and patternMap (usually 5x10)
      pGrid = mapObj.patternMap;
      rGrid = mapObj.rotationMap;
    } else if (pType === "Alinhada") {
      // Aligned: all tiles are activeSvgIndex, rotation 0
      for (let r = 0; r < ROWS; r++) {
        pGrid.push(Array(COLS).fill(activeSvgIndex));
        rGrid.push(Array(COLS).fill(0));
      }
    } else {
      // Aleatória (Default random)
      const totalBlanks = Math.round((bPercent / 100) * TOTAL_CELLS);
      const cellIndices: number[] = [];

      for (let i = 0; i < TOTAL_CELLS; i++) {
        cellIndices.push(i < totalBlanks ? -1 : Math.floor(Math.random() * svgs.length));
      }

      // Shuffle indices
      for (let i = cellIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cellIndices[i], cellIndices[j]] = [cellIndices[j], cellIndices[i]];
      }

      // Chunk into 2D array
      for (let r = 0; r < ROWS; r++) {
        const rowSlice = cellIndices.slice(r * COLS, (r + 1) * COLS);
        pGrid.push(rowSlice);

        const rotations = [0, 90, 180, 270];
        const rowRotations = Array(COLS)
          .fill(0)
          .map(() => rotations[Math.floor(Math.random() * rotations.length)]);
        rGrid.push(rowRotations);
      }
    }

    setPatternGrid(pGrid);
    setRotationGrid(rGrid);
  };

  const handleShuffle = () => {
    if (!activeTile) return;
    generateGridMaps(customSvgs, activeTile, paginationType, blankPercentage, selectedMap);
  };

  // Select predefined map
  const handleMapSelection = (mapItem: TileMapItem) => {
    setSelectedMap(mapItem);
    setPaginationType("Mapeada");
    if (activeTile) {
      generateGridMaps(customSvgs, activeTile, "Mapeada", blankPercentage, mapItem);
    }
  };

  // Color selection callback
  const handlePaintPath = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as SVGElement;
    if (
      target &&
      ["path", "polygon", "rect", "circle", "ellipse"].includes(target.tagName.toLowerCase())
    ) {
      e.stopPropagation();

      // If painting solid blank color
      if (isPaintingBlank) {
        setBlankColor(activeColor);
        setIsPaintingBlank(false);
        return;
      }

      // Otherwise paint SVG path
      const cls = target.getAttribute("class");
      const svgEl = target.closest("svg");
      if (svgEl) {
        if (cls) {
          const classList = cls.split(" ");
          const stClass = classList.find((c) => c.startsWith("st"));
          if (stClass) {
            // Color all matching classes in this SVG
            const siblings = svgEl.querySelectorAll(`.${stClass}`);
            siblings.forEach((sib) => {
              sib.setAttribute("fill", activeColor);
              (sib as HTMLElement).style.fill = activeColor;
            });
          }
        } else {
          // Color individual element
          target.setAttribute("fill", activeColor);
          target.style.fill = activeColor;
        }

        // Update SVG content in state
        const updatedSvgText = svgEl.outerHTML;
        setCustomSvgs((prev) => {
          const next = [...prev];
          next[activeSvgIndex] = {
            ...next[activeSvgIndex],
            svgContent: updatedSvgText,
          };
          return next;
        });
      }
    }
  };

  // WhatsApp Config Quote Request
  const getWhatsAppLink = () => {
    const message = encodeURIComponent(
      `Olá Ladrilharia! Montei um painel no simulador:\n` +
      `- Molde: ${activeTile?.name || ""}\n` +
      `- Paginação: ${paginationType}\n` +
      `Gostaria de solicitar um orçamento!`
    );
    return `https://wa.me/5561998432690?text=${message}`;
  };

  // Group colors by category
  const colorsByCategory = cores.reduce((acc: { [key: string]: ColorItem[] }, color) => {
    const cat = color.category || "Outros";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(color);
    return acc;
  }, {});

  return (
    <div className="min-h-screen w-full bg-[#fbfbfa] text-coal flex flex-col justify-between">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Floating Film Grain */}
      <div className="film-grain" />

      {/* Header */}
      <header className="w-full py-4 px-6 md:px-12 flex justify-between items-center border-b border-coal/5 bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <Link
          href="/"
          className="font-serif text-lg tracking-[0.25em] uppercase text-coal hover:text-gold transition-colors duration-300 magnetic"
          data-cursor-text="Voltar"
        >
          Ladrilharia
        </Link>
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Simulador</span>
      </header>

      {/* Main Workspace Grid */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN: Selector, Editor and Color Palette (5 cols equivalent) */}
        <div className="w-full lg:w-[42%] flex flex-col gap-6">
          
          {/* Category/Tile Selection Slider */}
          <div className="bg-white border border-coal/5 rounded-[2rem] p-6 shadow-sm">
            <h4 className="text-[10px] uppercase tracking-widest text-coal/40 font-bold mb-3">Modelos</h4>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-coal/10">
              {ladrilhos.map((tile) => (
                <button
                  key={tile.id}
                  onClick={() => setActiveTile(tile)}
                  className={`px-4 py-2.5 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all border whitespace-nowrap ${
                    activeTile?.id === tile.id
                      ? "bg-coal text-cream border-coal"
                      : "bg-[#f5f5f3] text-coal border-coal/5 hover:border-coal/20"
                  }`}
                  data-cursor-text={tile.name}
                >
                  {tile.name}
                </button>
              ))}
            </div>
          </div>

          {/* Editor Board */}
          <div className="bg-white border border-coal/5 rounded-[2rem] p-6 shadow-sm flex flex-col items-center gap-4">
            <div className="flex justify-between items-center w-full">
              <span className="text-[10px] uppercase tracking-widest text-coal/40 font-bold">
                Pinte as áreas do Ladrilho
              </span>
              {customSvgs.length > 1 && (
                <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
                  {activeSvgIndex + 1}/{customSvgs.length}
                </span>
              )}
            </div>

            {/* SVG Tile Editor (Large Frame) */}
            <div className="relative w-full max-w-[280px] aspect-square bg-[#fbfbfa] border border-coal/10 rounded-[1.5rem] p-4 flex items-center justify-center shadow-inner">
              {customSvgs.length > 0 ? (
                <div
                  className="w-full h-full cursor-none [&>svg]:w-full [&>svg]:h-full [&_path]:transition-colors [&_path]:duration-300 [&_polygon]:transition-colors [&_polygon]:duration-300 [&_rect]:transition-colors [&_rect]:duration-300"
                  dangerouslySetInnerHTML={{ __html: customSvgs[activeSvgIndex].svgContent }}
                  onClick={handlePaintPath}
                />
              ) : (
                <span className="text-xs text-coal/30">Carregando...</span>
              )}
            </div>

            {/* Sub-variants thumbnails list */}
            {customSvgs.length > 1 && (
              <div className="flex gap-2 justify-center w-full overflow-x-auto py-2">
                {customSvgs.map((svg, idx) => (
                  <button
                    key={svg.id}
                    onClick={() => {
                      setActiveSvgIndex(idx);
                      // Update grid to reflect selection if in aligned mode
                      if (paginationType === "Alinhada") {
                        setPatternGrid(Array(ROWS).fill(Array(COLS).fill(idx)));
                      }
                    }}
                    className={`w-12 h-12 bg-white border rounded-xl overflow-hidden p-1 flex items-center justify-center hover:scale-105 transition-transform ${
                      activeSvgIndex === idx ? "border-gold border-2" : "border-coal/10"
                    }`}
                    dangerouslySetInnerHTML={{ __html: svg.svgContent }}
                    data-cursor-text={`Design ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Colors Palette Board */}
          <div className="bg-white border border-coal/5 rounded-[2rem] p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-[10px] uppercase tracking-widest text-coal/40 font-bold">
                Paleta de Cores
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-wider text-coal/50">Balde de Tinta:</span>
                <div
                  className="w-5 h-5 rounded-full border border-coal/15 shadow-sm"
                  style={{ backgroundColor: activeColor }}
                />
              </div>
            </div>

            {/* Categories Colors list */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-coal/10">
              {Object.keys(colorsByCategory).map((catName) => (
                <div key={catName}>
                  <span className="text-[9px] uppercase tracking-wider text-coal/30 font-bold block mb-1">
                    {catName}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {colorsByCategory[catName].map((c) => {
                      const colorHex = `rgb(${c.code.rgb.join(",")})`;
                      return (
                        <button
                          key={c.id}
                          onClick={() => setActiveColor(colorHex)}
                          className={`w-6 h-6 rounded border transition-all ${
                            activeColor === colorHex
                              ? "scale-110 border-gold border-2 shadow-sm"
                              : "border-coal/10 hover:scale-105"
                          }`}
                          style={{ backgroundColor: colorHex }}
                          title={c.name}
                          data-cursor-text={c.name}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: InteractiveRepeating Grid and Options Panel (7 cols equivalent) */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Mainrepeating Grid */}
          <div className="bg-white border border-coal/5 rounded-[2rem] p-4 md:p-6 shadow-sm flex items-center justify-center min-h-[400px]">
            {patternGrid.length > 0 ? (
              <div 
                className="grid gap-[2px] bg-[#e1dbd9] p-[2px] w-full max-w-[650px] aspect-[2/1] rounded-2xl overflow-hidden shadow-md"
                style={{
                  gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
                  border: grout ? `1px solid ${grout}` : "none",
                }}
              >
                {patternGrid.map((row, rIdx) =>
                  row.map((val, cIdx) => {
                    const rotation = rotationGrid[rIdx]?.[cIdx] || 0;
                    const cellGroutStyle = grout 
                      ? { borderTop: `1px solid ${grout}`, borderLeft: `1px solid ${grout}` } 
                      : {};

                    return (
                      <div
                        key={`${rIdx}-${cIdx}`}
                        className="w-full h-full bg-[#fbfbfa] relative overflow-hidden flex items-center justify-center transition-all duration-300"
                        style={cellGroutStyle}
                      >
                        {val === -1 ? (
                          <div
                            className="w-full h-full"
                            style={{ backgroundColor: blankColor }}
                          />
                        ) : (
                          <div
                            className="w-full h-full [&>svg]:w-full [&>svg]:h-full"
                            style={{ transform: `rotate(${rotation}deg)` }}
                            dangerouslySetInnerHTML={{
                              __html: customSvgs[val]?.svgContent || "",
                            }}
                          />
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            ) : (
              <span className="text-xs text-coal/30">Gerando visualização...</span>
            )}
          </div>

          {/* Options Panel */}
          <div className="bg-white border border-coal/5 rounded-[2rem] p-6 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Side options */}
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest text-coal/40 font-bold mb-3">
                Paginação
              </h4>
              
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider text-coal/50 font-bold block">
                  Tipo de Paginação
                </label>
                <div className="flex gap-2">
                  {["Aleatória", "Alinhada", "Mapeada"].map((type) => {
                    // Disable Mapeada if tile has no maps
                    const disabled = type === "Mapeada" && (!activeTile || !activeTile.maps);
                    return (
                      <button
                        key={type}
                        disabled={disabled}
                        onClick={() => {
                          setPaginationType(type);
                          if (type === "Mapeada" && activeTile?.maps) {
                            handleMapSelection(activeTile.maps[0]);
                          } else if (activeTile) {
                            generateGridMaps(customSvgs, activeTile, type, blankPercentage, null);
                          }
                        }}
                        className={`flex-1 py-2 rounded-xl text-[10px] uppercase tracking-wider font-bold border transition-all ${
                          disabled ? "opacity-30 cursor-not-allowed" : ""
                        } ${
                          paginationType === type
                            ? "bg-coal text-cream border-coal"
                            : "bg-[#f5f5f3] text-coal border-coal/5 hover:border-coal/20"
                        }`}
                        data-cursor-text={type}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Predefined maps lists (if Mapeada) */}
              {paginationType === "Mapeada" && activeTile?.maps && (
                <div className="space-y-2 animate-fade-in">
                  <label className="text-[10px] uppercase tracking-wider text-coal/50 font-bold block">
                    Selecione o Painel Predefinido
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {activeTile.maps.map((mapItem, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleMapSelection(mapItem)}
                        className={`px-4 py-2 rounded-xl text-[10px] uppercase tracking-wider font-bold border transition-all ${
                          selectedMap?.name === mapItem.name
                            ? "bg-gold text-coal border-gold"
                            : "bg-[#f5f5f3] text-coal border-coal/5 hover:border-coal/20"
                        }`}
                        data-cursor-text={mapItem.name}
                      >
                        {mapItem.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Grout toggle */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider text-coal/50 font-bold block">
                  Rejunte
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setGrout("")}
                    className={`flex-1 py-2 rounded-xl text-[10px] uppercase tracking-wider font-bold border transition-all ${
                      grout === ""
                        ? "bg-coal text-cream border-coal"
                        : "bg-[#f5f5f3] text-coal border-coal/5 hover:border-coal/20"
                    }`}
                    data-cursor-text="Sem Rejunte"
                  >
                    Sem Rejunte
                  </button>
                  <button
                    onClick={() => setGrout("rgb(225, 219, 217)")}
                    className={`flex-1 py-2 rounded-xl text-[10px] uppercase tracking-wider font-bold border transition-all ${
                      grout !== ""
                        ? "bg-coal text-cream border-coal"
                        : "bg-[#f5f5f3] text-coal border-coal/5 hover:border-coal/20"
                    }`}
                    data-cursor-text="Com Rejunte"
                  >
                    Com Rejunte
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side options */}
            <div className="space-y-4 flex flex-col justify-between">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-coal/40 font-bold mb-3">
                  Peças Lisas (Cores Sólidas)
                </h4>

                {/* Percentage slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-coal/65 font-bold">
                    <span>Proporção de Peças Lisas</span>
                    <span>{blankPercentage}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={blankPercentage}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setBlankPercentage(val);
                      if (activeTile) {
                        generateGridMaps(customSvgs, activeTile, paginationType, val, selectedMap);
                      }
                    }}
                    className="w-full h-1 bg-coal/10 rounded-lg appearance-none cursor-pointer accent-gold"
                  />
                </div>

                {/* Solid Color Selector */}
                {blankPercentage > 0 && (
                  <div className="mt-4 flex items-center gap-4 animate-fade-in">
                    <span className="text-[9px] uppercase tracking-wider text-coal/50 font-bold">
                      Cor das Peças Lisas:
                    </span>
                    <button
                      onClick={() => setIsPaintingBlank(true)}
                      className={`w-8 h-8 rounded-full border shadow-sm transition-transform hover:scale-105 ${
                        isPaintingBlank ? "animate-pulse border-gold border-2" : "border-coal/15"
                      }`}
                      style={{ backgroundColor: blankColor }}
                      data-cursor-text="Pintar Lisa"
                      title="Clique para pintar com a cor ativa"
                    />
                    {isPaintingBlank && (
                      <span className="text-[8px] uppercase tracking-wider text-gold font-bold animate-pulse">
                        Clique na bolinha para aplicar a cor do balde!
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* CTAs */}
              <div className="flex gap-2 mt-6">
                <button
                  onClick={handleShuffle}
                  className="magnetic flex-1 py-3.5 bg-coal hover:bg-gold text-cream hover:text-coal rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all"
                  data-cursor-text="Embaralhar"
                >
                  Embaralhar
                </button>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic flex-1 py-3.5 bg-gold hover:bg-coal text-coal hover:text-cream text-center rounded-xl text-[10px] uppercase tracking-widest font-bold transition-all"
                  data-cursor-text="Solicitar"
                >
                  Orçamento
                </a>
              </div>

            </div>

          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full py-4 border-t border-coal/5 text-center text-[9px] uppercase tracking-widest text-coal/30 bg-white">
        © {new Date().getFullYear()} Ladrilharia. Pinte as peças e monte o seu painel de paginação.
      </footer>
    </div>
  );
}
