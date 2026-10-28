// Keep unfinished profiles visibly provisional until the team supplies its copy.
export const teamMembers = [
  {
    id: 'hisyam',
    name: 'Muhammad Hisyam Adz Dzaki',
    photo: '/assets/images/hisyam.jpg',
    initials: 'MH',
    jobDesk: 'Researcher',
    quote: 'hmm',
    placeholder: false
  },
  ...Array.from({ length: 5 }, (_, index) => ({
    id: `member-${index + 2}`,
    name: `Anggota tim ${index + 2}`,
    photo: null,
    initials: `A${index + 2}`,
    jobDesk: 'Researcher',
    quote: 'Hmm',
    placeholder: true
  }))
];
