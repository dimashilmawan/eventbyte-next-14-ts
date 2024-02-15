export const navLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Create Event",
    route: "/events/create",
  },
  {
    label: "My Profile",
    route: "/profile",
  },
  // {
  //   label: "Test",
  //   route: "/test",
  // },
];

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  isOnline: false,
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  category: null,
  price: "",
  isFree: false,
  url: "",
};
export const DUMMY_EVENT_DATA = [
  {
    title: "Machine Learning Workshop",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29uZnJlbmNlfGVufDB8fDB8fHww",
    description: "Learn the fundamentals of machine learning and AI.",
    location: "Tech Hub, Silicon Valley",
    isOnline: false,
    startDateTime: new Date("2024-03-10T10:00:00Z"),
    endDateTime: new Date("2024-03-10T15:00:00Z"),
    price: 50,
    isFree: false,
    organizer: "65bd8a5485c003d14bb91b55", // Updated organizer's user ID
    category: "65c35afa9ab5f5027ebe923e", // Category ID for Workshops
    url: "https://example.com/machine-learning-workshop",
  },
  {
    title: "Cybersecurity Conference",
    imageUrl:
      "https://images.unsplash.com/photo-1582192730841-2a682d7375f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29uZnJlbmNlfGVufDB8fDB8fHww",
    description: "Stay ahead of cyber threats with our expert-led conference.",
    location: "Virtual",
    isOnline: true,
    startDateTime: new Date("2024-03-15T09:00:00Z"),
    endDateTime: new Date("2024-03-17T18:00:00Z"),
    price: 150,
    isFree: false,
    organizer: "65bd8a5485c003d14bb91b55", // Updated organizer's user ID
    category: "65c35afa9ab5f5027ebe923e", // Category ID for Conferences
    url: "https://example.com/cybersecurity-conference",
  },
  {
    title: "Webinar: Future of Blockchain",
    imageUrl:
      "https://images.unsplash.com/photo-1629146719139-245c817d534f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29uZnJlbmNlfGVufDB8fDB8fHww",
    description:
      "Explore the potential impact of blockchain technology on various industries.",
    location: "Online",
    isOnline: true,
    startDateTime: new Date("2024-03-20T18:00:00Z"),
    endDateTime: new Date("2024-03-20T20:00:00Z"),
    price: 0,
    isFree: true,
    organizer: "65bd8a5485c003d14bb91b55", // Updated organizer's user ID
    category: "65c35b039ab5f5027ebe9242", // Category ID for Webinars
    url: "https://example.com/blockchain-webinar",
  },
  {
    title: "Tech Startup Pitch Event",
    imageUrl:
      "https://images.unsplash.com/photo-1626125345510-4603468eedfb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uZnJlbmNlfGVufDB8fDB8fHww",
    description:
      "Witness innovative tech startups pitch their ideas to investors.",
    location: "Startup Incubator, San Francisco",
    isOnline: false,
    startDateTime: new Date("2024-03-25T14:00:00Z"),
    endDateTime: new Date("2024-03-25T17:00:00Z"),
    price: 0,
    isFree: true,
    organizer: "65bd8a5485c003d14bb91b55", // Updated organizer's user ID
    category: "65c35b099ab5f5027ebe9244", // Category ID for Startup Events
    url: "https://example.com/startup-pitch-event",
  },
  {
    title: "AI and Robotics Summit",
    imageUrl:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29uZnJlbmNlfGVufDB8fDB8fHww",
    description: "Explore the latest advancements in AI and robotics.",
    location: "Robotics Institute, Tokyo",
    isOnline: false,
    startDateTime: new Date("2024-03-28T09:00:00Z"),
    endDateTime: new Date("2024-03-29T17:00:00Z"),
    price: 100,
    isFree: false,
    organizer: "65bd8a5485c003d14bb91b55", // Updated organizer's user ID
    category: "65c35b099ab5f5027ebe9244", // Category ID for Summits
    url: "https://example.com/ai-robotics-summit",
  },
];

// Note: Replace the organizer and category IDs with actual IDs from your database.
