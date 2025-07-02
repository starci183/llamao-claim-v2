import { NextRequest, NextResponse } from "next/server";

export interface ShowcaseItem {
  id: string;
  title: string;
  image: string;
  category: string;
  description?: string;
  userAddress?: string;
  createdAt?: string;
  likes?: number;
}

export interface PaginatedShowcaseResponse {
  items: ShowcaseItem[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Sample data - in production this would come from a database
const SAMPLE_SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "1",
    title: "Llamao Meme #1",
    image: "/gifs/llamao_majestic_run.gif",
    category: "meme",
    description: "Epic Llamao running animation",
    userAddress: "0x1234567890123456789012345678901234567890",
    createdAt: "2024-01-15T10:30:00Z",
    likes: 42,
  },
  {
    id: "2",
    title: "Community Art #1",
    image: "/gifs/llamao_zenmonad.gif",
    category: "community",
    description: "Zen Llamao meditation",
    userAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    createdAt: "2024-01-16T14:20:00Z",
    likes: 28,
  },
  {
    id: "3",
    title: "Llamao Banner",
    image: "/gifs/llamao_promote_banner.gif",
    category: "arts",
    description: "Promotional banner design",
    userAddress: "0x1111222233334444555566667777888899990000",
    createdAt: "2024-01-17T09:15:00Z",
    likes: 35,
  },
  {
    id: "4",
    title: "About Background",
    image: "/gifs/llamao_about_background.gif",
    category: "arts",
    description: "Background animation for about page",
    userAddress: "0x1234567890123456789012345678901234567890",
    createdAt: "2024-01-18T16:45:00Z",
    likes: 19,
  },
  {
    id: "5",
    title: "Homepage GIF",
    image: "/gifs/llamao_homepage.gif",
    category: "arts",
    description: "Homepage background animation",
    userAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    createdAt: "2024-01-19T11:30:00Z",
    likes: 53,
  },
  {
    id: "6",
    title: "Last Supper Meme",
    image: "/gifs/llamao_last_supper.gif",
    category: "meme",
    description: "Llamao version of the last supper",
    userAddress: "0x2222333344445555666677778888999900001111",
    createdAt: "2024-01-20T13:20:00Z",
    likes: 67,
  },
  {
    id: "7",
    title: "Mint Playbook BG",
    image: "/gifs/llamao_mintplaybook_background.gif",
    category: "arts",
    description: "Mint playbook background",
    userAddress: "0x1234567890123456789012345678901234567890",
    createdAt: "2024-01-21T08:10:00Z",
    likes: 31,
  },
  {
    id: "8",
    title: "New Pope Meme",
    image: "/gifs/llamao_newpope.gif",
    category: "meme",
    description: "Llamao as the new pope",
    userAddress: "0x3333444455556666777788889999000011112222",
    createdAt: "2024-01-22T15:40:00Z",
    likes: 89,
  },
  {
    id: "9",
    title: "Open Book Animation",
    image: "/gifs/llamao_open_book.gif",
    category: "arts",
    description: "Book opening animation",
    userAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    createdAt: "2024-01-23T12:25:00Z",
    likes: 24,
  },
  {
    id: "10",
    title: "Community Art #2",
    image: "/gifs/llamao_promote_banner.gif",
    category: "community",
    description: "Second community art piece",
    userAddress: "0x4444555566667777888899990000111122223333",
    createdAt: "2024-01-24T17:50:00Z",
    likes: 46,
  },
  {
    id: "11",
    title: "Meme Collection #2",
    image: "/gifs/llamao_majestic_run.gif",
    category: "meme",
    description: "Second meme in collection",
    userAddress: "0x1234567890123456789012345678901234567890",
    createdAt: "2024-01-25T10:15:00Z",
    likes: 38,
  },
  {
    id: "12",
    title: "Art Collection #3",
    image: "/gifs/llamao_zenmonad.gif",
    category: "arts",
    description: "Third art piece in collection",
    userAddress: "0x5555666677778888999900001111222233334444",
    createdAt: "2024-01-26T14:35:00Z",
    likes: 72,
  },
  {
    id: "13",
    title: "Community Work #3",
    image: "/gifs/llamao_about_background.gif",
    category: "community",
    description: "Third community contribution",
    userAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    createdAt: "2024-01-27T09:45:00Z",
    likes: 29,
  },
  {
    id: "14",
    title: "Meme Collection #3",
    image: "/gifs/llamao_last_supper.gif",
    category: "meme",
    description: "Third meme in collection",
    userAddress: "0x6666777788889999000011112222333344445555",
    createdAt: "2024-01-28T16:20:00Z",
    likes: 91,
  },
  {
    id: "15",
    title: "Art Collection #4",
    image: "/gifs/llamao_homepage.gif",
    category: "arts",
    description: "Fourth art piece in collection",
    userAddress: "0x1234567890123456789012345678901234567890",
    createdAt: "2024-01-29T11:55:00Z",
    likes: 57,
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const page = parseInt(searchParams.get("page") || "1");
    const itemsPerPage = parseInt(searchParams.get("itemsPerPage") || "6");
    const category = searchParams.get("category") || undefined;
    const userAddress = searchParams.get("userAddress") || undefined;

    // Validate parameters
    if (page < 1 || itemsPerPage < 1 || itemsPerPage > 100) {
      return NextResponse.json(
        { error: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    // Simulate API delay for realistic loading behavior
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Filter items based on criteria
    let filteredItems = SAMPLE_SHOWCASE_ITEMS;

    // Filter by category if specified
    if (category && category !== "all") {
      filteredItems = filteredItems.filter(
        (item) => item.category === category
      );
    }

    // Filter by user address if specified
    if (userAddress && userAddress !== "all") {
      filteredItems = filteredItems.filter(
        (item) => item.userAddress?.toLowerCase() === userAddress.toLowerCase()
      );
    }

    // Sort by creation date (newest first) and likes
    filteredItems = filteredItems.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      if (dateB !== dateA) return dateB - dateA;
      return (b.likes || 0) - (a.likes || 0);
    });

    // Calculate pagination
    const totalCount = filteredItems.length;
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const items = filteredItems.slice(startIndex, endIndex);

    const response: PaginatedShowcaseResponse = {
      items,
      totalCount,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in showcase API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
