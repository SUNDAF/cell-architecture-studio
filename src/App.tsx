import {
  ArrowRight,
  BookOpen,
  Box,
  Brain,
  ChevronDown,
  CircleDot,
  Gauge,
  EyeOff,
  Grid3X3,
  Heart,
  Info,
  Leaf,
  MessageCircle,
  Library,
  Microscope,
  RotateCcw,
  Search,
  Settings,
  Sparkles,
  Star,
  Target,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { CellScene } from "./components/CellScene";
import { cells, getCellById, type CellItem, type ViewMode } from "./data/cells";

type ModeOption = {
  id: ViewMode;
  label: string;
  Icon: LucideIcon;
};

const modeOptions: ModeOption[] = [
  { id: "mesh", label: "Sel Utuh", Icon: Box },
  { id: "focus", label: "Fokus", Icon: CircleDot },
];

const initialCell = getCellById("animal");

type AppView = "gallery" | "studio" | "library" | "notebooks" | "settings";

const navItems: Array<{ id: AppView; label: string; Icon: LucideIcon }> = [
  { id: "gallery", label: "Galeri", Icon: Grid3X3 },
  { id: "library", label: "Pustaka", Icon: Library },
  { id: "notebooks", label: "Catatan", Icon: BookOpen },
  { id: "settings", label: "Pengaturan", Icon: Settings },
];

function Header({
  cell,
  view,
  onNavigate,
}: {
  cell: CellItem;
  view: AppView;
  onNavigate: (view: AppView) => void;
}) {
  return (
    <header className="topbar">
      <button className="brand-block" type="button" onClick={() => onNavigate("gallery")}>
        <div className="brand-orb" aria-hidden="true">
          <Sparkles size={26} />
        </div>
        <div>
          <h1>Studio Arsitektur Sel</h1>
          <p>Jelajahi keajaiban kehidupan di dunia mikroskopis</p>
        </div>
      </button>

      <nav className="top-nav" aria-label="Menu utama">
        {navItems.map(({ id, label, Icon }) => {
          const active = view === id || (id === "gallery" && view === "studio");
          return (
            <button
              key={id}
              type="button"
              className={`nav-link ${active ? "is-active" : ""}`}
              onClick={() => onNavigate(id)}
            >
              <Icon size={24} />
              <span>{label}</span>
            </button>
          );
        })}
        <button className="avatar-button" type="button" aria-label="Menu pengguna">
          <span className="avatar-core" style={{ background: cell.accentSoft }}>
            <span style={{ background: cell.accent }} />
          </span>
          <ChevronDown size={20} />
        </button>
      </nav>
    </header>
  );
}

type SidebarProps = {
  selectedCell: CellItem;
  activeOrganelle: string;
  favorites: Set<string>;
  onSelectCell: (id: string) => void;
  onSelectOrganelle: (id: string) => void;
  onToggleFavorite: (id: string) => void;
};

function MiniCell({ cell }: { cell: CellItem }) {
  if (cell.renderImage?.url) {
    return (
      <span className="mini-cell has-preview" style={{ "--thumb": cell.accent } as CSSProperties}>
        <img src={cell.renderImage.url} alt="" aria-hidden="true" />
      </span>
    );
  }

  if (cell.modelAsset?.previewUrl) {
    return (
      <span className="mini-cell has-preview" style={{ "--thumb": cell.accent } as CSSProperties}>
        <img src={cell.modelAsset.previewUrl} alt="" aria-hidden="true" />
      </span>
    );
  }

  return (
    <span className={`mini-cell mini-cell-${cell.modelKind}`} style={{ "--thumb": cell.accent } as CSSProperties}>
      <span />
      <i />
      <b />
    </span>
  );
}

function Sidebar({
  selectedCell,
  activeOrganelle,
  favorites,
  onSelectCell,
  onSelectOrganelle,
  onToggleFavorite,
}: SidebarProps) {
  return (
    <aside className="left-rail">
      <section className="panel cell-type-panel">
        <div className="panel-heading">
          <span>
            <Leaf size={18} />
            Jenis Sel
          </span>
          <ChevronDown size={18} />
        </div>

        <div className="cell-list">
          {cells.map((cell) => {
            const selected = selectedCell.id === cell.id;
            return (
              <button
                className={`cell-row ${selected ? "is-active" : ""}`}
                type="button"
                key={cell.id}
                onClick={() => onSelectCell(cell.id)}
              >
                <MiniCell cell={cell} />
                <span className="cell-row-copy">
                  <strong>{cell.name}</strong>
                  <span>{cell.type}</span>
                </span>
                <span
                  className={`favorite-dot ${favorites.has(cell.id) ? "is-on" : ""}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    onToggleFavorite(cell.id);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Favoritkan ${cell.name}`}
                >
                  <Star size={18} fill="currentColor" />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="panel organelle-panel">
        <div className="panel-heading">
          <span>
            <Sparkles size={16} />
            Organel
          </span>
          <ChevronDown size={18} />
        </div>

        <div className="organelle-list">
          {selectedCell.organelles.map((organelle) => (
            <button
              className={`organelle-row ${activeOrganelle === organelle.id ? "is-active" : ""}`}
              type="button"
              key={organelle.id}
              onClick={() => onSelectOrganelle(organelle.id)}
            >
              <span className="color-dot" style={{ background: organelle.color }} />
              <span>{organelle.name}</span>
            </button>
          ))}
        </div>
      </section>
    </aside>
  );
}

type StageProps = {
  cell: CellItem;
  activeOrganelle: string;
  viewMode: ViewMode;
  crossSection: boolean;
  autoRotate: boolean;
  resetKey: number;
  onModeChange: (mode: ViewMode) => void;
  onCrossSectionChange: (value: boolean) => void;
  onAutoRotateChange: (value: boolean) => void;
  onReset: () => void;
};

function Stage({
  cell,
  activeOrganelle,
  viewMode,
  crossSection,
  autoRotate,
  resetKey,
  onModeChange,
  onCrossSectionChange,
  onAutoRotateChange,
  onReset,
}: StageProps) {
  return (
    <main className="stage-column">
      <section className="stage-panel">
        <div className="stage-title">
          <div>
            <h2>{cell.name}</h2>
            <p>{cell.type}</p>
          </div>

          <div className="view-card">
            <span>Mode Tampilan</span>
            <div className="mode-switcher">
              {modeOptions.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  className={viewMode === id ? "is-active" : ""}
                  onClick={() => onModeChange(id)}
                  title={label}
                >
                  <Icon size={22} />
                </button>
              ))}
            </div>
            <label className="toggle-line">
              <span>Belah Sel</span>
              <input
                type="checkbox"
                checked={crossSection}
                onChange={(event) => onCrossSectionChange(event.target.checked)}
              />
              <i />
            </label>
          </div>
        </div>

        <div className="canvas-wrap">
          <CellScene
            cell={cell}
            activeOrganelle={activeOrganelle}
            viewMode={viewMode}
            crossSection={crossSection}
            autoRotate={autoRotate}
            resetKey={resetKey}
          />
        </div>

        <div className="stage-toolbar">
          <button
            type="button"
            className={autoRotate ? "is-active" : ""}
            onClick={() => onAutoRotateChange(!autoRotate)}
          >
            <RotateCcw size={20} />
            Putar
          </button>
          <button type="button" onClick={() => onModeChange("focus")}>
            <CircleDot size={20} />
            Pisahkan
          </button>
          <button type="button" onClick={() => onModeChange("focus")}>
            <EyeOff size={20} />
            Sembunyikan Lainnya
          </button>
          <button type="button" onClick={onReset}>
            <RotateCcw size={20} />
            Atur Ulang
          </button>
        </div>
      </section>
    </main>
  );
}

type RightPanelProps = {
  cell: CellItem;
  activeOrganelle: string;
  favorites: Set<string>;
  mastery: number;
  viewedCellCount: number;
  viewedOrganelleCount: number;
  totalOrganelleCount: number;
  tutorPrompt: string;
  onToggleFavorite: (id: string) => void;
  onTutorPrompt: (prompt: string) => void;
};

function buildTutorPrompts(cell: CellItem, organelle: CellItem["organelles"][number]) {
  return [
    `Jelaskan bagaimana ${organelle.name} membantu ${cell.name} tetap hidup.`,
    `Beri aku kuis tentang perbedaan ${cell.name} dan ${getCellById(cell.comparison).name}.`,
    `Bantu aku menemukan ${organelle.name} di dalam model 3D.`,
  ];
}

function RightPanel({
  cell,
  activeOrganelle,
  favorites,
  mastery,
  viewedCellCount,
  viewedOrganelleCount,
  totalOrganelleCount,
  tutorPrompt,
  onToggleFavorite,
  onTutorPrompt,
}: RightPanelProps) {
  const organelle = cell.organelles.find((item) => item.id === activeOrganelle) ?? cell.organelles[0];
  const tutorPrompts = buildTutorPrompts(cell, organelle);

  return (
    <aside className="right-rail">
      <section className="panel details-panel">
        <div className="panel-heading detail-heading">
          <span>Detail Organel</span>
          <button type="button" onClick={() => onToggleFavorite(cell.id)} aria-label="Tandai favorit">
            <Heart size={22} fill={favorites.has(cell.id) ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="detail-hero">
          <span className="organelle-orb" style={{ background: organelle.color }} />
          <div>
            <h3>{organelle.name}</h3>
            <p>{organelle.subtitle}</p>
          </div>
        </div>

        <dl className="attribute-list">
          {organelle.attributes.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
          <div>
            <dt>Penanda</dt>
            <dd>
              <span className="mini-toggle is-on" />
              <span className="detail-dot" style={{ background: organelle.color }} />
            </dd>
          </div>
        </dl>
      </section>

      <section className="panel notes-panel">
        <div className="panel-heading">
          <span>Catatan Biologi</span>
        </div>
        <p>{organelle.note}</p>
        <div className="fun-fact">
          <span>Tahukah kamu? {organelle.fact}</span>
          <Sparkles size={18} />
        </div>
      </section>

      <section className="panel learning-panel">
        <div className="panel-heading">
          <span>
            <Brain size={17} />
            Pemandu Pintar
          </span>
        </div>

        <div className="mastery-meter" style={{ "--progress": `${mastery}%` } as CSSProperties}>
          <div>
            <Gauge size={18} />
            <span>Skor Belajar</span>
            <strong>{mastery}%</strong>
          </div>
          <i>
            <b />
          </i>
          <small>
            {viewedCellCount}/{cells.length} sel dijelajahi · {viewedOrganelleCount}/{totalOrganelleCount} organel diamati
          </small>
        </div>

        <div className="lesson-focus">
          <span>
            <Target size={17} />
            Fokus belajar saat ini
          </span>
          <p>
            Temukan <strong>{organelle.name}</strong>, jelaskan tugasnya, lalu bandingkan dengan bagian serupa pada{" "}
            {getCellById(cell.comparison).name}.
          </p>
        </div>

        <div className="tutor-prompt">
          <span>
            <MessageCircle size={17} />
            Pertanyaan siap untuk pemandu
          </span>
          <p>{tutorPrompt}</p>
        </div>

        <div className="prompt-list">
          {tutorPrompts.map((prompt) => (
            <button type="button" key={prompt} onClick={() => onTutorPrompt(prompt)}>
              {prompt}
            </button>
          ))}
        </div>
      </section>

      <section className="panel occurrence-panel">
        <div className="panel-heading">
          <span>Di Mana Sel Ini Berada</span>
        </div>
        <div className={`occurrence-art occurrence-${cell.occurrence.motif}`}>
          <span />
          <i />
          <b />
        </div>
        <h4>{cell.occurrence.title}</h4>
        <p>{cell.occurrence.body}</p>
      </section>
    </aside>
  );
}

type BottomPanelsProps = {
  cell: CellItem;
  onCompare: () => void;
  onToast: (message: string) => void;
};

function BottomPanels({ cell, onCompare, onToast }: BottomPanelsProps) {
  const comparedCell = getCellById(cell.comparison);

  return (
    <section className="bottom-grid">
      <div className="panel microscope-panel">
        <div className="panel-heading">
          <span>
            Tampilan Mikroskop
            <Info size={16} />
          </span>
        </div>
        <div className="micro-card-row">
          {cell.microscope.map((image) => (
            <button
              type="button"
              key={image.label}
              className={`micro-card pattern-${image.pattern}`}
              style={{ "--micro": image.tone } as CSSProperties}
              onClick={() => onToast(`${image.label} dipilih.`)}
            >
              <span />
              <strong>{image.label}</strong>
            </button>
          ))}
        </div>
      </div>

      <div className="panel compare-panel">
        <div className="panel-heading">
          <span>
            Bandingkan Sel
            <Info size={16} />
          </span>
        </div>
        <div className="compare-row">
          <div>
            <MiniCell cell={cell} />
            <span>
              <strong>{cell.name}</strong>
              <em>Kamu di sini</em>
            </span>
          </div>
          <b>VS</b>
          <div>
            <span>
              <strong>{comparedCell.name}</strong>
              <em>{comparedCell.type}</em>
            </span>
            <MiniCell cell={comparedCell} />
          </div>
        </div>
        <button type="button" className="comparison-button" onClick={onCompare}>
          Buka Tampilan Perbandingan
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}

type ComparisonModalProps = {
  cell: CellItem;
  open: boolean;
  onClose: () => void;
};

function ComparisonModal({ cell, open, onClose }: ComparisonModalProps) {
  const comparedCell = getCellById(cell.comparison);
  if (!open) {
    return null;
  }

  const currentOrganelle = cell.organelles.find((item) => item.id === cell.defaultOrganelle) ?? cell.organelles[0];
  const comparedOrganelle =
    comparedCell.organelles.find((item) => item.id === comparedCell.defaultOrganelle) ?? comparedCell.organelles[0];

  return (
    <div className="modal-layer" role="dialog" aria-modal="true" aria-label="Perbandingan sel">
      <div className="comparison-modal">
        <button className="modal-close" type="button" onClick={onClose}>
          Tutup
        </button>
        <div className="comparison-modal-head">
          <h3>Tampilan Perbandingan</h3>
          <p>
            {cell.name} dibandingkan dengan {comparedCell.name}
          </p>
        </div>
        <div className="comparison-columns">
          {[cell, comparedCell].map((item) => {
            const organelle = item.id === cell.id ? currentOrganelle : comparedOrganelle;
            return (
              <section key={item.id}>
                <MiniCell cell={item} />
                <h4>{item.name}</h4>
                <p>{item.type}</p>
                <dl>
                  <div>
                    <dt>Fokus utama</dt>
                    <dd>{organelle.name}</dd>
                  </div>
                  <div>
                    <dt>Catatan utama</dt>
                    <dd>{organelle.subtitle}</dd>
                  </div>
                  <div>
                    <dt>Terdapat di</dt>
                    <dd>{item.occurrence.title}</dd>
                  </div>
                </dl>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Toast({ message }: { message: string | null }) {
  if (!message) {
    return null;
  }
  return <div className="toast">{message}</div>;
}

function CellCard({
  cell,
  ctaLabel,
  onOpen,
}: {
  cell: CellItem;
  ctaLabel: string;
  onOpen: (id: string) => void;
}) {
  return (
    <button
      type="button"
      className="gallery-card"
      style={{ "--accent": cell.accent, "--accent-soft": cell.accentSoft } as CSSProperties}
      onClick={() => onOpen(cell.id)}
    >
      <MiniCell cell={cell} />
      <strong>{cell.name}</strong>
      <span className="gallery-card-type">{cell.type}</span>
      <p>{cell.occurrence.body}</p>
      <span className="gallery-card-cta">
        {ctaLabel}
        <ArrowRight size={18} />
      </span>
    </button>
  );
}

function GalleryPage({ onSelectCell }: { onSelectCell: (id: string) => void }) {
  return (
    <main className="page gallery-page">
      <div className="page-intro">
        <h2>Pilih Sel untuk Dijelajahi</h2>
        <p>
          Ketuk salah satu kartu di bawah untuk melihat selnya dalam bentuk 3D dan mengenal
          bagian-bagiannya.
        </p>
      </div>
      <div className="gallery-grid">
        {cells.map((cell) => (
          <CellCard key={cell.id} cell={cell} ctaLabel="Jelajahi" onOpen={onSelectCell} />
        ))}
      </div>
    </main>
  );
}

type GlossaryEntry = {
  name: string;
  subtitle: string;
  note: string;
  color: string;
  cells: string[];
};

function buildGlossary(): GlossaryEntry[] {
  const map = new Map<string, GlossaryEntry>();
  for (const cell of cells) {
    for (const organelle of cell.organelles) {
      const existing = map.get(organelle.name);
      if (existing) {
        if (!existing.cells.includes(cell.name)) {
          existing.cells.push(cell.name);
        }
      } else {
        map.set(organelle.name, {
          name: organelle.name,
          subtitle: organelle.subtitle,
          note: organelle.note,
          color: organelle.color,
          cells: [cell.name],
        });
      }
    }
  }
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name, "id"));
}

function LibraryPage() {
  const [query, setQuery] = useState("");
  const glossary = useMemo(buildGlossary, []);
  const term = query.trim().toLowerCase();
  const filtered = glossary.filter(
    (entry) =>
      entry.name.toLowerCase().includes(term) || entry.note.toLowerCase().includes(term),
  );

  return (
    <main className="page library-page">
      <div className="page-intro">
        <h2>Pustaka Organel</h2>
        <p>Kamus bagian-bagian sel. Cari istilah yang ingin kamu pahami.</p>
      </div>
      <div className="library-search">
        <Search size={18} />
        <input
          type="search"
          placeholder="Cari organel, misalnya: kloroplas"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      {filtered.length === 0 ? (
        <p className="empty-hint">Tidak ada organel yang cocok dengan pencarianmu.</p>
      ) : (
        <div className="glossary-grid">
          {filtered.map((entry) => (
            <article key={entry.name} className="panel glossary-card">
              <div className="glossary-card-head">
                <span className="color-dot" style={{ background: entry.color }} />
                <div>
                  <h3>{entry.name}</h3>
                  <p>{entry.subtitle}</p>
                </div>
              </div>
              <p className="glossary-note">{entry.note}</p>
              <span className="glossary-tag">Ada di: {entry.cells.join(", ")}</span>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

function NotebooksPage({
  favorites,
  mastery,
  viewedCellCount,
  onSelectCell,
}: {
  favorites: Set<string>;
  mastery: number;
  viewedCellCount: number;
  onSelectCell: (id: string) => void;
}) {
  const favoriteCells = cells.filter((cell) => favorites.has(cell.id));

  return (
    <main className="page notebooks-page">
      <div className="page-intro">
        <h2>Catatanku</h2>
        <p>Sel favoritmu dan kemajuan belajarmu terkumpul di sini.</p>
      </div>
      <div className="notebook-stats">
        <div className="panel stat-card">
          <Gauge size={26} />
          <strong>{mastery}%</strong>
          <span>Skor Belajar</span>
        </div>
        <div className="panel stat-card">
          <Grid3X3 size={26} />
          <strong>
            {viewedCellCount}/{cells.length}
          </strong>
          <span>Sel Dijelajahi</span>
        </div>
        <div className="panel stat-card">
          <Star size={26} />
          <strong>{favoriteCells.length}</strong>
          <span>Sel Favorit</span>
        </div>
      </div>
      <h3 className="notebook-subhead">Sel Favoritku</h3>
      {favoriteCells.length === 0 ? (
        <p className="empty-hint">
          Belum ada sel favorit. Ketuk ikon bintang pada sebuah sel untuk menyimpannya di sini.
        </p>
      ) : (
        <div className="gallery-grid">
          {favoriteCells.map((cell) => (
            <CellCard key={cell.id} cell={cell} ctaLabel="Buka" onOpen={onSelectCell} />
          ))}
        </div>
      )}
    </main>
  );
}

function SettingsPage({
  autoRotate,
  onAutoRotateChange,
}: {
  autoRotate: boolean;
  onAutoRotateChange: (value: boolean) => void;
}) {
  return (
    <main className="page settings-page">
      <div className="page-intro">
        <h2>Tentang Studio</h2>
      </div>
      <article className="panel about-panel">
        <Sparkles size={28} />
        <p>
          <strong>Studio Arsitektur Sel</strong> dibuat untuk para pelajar SD dan SMP di Indonesia,
          supaya belajar sains terasa seru dan penuh rasa ingin tahu. Jelajahi sel dalam bentuk 3D,
          kenali bagian-bagiannya, lalu uji pemahamanmu lewat kuis.
        </p>
      </article>
      <article className="panel">
        <div className="panel-heading">
          <span>Pengaturan</span>
        </div>
        <label className="settings-row">
          <div>
            <strong>Putar otomatis</strong>
            <span>Sel berputar pelan saat pertama dibuka.</span>
          </div>
          <input
            type="checkbox"
            checked={autoRotate}
            onChange={(event) => onAutoRotateChange(event.target.checked)}
          />
        </label>
      </article>
    </main>
  );
}

export default function App() {
  const [view, setView] = useState<AppView>("gallery");
  const [selectedCellId, setSelectedCellId] = useState(initialCell.id);
  const [activeOrganelle, setActiveOrganelle] = useState(initialCell.defaultOrganelle);
  const [viewMode, setViewMode] = useState<ViewMode>("mesh");
  const [crossSection, setCrossSection] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [resetKey, setResetKey] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set([initialCell.id]));
  const [viewedCells, setViewedCells] = useState<Set<string>>(() => new Set([initialCell.id]));
  const [viewedOrganelleKeys, setViewedOrganelleKeys] = useState<Set<string>>(
    () => new Set([`${initialCell.id}:${initialCell.defaultOrganelle}`]),
  );
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [tutorPrompt, setTutorPrompt] = useState(
    `Bantu aku menemukan ${initialCell.organelles[0].name} di dalam model 3D.`,
  );
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  const selectedCell = useMemo(() => getCellById(selectedCellId), [selectedCellId]);
  const totalOrganelleCount = useMemo(
    () => cells.reduce((total, cell) => total + cell.organelles.length, 0),
    [],
  );
  const mastery = useMemo(() => {
    const cellCoverage = viewedCells.size / cells.length;
    const organelleCoverage = viewedOrganelleKeys.size / totalOrganelleCount;
    return Math.round((cellCoverage * 0.42 + organelleCoverage * 0.58) * 100);
  }, [totalOrganelleCount, viewedCells, viewedOrganelleKeys]);

  useEffect(() => {
    setActiveOrganelle(selectedCell.defaultOrganelle);
    setComparisonOpen(false);
  }, [selectedCell]);

  useEffect(() => {
    setViewedCells((current) => {
      const next = new Set(current);
      next.add(selectedCell.id);
      return next;
    });
    setViewedOrganelleKeys((current) => {
      const next = new Set(current);
      next.add(`${selectedCell.id}:${activeOrganelle}`);
      return next;
    });
  }, [activeOrganelle, selectedCell.id]);

  function showToast(message: string) {
    setToast(message);
    if (toastTimer.current) {
      window.clearTimeout(toastTimer.current);
    }
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }

  function openCell(id: string) {
    setSelectedCellId(id);
    setView("studio");
  }

  function toggleFavorite(id: string) {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const shellStyle = {
    "--accent": selectedCell.accent,
    "--accent-soft": selectedCell.accentSoft,
    "--cell-color": selectedCell.color,
  } as CSSProperties;

  return (
    <div className="app-shell" style={shellStyle}>
      <Header cell={selectedCell} view={view} onNavigate={setView} />

      {view === "gallery" && <GalleryPage onSelectCell={openCell} />}
      {view === "library" && <LibraryPage />}
      {view === "notebooks" && (
        <NotebooksPage
          favorites={favorites}
          mastery={mastery}
          viewedCellCount={viewedCells.size}
          onSelectCell={openCell}
        />
      )}
      {view === "settings" && (
        <SettingsPage autoRotate={autoRotate} onAutoRotateChange={setAutoRotate} />
      )}

      {view === "studio" && (
      <div className="app-grid">
        <Sidebar
          selectedCell={selectedCell}
          activeOrganelle={activeOrganelle}
          favorites={favorites}
          onSelectCell={setSelectedCellId}
          onSelectOrganelle={setActiveOrganelle}
          onToggleFavorite={toggleFavorite}
        />

        <div className="center-stack">
          <Stage
            cell={selectedCell}
            activeOrganelle={activeOrganelle}
            viewMode={viewMode}
            crossSection={crossSection}
            autoRotate={autoRotate}
            resetKey={resetKey}
            onModeChange={setViewMode}
            onCrossSectionChange={setCrossSection}
            onAutoRotateChange={setAutoRotate}
            onReset={() => {
              setResetKey((key) => key + 1);
              showToast("Tampilan diatur ulang.");
            }}
          />
          <BottomPanels
            cell={selectedCell}
            onCompare={() => setComparisonOpen(true)}
            onToast={showToast}
          />
        </div>

        <RightPanel
          cell={selectedCell}
          activeOrganelle={activeOrganelle}
          favorites={favorites}
          mastery={mastery}
          viewedCellCount={viewedCells.size}
          viewedOrganelleCount={viewedOrganelleKeys.size}
          totalOrganelleCount={totalOrganelleCount}
          tutorPrompt={tutorPrompt}
          onToggleFavorite={toggleFavorite}
          onTutorPrompt={(prompt) => {
            setTutorPrompt(prompt);
            showToast("Pertanyaan untuk pemandu sudah disiapkan.");
          }}
        />
      </div>
      )}

      <ComparisonModal cell={selectedCell} open={comparisonOpen} onClose={() => setComparisonOpen(false)} />
      <Toast message={toast} />
    </div>
  );
}
