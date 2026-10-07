// ==========================================
// BIN TAHA ASSOCIATES - CENTRAL GEMINI AI ENGINE
// ==========================================

window.GEMINI_CONFIG = window.GEMINI_CONFIG || {
  apiKey: "AQ.Ab8RN6IKJwst0GZ_kMBTDRZoAmkf_0Ipq2Z2UQreP4Ubfk4kXg",
  model: "gemini-1.5-flash",
  endpoint: "https://generativelanguage.googleapis.com/v1beta/models/"
};

// Generic Call Function
async function callGemini(promptText, systemInstruction = "") {
  const cfg = window.GEMINI_CONFIG;
  const url = `${cfg.endpoint}${cfg.model}:generateContent?key=${cfg.apiKey}`;

  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          ...(systemInstruction ? [{ text: systemInstruction }] : []),
          { text: promptText }
        ]
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("Gemini Error:", err);
      throw new Error(err.error?.message || "AI Generation Failed");
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
  } catch (error) {
    console.error("Gemini Connection Error:", error);
    return `Error: ${error.message}`;
  }
}

// ------------------------------------------
// 1. Architectural Blueprint Generator (CAD Studio)
// ------------------------------------------
async function generateCADBlueprint(plotWidth, plotDepth, floors, bedrooms, stylePreference = "Executive Family") {
  const systemPrompt = `You are the Lead Structural Architect and CAD Engineer for Bin Taha Associates in Lahore, Pakistan. 
Produce precise, highly structured architectural layout advice conforming to local LDA/DHA bylaws. 
Format your output with clear headings, room zoning dimensions in feet (e.g. Master Bed: 14x16), ventilation duct placement, staircase zoning, and front/rear mandatory setbacks.`;

  const userPrompt = `Generate a comprehensive blueprint layout report for:
- Plot Front Width: ${plotWidth} Feet
- Plot Depth / Length: ${plotDepth} Feet
- Floors: ${floors}
- Bedrooms Needed: ${bedrooms}
- Layout Preference: ${stylePreference}

Provide:
1. Ground Floor & Upper Floor Zoning (Room-by-Room with approx dimensions)
2. Structural Car Porch, Lawn & Open-to-Sky (OTS) positioning
3. By-laws compliance tips (LDA / DHA standard setbacks)`;

  return await callGemini(userPrompt, systemPrompt);
}

// ------------------------------------------
// 2. Dynamic Construction & Material Estimator
// ------------------------------------------
async function generateMaterialEstimate(areaMarla, constructionType = "Grey Structure") {
  const systemPrompt = `You are the Chief Quantity Surveyor and Cost Estimator at Bin Taha Associates. 
Use current Lahore construction material metrics (Cement, Grade-60 Steel Saria, Awwal Bricks, Margalla Crush, Sand). 
Return an itemized cost table and total estimated budget breakdown in PKR.`;

  const userPrompt = `Calculate a detailed quantity & cost breakdown for:
- Total Area: ${areaMarla} Marla
- Construction Grade: ${constructionType}

List estimated quantities of:
- Cement Bags
- Steel (Tons/KG)
- Bricks
- Crush (CFT) & Sand (CFT)
- Labor & Miscellaneous overheads
Provide total estimated expenditure.`;

  return await callGemini(userPrompt, systemPrompt);
}

// ------------------------------------------
// 3. Autonomous Real Estate Lead & Sales Assistant
// ------------------------------------------
async function handleUserChatQuery(userMessage) {
  const systemPrompt = `Aap Bin Taha Associates Lahore ke live intelligent property consultant hain. 
Aapko client ke sawal ka seedha, to-the-point aur mukhtasar jawab dena hai. 
Aapko Lahore real estate (LDA Avenue 1, Jubilee Town, DHA Lahore wagera) ke baare mein maloomat hain. 
Bin Taha Associates ke CEO Taha Mobeen Bhutta hain aur official phone number 0321 9404812 hai. 
Client jis zaban (Urdu, Roman Urdu ya English) mein pooche, usi zaban mein seedha jawab dein bina kisi faltu bahes ke.`;

  const reply = await callGemini(userMessage, systemPrompt);
  return reply.replace(/\n/g, "<br>");
}

// ========================================================
// GLOBAL GEMINI AI AGENT FOR ALL PAGES (BIN TAHA ASSOCIATES)
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
  // A. Material Estimator Button Hook
  const estBtn = document.querySelector('button[onclick*="calculateEstimate"], #btnEstimate');
  if (estBtn) {
    estBtn.addEventListener("click", async () => {
      const area = document.querySelector('input[name*="area"], input[placeholder*="Marla"], #plotArea')?.value || "5";
      const grade = document.querySelector('select[name*="grade"], #constructionType')?.value || "Grey Structure";
      
      let resContainer = document.getElementById("estimateResultBox");
      if (!resContainer) {
        resContainer = document.createElement("div");
        resContainer.id = "estimateResultBox";
        resContainer.className = "mt-6 p-6 rounded-2xl border-2 border-amber-500 bg-slate-900 text-slate-100";
        estBtn.parentElement.appendChild(resContainer);
      }
      resContainer.innerHTML = "<div class='text-amber-400 font-bold animate-pulse'>✨ Gemini Quantity Surveyor calculating current material & labor costs...</div>";
      const report = await generateMaterialEstimate(area, grade);
      resContainer.innerHTML = `<h4 class='text-amber-400 font-black text-lg mb-3'>📊 Official AI Material & Cost Breakdown</h4><div class='whitespace-pre-wrap text-xs sm:text-sm font-sans leading-relaxed'>${report}</div>`;
    });
  }

  // B. Pure CSS Floating AI Assistant Widget
  if (!document.getElementById("tahaAiFloatingBtn")) {
    const floatBtn = document.createElement("button");
    floatBtn.id = "tahaAiFloatingBtn";
    floatBtn.innerHTML = "🦅";
    floatBtn.setAttribute("title", "Ask AI Assistant");
    floatBtn.style.cssText = `
      position: fixed !important;
      bottom: 25px !important;
      right: 25px !important;
      width: 60px !important;
      height: 60px !important;
      border-radius: 50% !important;
      background: linear-gradient(135deg, #d4af37, #aa771c) !important;
      border: 2px solid #ffd700 !important;
      color: #0f172a !important;
      font-size: 28px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      box-shadow: 0 10px 25px rgba(0,0,0,0.6) !important;
      cursor: pointer !important;
      z-index: 2147483647 !important;
    `;

    const chatBox = document.createElement("div");
    chatBox.id = "tahaAiChatModal";
    chatBox.style.cssText = `
      display: none;
      position: fixed !important;
      bottom: 95px !important;
      right: 25px !important;
      width: 340px !important;
      height: 480px !important;
      background: #0f172a !important;
      border: 2px solid #d4af37 !important;
      border-radius: 18px !important;
      box-shadow: 0 15px 35px rgba(0,0,0,0.8) !important;
      flex-direction: column !important;
      overflow: hidden !important;
      z-index: 2147483647 !important;
      font-family: sans-serif !important;
    `;

    chatBox.innerHTML = `
      <div style="background:linear-gradient(135deg, #d4af37, #aa771c); padding:12px 16px; color:#0f172a; font-weight:900; font-size:13px; display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span>🦅</span>
          <span>Bin Taha Virtual Consultant</span>
        </div>
        <button id="closeAiModalBtn" style="border:none; background:transparent; font-size:16px; cursor:pointer; font-weight:bold; color:#0f172a;">✕</button>
      </div>

      <div id="aiChatMsgArea" style="flex:1; padding:14px; overflow-y:auto; font-size:12px; color:#e2e8f0; display:flex; flex-direction:column; gap:10px; background:#020617;">
        <div style="background:#1e293b; padding:10px 12px; border-radius:12px; border:1px solid #334155; line-height:1.5;">
          Assalam-o-Alaikum! Main **Bin Taha Associates** ka AI property consultant hoon. 🏡<br><br>
          LDA Avenue 1, Jubilee Town, plots ya construction k baray me jo poochna chahein, likhein.
        </div>
      </div>

      <div style="padding:8px 10px; background:#0f172a; border-top:1px solid #1e293b; display:flex; gap:6px; overflow-x:auto;">
        <button type="button" class="quick-chip" data-txt="LDA Avenue 1 rates" style="white-space:nowrap; background:#1e293b; color:#fbbf24; border:1px solid #334155; padding:4px 8px; border-radius:6px; font-size:10px; cursor:pointer;">LDA Avenue 1</button>
        <button type="button" class="quick-chip" data-txt="Jubilee Town rates" style="white-space:nowrap; background:#1e293b; color:#fbbf24; border:1px solid #334155; padding:4px 8px; border-radius:6px; font-size:10px; cursor:pointer;">Jubilee Town</button>
        <button type="button" class="quick-chip" data-txt="Taha Bhai WhatsApp contact" style="white-space:nowrap; background:#1e293b; color:#34d399; border:1px solid #334155; padding:4px 8px; border-radius:6px; font-size:10px; cursor:pointer;">Contact Taha</button>
      </div>

      <form id="aiChatSubmitForm" style="padding:10px; background:#0f172a; border-top:1px solid #334155; display:flex; gap:6px; margin:0;">
        <input type="text" id="aiInputText" placeholder="Apna sawal likhein..." style="flex:1; background:#020617; border:1px solid #d4af37; border-radius:8px; padding:8px 10px; font-size:12px; color:#fff; outline:none;" autocomplete="off" />
        <button type="submit" style="background:#d4af37; color:#020617; border:none; padding:8px 14px; border-radius:8px; font-weight:900; cursor:pointer;">Send</button>
      </form>
    `;

    document.body.appendChild(floatBtn);
    document.body.appendChild(chatBox);

    floatBtn.onclick = () => {
      const isHidden = chatBox.style.display === "none" || chatBox.style.display === "";
      chatBox.style.display = isHidden ? "flex" : "none";
      if (isHidden) document.getElementById("aiInputText")?.focus();
    };

    document.getElementById("closeAiModalBtn").onclick = () => {
      chatBox.style.display = "none";
    };

    chatBox.querySelectorAll(".quick-chip").forEach(btn => {
      btn.onclick = () => {
        const inp = document.getElementById("aiInputText");
        inp.value = btn.getAttribute("data-txt");
        document.getElementById("aiChatSubmitForm").dispatchEvent(new Event("submit"));
      };
    });

    document.getElementById("aiChatSubmitForm").onsubmit = async (e) => {
      e.preventDefault();
      const input = document.getElementById("aiInputText");
      const msgBox = document.getElementById("aiChatMsgArea");
      const query = input.value.trim();
      if (!query) return;

      msgBox.innerHTML += `
        <div style="align-self:flex-end; background:#d4af37; color:#020617; padding:8px 12px; border-radius:12px; font-weight:bold; max-width:85%;">
          ${query}
        </div>
      `;
      input.value = "";
      msgBox.scrollTop = msgBox.scrollHeight;

      const loadId = "load_" + Date.now();
      msgBox.innerHTML += `
        <div id="${loadId}" style="align-self:flex-start; background:#1e293b; padding:8px 12px; border-radius:12px; color:#fbbf24; font-size:11px;">
          ✨ Soch raha hai...
        </div>
      `;
      msgBox.scrollTop = msgBox.scrollHeight;

      const botReply = await handleUserChatQuery(query);
      document.getElementById(loadId)?.remove();

      msgBox.innerHTML += `
        <div style="align-self:flex-start; background:#1e293b; padding:10px 12px; border-radius:12px; border:1px solid #d4af37; max-width:88%; line-height:1.4;">
          ${botReply}
        </div>
      `;
      msgBox.scrollTop = msgBox.scrollHeight;
    };
  }
});
// ==========================================
// BIN TAHA ASSOCIATES - SUPABASE INTEGRATION
// ==========================================

window.SUPABASE_CONFIG = window.SUPABASE_CONFIG || {
  url: "https://ajrvlrvnxpatbculnwil.supabase.co",
  key: "sb_publishable_ndHx-NyVhYxvDwfvBnK2iA_woPQhjJi"
};
async function sendServiceInquiryToSupabase(payload) {
  const cfg = window.SUPABASE_CONFIG;
  try {
    const res = await fetch(`${cfg.url}/rest/v1/Services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": cfg.key,
        "Authorization": `Bearer ${cfg.key}`,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(payload)    });

    if (!res.ok) {
      const errData = await res.json();
      console.error("Supabase Error:", errData);
      throw new Error(errData.message || "Failed to submit inquiry");
    }

    return { success: true };
  } catch (error) {
    console.error("Supabase Error:", error);
    return { success: false, error: error.message };
  }
}

// Auto Form Hook for Services and Client Form
document.addEventListener("DOMContentLoaded", () => {
  const allForms = document.querySelectorAll("form");

  allForms.forEach(form => {
    if (form.id === "aiChatSubmitForm") return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]') || form.querySelector("button");
      const origText = btn ? btn.innerText : "Submit";
      if (btn) {
        btn.disabled = true;
        btn.innerText = "Saving in Database...";
      }

      const nameVal = form.querySelector('input[name*="name"], input[placeholder*="Name"], #name, #clientName')?.value || "Website Client";
      const phoneVal = form.querySelector('input[type="tel"], input[name*="phone"], input[placeholder*="Phone"], #phone, #clientPhone')?.value || "";
      const emailVal = form.querySelector('input[type="email"], input[name*="email"], input[placeholder*="Email"], #email')?.value || "N/A";
      const subjectVal = form.querySelector('select[name*="service"], select, input[name*="subject"], #serviceType')?.value || "General Service Request";
      const detailsVal = form.querySelector('textarea, input[name*="message"], #details, #message')?.value || "Submitted from website";

      const currentDate = new Date().toISOString().split("T")[0];
      const customId = "SRV-" + Math.floor(100000 + Math.random() * 900000);

      const dbPayload = {
        ID: customId,
        Date: currentDate,
        Name: nameVal,
        Phone: phoneVal,
        Email: emailVal,
        Subject: subjectVal,
        Details: detailsVal,
        Status: "Pending"
      };

      const result = await sendServiceInquiryToSupabase(dbPayload);

      if (result.success) {
        alert("Shukriya! Aapki request Bin Taha Associates ke Supabase database me successfully save ho gayi hai.");
        form.reset();
      } else {
        alert("Request send ho gayi hai. Directly WhatsApp par contact karein: 0321 9404812");
      }

      if (btn) {
        btn.disabled = false;
        btn.innerText = origText;
      }
   });
  });
});
