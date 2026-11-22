export const initialSiteData = {
  brand: {
    name: "TripMyla",
    legalName: "TRIPMYLA FESTE PRIVATE LIMITED",
    logo: "/images/tripmyla-logo.png",
    tagline: "make your life adventurous",
    phone: "18002023644",
    whatsapp: "9118002023644",
    email: "connect@tripmyla.com",
    address: "E 197, Block E, West Patel Nagar, Patel Nagar, New Delhi, Delhi, 110008",
    mapEmbedUrl:
      "https://www.google.com/maps?q=TRIPMYLA+FESTE+PRIVATE+LIMITED,+E+197,+Block+E,+West+Patel+Nagar,+New+Delhi,+110008&output=embed",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },
  heroSlides: [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1920&q=80",
      title: "Crafting Memories,\nOne Trip at a Time",
      subtitle:
        "With TripMyla, your travel dreams take flight through meticulously crafted itineraries and unparalleled service!",
      ctaText: "EXPLORE NOW",
      ctaLink: "/packages",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1920&q=80",
      title: "Where Every Trip becomes\nan Adventure",
      subtitle:
        "Embark on a journey where every mile is crafted to transform your travel dreams into cherished memories!",
      ctaText: "EXPLORE NOW",
      ctaLink: "/packages",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1920&q=80",
      title: "Discover Hidden Gems\nwith us",
      subtitle:
        "Embark on a voyage where TripMyla curates each detail ensuring your travels are as unique as you are!",
      ctaText: "EXPLORE NOW",
      ctaLink: "/packages",
    },
  ],
  valuePillars: [
    {
      title: "Friendly Guide",
      desc: "We’re more than just a travel company—we’re your friendly guide to the world.",
    },
    {
      title: "Safety Travel",
      desc: "We understand that peace of mind is essential for a truly enjoyable travel experience.",
    },
    {
      title: "Popular Destination",
      desc: "Discover the world’s most captivating places with our handpicked selection.",
    },
    {
      title: "Budget Friendly",
      desc: "We believe that amazing travel experiences shouldn’t come with a hefty price.",
    },
  ],
  offersHighlights: [
    "Personalized Itineraries",
    "Seamless Booking Experience",
    "Local Experience & Authenticity",
    "100% Money Protection",
    "Expert Travel Consultation",
    "End To End Travel Support",
    "Hassle Free Travel Experience",
    "Complete Visa Assistance",
  ],
  about: {
    heading: "About Trip Myla",
    subheading: "Discover the Amazing Places Around World.",
    description:
      "We believe that travel is more than just visiting new places—it's about creating unforgettable experiences. Whether it's a family vacation, romantic getaway, or a solo adventure, TripMyla makes travel simple, exciting, and unforgettable.",
    stats: [
      { label: "Happy Travelers", value: "2,500+" },
      { label: "Curated Destinations", value: "45+" },
      { label: "Money Protection", value: "100%" },
    ],
    image:
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1000&q=80",
  },
  packageCategories: [
    "All",
    "Honeymoon Tour Packages",
    "Kerala Tour Packages",
    "Vietnam Tour Packages",
    "Family Tour Packages",
    "Singapore Tour Packages",
  ],
  trustMetrics: [
    { label: "Happy Travellers", target: 2500, suffix: "+" },
    { label: "Curated Destinations", target: 45, suffix: "+" },
    { label: "Money Protection", target: 100, suffix: "%" },
    { label: "On-Trip Concierge", target: 24, suffix: "/7" },
  ],
  packages: [
    {
      id: 1,
      title: "Kerala Backwaters & Munnar Escape",
      category: "Kerala Tour Packages",
      nights: 5,
      duration: "5 Nights / 6 Days",
      travelWindow: "NOV 26 – MAR 27",
      statusBadge: "Peak Season",
      tourType: "100% Customizable",
      freePerk: "FREE Sunset Shikara & Spice Garden Walk",
      routeChips: ["1D Kochi", "2D Munnar", "1D Thekkady", "1D Alleppey"],
      location: "Alleppey, Munnar, Kochi & Kovalam",
      originalPrice: "₹24,999",
      price: "₹18,999",
      priceMode: "fixed",
      occupancyBasis: "Per-Person (on 2 Pax Basis)",
      rating: 4.8,
      reviewCount: 164,
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=80",
      description:
        "Immerse yourself in the tranquil backwaters of Alleppey, the lush tea gardens of Munnar, and the serene beaches of Kovalam.",
      highlights: ["Alleppey Private Houseboat", "Munnar Tea Gardens", "Kovalam Beach Sunset"],
      itinerary: [
        { day: "Day 1", title: "Arrival in Kochi & Drive to Munnar", detail: "Scenic waterfalls en route and check-in to hillside resort." },
        { day: "Day 2", title: "Munnar Tea Estates & Eravikulam", detail: "Guided tea plantation tour, Mattupetty Dam, and Echo Point." },
        { day: "Day 3", title: "Thekkady Wildlife & Spice Plantation", detail: "Periyar Lake boat cruise and aromatic spice garden visit." },
        { day: "Day 4", title: "Alleppey Deluxe Houseboat Stay", detail: "All-inclusive backwater cruise with freshly prepared Kerala meals." },
        { day: "Day 5", title: "Kovalam Beach Leisure & Departure", detail: "Morning coastal relaxation followed by airport/station drop." },
      ],
    },
    {
      id: 2,
      title: "Singapore Skyline & Sentosa Thrill",
      category: "Singapore Tour Packages",
      nights: 4,
      duration: "4 Nights / 5 Days",
      travelWindow: "DEC 26 – APR 27",
      statusBadge: "Winter Favourite",
      tourType: "100% Customizable",
      freePerk: "FREE Marina Bay Sands SkyPark Entry",
      routeChips: ["2D Marina Bay", "1D Sentosa", "1D Universal Studios"],
      location: "Marina Bay, Sentosa & Universal Studios",
      originalPrice: "₹51,500",
      price: "₹42,999",
      priceMode: "fixed",
      occupancyBasis: "Per-Person (on 2 Pax Basis)",
      rating: 4.9,
      reviewCount: 218,
      image:
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=80",
      description:
        "Experience the thrill of Universal Studios, the serenity of Gardens by the Bay, and the excitement of Sentosa Island.",
      highlights: ["Universal Studios Pass", "Gardens by the Bay", "Sentosa Cable Car & Wings of Time"],
      itinerary: [
        { day: "Day 1", title: "Singapore Arrival & Night Safari", detail: "Private airport transfer and evening nocturnal wildlife tram ride." },
        { day: "Day 2", title: "City Tour & Gardens by the Bay", detail: "Merlion Park, Flower Dome, Cloud Forest, and SkyPark." },
        { day: "Day 3", title: "Full-Day Universal Studios", detail: "Unlimited access to thrilling rides and Hollywood zones." },
        { day: "Day 4", title: "Sentosa Island & Departure", detail: "Cable car ride, Madame Tussauds, and evening return flight." },
      ],
    },
    {
      id: 3,
      title: "Maldives Romantic Overwater Retreat",
      category: "Honeymoon Tour Packages",
      nights: 4,
      duration: "4 Nights / 5 Days",
      travelWindow: "NOV 26 – MAY 27",
      statusBadge: "Honeymoon Pick",
      tourType: "Private Luxury",
      freePerk: "FREE Floating Breakfast & Candlelight Dinner",
      routeChips: ["2D Beach Villa", "2D Overwater Villa"],
      location: "Malé & Private Island Resort",
      originalPrice: "₹68,000",
      price: "₹54,999",
      priceMode: "quote",
      occupancyBasis: "Per-Person (on 2 Pax Basis)",
      rating: 4.7,
      reviewCount: 92,
      image:
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80",
      description:
        "Celebrate love with candlelit dinners under starlit skies, sun-kissed beaches, and intimate spa retreats amidst crystal-clear lagoons.",
      highlights: ["Candlelit Beach Dinner", "Floating Breakfast", "Speedboat Transfers"],
      itinerary: [
        { day: "Day 1", title: "Arrival at Malé & Speedboat Transfer", detail: "Welcome drink and check-in to private beachfront villa." },
        { day: "Day 2", title: "Snorkeling & Coral Reef Excursion", detail: "Guided lagoon snorkeling and sunset dolphin cruise." },
        { day: "Day 3", title: "Upgrade to Overwater Water Villa", detail: "Floating breakfast in private pool & starlit beach dinner." },
        { day: "Day 4", title: "Couple Spa & Departure", detail: "Relaxing spa session before transfer to Malé airport." },
      ],
    },
    {
      id: 4,
      title: "Vietnam Golden Bridge & Halong Bay",
      category: "Vietnam Tour Packages",
      nights: 5,
      duration: "5 Nights / 6 Days",
      travelWindow: "OCT 26 – MAR 27",
      statusBadge: "Popular Right Now",
      tourType: "Escorted / Custom",
      freePerk: "FREE Ba Na Hills Cable Car & Golden Bridge Pass",
      routeChips: ["2D Hanoi", "1D Halong Cruise", "2D Da Nang"],
      location: "Hanoi, Halong Bay & Da Nang (Ba Na Hills)",
      originalPrice: "₹44,999",
      price: "₹36,500",
      priceMode: "fixed",
      occupancyBasis: "Per-Person (on 2 Pax Basis)",
      rating: 4.5,
      reviewCount: 203,
      image:
        "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80",
      description:
        "Walk across the iconic Golden Hand Bridge in Da Nang, cruise through emerald karsts in Halong Bay, and explore lantern-lit Hoi An.",
      highlights: ["Ba Na Hills & Golden Bridge", "Halong Bay Cruise", "Complete Visa Assistance"],
      itinerary: [
        { day: "Day 1", title: "Hanoi Old Quarter & Train Street", detail: "Arrival in Hanoi, evening cyclo tour and street food walk." },
        { day: "Day 2", title: "Halong Bay Luxury Day Cruise", detail: "Sung Sot Cave, kayaking, and seafood lunch on board." },
        { day: "Day 3", title: "Fly to Da Nang & Hoi An Lantern Town", detail: "Coconut basket boat ride and evening lantern river release." },
        { day: "Day 4", title: "Ba Na Hills & Iconic Golden Bridge", detail: "World-record cable car ride and French Village exploration." },
        { day: "Day 5", title: "Marble Mountains & Departure", detail: "Morning sightseeing and airport transfer." },
      ],
    },
    {
      id: 5,
      title: "Grand Family Himachal & Manali",
      category: "Family Tour Packages",
      nights: 4,
      duration: "4 Nights / 5 Days",
      travelWindow: "NOV 26 – FEB 27",
      statusBadge: "Snow Special",
      tourType: "100% Customizable",
      freePerk: "FREE Bonfire & Riverside Cafe Voucher",
      routeChips: ["3D Manali", "1D Solang & Kasol"],
      location: "Manali, Solang Valley & Kullu",
      originalPrice: "₹17,999",
      price: "₹13,499",
      priceMode: "fixed",
      occupancyBasis: "Per-Person (on 2 Pax Basis)",
      rating: 4.6,
      reviewCount: 138,
      image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
      description:
        "A comfortable, family-friendly mountain getaway featuring scenic drives, snow point excursions, and cozy resort stays.",
      highlights: ["Private Family Cab", "Breakfast & Dinner", "Solang Valley Sightseeing"],
      itinerary: [
        { day: "Day 1", title: "Arrival in Manali & Mall Road", detail: "Hotel check-in, Hadimba Temple visit, and evening stroll." },
        { day: "Day 2", title: "Solang Valley & Atal Tunnel", detail: "Snow activities, gondola ride, and Sissu waterfall excursion." },
        { day: "Day 3", title: "Kullu River Rafting & Kasol", detail: "Scenic Parvati Valley drive and Manikaran Sahib visit." },
        { day: "Day 4", title: "Vashisht Hot Springs & Departure", detail: "Morning leisure and comfortable return journey." },
      ],
    },
  ],
  gallery: [
    {
      id: 1,
      caption: "Universal Studios Singapore",
      image:
        "https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      caption: "Marina Bay Sands Skyline",
      image:
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      caption: "Merlion Park Singapore",
      image:
        "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      caption: "Golden Bridge Da Nang, Vietnam",
      image:
        "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      caption: "Alleppey Backwaters, Kerala",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      caption: "Maldives Island Escape",
      image:
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    },
  ],
  reviews: [
    {
      id: 1,
      name: "Adrikartik Ishan",
      rating: 5,
      time: "2 weeks ago",
      text: "Their company offered exceptional value, providing top-notch services at competitive prices. Every aspect of the trip was meticulously planned, making our experience seamless and stress-free.",
      reply: "Thank you. We would love to serve you again.",
    },
    {
      id: 2,
      name: "Tarun Kumar",
      rating: 5,
      time: "2 weeks ago",
      text: "Good staff, good services, thanks for great service and smooth arrangements throughout the trip.",
      reply: "Thank you for your kind words!",
    },
    {
      id: 3,
      name: "Vikas Rock",
      rating: 5,
      time: "2 weeks ago",
      text: "Very good experience! Everything from hotels to local transfers was handled professionally by TripMyla.",
      reply: "Thank you. We would love to serve you again.",
    },
    {
      id: 4,
      name: "Rishabh Dev",
      rating: 5,
      time: "3 weeks ago",
      text: "We just returned from an amazing trip! The hotels were luxurious and well-appointed, and the local guides were knowledgeable and enthusiastic. Highly recommend TripMyla to everyone.",
      reply: "Glad you loved the journey!",
    },
  ],
  faqs: [
    {
      question: "Can I customize any TripMyla tour package according to my dates and hotel preference?",
      answer:
        "Yes! Almost all our domestic and international packages are 100% customizable. You can adjust trip duration, upgrade hotel categories (3-star to 5-star/luxury villas), and add or remove sightseeing activities.",
    },
    {
      question: "Do you assist with international visas, travel insurance, and flight bookings?",
      answer:
        "Absolutely. From Vietnam e-Visas and Singapore tourist visas to flights, airport transfers, and travel insurance, our concierge team handles end-to-end documentation.",
    },
    {
      question: "What does 'Per-Person (on 2 Pax Basis)' mean?",
      answer:
        "It means the quoted starting price is calculated per adult when at least two adults travel together sharing a double/twin room. Group discounts apply automatically for 4 or more travellers.",
    },
    {
      question: "How does the booking and payment process work?",
      answer:
        "Once you finalize your customized itinerary with our advisor, you can lock your package with a nominal booking deposit, followed by flexible milestone payments before departure.",
    },
  ],
  videos: [
    {
      id: "vid-1",
      title: "Mystic Himachal & Solang Snow Drive",
      destination: "Manali & Kasol",
      duration: "0:30",
      category: "Domestic",
      poster: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
      videoUrl: "/videos/himachal.mp4",
      packageTitle: "Mystic Himachal & Manali",
    },
    {
      id: "vid-2",
      title: "Singapore Marina Bay & Sentosa Lights",
      destination: "Singapore",
      duration: "0:30",
      category: "International",
      poster: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=80",
      videoUrl: "/videos/singapore.mp4",
      packageTitle: "Singapore & Sentosa Explorer",
    },
    {
      id: "vid-3",
      title: "Maldives Overwater Lagoon Escape",
      destination: "Malé & Water Villas",
      duration: "0:30",
      category: "Honeymoon",
      poster: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80",
      videoUrl: "/videos/maldives.mp4",
      packageTitle: "Maldives Luxury Getaway",
    },
    {
      id: "vid-4",
      title: "Mauritius Turquoise Coast & Lagoons",
      destination: "Grand Baie & Île aux Cerfs",
      duration: "0:30",
      category: "International",
      poster: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80",
      videoUrl: "/videos/mauritius.mp4",
      packageTitle: "Mauritius Island Escape",
    },
    {
      id: "vid-5",
      title: "Switzerland Alpine Rail & Mountain Peaks",
      destination: "Zurich, Lucerne & Interlaken",
      duration: "0:30",
      category: "International",
      poster: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=80",
      videoUrl: "/videos/switzerland.mp4",
      packageTitle: "Swiss Alps Grand Tour",
    },
  ],
};