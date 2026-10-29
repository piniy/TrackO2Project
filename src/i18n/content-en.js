// English reading content mirrors the Indonesian source by stable content ID.
// Source titles, links, numerical factors, and answer order stay unchanged.
export const englishActivities = {
  chat: { title: 'Short questions', description: 'Check a definition or ask a short question.' },
  summary: { title: 'Summarizing text', description: 'Ask for a summary of a reading.' },
  longText: { title: 'Generating long text', description: 'Draft an essay, story, or longer piece of writing.' },
  image: { title: 'Generating images', description: 'Create one visual asset with AI.' }
};

export const englishArticles = {
  'jejak-karbon': {
    title: 'Digital answers, real processes.', readTime: '3 min read',
    summary: 'Explore the connection between AI requests, computing, electricity, and emissions.',
    paragraphs: [
      'When you send a request to AI, computers run a model to produce an answer. Running a model this way is called inference. The energy used and associated emissions can vary with the model, task, hardware, and electricity source.',
      'Luccioni and colleagues studied energy use and emissions for 1,000 inferences using specific models and tasks. This comparison helps us understand that AI tasks do not all require the same resources.'
    ],
    takeaway: 'Read estimates alongside their units, assumptions, and sources.'
  },
  'jejak-air': {
    title: 'Why is AI connected to water?', readTime: '3 min read',
    summary: 'Learn about the water footprint of computing infrastructure.',
    paragraphs: [
      'AI also has a water footprint. Research by Li and colleagues discusses water use in AI infrastructure, including cooling and its connection to electricity generation.',
      'Distinguish water withdrawal from water consumption. Not all water taken from a source is consumed; some may be returned. Treating these measures as the same can be misleading.',
      'Water efficiency can vary with location, time, and operating conditions. Coefficients in the research explorer apply only within the selected study scenario, with its defined model, request length, and accounting boundaries. They are not a fixed conversion for all prompts.'
    ],
    takeaway: 'Water footprints depend on context, not just prompt counts.'
  },
  'energi-pusat-data': {
    title: 'The electricity behind the screen.', readTime: '2 min read',
    summary: 'Servers are not the only parts of a data center that need electricity.',
    paragraphs: [
      'Data centers house servers, storage, networks, and supporting equipment. The IEA report Energy and AI explains that both servers and cooling systems contribute to these facilities’ electricity demand.',
      'Data center energy demand varies with equipment, efficiency, and the services being run. Figures for all data centers should not automatically be treated as figures for AI alone.',
      'When reading electricity demand projections, check the year and scenario. A projection is an estimate based on assumptions, not a guaranteed measurement of the future.'
    ],
    takeaway: 'Distinguish AI data, data center data, and energy projections.'
  },
  'prompt-bijak': {
    title: 'Start with a clearer question.', readTime: '2 min read',
    summary: 'Use AI to suit your needs while continuing to think for yourself.',
    paragraphs: [
      'Before opening an AI tool, define your goal: understanding a concept, checking a step, or developing an initial idea. Include the context, answer format, and constraints you need.',
      'Read and check the answer before repeating a request. For simple tasks, consider class notes, books, or a direct search. Choose tools based on what the task needs.',
      'Use AI output as material to think with. Check sources and do your own analysis. This is learning guidance; the site has not measured changes in behavior or actual emissions savings.'
    ],
    takeaway: 'Define your goal, provide context, then check the result.'
  },
  'pelatihan-inferensi': {
    title: 'Training a model and using it: what is the difference?', readTime: '2 min read',
    summary: 'Distinguish building a model’s capabilities from answering everyday requests.',
    paragraphs: [
      'Training changes a model’s parameters using data and computing. Inference runs a trained model to produce an output, such as a topic explanation or image caption. Sending a question does not mean retraining the whole model.',
      'Both need resources. To compare them, check the denominator: one training run, 1,000 test inferences, and one median prompt in a production service are different measures.',
      'Resource requirements during use also depend on task, model, and configuration. Luccioni’s experiments do not establish one factor for every modern chatbot answer.'
    ],
    takeaway: 'Identify the process and denominator before comparing figures.'
  },
  'air-dan-lokasi': {
    title: 'Why does water location matter?', readTime: '2 min read',
    summary: 'A number of liters does not explain every consequence for local people and ecosystems.',
    paragraphs: [
      'Water availability is uneven. Water stress relates demand to renewable supply in an area. Additional demand needs to be considered alongside seasons, water sources, and other local users.',
      'WRI’s Aqueduct framework helps screen water risks by location. Its indicators need local investigation; a global indicator does not prove the impact of one data center or one prompt on residents.',
      'For a school discussion, ask providers where cooling water comes from, how efficiently it is used, and whether local impacts are reported. The Indonesia projection in Li’s study is not a measurement of present-day ChatGPT use in Indonesia.'
    ],
    takeaway: 'Read water quantities alongside location, seasons, and community conditions.'
  }
};

export const englishReferences = {
  proposal: {
    kind: 'Project proposal',
    summary: 'The basis for the project’s goals, CarbsCulator design, and four estimation factors in this prototype. Parameters are on page 5 and classifications on page 6.',
    limitation: 'The proposal parameters are prototype assumptions. Their applicability to each AI service has not been independently validated.',
    version: 'TraCkO2 proposal 2026, pages 5–6', dataYear: '2026 proposal assumptions',
    taskUnit: 'g CO₂e per activity in four simulation categories', geography: 'Service location unspecified',
    evidence: 'Prototype parameters for learning', included: 'Simulated emissions using four proposal factors',
    excluded: 'Actual server measurements, energy and water are not reported'
  },
  luccioni: {
    kind: 'Research paper',
    summary: 'Compares energy use and emissions for 1,000 inferences across different tasks and models. Both task type and model affect the measurements.',
    limitation: 'Results apply to the configurations tested in the study. The paper does not establish one universal figure per prompt for all AI services.',
    version: 'arXiv:2311.16863v3 · October 15, 2024', dataYear: '2023/2024 paper experiments; measurement dates not reported',
    taskUnit: 'Mean kWh per 1,000 study inferences; converted g CO₂e', geography: 'Test configuration in Oregon, US',
    evidence: 'Experiments on tested tasks and models', included: 'Operational test energy; conversion using 297.6 g CO₂e/kWh',
    excluded: 'Hardware life cycle, water, and a universal chatbot-answer factor are outside scope'
  },
  water: {
    kind: 'Research paper',
    summary: 'Presents methods for estimating AI’s water footprint and discusses how water efficiency varies with location and operating time.',
    limitation: 'Water withdrawal and water consumption are different measures. Study figures cannot serve as a fixed conversion of water per prompt.',
    version: 'arXiv:2304.03271v5 · March 26, 2025', dataYear: 'GPT-3 assumptions; Indonesia facility projections as of July 2023',
    taskUnit: 'mL per defined GPT-3 request; L per training run', geography: 'US and Indonesia location scenarios in the study',
    evidence: 'Modeling of operational water consumption', included: 'Onsite cooling and electricity-related water',
    excluded: 'Embodied water in hardware manufacturing is excluded from the operational example'
  },
  iea: {
    kind: 'Institutional report',
    summary: 'Explains electricity demand from data center servers, networks, storage, and cooling, alongside energy demand scenarios.',
    limitation: 'Data center figures include a range of digital services, not only AI. Projections also depend on scenarios and assumptions.',
    version: 'Energy and AI · April 10, 2025', dataYear: '2024 baseline and scenarios toward 2030/2035',
    taskUnit: 'Aggregate electricity demand and projections, not per prompt', geography: 'Global and regional',
    evidence: 'Institutional report with data and scenario modeling', included: 'Data center servers, storage, networking and cooling',
    excluded: 'Does not establish an emission or water factor for each user prompt'
  },
  gemini: {
    kind: 'Provider-authored study',
    summary: 'Reports energy, emissions and cooling water for the median Gemini Apps text prompt in May 2025, with a serving energy breakdown.',
    limitation: 'The study is provider-authored and covers a product serving multiple models. Its median is not a mean for personal totals, an Indonesia factor, or a measurement of every current Gemini model.',
    version: 'arXiv:2508.15734v1 · August 21, 2025', dataYear: 'May 2025',
    taskUnit: 'Median Gemini Apps text prompt: Wh, g CO₂e, mL cooling water', geography: 'Google production infrastructure; not an Indonesia factor',
    evidence: 'Provider-reported production study', included: 'Accelerators, CPU/DRAM, idle machines, facility overhead; market-based emissions and allocated serving hardware; cooling water',
    excluded: 'Water figures exclude electricity-related and embodied water; not the full service life cycle'
  },
  shumba: {
    kind: 'Research paper',
    summary: 'Models water efficiency and historical GPT-4 and Llama-3-70B inference examples using location data and energy assumptions.',
    limitation: 'Inference assumptions date from 2024; the 2026 revision corrects WUE processing. Scenarios are not global averages or current performance. GPT-4 uses proprietary-model assumptions; GPT-4o is not covered.',
    version: 'arXiv:2412.03716v3 · June 12, 2026', dataYear: 'Inference assumptions from public sources available in mid-2024',
    taskUnit: 'L per 5,000-token report or 250-token email in a scenario', geography: '41 African countries; selected evaluations and US/global comparisons',
    evidence: 'Dataset and historical scenario modeling', included: 'Onsite and electricity-related water; water leakage shown separately',
    excluded: 'Not current model data; no GPT-4o value or causal community impact'
  },
  aqueduct: {
    kind: 'Institutional technical note',
    summary: 'Explains location-based water risk indicators and demand relative to water supply to help interpret local impact context.',
    limitation: 'Aqueduct is a risk-screening tool that needs local investigation. Regional indicators do not prove the impact of one data center or one prompt.',
    version: 'Aqueduct 4.0 · August 16, 2023', dataYear: 'Historical data from various years; projections for 2030, 2050, 2080',
    taskUnit: 'Regional water risk indicators; not liters per prompt', geography: 'Global, sub-basin and regional aggregation',
    evidence: 'Indicator framework and hydrological modeling', included: 'Regional water supply, demand and multiple water risks',
    excluded: 'Does not measure one AI service’s footprint or prove facility-specific impacts'
  }
};
