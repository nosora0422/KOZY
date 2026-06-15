export const currentUser = {
  id: 1,
  name: "Sora",
  avatar: "https://i.pravatar.cc/150?img=32",
};

export const otherUser = {
  id: 2,
  name: "Alex",
  avatar: "https://i.pravatar.cc/150?img=12",
};

export const mockChatThreads = {
  // Listing 1: accepted chat request, normal message flow.
  "1": {
    id: "1",
    requestStatus: "accepted",
    requestLabel: "Your chat request has been accepted.",
    canAccept: false,
    otherUser,
    messages: [
      {
        id: "m1",
        text: "Hey! Is the room still available?",
        senderId: 2,
        createdAt: "2026-02-09T10:00:00Z",
      },
      {
        id: "m2",
        text: "Yes! It’s available from March 😊",
        senderId: 1,
        createdAt: "2026-02-09T10:01:00Z",
        status: "read",
      },
      {
        id: "m3",
        text: "Great! Can I come see it this weekend?",
        senderId: 2,
        createdAt: "2026-02-09T10:02:00Z",
      },
    ],
  },

  // Listing 2: current user requested chat and is waiting for approval.
  "2": {
    id: "2",
    requestStatus: "pending_sent",
    requestLabel: "Request has been sent",
    canAccept: false,
    otherUser: {
      id: 3,
      name: "Samantha",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    messages: [
      {
        id: "request-sent",
        type: "system",
        text: "Request has been sent",
        createdAt: "2026-02-10T09:30:00Z",
      },
      {
        id: "m4",
        text: "Hi, I'm interested in your listing at 123 Broadway Ave, Williamsburg. Is it still available?",
        senderId: currentUser.id,
        createdAt: "2026-02-10T09:30:00Z",
        status: "pending",
      },
    ],
  },

  // Listing 3: another user requested chat and is waiting for current user to accept.
  "3": {
    id: "3",
    requestStatus: "pending_received",
    requestLabel: "Daniel requested chat",
    canAccept: true,
    otherUser: {
      id: 4,
      name: "Daniel",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    messages: [
      {
        id: "request-received",
        type: "system",
        text: "Daniel requested chat",
        createdAt: "2026-02-11T14:12:00Z",
      },
      {
        id: "m5",
        text: "Hi Sora, I saw your listing and would love to chat if it is still available.",
        senderId: 4,
        createdAt: "2026-02-11T14:12:00Z",
      },
    ],
  },
};

export const mockMessages = mockChatThreads["1"].messages;

export const getMockChatThread = (chatId) => (
  mockChatThreads[chatId] ?? mockChatThreads["1"]
);
