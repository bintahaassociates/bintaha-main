// ==========================================
// BIN TAHA ASSOCIATES - CENTRAL GEMINI AI ENGINE
// ==========================================

const GEMINI_CONFIG = {
  apiKey: "AQ.Ab8RN6IKJwst0GZ_kMBTDRZoAmkf_0Ipq2Z2UQreP4Ubfk4kXg",
  model: "gemini-1.5-flash",
  endpoint: "https://generativelanguage.googleapis.com/v1beta/models/"
};

// Generic Call Function
async function callGemini(promptText, systemInstruction = "") {
  const url = `${GEMINI_CONFIG.endpoint}${GEMINI_CONFIG.model}:generateContent?key=${GEMINI_CONFIG.apiKey}`;

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
  const estBtn = document.querySelector('button[onclick*="calculateEstimate"], button:has-text("Estimate"), #btnEstimate');
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

  // B. Luxury Floating AI Assistant Widget
  if (!document.getElementById("floatingGeminiBtn")) {
    const chatUI = `
      <!-- Floating Gemini AI Assistant Button -->
      <button id="floatingGeminiBtn" onclick="toggleGeminiChat()" class="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 text-slate-950 text-2xl shadow-2xl flex items-center justify-center z-50 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-amber-300 cursor-pointer shadow-amber-500/40" style="position:fixed; bottom:24px; right:24px; z-index:99999;" title="Ask Gemini AI Assistant">
        🦅
      </button>

      <!-- Complete Interactive AI Assistant Window -->
      <div id="geminiChatModal" style="display:none; position:fixed; bottom:96px; right:24px; z-index:99999; width:360px; height:500px; background:#0f172a; border:2px solid #d4af37; border-radius:20px; box-shadow:0 15px 35px rgba(0,0,0,0.8); flex-direction:column; overflow:hidden;">
        <!-- Header -->
        <div style="background:linear-gradient(135deg, #d4af37, #aa771c); padding:12px 16px; color:#0f172a; font-weight:900; font-size:13px; display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:16px;">🦅</span>
            <span>Bin Taha Virtual Consultant</span>
          </div>
          <button onclick="toggleGeminiChat()" style="border:none; background:transparent; font-size:16px; cursor:pointer; font-weight:bold; color:#0f172a;">✕</button>
        </div>

        <!-- Messages Flow Area -->
        <div id="chatMessages" style="flex:1; padding:14px; overflow-y:auto; font-size:12px; color:#e2e8f0; display:flex; flex-direction:column; gap:10px; background:#020617;">
          <div style="background:#1e293b; padding:10px 12px; border-radius:12px; border:1px solid #334155; line-height:1.5;">
            السلام علیکم! میں **Bin Taha Associates** کا سمارٹ پراپرٹی اسسٹنٹ ہوں۔ 🏡<br><br>
            LDA Avenue 1، Jubilee Town، کنسٹرکشن یا کسی بھی سروس کے متعلق سیدھا سوال پوچھیں۔
          </div>
        </div>

        <!-- Quick Action Chips -->
        <div style="padding:8px 10px; background:#0f172a; border-top:1px solid #1e293b; display:flex; gap:6px; overflow-x:auto;">
          <button onclick="quickReply('LDA Avenue 1 ریٹس')" style="white-space:nowrap; background:#1e293b; color:#fbbf24; border:1px solid #334155; padding:4px 8px; border-radius:6px; font-size:10px; cursor:pointer;">LDA Avenue 1</button>
          <button onclick="quickReply('Jubilee Town ریٹس')" style="white-space:nowrap; background:#1e293b; color:#fbbf24; border:1px solid #334155; padding:4px 8px; border-radius:6px; font-size:10px; cursor:pointer;">Jubilee Town</button>
          <button onclick="quickReply('طاہا بھائی سے رابطہ نمبر')" style="white-space:nowrap; background:#1e293b; color:#34d399; border:1px solid #334155; padding:4px 8px; border-radius:6px; font-size:10px; cursor:pointer;">Contact Taha</button>
        </div>

        <!-- Input Form -->
        <form onsubmit="handleSendGemini(event)" style="padding:10px; background:#0f172a; border-top:1px solid #334155; display:flex; gap:6px;">
          <input type="text" id="chatInput" placeholder="Apna sawal likhein..." style="flex:1; background:#020617; border:1px solid #d4af37; border-radius:8px; padding:8px 10px; font-size:12px; color:#fff; outline:none;" autocomplete="off" />
          <button type="submit" style="background:#d4af37; color:#020617; border:none; padding:8px 14px; border-radius:8px; font-weight:900; cursor:pointer;">Send</button>
        </form>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", chatUI);
  }
});

// UI Event Handlers
function toggleGeminiChat() {
  const modal = document.getElementById("geminiChatModal");
  if (modal) {
    const isHidden = modal.style.display === "none" || modal.style.display === "";
    modal.style.display = isHidden ? "flex" : "none";
    if (isHidden) {
      document.getElementById("chatInput")?.focus();
    }
  }
}

function quickReply(text) {
  const input = document.getElementById("chatInput");
  if (input) {
    input.value = text;
    handleSendGemini(new Event("submit"));
  }
}

async function handleSendGemini(e) {
  if (e) e.preventDefault();
  const input = document.getElementById("chatInput");
  const msgBox = document.getElementById("chatMessages");
  const userText = input.value.trim();
  if (!userText) return;

  msgBox.innerHTML += `
    <div style="align-self:flex-end; background:#d4af37; color:#020617; padding:8px 12px; border-radius:12px; font-weight:bold; max-width:85%;">
      ${userText}
    </div>
  `;
  input.value = "";
  msgBox.scrollTop = msgBox.scrollHeight;

  const typingId = "typing_" + Date.now();
  msgBox.innerHTML += `
    <div id="${typingId}" style="align-self:flex-start; background:#1e293b; padding:8px 12px; border-radius:12px; color:#fbbf24; font-size:11px;">
      ✨ Soch raha hai...
    </div>
  `;
  msgBox.scrollTop = msgBox.scrollHeight;

  const botResponse = await handleUserChatQuery(userText);
  document.getElementById(typingId)?.remove();

  msgBox.innerHTML += `
    <div style="align-self:flex-start; background:#1e293b; padding:10px 12px; border-radius:12px; border:1px solid #d4af37; max-width:88%; line-height:1.4;">
      ${botResponse}
    </div>
  `;
  msgBox.scrollTop = msgBox.scrollHeight;
}
