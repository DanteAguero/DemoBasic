(() => {
  const WA_NUMBER = "542616582829";

  const products = [
    {
      id:"samsung-a36",
      brand:"Samsung",
      model:"Galaxy A36 5G",
      storage:"256 GB",
      condition:"Nuevo",
      price:694999,
      images:["Samsung-A36-1.webp","Samsung-A36-2.webp"],
      specs:{ "Cámara":"50 MP","RAM":"8 GB","Batería":"5000 mAh","Pantalla":'6.7"' }
    },
    {
      id:"samsung-a17",
      brand:"Samsung",
      model:"Galaxy A17",
      storage:"128 GB",
      condition:"Nuevo",
      price:399999,
      images:["Samsung-A17-1.webp","Samsung-A17-2.webp"],
      specs:{ "Cámara":"—","RAM":"—","Batería":"—","Pantalla":"—" }
    },
    {
      id:"samsung-a16",
      brand:"Samsung",
      model:"Galaxy A16",
      storage:"128 GB",
      condition:"Nuevo",
      price:329999,
      images:["Samsung-A16-1.webp","Samsung-A16-2.webp","Samsung-A16-3.webp"],
      specs:{ "Cámara":"50 MP","RAM":"4 GB","Batería":"5000 mAh","Pantalla":'6.6"' }
    },
    {
      id:"zflip7",
      brand:"Samsung",
      model:"Galaxy Z Flip7",
      storage:"256 GB",
      condition:"Nuevo",
      price:1599999,
      images:["Galaxy Z Flip7-1.webp","Galaxy Z Flip7-2.webp"],
      specs:{ "Cámara":"Dual","RAM":"12 GB","Batería":"—","Pantalla":"Plegable" }
    },
    {
      id:"moto-e15",
      brand:"Motorola",
      model:"Moto E15",
      storage:"64 GB",
      condition:"Nuevo",
      price:219999,
      images:["moto-e15-1.webp","moto-e15-2.webp"],
      specs:{ "Cámara":"—","RAM":"—","Batería":"—","Pantalla":"—" }
    },
    {
      id:"moto-g15",
      brand:"Motorola",
      model:"Moto G15",
      storage:"128 GB",
      condition:"Nuevo",
      price:299999,
      images:["moto-g15-1.webp","moto-g15-2.webp"],
      specs:{ "Cámara":"—","RAM":"—","Batería":"—","Pantalla":"—" }
    },
    {
      id:"moto-g86",
      brand:"Motorola",
      model:"Moto G86",
      storage:"256 GB",
      condition:"Nuevo",
      price:359999,
      images:["moto-g86-1.webp","moto-g86-2.webp"],
      specs:{ "Cámara":"—","RAM":"—","Batería":"—","Pantalla":"—" }
    },
    {
      id:"moto-edge-60",
      brand:"Motorola",
      model:"Moto Edge 60",
      storage:"256 GB",
      condition:"Nuevo",
      price:499999,
      images:["moto-edge-60-1.webp","moto-edge-60-2.webp"],
      specs:{ "Cámara":"—","RAM":"—","Batería":"—","Pantalla":"—" }
    },
  ];

  const norm = (v) => (v || "").toString().trim().toLowerCase();
  const getPid = () => new URL(location.href).searchParams.get("pid");


  const isItemPage = location.pathname.includes("/item/");
  const PREVIEWS_BASE = isItemPage ? "../static/previews/" : "./static/previews/";
  const encodeFile = (fileName) => PREVIEWS_BASE + encodeURIComponent(fileName);

  const formatARS = (n) => Number(n).toLocaleString("es-AR");

  const buildWhatsAppLink = (p) => {
    const msg = `Hola, me interesa el *${p.brand} ${p.model}* (${p.storage}). ¿Me pasás info y disponibilidad?`;
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg);
  };

  function renderItem(p) {
    const mainImage = document.getElementById("mainImage");
    const thumbs = document.getElementById("thumbs");
    const brandLine = document.getElementById("brandLine");
    const title = document.getElementById("title");
    const storageLine = document.getElementById("storageLine");
    const price = document.getElementById("price");
    const specRow = document.getElementById("specRow");
    const whatsappBtn = document.getElementById("whatsappBtn");

    brandLine.textContent = p.brand;
    title.textContent = p.model;
    storageLine.textContent = `Almacenamiento: ${p.storage} • ${p.condition}`;
    price.textContent = "$" + formatARS(p.price);

    whatsappBtn.href = buildWhatsAppLink(p);
    whatsappBtn.target = "_blank";

    const imgs = p.images || [];
    if (imgs.length) {
      mainImage.src = encodeFile(imgs[0]);
      mainImage.alt = `${p.brand} ${p.model}`;
    }

    thumbs.innerHTML = "";
    imgs.forEach((file, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "thumb" + (idx === 0 ? " active" : "");
      btn.innerHTML = `<img src="${encodeFile(file)}" alt="">`;
      btn.addEventListener("click", () => {
        thumbs.querySelectorAll(".thumb").forEach(t => t.classList.remove("active"));
        btn.classList.add("active");
        mainImage.src = encodeFile(file);
      });
      thumbs.appendChild(btn);
    });

    specRow.innerHTML = "";
    Object.entries(p.specs || {}).slice(0,4).forEach(([k,v]) => {
      const box = document.createElement("div");
      box.className = "spec";
      box.innerHTML = `<div class="spec-k">${k}</div><div class="spec-v">${v}</div>`;
      specRow.appendChild(box);
    });
  }

  function showNotFound(pid) {
    document.querySelector(".product-info-aaa")?.insertAdjacentHTML("afterbegin", `
      <div style="padding:12px;border:1px solid rgba(255,255,255,.15);border-radius:12px;margin-bottom:12px">
        <b>No encontré el producto</b><br>
        pid recibido: <code>${pid ?? "null"}</code><br>
        ids disponibles: <code>${products.map(p=>p.id).join(", ")}</code>
      </div>
    `);
  }

  function init() {
    const isItem = !!document.getElementById("mainImage") && !!document.getElementById("thumbs");
    if (!isItem) return;

    const pidRaw = getPid();
    const pid = norm(pidRaw);

    const p = products.find(x => norm(x.id) === pid);

    if (!pid || !p) {
      showNotFound(pidRaw);
      return;
    }

    renderItem(p);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
