export interface TimelineEvent {
    id: string;
    title: string;
    date: string;
    year: number;
    description: string;
    category: "Art" | "Science" | "Politics" | "Conflict";
    imageUrl: string;
}

export const timelineData: TimelineEvent[] = [
    {
        id: "1",
        title: "The Invention of the Printing Press",
        date: "c. 1440",
        year: 1440,
        description: "Johannes Gutenberg introduces the movable type printing press to Europe, revolutionizing the spread of information.",
        category: "Science",
        imageUrl: "https://images.unsplash.com/photo-1569388330292-79cc1ec67270?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "2",
        title: "Leonardo da Vinci paints the Mona Lisa",
        date: "1503",
        year: 1503,
        description: "The Italian Renaissance artist begins work on what will become the most famous painting in the world.",
        category: "Art",
        imageUrl: "https://images.unsplash.com/photo-1550948537-130a1ce83314?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "3",
        title: "The Signing of the Declaration of Independence",
        date: "July 4, 1776",
        year: 1776,
        description: "The thirteen American colonies declare their independence from British rule.",
        category: "Politics",
        imageUrl: "https://images.unsplash.com/photo-1580130732478-7f1cb0d172b6?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "4",
        title: "The Wright Brothers' First Flight",
        date: "December 17, 1903",
        year: 1903,
        description: "Orville and Wilbur Wright make the first controlled, sustained flight of a powered, heavier-than-air aircraft.",
        category: "Science",
        imageUrl: "https://images.unsplash.com/photo-1529310399831-ed472b81d589?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "5",
        title: "Moon Landing",
        date: "July 20, 1969",
        year: 1969,
        description: "Apollo 11 mission lands the first humans on the Moon. Neil Armstrong takes 'one small step for man'.",
        category: "Science",
        imageUrl: "https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "6",
        title: "Fall of the Berlin Wall",
        date: "November 9, 1989",
        year: 1989,
        description: "The Berlin Wall, a symbol of the Cold War, is opened, paving the way for German reunification.",
        category: "Politics",
        imageUrl: "https://images.unsplash.com/photo-1562315077-19461168131e?q=80&w=1000&auto=format&fit=crop",
    },
];
