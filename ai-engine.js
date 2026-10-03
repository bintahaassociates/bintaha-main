// ==========================================
// BIN TAHA ASSOCIATES - CENTRAL GEMINI AI ENGINE
// ==========================================

const GEMINI_CONFIG = {
  apiKey: "AQ.Ab8RN6JG_eiJmdB5TBxVBu8ocoEWeKDGj8ZuPyOnMH9NbsNVWQ",
  model: "gemini-2.5-flash",
  endpoint: "https://generativelanguage.googleapis.com/v1beta/models/"
};

// Generic Call Function
async function callGemini(promptText, systemInstruction = "") {
  const url = `${GEMINI_CONFIG.endpoint}${GEMINI_CONFIG.model}:generateContent?key=${GEMINI_CONFIG.apiKey}`;

  const payload = {
    contents: [{ role: "user", parts: [{ text: promptText }] }]
  };

  if (systemInstruction) {
    payload.systemInstruction = {
      parts: [{ text: systemInstruction }]
    };
  }

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
async function handleUserChatQuery(userMessage, chatHistory = []) {
  const systemPrompt = `You are the AI Real Estate Copilot representing CEO Taha Mobeen Bhutta at Bin Taha Associates, Lahore.
You specialize in prime locations: LDA Avenue 1, Jubilee Town, Izmir Town, DHA Rahbar, and Raiwind Road corridor.
Be polite, professional, concise, and encourage the client to book a consultation or connect on WhatsApp (+92 321 9404812).`;

  return await callGemini(userMessage, systemPrompt);
}

// ========================================================
// GLOBAL GEMINI AI AGENT FOR ALL PAGES (BIN TAHA ASSOCIATES)
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
    // A. Material Estimator Button Hook
    const estBtn = document.querySelector('button[onclick*="calculateEstimate"], button:has-text("Estimate"), #btnEstimate');
    if (estBtn) {
        estBtn.addEventListener("click", async (e) => {
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

    // B. Floating AI Real Estate Consultant Widget (On EVERY page)
    if (!document.getElementById("tahaAiFloatingWidget")) {
        const widget = document.createElement("div");
        widget.id = "tahaAiFloatingWidget";
        widget.style.cssText = "position:fixed; bottom:25px; right:25px; z-index:99999;";
        widget.innerHTML = `
            <div id="aiChatBoxContainer" style="display:none; width:340px; height:450px; background:#0f172a; border:2px solid #d4af37; border-radius:18px; box-shadow:0 15px 35px rgba(0,0,0,0.8); flex-direction:column; overflow:hidden;" class="mb-3">
                <div style="background:linear-gradient(135deg, #d4af37, #aa771c); padding:12px 16px; color:#0f172a; font-weight:900; font-size:13px; display:flex; justify-content:space-between; align-items:center;">
                    <span>🦅 Bin Taha AI Real Estate Advisor</span>
                    <button id="closeAiChatBtn" style="border:none; background:transparent; font-size:16px; cursor:pointer; font-weight:bold;">✖</button>
                </div>
                <div id="aiChatMessages" style="flex:1; padding:14px; overflow-y:auto; font-size:12px; color:#e2e8f0; display:flex; flex-direction:column; gap:8px;">
                    <div style="background:#1e293b; padding:10px 12px; border-radius:12px; border:1px solid #d4af37;">
                        Assalam-o-Alaikum! Main Bin Taha Associates ka AI Advisor hoon. Plot sale/purchase, LDA/DHA by-laws, ya construction cost k baray me kuch bhi poochein!
                    </div>
                </div>
                <div style="padding:10px; background:#020617; border-top:1px solid #334155; display:flex; gap:6px;">
                    <input id="aiChatInput" type="text" placeholder="Apna sawal likhein..." style="flex:1; background:#0f172a; border:1px solid #d4af37; border-radius:8px; padding:8px; font-size:12px; color:#fff; outline:none;" />
                    <button id="aiChatSendBtn" style="background:#d4af37; color:#020617; border:none; padding:8px 14px; border-radius:8px; font-weight:900; cursor:pointer;">Send</button>
                </div>
            </div>
            <button id="toggleAiChatBtn" style="background:linear-gradient(135deg, #d4af37, #aa771c); border:2px solid #ffd700; width:58px; height:58px; border-radius:50%; box-shadow:0 8px 20px rgba(212,175,55,0.4); cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:26px; color:#0f172a; margin-left:auto;">
                🤖
            </button>
        `;
        document.body.appendChild(widget);

        const chatBox = document.getElementById("aiChatBoxContainer");
        const toggleBtn = document.getElementById("toggleAiChatBtn");
        const closeBtn = document.getElementById("closeAiChatBtn");
        const inputField = document.getElementById("aiChatInput");
        const sendBtn = document.getElementById("aiChatSendBtn");
        const msgContainer = document.getElementById("aiChatMessages");

        toggleBtn.onclick = () => {
            chatBox.style.display = chatBox.style.display === "none" ? "flex" : "none";
        };
        closeBtn.onclick = () => { chatBox.style.display = "none"; };

        const sendMsg = async () => {
            const query = inputField.value.trim();
            if(!query) return;
            msgContainer.innerHTML += `<div style="align-self:flex-end; background:#d4af37; color:#020617; padding:8px 12px; border-radius:12px; font-weight:bold; max-width:85%;">${query}</div>`;
            inputField.value = "";
            msgContainer.scrollTop = msgContainer.scrollHeight;

            const loadingId = "load_" + Date.now();
            msgContainer.innerHTML += `<div id="${loadingId}" style="align-self:flex-start; background:#1e293b; padding:8px 12px; border-radius:12px; font-style:italic; color:#94a3b8;">Gemini AI soch raha hai...</div>`;
            msgContainer.scrollTop = msgContainer.scrollHeight;

            try {
                const answer = await handleUserChatQuery(query);
                document.getElementById(loadingId).remove();
                msgContainer.innerHTML += `<div style="align-self:flex-start; background:#1e293b; padding:10px 12px; border-radius:12px; border:1px solid #d4af37; max-width:85%; line-height:1.4;">${answer}</div>`;
            } catch(e) {
                document.getElementById(loadingId).innerText = "Error: " + e.message;
            }
            msgContainer.scrollTop = msgContainer.scrollHeight;
        };

        sendBtn.onclick = sendMsg;
        inputField.onkeydown = (e) => { if(e.key === "Enter") sendMsg(); };
    }
});
