// STARTUP

const WAKEUP_MESSAGE = `Good morning, Marina. It's time to get up and go to the museum for your performance. Press ANY KEY to dismiss this dialog, then use the ARROW KEYS to move.`;

// DEPARTURE

const CAR_WAITING_MESSAGE = `Your driver is waiting to drive you to the museum. Approach the passenger side to get into the car.`;
let seenCarWaiting = false;
const CAR_STILL_WAITING_MESSAGE = `Your driver is still waiting. You should probably get moving.`;

// MUSEUM MESSAGES

const MOMA_ARRIVAL_MESSAGE = `Here you finally are at the Museum of Modern Art in New York, ready to present your performance work "The Artist Is Present".`;

let seenMOMAMessage = false;
const OUTSIDE_MOMA_MESSAGE = `Now is not the time for wandering outside. Get in there and start the performance!`;

const TICKETS_DESK_MESSAGE = "Hi Ms. Abramovic! I hope the performance goes well today.";
const TICKETS_GUARD_MESSAGE = "Good luck, Ms. Abramovic.";

// THE ARTWORKS

const STARRY_NIGHT = "Starry Night\nVincent Van Gogh\n1889\nOil on canvas";

const OLIVE_TREES = "The Olive Trees with the Alpilles in the Background\nVincent Van Gogh\n1889\nOil on canvas";

const SOUP_CANS = "Campbell's Soup Cans\nAndy Warhol\n1962\nSynthetic polymer paint on canvas";

const DANCERS = "The Dance I\nHenry Matisse\n1909\nOil on canvas";

// THE QUEUE

// What they say as you walk past
const WHISPERS = [
  "It's her!",
  "She's here!",
  "It's Marina!",
  "Oh my god...",
  "I can't believe she's here...",
  "There she is!",
  "This is the best day of my life!",
  "Look! It's Marina!",
  "She's coming!"
];

// What they say if you directly approach them
const QUEUE_TALK = [
  "It's you!",
  "...",
  "I can't wait to sit with you!",
  "I can't believe I'm meeting you right now!",
  "Is this really happening?",
  "I feel like I'm dreaming!",
  "I've waited so long for a chance to meet you...",
  "I'm so excited!",
  "Is it really you?!",
  "Marina!",
  "Oh my god!",
];

// This is what the atrium guards say
const GUARD_TALK = [
  "Good luck today.",
  "Hello.",
  "Please take your seat when you're ready.",
  "Quite a crowd today.",
  "Long queue.",
  "We're ready when you are, Ms. Abramovic.",
]

// THE PERFORMANCE SEQUENCE

const HEAD_DOWN_INSTRUCTIONS = `Press any key to lower your head and invite the next visitor to join you.`;

const HEAD_UP_INSTRUCTIONS = `Press any key to look up.`;

const CLOSING_MESSAGE = `"Attention all patrons, The Museum of Modern Art will be closing in fifteen minutes."`;

const GAMEOVER_TEXT =
  `Thank you for playing The Artist is Present 2!\n\n\nCome back again soon to perform the work again!`;