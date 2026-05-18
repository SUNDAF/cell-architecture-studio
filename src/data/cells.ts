export type ModelKind =
  | "plant"
  | "whiteBlood"
  | "neuron"
  | "epithelial"
  | "bacteria"
  | "animal"
  | "muscle";

export type ViewMode = "mesh" | "focus";

export type OrganelleItem = {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  attributes: Array<{
    label: string;
    value: string;
  }>;
  note: string;
  fact: string;
};

export type CellModelAsset = {
  url: string;
  previewUrl: string;
  sourceLabel: string;
  sourceUrl: string;
  scale: number;
  rotation?: [number, number, number];
  position?: [number, number, number];
  exposure?: number;
  materialMode?: "studio" | "native";
};

export type CellRenderImage = {
  url: string;
  aspect: "square" | "wide" | "landscape";
};

export type CellItem = {
  id: string;
  name: string;
  type: string;
  accent: string;
  accentSoft: string;
  color: string;
  modelKind: ModelKind;
  defaultOrganelle: string;
  comparison: string;
  modelAsset?: CellModelAsset;
  renderImage?: CellRenderImage;
  occurrence: {
    title: string;
    body: string;
    motif: string;
  };
  microscope: Array<{
    label: string;
    tone: string;
    pattern: string;
  }>;
  organelles: OrganelleItem[];
};

export const cells: CellItem[] = [
  {
    id: "plant",
    name: "Sel Tumbuhan",
    type: "Sel Berinti (Eukariotik)",
    accent: "#4f8a3f",
    accentSoft: "#e5f1d8",
    color: "#81b64b",
    modelKind: "plant",
    defaultOrganelle: "nucleus",
    comparison: "animal",
    renderImage: {
      url: "/cell-renders-transparent/plant.png",
      aspect: "square",
    },
    modelAsset: {
      url: "/models/plant-cell-first001.glb",
      previewUrl: "/cell-renders-transparent/plant.png",
      sourceLabel: "User Plant Cell GLB first001",
      sourceUrl: "local:/Users/lank/Downloads/first001.glb",
      scale: 2.36,
      rotation: [0.08, -1.42, -0.02],
      exposure: 1.08,
      materialMode: "native",
    },
    occurrence: {
      title: "Ada di daun, batang, dan akar",
      body: "Sel tumbuhan berkumpul membentuk daun, batang, dan akar. Mereka menyimpan makanan, mengalirkan air, dan mengubah cahaya matahari menjadi makanan!",
      motif: "leaf",
    },
    microscope: [
      { label: "Mikroskop Cahaya", tone: "#b9d48a", pattern: "plant-light" },
      { label: "Pewarnaan Khusus", tone: "#cf8cc2", pattern: "plant-stain" },
      { label: "Mikroskop Elektron", tone: "#9a9a8e", pattern: "electron" },
    ],
    organelles: [
      {
        id: "nucleus",
        name: "Inti Sel",
        subtitle: "Sang pemimpin sel",
        color: "#7047a8",
        attributes: [
          { label: "Ukuran", value: "5–10 µm (sangat kecil!)" },
          { label: "Letak", value: "Biasanya di tengah sel" },
          { label: "Terlihat di mikroskop biasa?", value: "Iya, terlihat" },
        ],
        note:
          "Inti sel itu seperti kepala sekolah di dalam sel — dialah yang mengatur semua kegiatan. Inti sel dibungkus dua lapis pelindung yang punya pintu-pintu kecil untuk mengatur apa yang boleh masuk dan keluar.",
        fact: "Inti sel adalah salah satu bagian sel yang pertama kali ditemukan oleh para ilmuwan!",
      },
      {
        id: "chloroplast",
        name: "Kloroplas",
        subtitle: "Dapur pembuat makanan",
        color: "#5fa842",
        attributes: [
          { label: "Tugas", value: "Membuat makanan dari cahaya" },
          { label: "Zat warna", value: "Klorofil (warna hijau)" },
          { label: "Terlihat di mikroskop biasa?", value: "Sering terlihat" },
        ],
        note:
          "Kloroplas itu seperti dapur kecil yang memasak makanan untuk tumbuhan. Ia menangkap cahaya matahari dan mengubahnya menjadi makanan. Kloroplas jugalah yang membuat daun berwarna hijau!",
        fact: "Satu sel daun bisa memiliki puluhan kloroplas sekaligus.",
      },
      {
        id: "vacuole",
        name: "Vakuola",
        subtitle: "Gudang air raksasa",
        color: "#62bdd2",
        attributes: [
          { label: "Ukuran", value: "Ruang besar di tengah sel" },
          { label: "Isi", value: "Air dan zat-zat penting" },
          { label: "Tugas", value: "Membuat tumbuhan tetap tegak" },
        ],
        note:
          "Vakuola itu seperti balon air besar di dalam sel. Saat penuh air, tumbuhan jadi segar dan tegak. Saat kekurangan air, tumbuhan jadi layu — itulah sebabnya tanaman perlu disiram!",
        fact: "Vakuola bisa memenuhi hampir seluruh ruang di dalam sel tumbuhan yang sudah dewasa.",
      },
      {
        id: "cellWall",
        name: "Dinding Sel",
        subtitle: "Tembok pelindung",
        color: "#7aa647",
        attributes: [
          { label: "Bahan", value: "Selulosa (serat yang kuat)" },
          { label: "Letak", value: "Lapisan paling luar" },
          { label: "Tugas", value: "Melindungi dan menguatkan" },
        ],
        note:
          "Dinding sel itu seperti tembok rumah yang kokoh. Ia melindungi bagian dalam sel dan membuat tumbuhan bisa berdiri tegak walaupun tidak punya tulang!",
        fact: "Berkat dinding sel, pohon besar bisa berdiri tinggi tanpa tulang sama sekali.",
      },
    ],
  },
  {
    id: "whiteBlood",
    name: "Sel Darah Putih",
    type: "Sel Pertahanan Tubuh",
    accent: "#6d78a8",
    accentSoft: "#e6eaf7",
    color: "#b9bfd7",
    modelKind: "whiteBlood",
    defaultOrganelle: "lysosome",
    comparison: "epithelial",
    renderImage: {
      url: "/cell-renders-transparent/white-blood.png",
      aspect: "square",
    },
    modelAsset: {
      url: "/models/white-blood-cell-user.glb",
      previewUrl: "/cell-renders-transparent/white-blood.png",
      sourceLabel: "User White Blood Cell GLB",
      sourceUrl: "local:/Users/lank/Downloads/second.glb",
      scale: 3.18,
      rotation: [0.02, -0.18, 0],
      exposure: 1.08,
      materialMode: "native",
    },
    occurrence: {
      title: "Ada di darah, getah bening, dan jaringan tubuh",
      body: "Sel darah putih berkeliling ke seluruh tubuh untuk mencari kuman dan penyakit, lalu melawannya. Mereka seperti pasukan penjaga tubuh kita!",
      motif: "blood",
    },
    microscope: [
      { label: "Mikroskop Cahaya", tone: "#ded6e9", pattern: "blood-light" },
      { label: "Pewarnaan Khusus", tone: "#9c73be", pattern: "blood-stain" },
      { label: "Mikroskop Elektron", tone: "#8f8f91", pattern: "electron" },
    ],
    organelles: [
      {
        id: "lysosome",
        name: "Lisosom",
        subtitle: "Kantong pembersih",
        color: "#8b54b7",
        attributes: [
          { label: "Ukuran", value: "Sekitar 1 µm (sangat kecil!)" },
          { label: "Isi", value: "Cairan penghancur kuman" },
          { label: "Tugas", value: "Menghancurkan kuman" },
        ],
        note:
          "Lisosom itu seperti kantong berisi cairan pembersih. Saat sel darah putih menelan kuman, lisosom menghancurkan kuman itu sampai habis.",
        fact: "Sel darah putih sangat mengandalkan kantong-kantong kecil ini untuk melindungi tubuh.",
      },
      {
        id: "nucleus",
        name: "Inti Sel Berlekuk",
        subtitle: "Pusat pengatur yang lentur",
        color: "#6f35a1",
        attributes: [
          { label: "Bentuk", value: "Berlekuk-lekuk" },
          { label: "Letak", value: "Di tengah sel" },
          { label: "Terlihat di mikroskop biasa?", value: "Iya, jika diberi pewarna" },
        ],
        note:
          "Inti sel mengatur seluruh kegiatan sel. Pada sel darah putih, bentuknya berlekuk-lekuk supaya sel bisa melenturkan tubuhnya dan menyelinap lewat celah sempit.",
        fact: "Ilmuwan bisa mengenali jenis sel darah putih hanya dari bentuk inti selnya.",
      },
      {
        id: "granules",
        name: "Granula",
        subtitle: "Paket senjata kimia",
        color: "#c06696",
        attributes: [
          { label: "Isi", value: "Zat-zat pelawan kuman" },
          { label: "Kegunaan", value: "Pertahanan tubuh" },
          { label: "Terlihat?", value: "Tergantung pewarna" },
        ],
        note:
          "Granula itu seperti paket-paket kecil berisi senjata. Saat tubuh kemasukan kuman, granula membantu sel darah putih melawannya dengan cepat.",
        fact: "Beberapa sel darah putih dinamai berdasarkan cara granulanya menyerap pewarna.",
      },
    ],
  },
  {
    id: "neuron",
    name: "Sel Saraf (Neuron)",
    type: "Sel Penghantar Pesan",
    accent: "#6578b5",
    accentSoft: "#e4e9f8",
    color: "#8c91d0",
    modelKind: "neuron",
    defaultOrganelle: "axon",
    comparison: "muscle",
    renderImage: {
      url: "/cell-renders-transparent/neuron.png",
      aspect: "wide",
    },
    modelAsset: {
      url: "/models/neuron-nih.glb",
      previewUrl: "/nih-previews/neuron-nih.png",
      sourceLabel: "NIH 3D Neuron",
      sourceUrl: "https://3d.nih.gov/entries/3DPX-015796/2",
      scale: 3.15,
      rotation: [0.18, -0.24, -0.18],
      position: [0, 0.05, 0],
      exposure: 1.05,
    },
    occurrence: {
      title: "Ada di otak, sumsum tulang belakang, dan saraf",
      body: "Sel saraf mengantarkan pesan ke seluruh tubuh secepat kilat. Berkat mereka, kamu bisa berpikir, merasakan, dan bergerak!",
      motif: "nerve",
    },
    microscope: [
      { label: "Mikroskop Cahaya", tone: "#c9c4ed", pattern: "neuron-light" },
      { label: "Pewarnaan Khusus", tone: "#dc99cc", pattern: "neuron-stain" },
      { label: "Mikroskop Elektron", tone: "#8e8e94", pattern: "electron" },
    ],
    organelles: [
      {
        id: "axon",
        name: "Akson",
        subtitle: "Jalan tol pesan",
        color: "#6b7dc6",
        attributes: [
          { label: "Panjang", value: "Dari sangat pendek sampai lebih dari 1 meter!" },
          { label: "Pembungkus", value: "Selubung mielin" },
          { label: "Terlihat di mikroskop biasa?", value: "Iya, jika diberi pewarna" },
        ],
        note:
          "Akson itu seperti jalan tol tempat pesan melaju cepat. Sebagian akson di tubuh manusia membentang dari tulang belakang sampai ke kaki — membuat sel saraf jadi salah satu sel terpanjang di alam!",
        fact: "Pesan saraf bisa melaju lebih dari 100 meter per detik — lebih cepat dari mobil balap!",
      },
      {
        id: "soma",
        name: "Badan Sel",
        subtitle: "Rumah utama sel saraf",
        color: "#7c52b7",
        attributes: [
          { label: "Berisi", value: "Inti sel" },
          { label: "Tugas", value: "Pusat kehidupan sel" },
          { label: "Bentuk", value: "Bulat" },
        ],
        note:
          "Badan sel itu seperti rumah utama yang merawat seluruh sel saraf. Di sinilah pesan-pesan yang masuk dikumpulkan dan diolah.",
        fact: "Hampir semua bagian penting sel saraf dibuat di dalam badan sel.",
      },
      {
        id: "dendrites",
        name: "Dendrit",
        subtitle: "Cabang penerima pesan",
        color: "#7d9bcf",
        attributes: [
          { label: "Bentuk", value: "Bercabang seperti ranting" },
          { label: "Tugas", value: "Menerima pesan" },
          { label: "Permukaan", value: "Sering berduri halus" },
        ],
        note:
          "Dendrit itu seperti ranting pohon yang bercabang-cabang. Semakin banyak cabangnya, semakin banyak pesan yang bisa diterima dari sel-sel lain.",
        fact: "Satu sel saraf bisa menerima ribuan pesan sekaligus!",
      },
    ],
  },
  {
    id: "epithelial",
    name: "Sel Epitel",
    type: "Sel Pelapis Tubuh",
    accent: "#a56d7f",
    accentSoft: "#f4e2e7",
    color: "#d79baa",
    modelKind: "epithelial",
    defaultOrganelle: "microvilli",
    comparison: "animal",
    renderImage: {
      url: "/cell-renders-transparent/epithelial.png",
      aspect: "square",
    },
    occurrence: {
      title: "Ada di kulit, usus, dan saluran napas",
      body: "Sel epitel berbaris rapat membentuk lapisan pelindung di permukaan tubuh dan organ. Mereka seperti ubin yang menutupi dan melindungi tubuh kita.",
      motif: "surface",
    },
    microscope: [
      { label: "Mikroskop Cahaya", tone: "#e6a4bd", pattern: "tissue-light" },
      { label: "Pewarnaan Khusus", tone: "#cb72a4", pattern: "tissue-stain" },
      { label: "Mikroskop Elektron", tone: "#989899", pattern: "electron" },
    ],
    organelles: [
      {
        id: "microvilli",
        name: "Mikrovili",
        subtitle: "Sikat penyerap makanan",
        color: "#c86f80",
        attributes: [
          { label: "Panjang", value: "0,5–1 µm (sangat kecil!)" },
          { label: "Letak", value: "Di permukaan atas sel" },
          { label: "Tugas", value: "Memperluas permukaan" },
        ],
        note:
          "Mikrovili itu seperti bulu-bulu halus pada sikat. Bentuknya membuat permukaan sel jadi lebih luas, sehingga sel di usus bisa menyerap sari makanan lebih banyak.",
        fact: "Mikrovili di usus berkumpul rapat membentuk lapisan seperti sikat lembut.",
      },
      {
        id: "junctions",
        name: "Sambungan Rapat",
        subtitle: "Perekat antar sel",
        color: "#9f6cbd",
        attributes: [
          { label: "Letak", value: "Di antara dua sel" },
          { label: "Tugas", value: "Menyegel celah" },
          { label: "Terlihat?", value: "Perlu mikroskop elektron" },
        ],
        note:
          "Sambungan rapat itu seperti lem yang menempelkan sel-sel berdekatan. Ia menutup celah di antara sel supaya zat berbahaya tidak mudah menyelinap masuk.",
        fact: "Lapisan sel epitel yang rapat sangat penting untuk menjaga batas setiap organ tubuh.",
      },
      {
        id: "nucleus",
        name: "Inti Sel",
        subtitle: "Penyimpan petunjuk",
        color: "#7a4aa2",
        attributes: [
          { label: "Letak", value: "Dari bawah hingga tengah sel" },
          { label: "Bentuk", value: "Lonjong" },
          { label: "Terlihat di mikroskop biasa?", value: "Iya, terlihat" },
        ],
        note:
          "Inti sel menyimpan semua petunjuk tentang cara sel bekerja. Pada sel epitel, letaknya bisa berpindah tergantung bentuk jaringan tubuhnya.",
        fact: "Dokter bisa membaca kesehatan jaringan tubuh dengan melihat bentuk inti selnya.",
      },
    ],
  },
  {
    id: "bacteria",
    name: "Sel Bakteri",
    type: "Sel Tanpa Inti (Prokariotik)",
    accent: "#48a77d",
    accentSoft: "#dbf1e7",
    color: "#65b8ae",
    modelKind: "bacteria",
    defaultOrganelle: "nucleoid",
    comparison: "animal",
    renderImage: {
      url: "/cell-renders-transparent/bacteria.png",
      aspect: "landscape",
    },
    modelAsset: {
      url: "/models/bacteria-wall-nih.glb",
      previewUrl: "/nih-previews/bacteria-wall-nih.png",
      sourceLabel: "NIH 3D Gram Positive Cell Wall",
      sourceUrl: "https://3d.nih.gov/entries/3DPX-010752/2",
      scale: 0.00185,
      rotation: [0.08, -0.44, -0.08],
      position: [0, -0.1, 0],
      exposure: 1.1,
    },
    occurrence: {
      title: "Ada di tanah, air, perut, dan kulit",
      body: "Bakteri hidup hampir di mana saja. Mereka bisa hidup sendirian sebagai satu sel mungil. Sebagian membantu tubuh kita, sebagian lagi bisa membuat sakit.",
      motif: "microbe",
    },
    microscope: [
      { label: "Mikroskop Cahaya", tone: "#c7b8eb", pattern: "bacteria-light" },
      { label: "Pewarnaan Khusus", tone: "#dc6e96", pattern: "bacteria-stain" },
      { label: "Mikroskop Elektron", tone: "#8c8c8c", pattern: "electron" },
    ],
    organelles: [
      {
        id: "nucleoid",
        name: "Nukleoid",
        subtitle: "DNA yang terbuka",
        color: "#7a43ad",
        attributes: [
          { label: "Ukuran", value: "Daerah sekitar 1 µm" },
          { label: "Pembungkus", value: "Tidak ada" },
          { label: "Terlihat di mikroskop biasa?", value: "Tidak, perlu mikroskop elektron" },
        ],
        note:
          "Berbeda dengan sel tumbuhan dan hewan, bakteri tidak punya pembungkus inti sel. DNA-nya mengapung bebas di dalam sel pada daerah yang disebut nukleoid.",
        fact: "Jumlah sel bakteri di tubuhmu lebih banyak daripada yang kebanyakan orang kira!",
      },
      {
        id: "cellWall",
        name: "Dinding Sel",
        subtitle: "Cangkang pelindung",
        color: "#55aa89",
        attributes: [
          { label: "Bahan", value: "Peptidoglikan" },
          { label: "Tugas", value: "Menjaga bentuk dan melindungi" },
          { label: "Letak", value: "Di luar membran sel" },
        ],
        note:
          "Dinding sel bakteri itu seperti cangkang keras yang melindungi. Ia menjaga sel tetap kuat dan memberi bakteri bentuk khasnya — ada yang bulat, ada yang seperti batang.",
        fact: "Dengan pewarnaan khusus, ilmuwan bisa membedakan jenis bakteri dari dinding selnya.",
      },
      {
        id: "flagellum",
        name: "Flagela",
        subtitle: "Ekor untuk berenang",
        color: "#b87438",
        attributes: [
          { label: "Tugas", value: "Alat bergerak" },
          { label: "Bentuk", value: "Seperti benang melingkar" },
          { label: "Terlihat?", value: "Perlu pewarna khusus" },
        ],
        note:
          "Flagela itu seperti ekor atau baling-baling kecil. Bakteri memutar flagela seperti motor mungil untuk berenang di dalam cairan.",
        fact: "Flagela bakteri berputar digerakkan oleh tenaga alami dari dalam sel.",
      },
    ],
  },
  {
    id: "animal",
    name: "Sel Hewan",
    type: "Sel Berinti (Eukariotik)",
    accent: "#9b74b7",
    accentSoft: "#efe5f6",
    color: "#9db6dc",
    modelKind: "animal",
    defaultOrganelle: "mitochondrion",
    comparison: "plant",
    renderImage: {
      url: "/cell-renders-transparent/animal.png",
      aspect: "square",
    },
    modelAsset: {
      url: "/models/animal-cell-nih.glb",
      previewUrl: "/nih-previews/animal-cell-nih.png",
      sourceLabel: "NIH 3D Animal Cell",
      sourceUrl: "https://3d.nih.gov/entries/3DPX-015797/2",
      scale: 0.044,
      rotation: [0.24, -0.08, 0.03],
      position: [0, -0.03, 0],
      exposure: 1.12,
    },
    occurrence: {
      title: "Ada di jaringan tubuh hewan dan manusia",
      body: "Sel hewan membentuk tubuh hewan dan manusia. Bentuknya lentur, dan di dalamnya ada banyak bagian kecil dengan tugas masing-masing.",
      motif: "animal",
    },
    microscope: [
      { label: "Mikroskop Cahaya", tone: "#d9a7c7", pattern: "animal-light" },
      { label: "Pewarnaan Khusus", tone: "#b889da", pattern: "animal-stain" },
      { label: "Mikroskop Elektron", tone: "#8b8b8d", pattern: "electron" },
    ],
    organelles: [
      {
        id: "mitochondrion",
        name: "Mitokondria",
        subtitle: "Pembangkit tenaga",
        color: "#cf6f42",
        attributes: [
          { label: "Panjang", value: "1–10 µm (sangat kecil!)" },
          { label: "Pembungkus", value: "Dua lapis" },
          { label: "Tugas", value: "Menghasilkan tenaga" },
        ],
        note:
          "Mitokondria itu seperti pembangkit listrik di dalam sel. Ia mengubah makanan menjadi tenaga supaya sel bisa bekerja dan tubuh kita bisa bergerak.",
        fact: "Mitokondria punya DNA-nya sendiri yang berukuran kecil — terpisah dari inti sel!",
      },
      {
        id: "nucleus",
        name: "Inti Sel",
        subtitle: "Ruang kendali",
        color: "#7a49b0",
        attributes: [
          { label: "Bentuk", value: "Bulat" },
          { label: "Pembungkus", value: "Dua lapis" },
          { label: "Terlihat di mikroskop biasa?", value: "Iya, terlihat" },
        ],
        note:
          "Inti sel itu seperti ruang kendali. Ia menyimpan buku petunjuk sel dan mengatur bagian mana yang harus bekerja.",
        fact: "Tidak semua sel hewan punya inti — sel darah merah yang sudah dewasa justru kehilangan inti selnya.",
      },
      {
        id: "golgi",
        name: "Badan Golgi",
        subtitle: "Tempat membungkus dan mengirim",
        color: "#d49057",
        attributes: [
          { label: "Bentuk", value: "Tumpukan kantong pipih" },
          { label: "Tugas", value: "Mengemas dan menyortir" },
          { label: "Letak", value: "Dekat inti sel" },
        ],
        note:
          "Badan Golgi itu seperti kantor pos di dalam sel. Ia mengemas barang-barang penting lalu mengirimkannya ke tempat yang tepat.",
        fact: "Sel yang banyak menghasilkan zat biasanya punya Badan Golgi yang besar.",
      },
    ],
  },
  {
    id: "muscle",
    name: "Sel Otot",
    type: "Serabut Otot",
    accent: "#bd514d",
    accentSoft: "#f5dfdc",
    color: "#ca6678",
    modelKind: "muscle",
    defaultOrganelle: "myofibril",
    comparison: "neuron",
    renderImage: {
      url: "/cell-renders-transparent/muscle.png",
      aspect: "wide",
    },
    occurrence: {
      title: "Ada di otot rangka tubuh",
      body: "Sel otot bisa memendek dan memanjang. Saat memendek, ia menarik tulang sehingga tubuh kita bisa bergerak, melompat, dan berlari!",
      motif: "muscle",
    },
    microscope: [
      { label: "Mikroskop Cahaya", tone: "#ef9aab", pattern: "muscle-light" },
      { label: "Pewarnaan Khusus", tone: "#c7508d", pattern: "muscle-stain" },
      { label: "Mikroskop Elektron", tone: "#8d8d8d", pattern: "electron" },
    ],
    organelles: [
      {
        id: "myofibril",
        name: "Miofibril",
        subtitle: "Benang yang menarik",
        color: "#bd3d51",
        attributes: [
          { label: "Diameter", value: "Sekitar 1 µm (sangat kecil!)" },
          { label: "Susunan", value: "Berkas bergaris-garis" },
          { label: "Terlihat di mikroskop biasa?", value: "Iya, tampak bergaris" },
        ],
        note:
          "Miofibril itu seperti benang-benang yang bisa memendek. Setiap sel otot berisi ratusan hingga ribuan miofibril yang tersusun rapat — merekalah yang membuat otot bisa menarik.",
        fact: "Satu sel otot bisa sepanjang 30 cm — sepanjang penggaris!",
      },
      {
        id: "sarcolemma",
        name: "Sarkolema",
        subtitle: "Kulit pembawa sinyal",
        color: "#d7b284",
        attributes: [
          { label: "Letak", value: "Di permukaan luar sel" },
          { label: "Tugas", value: "Menyebarkan sinyal" },
          { label: "Jenis", value: "Membran sel" },
        ],
        note:
          "Sarkolema itu seperti kulit luar sel otot. Ia membawa sinyal listrik yang memberi perintah ayo bergerak ke seluruh bagian sel otot.",
        fact: "Sinyal dari sarkolema bisa masuk jauh ke dalam sel lewat saluran-saluran kecil.",
      },
      {
        id: "mitochondria",
        name: "Mitokondria",
        subtitle: "Penyuplai tenaga",
        color: "#cf7042",
        attributes: [
          { label: "Tugas", value: "Menyediakan tenaga" },
          { label: "Letak", value: "Di sela-sela serabut otot" },
          { label: "Jumlah", value: "Tergantung keaktifan otot" },
        ],
        note:
          "Sel otot butuh banyak mitokondria karena bergerak memerlukan banyak tenaga. Semakin sering berolahraga, semakin banyak mitokondria yang dimiliki sel otot.",
        fact: "Latihan ketahanan seperti lari bisa menambah jumlah mitokondria di sel otot.",
      },
    ],
  },
];

export function getCellById(id: string) {
  return cells.find((cell) => cell.id === id) ?? cells[0];
}
