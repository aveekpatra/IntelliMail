import {
  Mail as MailIcon,
  FilePenLine,
  SendIcon,
  FileBox,
  Trash,
  FileArchive,
  Users,
  BellRing,
  MessageSquare,
  ShoppingCart,
  Tag,
} from "lucide-react";
import React from "react";

export type Mail = {
  id: string
  from: string
  to: string
  subject: string
  message: string
  date: string
  read: boolean
  labels: string[]
}

export type Account = {
  label: string
  email: string
  icon: React.ReactNode
}

export const accounts: Account[] = [
  {
    label: "Alicia Koch",
    email: "alicia@example.com",
    icon: (
      <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
        <path
          fill="currentColor"
          d="M6 12c0-1.657-1.343-3-3-3s-3 1.343-3 3 1.343 3 3 3 3-1.343 3-3zm9 0c0-1.657-1.343-3-3-3s-3 1.343-3 3 1.343 3 3 3 3-1.343 3-3zm9 0c0-1.657-1.343-3-3-3s-3 1.343-3 3 1.343 3 3 3 3-1.343 3-3z"
        />
      </svg>
    ),
  },
]

export const defaultLayout = [20, 40, 40]

export const defaultMails: Mail[] = [
  {
    id: "1",
    from: "William Smith",
    to: "me@example.com",
    subject: "Meeting Tomorrow",
    message: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting!",
    date: "2023-10-22T09:00:00",
    read: false,
    labels: ["meeting", "work", "important"],
  },
  {
    id: "2",
    from: "Alice Smith",
    to: "me@example.com",
    subject: "Re: Project Update",
    message: "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a fantastic job, and I appreciate the hard work everyone has put in. I have a few minor suggestions that I'll include in the attached document. Let's discuss these during our next meeting.",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["work", "important"],
  },
  {
    id: "3",
    from: "Bob Johnson",
    to: "me@example.com",
    subject: "Weekend Plans",
    message: "Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor fun. If you're interested, let me know, and we can plan the details. It'll be a great way to unwind and enjoy nature. Looking forward to your response!",
    date: "2023-05-23T11:15:00",
    read: true,
    labels: ["personal"],
  },
  {
    id: "4",
    from: "Emily Davis",
    to: "me@example.com",
    subject: "Re: Question about Budget",
    message: "I have a question about the budget for the upcoming project. It seems like there's a discrepancy in the allocation of resources. I've reviewed the budget report and identified a few areas where we might be able to optimize our spending without compromising the project's quality.",
    date: "2023-05-23T09:45:00",
    read: true,
    labels: ["work", "budget"],
  },
  {
    id: "5",
    from: "Michael Wilson",
    to: "me@example.com",
    subject: "Important Announcement",
    message: "I have an important announcement to make during our team meeting. It pertains to a strategic shift in our approach to the upcoming product launch. We've received valuable feedback from our beta testers, and I believe it's time to make some adjustments to better meet our customers' needs.",
    date: "2023-05-23T08:30:00",
    read: false,
    labels: ["meeting", "work", "important"],
  },
  {
    id: "6",
    from: "Sarah Brown",
    to: "me@example.com",
    subject: "Re: Feedback on Proposal",
    message: "Thank you for your feedback on the proposal. It looks great! I'm pleased to hear that you found it promising. The team worked diligently to address all the key points you raised, and I believe we now have a strong foundation for the project.",
    date: "2023-05-23T07:15:00",
    read: true,
    labels: ["work"],
  },
  {
    id: "7",
    from: "David Lee",
    to: "me@example.com",
    subject: "New Project Idea",
    message: "I have an exciting new project idea to discuss with you. It involves expanding our services to target a niche market that has shown considerable growth in recent months. I've prepared a detailed proposal outlining the potential benefits and the strategy for execution.",
    date: "2023-05-22T15:45:00",
    read: false,
    labels: ["meeting", "work", "important"],
  },
  {
    id: "8",
    from: "Olivia Wilson",
    to: "me@example.com",
    subject: "Vacation Plans",
    message: "Let's plan our vacation for next month. What do you think? I've been thinking of visiting a tropical paradise, and I've put together some destination options. I believe it's time for us to unwind and recharge. Please take a look at the options and let me know your preferences.",
    date: "2023-05-22T14:30:00",
    read: true,
    labels: ["personal"],
  },
  {
    id: "9",
    from: "Mia Harris",
    to: "me@example.com",
    subject: "Re: Travel Itinerary",
    message: "I've received the travel itinerary. It looks great! Thank you for your prompt assistance in arranging the details. I've reviewed the schedule and the accommodations, and everything seems to be in order. I'm looking forward to the trip, and I'm confident it'll be a smooth and enjoyable experience.",
    date: "2022-09-10T13:15:00",
    read: true,
    labels: ["personal", "travel"],
  },
]

export type MailCategory = {
  name: string
  count: number
  icon?: React.ReactNode
}

export type MailFolder = {
  name: string
  count: number
  icon?: React.ReactNode
}

export const mailCategories: MailCategory[] = [
  { name: "Inbox", count: 128, icon: <MailIcon className="mr-2 h-4 w-4" /> },
  { name: "Drafts", count: 9, icon: <FilePenLine className="mr-2 h-4 w-4" /> },
  { name: "Sent", count: 0, icon: <SendIcon className="mr-2 h-4 w-4" /> },
  { name: "Junk", count: 23, icon: <FileBox className="mr-2 h-4 w-4" /> },
  { name: "Trash", count: 0, icon: <Trash className="mr-2 h-4 w-4" /> },
  { name: "Archive", count: 0, icon: <FileArchive className="mr-2 h-4 w-4" /> },
]

export const mailFolders: MailFolder[] = [
  { name: "Social", count: 972, icon: <Users className="mr-2 h-4 w-4" /> },
  { name: "Updates", count: 342, icon: <BellRing className="mr-2 h-4 w-4" /> },
  { name: "Forums", count: 128, icon: <MessageSquare className="mr-2 h-4 w-4" /> },
  { name: "Shopping", count: 8, icon: <ShoppingCart className="mr-2 h-4 w-4" /> },
  { name: "Promotions", count: 21, icon: <Tag className="mr-2 h-4 w-4" /> },
] 