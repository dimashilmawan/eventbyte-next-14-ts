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
  {
    label: "Test",
    route: "/test",
  },
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
