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
      'Luccioni and colleagues studied energy use and emissions for 1,000 inferences using specific models and tasks. This comparison helps us understand that AI tasks do not all require the same resources.',
      'CarbsCulator is an estimation exercise using parameters from the TraCkO2 proposal. Its results do not measure the server you are using or give an exact figure for any AI brand.'
    ],
    takeaway: 'Read estimates alongside their units, assumptions, and sources.'
  },
  'jejak-air': {
    title: 'Why is AI connected to water?', readTime: '3 min read',
    summary: 'Learn about the water footprint of computing infrastructure.',
    paragraphs: [
      'AI also has a water footprint. Research by Li and colleagues discusses water use in AI infrastructure, including cooling and its connection to electricity generation.',
      'Distinguish water withdrawal from water consumption. Not all water taken from a source is consumed; some may be returned. Treating these measures as the same can be misleading.',
      'Water efficiency can vary with location, time, and operating conditions. This is why this site does not convert prompt counts into glasses or liters of water using a single fixed number.'
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
  }
};

export const englishReferences = {
  proposal: {
    kind: 'Project proposal',
    summary: 'The basis for the project’s goals, CarbsCulator design, and four estimation factors in this prototype. Parameters are on page 5 and classifications on page 6.',
    limitation: 'The proposal parameters are prototype assumptions. Their applicability to each AI service has not been independently validated.'
  },
  luccioni: {
    kind: 'Research paper',
    summary: 'Compares energy use and emissions for 1,000 inferences across different tasks and models. Both task type and model affect the measurements.',
    limitation: 'Results apply to the configurations tested in the study. The paper does not establish one universal figure per prompt for all AI services.'
  },
  water: {
    kind: 'Research paper',
    summary: 'Presents methods for estimating AI’s water footprint and discusses how water efficiency varies with location and operating time.',
    limitation: 'Water withdrawal and water consumption are different measures. Study figures cannot serve as a fixed conversion of water per prompt.'
  },
  iea: {
    kind: 'Institutional report',
    summary: 'Explains electricity demand from data center servers, networks, storage, and cooling, alongside energy demand scenarios.',
    limitation: 'Data center figures include a range of digital services, not only AI. Projections also depend on scenarios and assumptions.'
  }
};

export const englishGameCards = [
  { title: 'Summarizing a reading', question: 'You have an article and want to understand its main ideas. What is the most helpful first step?', topic: 'Learning habits', options: [
    { text: 'Skim the article, mark difficult sections, then ask a specific question.', feedback: 'A clear goal and context help you evaluate AI answers and stay involved in learning.' },
    { text: 'Ask AI to rewrite the summary repeatedly without reading the results.', feedback: 'Reading the output and clarifying your needs is more useful than repeating requests without a purpose.' }
  ] },
  { title: 'A school event poster', question: 'You already have a suitable photo of the event. What is a reasonable choice for making the poster?', topic: 'Choosing tools', options: [
    { text: 'Generate many new AI images even though the existing photo fits.', feedback: 'Image generation requires computing. First consider whether your existing material already meets your goal.' },
    { text: 'Use the existing photo and focus on making the poster’s message clearer.', feedback: 'Choosing tools and materials to suit your needs is a useful habit, without assuming its impact has already been measured.' }
  ] },
  { title: 'A claim about water', question: 'A friend says every AI prompt always uses the same amount of water. How would you respond?', topic: 'Water footprint', options: [
    { text: 'Check the source, data center location, and what is meant by water use.', feedback: 'Correct. Water footprints depend on context. Water consumption and withdrawal also need to be distinguished.' },
    { text: 'Immediately apply that number to all models and locations.', feedback: 'One number does not automatically apply to all conditions. Check the study’s methods and limitations first.' }
  ] },
  { title: 'Reading CarbsCulator results', question: 'The calculator shows 4.5 g CO₂e for one image. What does this result mean?', topic: 'Data literacy', options: [
    { text: 'An exact measurement from the AI server I just used.', feedback: 'The calculator is not connected to server measurements. Its figures come from prototype parameters in the proposal.' },
    { text: 'An estimate based on prototype parameters, with assumptions to read.', feedback: 'Correct. Estimates support exploration; they do not prove a service’s exact emissions.' }
  ] },
  { title: 'A large energy figure', question: 'You read a report about electricity use across all data centers. Is this the same as electricity use by AI alone?', topic: 'Energy', options: [
    { text: 'No. Data centers run many services, so the scope of the data needs checking.', feedback: 'Correct. The scope and definitions of the data determine what conclusions we can draw.' },
    { text: 'Yes. Everything a data center does must be AI.', feedback: 'Data centers also support storage, networks, and other digital services. Do not treat their scopes as identical.' }
  ] }
];
