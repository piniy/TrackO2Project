// One online visual per article, shared by its cover and reading view.
// Full provenance and delivery changes: public/assets/images/education/articles/credits.json.
export const articleImages = {
  "jejak-karbon": {
    "file": "electricity-grid.webp",
    "width": 1280,
    "height": 960,
    "fit": "cover",
    "alt": "Tiang dan jaringan distribusi listrik di antara pepohonan dalam kabut pagi.",
    "altEn": "Electricity poles and distribution lines among trees in morning fog.",
    "caption": "Komputasi AI memerlukan pasokan listrik.",
    "captionEn": "AI computing requires electricity.",
    "author": "Novoklimov",
    "source": "https://commons.wikimedia.org/wiki/File:Electricity_pylon_File_002.jpg",
    "license": "CC0 1.0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/"
  },
  "jejak-air": {
    "file": "water-cooling.webp",
    "width": 1280,
    "height": 763,
    "fit": "contain",
    "alt": "Diagram menara pendingin: air panas masuk, udara kering masuk dari samping, udara hangat dan lembap keluar, serta air dingin terkumpul di bawah.",
    "altEn": "Cooling-tower diagram: hot water enters, dry air enters from the sides, warm moist air leaves, and cooled water collects below.",
    "caption": "Menara pendingin membuang panas melalui aliran udara dan penguapan sebagian air.",
    "captionEn": "A cooling tower releases heat through airflow and the evaporation of some water.",
    "author": "Eric Dreher / Zerodamage",
    "source": "https://commons.wikimedia.org/wiki/File:Crossflow_diagram.svg",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  },
  "energi-pusat-data": {
    "file": "data-center-power.webp",
    "width": 1280,
    "height": 960,
    "fit": "cover",
    "alt": "Deretan kabinet UPS yang mendukung pasokan listrik pusat data.",
    "altEn": "A row of UPS cabinets supporting a data center's electrical supply.",
    "caption": "Kabinet UPS membantu menjaga pasokan listrik. Infrastruktur pusat data mencakup peralatan pendukung selain server.",
    "captionEn": "UPS cabinets help maintain electrical supply. Data center infrastructure includes supporting equipment alongside servers.",
    "author": "Robert.Harker",
    "source": "https://commons.wikimedia.org/wiki/File:EPS_6000_Row_A.jpg",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/"
  },
  "prompt-bijak": {
    "file": "planning-a-question.webp",
    "width": 1280,
    "height": 854,
    "fit": "cover",
    "alt": "Seseorang menyusun catatan dengan pena di buku terbuka di samping laptop.",
    "altEn": "A person plans notes with a pen in an open notebook beside a laptop.",
    "caption": "Susun tujuan dan konteks sebelum menulis permintaan. Foto kegiatan mencatat; tidak mendokumentasikan sesi AI tertentu.",
    "captionEn": "Plan your goal and context before writing a request. A note-taking photograph; it does not document a particular AI session.",
    "author": "Shixart1985",
    "source": "https://commons.wikimedia.org/wiki/File:Person_writing_in_notebook_while_using_laptop_at_a_modern_workspace.jpg",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0/"
  },
  "pelatihan-inferensi": {
    "file": "training-inference.webp",
    "width": 1600,
    "height": 947,
    "fit": "contain",
    "alt": "Diagram pelatihan dengan propagasi maju, propagasi balik, dan pembaruan bobot, diikuti model terlatih yang menjalankan inferensi pada data baru.",
    "altEn": "Diagram of training with forward propagation, backpropagation and weight updates, followed by a trained model running inference on new data.",
    "caption": "Di kiri, pelatihan memperbarui bobot model melalui beberapa langkah berulang. Di kanan, inferensi memakai model terlatih untuk menghasilkan prediksi dari data baru.",
    "captionEn": "On the left, training updates model weights through repeated steps. On the right, inference uses the trained model to predict from new data.",
    "author": "Donghee Ha, Mooseop Kim, KyeongDeok Moon, and Chi Yoon Jeong",
    "credit": "Ha et al. (2021), Fig. 1",
    "source": "https://www.mdpi.com/1424-8220/21/7/2364",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0/"
  },
  "air-dan-lokasi": {
    "file": "water-location.webp",
    "width": 1280,
    "height": 853,
    "fit": "cover",
    "alt": "Seseorang berjalan melewati dasar Danau Sentarum yang retak pada musim kemarau, Kalimantan Barat.",
    "altEn": "A person walks across the cracked bed of Lake Sentarum during the dry season in West Kalimantan.",
    "caption": "Danau Sentarum, Kalimantan Barat, pada musim kemarau Agustus 2019. Kondisi air berubah menurut tempat dan musim; foto ini tidak menunjukkan dampak AI.",
    "captionEn": "Lake Sentarum, West Kalimantan, in the August 2019 dry season. Water conditions vary by place and season; this photograph does not show an AI impact.",
    "author": "Rendika Wijayanto",
    "source": "https://commons.wikimedia.org/wiki/File:Danau_Sentarum_musim_kemarau_2.jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/"
  }
};

export const articleImageMessages = Object.fromEntries([
  ['Lihat gambar penuh', 'View full-size image'],
  ...Object.values(articleImages).flatMap(image => [[image.alt, image.altEn], [image.caption, image.captionEn]])
]);
