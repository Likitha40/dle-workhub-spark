/**
 * Demo data store for the DLE Work Hub prototype.
 *
 * All values here are DEMO DATA for the prototype only.
 * Real products, earning rules, incentives, training and achievements are
 * meant to be configured later by an authorized Dharmalife administrator
 * (see the `adminManaged` shapes below). The DLE can only view them.
 */
import { useSyncExternalStore } from "react";

export type TaskStatus = "pending" | "active" | "done";

export type Task = {
  id: number;
  title: string;
  detail: string;
  why: string;
  priority: "High" | "Medium" | "Low";
  minutes: number;
  status: TaskStatus;
  tone: string;
};

export type Calculation = {
  note: string;
  lines: { label: string; value: string }[];
  result: string;
};

export type Transaction = {
  id: string;
  date: string;
  activity: string;
  type: "Product Sale" | "Verified Activity" | "Incentive";
  item: string;
  amount: number;
  status: "Verified" | "Pending";
  calculation: Calculation;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  minutes: number;
  progress: number;
  category: string;
  learned: string;
  apply: string;
};

export type Achievement = {
  id: string;
  title: string;
  requirement: string;
  current: number;
  target: number;
  unlockedOn: string | null;
  activity: string;
};

export type Incentive = {
  id: string;
  title: string;
  requirement: string;
  current: number;
  target: number;
  reward: number;
  verification: "Verified" | "Awaiting verification" | "Not started";
};

export type Notification = {
  id: string;
  icon: string;
  message: string;
  when: string;
  read: boolean;
  action?: { label: string; to: string };
};

export type DleState = {
  profile: { name: string; village: string; joined: string };
  tasks: Task[];
  transactions: Transaction[];
  courses: Course[];
  achievements: Achievement[];
  incentives: Incentive[];
  notifications: Notification[];
  stats: {
    productsSold: number;
    householdsReached: number;
    surveysCompleted: number;
    womenReached: number;
    communityActivities: number;
    cleanEnergySold: number;
    monthlyGoal: number;
  };
  weekly: { label: string; thisWeek: number; lastWeek: number; unit: string }[];
};

const initialState: DleState = {
  profile: { name: "Lakshmi", village: "Kadampur", joined: "March 2026" },
  tasks: [
    {
      id: 1,
      title: "Visit 3 customers",
      detail: "Talk about this month's products",
      why: "Meeting families face to face helps them trust and understand the products.",
      priority: "High",
      minutes: 45,
      status: "active",
      tone: "bg-task-one text-task-one-foreground",
    },
    {
      id: 2,
      title: "Complete 2 household surveys",
      detail: "Learn what families need",
      why: "Household surveys help Dharmalife understand community needs.",
      priority: "High",
      minutes: 30,
      status: "pending",
      tone: "bg-task-two text-task-two-foreground",
    },
    {
      id: 3,
      title: "Follow up with 2 customers",
      detail: "Check in with interested families",
      why: "A friendly follow up helps families decide without feeling rushed.",
      priority: "Medium",
      minutes: 20,
      status: "pending",
      tone: "bg-task-three text-task-three-foreground",
    },
    {
      id: 4,
      title: "Record yesterday's sale",
      detail: "Add the solar lamp sale you made",
      why: "Recorded activities can be verified, and only verified work becomes earning.",
      priority: "Medium",
      minutes: 5,
      status: "done",
      tone: "bg-task-one text-task-one-foreground",
    },
    {
      id: 5,
      title: "Share awareness message",
      detail: "Tell 5 women about clean cooking",
      why: "Awareness activities help communities learn about available solutions.",
      priority: "Low",
      minutes: 15,
      status: "done",
      tone: "bg-task-two text-task-two-foreground",
    },
    {
      id: 6,
      title: "Check your training list",
      detail: "See which lesson is next for you",
      why: "Short lessons make your customer conversations easier.",
      priority: "Low",
      minutes: 5,
      status: "done",
      tone: "bg-task-three text-task-three-foreground",
    },
  ],
  transactions: [
    {
      id: "t1",
      date: "Sep 18",
      activity: "Solar Lamp Sale",
      type: "Product Sale",
      item: "Solar Lamp",
      amount: 50,
      status: "Verified",
      calculation: {
        note: "Demo calculation only",
        lines: [
          { label: "Product", value: "Solar Lamp" },
          { label: "Sale value", value: "₹500" },
          { label: "DLE earning rule", value: "₹50" },
          { label: "Quantity", value: "1" },
        ],
        result: "₹50 × 1 = ₹50",
      },
    },
    {
      id: "t2",
      date: "Sep 17",
      activity: "Household Activity",
      type: "Verified Activity",
      item: "Household survey",
      amount: 100,
      status: "Verified",
      calculation: {
        note: "Demo calculation only",
        lines: [
          { label: "Activity", value: "Household survey" },
          { label: "Demo rate", value: "₹50 per survey" },
          { label: "Surveys completed", value: "2" },
        ],
        result: "₹50 × 2 = ₹100",
      },
    },
    {
      id: "t3",
      date: "Sep 16",
      activity: "Campaign Incentive",
      type: "Incentive",
      item: "Solar Awareness Campaign",
      amount: 200,
      status: "Pending",
      calculation: {
        note: "Demo calculation only",
        lines: [
          { label: "Campaign", value: "Solar Awareness Campaign" },
          { label: "Demo reward", value: "₹200" },
          { label: "Activities completed", value: "8 of 10" },
        ],
        result: "Reward is released after verification",
      },
    },
    {
      id: "t4",
      date: "Sep 14",
      activity: "Clean Cookstove Sale",
      type: "Product Sale",
      item: "Clean Cookstove",
      amount: 120,
      status: "Verified",
      calculation: {
        note: "Demo calculation only",
        lines: [
          { label: "Product", value: "Clean Cookstove" },
          { label: "Sale value", value: "₹1,200" },
          { label: "DLE earning rule", value: "₹120" },
          { label: "Quantity", value: "1" },
        ],
        result: "₹120 × 1 = ₹120",
      },
    },
    {
      id: "t5",
      date: "Sep 12",
      activity: "Awareness Meeting",
      type: "Verified Activity",
      item: "Community awareness meeting",
      amount: 150,
      status: "Pending",
      calculation: {
        note: "Demo calculation only",
        lines: [
          { label: "Activity", value: "Community awareness meeting" },
          { label: "Demo rate", value: "₹150 per meeting" },
          { label: "Meetings held", value: "1" },
        ],
        result: "₹150 × 1 = ₹150",
      },
    },
  ],
  courses: [
    {
      id: "c1",
      title: "Sales Skills",
      description: "Simple ways to talk about products with families.",
      minutes: 8,
      progress: 80,
      category: "Sales",
      learned: "You learned how to explain the benefits of a solar lamp.",
      apply: "Now try using this explanation with your next customer.",
    },
    {
      id: "c2",
      title: "Community Engagement",
      description: "How to hold a friendly awareness meeting.",
      minutes: 10,
      progress: 60,
      category: "Community",
      learned: "You learned how to invite women to a small group meeting.",
      apply: "Invite 5 women from your street to your next meeting.",
    },
    {
      id: "c3",
      title: "Product Knowledge",
      description: "What each product does and who it helps.",
      minutes: 12,
      progress: 40,
      category: "Products",
      learned: "You learned which product suits a family without electricity.",
      apply: "Ask one family what problem they face, then suggest the right product.",
    },
    {
      id: "c4",
      title: "Digital Skills",
      description: "Using this app to record your daily work.",
      minutes: 6,
      progress: 20,
      category: "Digital",
      learned: "You learned how to record an activity right after finishing it.",
      apply: "Record your very next visit before you go home.",
    },
  ],
  achievements: [
    {
      id: "a1",
      title: "First Sale",
      requirement: "Complete your first verified sale.",
      current: 1,
      target: 1,
      unlockedOn: "Mar 22, 2026",
      activity: "Solar Lamp sale",
    },
    {
      id: "a2",
      title: "Community Explorer",
      requirement: "Reach 10 households.",
      current: 10,
      target: 10,
      unlockedOn: "Apr 09, 2026",
      activity: "Household visits",
    },
    {
      id: "a3",
      title: "Survey Helper",
      requirement: "Complete 15 household surveys.",
      current: 18,
      target: 15,
      unlockedOn: "Jul 02, 2026",
      activity: "Household surveys",
    },
    {
      id: "a4",
      title: "50 Products Sold",
      requirement: "Sell 50 products in total.",
      current: 25,
      target: 50,
      unlockedOn: null,
      activity: "Product sales",
    },
    {
      id: "a5",
      title: "Community Champion",
      requirement: "Complete the required program milestones.",
      current: 27,
      target: 40,
      unlockedOn: null,
      activity: "Community activities",
    },
  ],
  incentives: [
    {
      id: "i1",
      title: "Solar Awareness Campaign",
      requirement: "Complete 10 awareness activities this month.",
      current: 8,
      target: 10,
      reward: 200,
      verification: "Awaiting verification",
    },
    {
      id: "i2",
      title: "Community Outreach",
      requirement: "Hold 5 group meetings.",
      current: 5,
      target: 5,
      reward: 150,
      verification: "Verified",
    },
    {
      id: "i3",
      title: "Clean Cooking Drive",
      requirement: "Reach 20 households with clean cooking information.",
      current: 6,
      target: 20,
      reward: 250,
      verification: "Not started",
    },
  ],
  notifications: [
    {
      id: "n1",
      icon: "💰",
      message: "Your verified earning of ₹50 has been added.",
      when: "Today, 9:10 AM",
      read: false,
      action: { label: "View earnings", to: "/earnings" },
    },
    {
      id: "n2",
      icon: "🎓",
      message: "Your recommended training is ready.",
      when: "Today, 8:05 AM",
      read: false,
      action: { label: "Open learning", to: "/learning" },
    },
    {
      id: "n3",
      icon: "🎯",
      message: "You have 2 tasks remaining today.",
      when: "Today, 7:30 AM",
      read: false,
      action: { label: "See my day", to: "/my-day" },
    },
    {
      id: "n4",
      icon: "🎁",
      message: "You are eligible for a campaign incentive.",
      when: "Yesterday, 6:40 PM",
      read: true,
      action: { label: "View incentives", to: "/incentives" },
    },
    {
      id: "n5",
      icon: "📋",
      message: "Your activity is waiting for verification.",
      when: "Yesterday, 2:15 PM",
      read: true,
    },
  ],
  stats: {
    productsSold: 25,
    householdsReached: 42,
    surveysCompleted: 18,
    womenReached: 18,
    communityActivities: 27,
    cleanEnergySold: 15,
    monthlyGoal: 6000,
  },
  weekly: [
    { label: "Sales", thisWeek: 7, lastWeek: 5, unit: "products" },
    { label: "Households", thisWeek: 12, lastWeek: 9, unit: "households" },
    { label: "Activities", thisWeek: 9, lastWeek: 11, unit: "activities" },
    { label: "Earnings", thisWeek: 1150, lastWeek: 980, unit: "₹" },
  ],
};

let state: DleState = initialState;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function updateState(updater: (current: DleState) => DleState) {
  state = updater(state);
  emit();
}

export function useDle(): DleState {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => state,
    () => state,
  );
}

/* ---------- actions ---------- */

export function setTaskStatus(id: number, status: TaskStatus) {
  updateState((current) => ({
    ...current,
    tasks: current.tasks.map((task) => (task.id === id ? { ...task, status } : task)),
  }));
}

export function toggleTaskDone(id: number) {
  updateState((current) => ({
    ...current,
    tasks: current.tasks.map((task) =>
      task.id === id ? { ...task, status: task.status === "done" ? "pending" : "done" } : task,
    ),
  }));
}

export function continueCourse(id: string) {
  updateState((current) => ({
    ...current,
    courses: current.courses.map((course) =>
      course.id === id ? { ...course, progress: Math.min(100, course.progress + 20) } : course,
    ),
  }));
}

export function markNotificationRead(id: string) {
  updateState((current) => ({
    ...current,
    notifications: current.notifications.map((item) =>
      item.id === id ? { ...item, read: true } : item,
    ),
  }));
}

export function markAllNotificationsRead() {
  updateState((current) => ({
    ...current,
    notifications: current.notifications.map((item) => ({ ...item, read: true })),
  }));
}

/* ---------- derived helpers ---------- */

export const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;

export function verifiedEarnings(s: DleState) {
  return s.transactions.filter((t) => t.status === "Verified").reduce((sum, t) => sum + t.amount, 0);
}

export function pendingEarnings(s: DleState) {
  return s.transactions.filter((t) => t.status === "Pending").reduce((sum, t) => sum + t.amount, 0);
}

/** Demo monthly total shown across the app. */
export const TOTAL_EARNINGS = 4850;
export const EARNINGS_BREAKDOWN = [
  { label: "Product Sales", amount: 3600 },
  { label: "Verified Activities", amount: 900 },
  { label: "Incentives", amount: 350 },
];

/**
 * Shapes an authorized Dharmalife administrator would manage later.
 * The DLE can only read these values — nothing in the app writes to them.
 */
export type AdminProduct = {
  name: string;
  customerPrice: number;
  dleEarningRule: number;
  category: string;
  active: boolean;
};
export type AdminIncentiveRule = {
  name: string;
  requirement: string;
  reward: number;
  startDate: string;
  endDate: string;
  eligibility: string;
};
export type AdminCourse = {
  name: string;
  description: string;
  minutes: number;
  content: string;
  category: string;
};
export type AdminAchievementRule = {
  name: string;
  requirement: string;
  milestone: number;
  active: boolean;
};

export const adminManagedProducts: readonly AdminProduct[] = [
  { name: "Solar Lamp", customerPrice: 500, dleEarningRule: 50, category: "Clean energy", active: true },
  { name: "Clean Cookstove", customerPrice: 1200, dleEarningRule: 120, category: "Clean cooking", active: true },
  { name: "Water Filter", customerPrice: 900, dleEarningRule: 90, category: "Safe water", active: true },
];
