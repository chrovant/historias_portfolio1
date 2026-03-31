// --- CONFIG LOADING ---
// Assumed CONFIG object is loaded from config.js

// --- DATOS DE LAS HISTORIAS ---
const stories = [
    // --- DURACIÓN CORTA (< 15 min) ---
    {
        id: "dios-ruido",
        title: "Dios es Ruido",
        subtitle: "Ensayo sobre la imperfección divina",
        duration: "3 min",
        tags: ["Ensayo", "Filosofía", "Contemplativo"],
        mood: "logic", // Updated mapping
        coverUrl: "assets/images/dios-ruido.png",
        synopsis: "¿Es Dios un arquitecto perfecto o el creador del caos? La optimización es una necesidad de los mortales con recursos limitados. Este ensayo redefine la divinidad no como orden, sino como el lujo infinito de crear lo inútil. El código perfecto es humano; Dios es ruido.",
        link: CONFIG.links["dios-ruido"],
        type: "short"
    },
    {
        id: "3-dimensiones",
        title: "3 Dimensiones, 3 Dioses",
        subtitle: "Teología de la geometría",
        duration: "4 min",
        tags: ["Ensayo", "Metafísica", "Sci-Fi Abstracto"],
        mood: "logic", // Updated mapping
        coverUrl: "assets/images/3-dimensiones.png",
        synopsis: "X, Y, Z no son solo coordenadas; son deidades silenciosas. Una meditación sobre el espacio que revela la teología oculta en las dimensiones: la horizontalidad del error, la verticalidad del sueño y el misterio del tiempo. En la intersección de los ejes, el verdadero creador eres tú.",
        link: CONFIG.links["3-dimensiones"],
        type: "short"
    },
    {
        id: "demiurgos",
        title: "Demiurgos",
        subtitle: "El Dios que acaba de llegar",
        duration: "15 min",
        tags: ["Terror Cósmico", "Fantasía", "Existencialismo"],
        mood: "abyss", // Updated mapping
        coverUrl: "assets/images/demiurgos.png",
        synopsis: "Un alma privilegiada despierta con poderes divinos, creyéndose la cúspide de la existencia. Su realidad se fragmenta al encontrar a otra entidad recién llegada: un ser forjado no en la luz del éxito, sino en la densidad de mil vidas sufridas. Un encuentro que redefine el poder.",
        link: CONFIG.links["demiurgos"],
        type: "short"
    },
    {
        id: "primer-sonador",
        title: "El Primer Soñador",
        subtitle: "Crónica de un viaje invisible",
        duration: "8 min",
        tags: ["Sci-Fi Suave", "Wholesome", "Vida"],
        mood: "nice", // Updated mapping
        coverUrl: "assets/images/primer-sonador.png",
        synopsis: "Un viaje telepático al interior del útero para presenciar el nacimiento de la consciencia. Desde el 'ruido' biológico inicial hasta la primera chispa de un sueño en el octavo mes. Una historia sobre el momento exacto en que la biología se convierte en alma.",
        link: CONFIG.links["primer-sonador"],
        type: "short"
    },

    // --- DURACIÓN MEDIA / LARGA (30 - 40 min) ---
    {
        id: "symphony",
        title: "Symphony",
        subtitle: "El eco del mundo",
        duration: "35 min",
        tags: ["Solarpunk", "Sci-Fi", "Filosofía"],
        mood: "logic", // "Esperanza" fits Logic/Future or Nice. Logic is defined as "Filosofia y tecnica". This fits.
        coverUrl: "assets/images/symphony.png",
        synopsis: "Nick, un programador obsesionado con la desconexión, busca el sonido definitivo de la humanidad. Descubre que la armonía no es homogeneidad, sino una 'Sinfonía Mosaico'. La historia de una app que transformó el ruido del mundo en un ritual que une a la especie.",
        link: CONFIG.links["symphony"],
        type: "long"
    },
    {
        id: "cielo-infierno",
        title: "El Cielo y el Infierno están vacíos",
        subtitle: "Post-apocalipsis divino",
        duration: "35 min",
        tags: ["Terror Teológico", "Fantasía Oscura", "Misterio"],
        mood: "abyss", // Updated mapping
        coverUrl: "assets/images/cielo-infierno.png",
        synopsis: "El Más Allá ha sido evacuado. Un archivero y una rebelde descubren que Dios no es un padre benévolo, sino un conquistador que huyó. Armados con una Biblia Enoquiana y un Libro Negro, buscan refugio en los límites de la creación mientras el cielo se apaga.",
        link: CONFIG.links["cielo-infierno"],
        type: "long"
    },
    {
        id: "reparadora",
        title: "La Reparadora de Corazones",
        subtitle: "Fábula sobre el Kintsugi",
        duration: "30 min",
        tags: ["Realismo Mágico", "Healing", "Romance"],
        mood: "nice", // Updated mapping
        coverUrl: "assets/images/reparadora.png",
        synopsis: "En un taller iluminado por una chimenea perenne, una artesana cura el desamor con tiritas de astronauta y enseña el arte de sanar rompiéndose a uno mismo. Una fábula sobre la resiliencia y el descanso para quienes siempre cuidan de los demás.",
        link: CONFIG.links["reparadora"],
        type: "long"
    },
    {
        id: "terrible-verdad",
        title: "Cómo disfrutar de la terrible verdad",
        subtitle: "La guía definitiva para sonreírle al abismo",
        duration: "40 min",
        tags: ["Humor Negro", "Sátira", "Anti-Autoayuda"],
        mood: "abyss", // Fits Abyss
        coverUrl: "assets/images/terrible-verdad.png",
        synopsis: "¿Cansadx de manifestar abundancia y recibir facturas? Eustaquio, un becario mal pagado, adapta un tratado danés para enseñarte a abrazar la mediocridad. Una guía esencial para navegar la futilidad de la existencia moderna sin perder el sentido del humo.",
        link: CONFIG.links["terrible-verdad"],
        type: "long"
    }
];

// --- ESTADO Y REFERENCIAS ---
const state = {
    time: null, // 'short' or 'long'
    mood: null, // 'logic', 'abyss', 'nice'
    mode: 'quiz'
};

const elements = {
    quizView: document.getElementById('quiz-view'),
    galleryView: document.getElementById('gallery-view'),

    // Steps
    stepTime: document.getElementById('step-time'),
    stepMoodShort: document.getElementById('step-mood-short'),
    stepMoodLong: document.getElementById('step-mood-long'),
    stepResults: document.getElementById('step-results'),

    // Grids
    resultsGrid: document.getElementById('results-grid'),
    galleryGrid: document.getElementById('gallery-grid'),

    // UI Controls
    toggleButton: document.getElementById('mode-toggle'),
    toggleText: document.querySelector('.toggle-text'),
    resultMessage: document.getElementById('result-message')
};

// --- INIT ---
function init() {
    // 1. Setup Time Listeners
    document.querySelectorAll('#step-time [data-time]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const time = e.currentTarget.dataset.time;
            handleTimeSelection(time);
        });
    });

    // 2. Setup Mood Listeners (Both paths)
    document.querySelectorAll('[data-mood]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const mood = e.currentTarget.dataset.mood;
            handleMoodSelection(mood);
        });
    });

    // 3. Toggle Mode
    elements.toggleButton.addEventListener('click', toggleMode);

    // 4. Initial Render of Full Gallery (Sorted: Long first, then Short)
    const sortedStories = [...stories].sort((a, b) => {
        if (a.type === 'long' && b.type === 'short') return -1;
        if (a.type === 'short' && b.type === 'long') return 1;
        return 0;
    });
    renderCards(sortedStories, elements.galleryGrid);
}

// --- LOGICA DEL QUIZ ---

function handleTimeSelection(time) {
    state.time = time;
    fadeOut(elements.stepTime, () => {
        elements.stepTime.classList.remove('active');

        if (time === 'short') {
            elements.stepMoodShort.classList.add('active');
        } else {
            elements.stepMoodLong.classList.add('active');
        }
    });
}

function handleMoodSelection(mood) {
    state.mood = mood;
    // Determine which previous step to fade out
    const currentStep = state.time === 'short' ? elements.stepMoodShort : elements.stepMoodLong;

    fadeOut(currentStep, () => {
        currentStep.classList.remove('active');
        elements.stepResults.classList.add('active');
        showResults();
    });
}

function goBack(target) {
    if (target === 'time') {
        const currentStep = state.time === 'short' ? elements.stepMoodShort : elements.stepMoodLong;

        // Hide current mood step
        fadeOut(currentStep, () => {
            currentStep.classList.remove('active');
            // Show time step
            state.time = null; // Reset selection
            elements.stepTime.classList.add('active');
        });
    }
}

function restartQuiz() {
    state.time = null;
    state.mood = null;

    // Reset All Views
    elements.stepResults.classList.remove('active');
    elements.stepMoodShort.classList.remove('active');
    elements.stepMoodLong.classList.remove('active');

    // Show Time
    elements.stepTime.classList.add('active');
}

function showResults() {
    // Logic Mapping based on Unified Categories
    // Logic (Filosofia), Abyss (Oscuridad), Nice (Sanar)

    // Filter logic: Must match Duration AND Mood
    const filtered = stories.filter(story => {
        return story.type === state.time && story.mood === state.mood;
    });

    // Message Logic
    let message = "";
    if (state.mood === 'logic') message = "Para una mente que busca patrones en el caos.";
    else if (state.mood === 'abyss') message = "Solo para aquellos dispuestos a mirar donde nadie más mira.";
    else if (state.mood === 'nice') message = "Un refugio cálido para un alma cansada.";

    elements.resultMessage.innerText = message;

    // Apply Centering Class if single result
    if (filtered.length === 1) {
        elements.resultsGrid.classList.add('single-result-grid');
    } else {
        elements.resultsGrid.classList.remove('single-result-grid');
    }

    renderCards(filtered, elements.resultsGrid);
}

// --- RENDERIZADO ---

function renderCards(list, container) {
    container.innerHTML = '';
    list.forEach(story => {
        const card = document.createElement('article');
        card.className = 'story-card glass-panel fade-in-up';

        // Click Event for Whole Card
        card.addEventListener('click', (e) => {
            // Avoid double trigger if clicking button
            if (e.target.classList.contains('read-btn')) return;
            window.open(story.link, '_blank');
        });

        // Tag Generation
        const tagsHtml = story.tags.map(tag => {
            const cssClass = getTagClass(tag);
            return `<span class="tag ${cssClass}">${tag}</span>`;
        }).join('');

        const durationTag = `<span class="tag duration">${story.duration}</span>`;

        card.innerHTML = `
            <div class="story-cover" style="background-image: url('${story.coverUrl}')"></div>
            <div class="story-content">
                <h3 class="story-title">${story.title}</h3>
                <h4 class="story-subtitle">${story.subtitle}</h4>
                <div class="story-tags">
                    ${durationTag}
                    ${tagsHtml}
                </div>
                <p class="story-desc">${story.synopsis}</p>
                <button class="read-btn" onclick="window.open('${story.link}', '_blank')">Leer Historia</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function getTagClass(tag) {
    const lower = tag.toLowerCase();

    if (lower.includes('terror') || lower.includes('oscuro') || lower.includes('misterio') || lower.includes('abismo') || lower.includes('humor negro')) return 'dark';
    if (lower.includes('sci-fi') || lower.includes('ensayo') || lower.includes('filosofía') || lower.includes('lógica')) return 'cerebral';
    if (lower.includes('healing') || lower.includes('tierno') || lower.includes('wholesome') || lower.includes('vida') || lower.includes('romance') || lower.includes('solarpunk')) return 'healing';
    if (lower.includes('sátira')) return 'gold';

    return '';
}

// --- UTILIDADES ---

function fadeOut(element, callback) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(-20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

    setTimeout(() => {
        callback();
        element.style.opacity = '';
        element.style.transform = '';
        element.style.transition = '';
    }, 500);
}

function toggleMode() {
    if (state.mode === 'quiz') {
        state.mode = 'gallery';
        elements.quizView.classList.remove('active');
        elements.galleryView.classList.add('active');
        elements.toggleText.innerText = "Volver al Ritual";
        window.scrollTo(0, 0);
    } else {
        state.mode = 'quiz';
        elements.galleryView.classList.remove('active');
        elements.quizView.classList.add('active');
        elements.toggleText.innerText = "Ver Galería Completa";
        window.scrollTo(0, 0);
    }
}

// Start
init();
