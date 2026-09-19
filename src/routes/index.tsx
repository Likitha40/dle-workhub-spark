import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  BadgeIndianRupee,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Flame,
  Home,
  House,
  Leaf,
  PackageCheck,
  Play,
  Sprout,
  Target,
  TrendingUp,
  UsersRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DLE Work Hub — Dharmalife Foundation" },
      {
        name: "description",
        content: "A simple daily work dashboard for DLE Sakhi rural women entrepreneurs.",
      },
      { property: "og:title", content: "DLE Work Hub — Dharmalife Foundation" },
      {
        property: "og:description",
        content: "Daily tasks, earnings, progress, community impact, and learning for DLE Sakhis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkHub,
});

type Task = { id: number; title: string; detail: string; tone: string };
type Modal = "earnings" | "training" | "achievement" | null;

const tasks: Task[] = [
  { id: 1, title: "Visit 3 customers", detail: "Talk about this month's products", tone: "bg-task-one text-task-one-foreground" },
  { id: 2, title: "Complete 2 household surveys", detail: "Learn what families need", tone: "bg-task-two text-task-two-foreground" },
  { id: 3, title: "Follow up with 2 customers", detail: "Check in with interested families", tone: "bg-task-three text-task-three-foreground" },
];

const navItems: { label: string; target: string; icon: LucideIcon }[] = [
  { label: "Home", target: "top", icon: Home },
  { label: "Earnings", target: "earnings", icon: BadgeIndianRupee },
  { label: "My Progress", target: "progress", icon: TrendingUp },
  { label: "Learning", target: "learning", icon: BookOpen },
  { label: "Achievements", target: "achievements", icon: Award },
];

const progressItems = [
  { value: "25", label: "Products Sold", icon: PackageCheck, tone: "bg-stat-green text-stat-green-foreground" },
  { value: "42", label: "Households Reached", icon: House, tone: "bg-stat-yellow text-stat-yellow-foreground" },
  { value: "18", label: "Surveys Completed", icon: CheckCircle2, tone: "bg-stat-blue text-stat-blue-foreground" },
  { value: "₹4,850", label: "Earned", icon: BadgeIndianRupee, tone: "bg-stat-coral text-stat-coral-foreground" },
];

function WorkHub() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [activeTask, setActiveTask] = useState<number | null>(null);
  const [activeNav, setActiveNav] = useState("top");
  const [modal, setModal] = useState<Modal>(null);
  const [selectedBadge, setSelectedBadge] = useState("50 Products Sold");

  const toggleTask = (id: number) => {
    setCompleted((current) =>
      current.includes(id) ? current.filter((taskId) => taskId !== id) : [...current, id],
    );
    setActiveTask(null);
  };

  const startTask = (id: number) => {
    if (completed.includes(id)) {
      setCompleted((current) => current.filter((taskId) => taskId !== id));
      setActiveTask(id);
      return;
    }
    setActiveTask((current) => (current === id ? null : id));
  };

  const goTo = (target: string) => {
    setActiveNav(target);
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-sidebar-border bg-sidebar px-5 py-7 lg:flex lg:flex-col">
        <Brand />
        <nav className="mt-12 space-y-2" aria-label="Main navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const selected = activeNav === item.target;
            return (
              <button
                key={item.target}
                type="button"
                onClick={() => goTo(item.target)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-semibold transition-colors ${
                  selected
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" strokeWidth={2} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="mt-auto rounded-lg bg-sidebar-accent p-4">
          <div className="mb-2 flex items-center gap-2 text-sidebar-accent-foreground">
            <Sprout className="h-5 w-5" />
            <span className="text-sm font-bold">Growing together</span>
          </div>
          <p className="text-xs leading-5 text-muted-foreground">Every household you reach makes a difference.</p>
        </div>
      </aside>

      <main className="pb-28 lg:ml-64 lg:pb-10">
        <div id="top" className="mx-auto max-w-7xl scroll-mt-6 px-4 py-5 sm:px-7 lg:px-10 lg:py-8">
          <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <div className="min-w-0">
              <div className="mb-3 lg:hidden"><Brand /></div>
              <p className="mb-1 text-sm font-semibold text-primary">Saturday, 19 September</p>
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Good Morning, Lakshmi! <span aria-hidden="true">👋</span></h1>
              <p className="mt-1 text-sm text-muted-foreground sm:text-base">Here’s what you need to focus on today.</p>
            </div>
            <button type="button" aria-label="Open Lakshmi's profile" className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border bg-card text-primary shadow-sm transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:h-14 sm:w-14">
              <CircleUserRound className="h-7 w-7" />
            </button>
          </header>

          <div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.75fr)]">
            <section aria-labelledby="tasks-title" className="rounded-lg border border-primary/15 bg-card p-5 shadow-dashboard sm:p-7">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary"><Target className="h-5 w-5" /></span>
                    <h2 id="tasks-title" className="text-xl font-bold sm:text-2xl">Today’s Tasks</h2>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">3 important tasks for today</p>
                </div>
                <div className="rounded-full bg-primary-soft px-3 py-1.5 text-xs font-bold text-primary">{completed.length}/3 done</div>
              </div>

              <div className="mt-6 space-y-3">
                {tasks.map((task) => {
                  const isDone = completed.includes(task.id);
                  const isActive = activeTask === task.id;
                  return (
                    <div key={task.id} className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border p-3 transition-colors sm:p-4 ${isDone ? "border-primary/20 bg-primary-soft/50" : isActive ? "border-primary bg-card" : "border-border bg-card"}`}>
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={isDone}
                        aria-label={`Mark ${task.title} ${isDone ? "not completed" : "completed"}`}
                        onClick={() => toggleTask(task.id)}
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-md border-2 transition-colors ${isDone ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background text-transparent hover:border-primary"}`}
                      >
                        <Check className="h-4 w-4" strokeWidth={3} />
                      </button>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className={`font-bold ${isDone ? "text-muted-foreground line-through" : "text-foreground"}`}>{task.title}</p>
                          {isActive && <span className="rounded-full bg-status-active px-2 py-0.5 text-[11px] font-bold text-status-active-foreground">In progress</span>}
                        </div>
                        <p className="mt-0.5 hidden text-xs text-muted-foreground sm:block">{isDone ? "Well done! Task completed." : task.detail}</p>
                      </div>
                      <button type="button" onClick={() => startTask(task.id)} className={`min-w-16 shrink-0 rounded-md px-3 py-2 text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${isDone ? "bg-secondary text-secondary-foreground hover:bg-secondary/75" : task.tone}`}>
                        {isDone ? "Redo" : isActive ? "Pause" : "Start"}
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 flex items-center gap-2 rounded-lg bg-highlight px-4 py-3 text-sm font-semibold text-highlight-foreground">
                <Flame className="h-5 w-5 shrink-0" />
                <span>{completed.length === 3 ? "Amazing! You completed all your tasks." : "Complete your tasks and keep your 5-day streak going!"}</span>
              </div>
            </section>

            <section id="earnings" aria-labelledby="earnings-title" className="scroll-mt-6 rounded-lg bg-earning p-5 text-earning-foreground shadow-dashboard sm:p-7">
              <div className="flex items-center gap-2"><BadgeIndianRupee className="h-6 w-6" /><h2 id="earnings-title" className="text-xl font-bold">My Earnings</h2></div>
              <p className="mt-7 text-4xl font-bold tracking-normal">₹4,850</p>
              <div className="mt-2 flex items-center justify-between text-sm"><span className="opacity-80">Monthly earnings</span><span className="font-semibold">Goal: ₹6,000</span></div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-earning-track"><div className="h-full w-[81%] rounded-full bg-earning-progress" /></div>
              <p className="mt-2 text-sm font-semibold">₹1,150 more to reach your goal</p>
              <div className="my-5 h-px bg-earning-line" />
              <div className="space-y-3 text-sm">
                <EarningLine label="Product Sales" amount="₹3,600" />
                <EarningLine label="Surveys" amount="₹900" />
                <EarningLine label="Bonus" amount="₹350" />
              </div>
              <button type="button" onClick={() => setModal("earnings")} className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-earning-button px-4 py-3 text-sm font-bold text-earning-button-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-earning-button">
                View Earnings <ChevronRight className="h-4 w-4" />
              </button>
            </section>
          </div>

          <section id="progress" aria-labelledby="progress-title" className="scroll-mt-6 pt-8">
            <SectionTitle icon={TrendingUp} title="My Progress" subtitle="Your work this month" />
            <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
              {progressItems.map((item) => {
                const Icon = item.icon;
                return <div key={item.label} className="rounded-lg border border-border bg-card p-4 shadow-sm sm:p-5"><div className={`grid h-10 w-10 place-items-center rounded-lg ${item.tone}`}><Icon className="h-5 w-5" /></div><p className="mt-4 text-2xl font-bold sm:text-3xl">{item.value}</p><p className="mt-1 text-xs font-medium leading-5 text-muted-foreground sm:text-sm">{item.label}</p></div>;
              })}
            </div>
          </section>

          <div className="grid gap-6 pt-8 xl:grid-cols-2">
            <section aria-labelledby="impact-title" className="rounded-lg border border-impact-border bg-impact p-5 sm:p-7">
              <SectionTitle icon={Leaf} title="My Impact" subtitle="The change you are creating" />
              <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4">
                <ImpactStat icon={House} value="42" label="Households Reached" />
                <ImpactStat icon={UsersRound} value="18" label="Women Reached" />
                <ImpactStat icon={Sprout} value="15" label="Clean-Energy Products Sold" />
              </div>
              <p className="mt-6 rounded-lg bg-card/70 px-4 py-3 text-center text-sm font-bold text-impact-foreground">Your work is helping your community. <span aria-hidden="true">❤️</span></p>
            </section>

            <section id="learning" aria-labelledby="learning-title" className="scroll-mt-6 rounded-lg border border-border bg-card p-5 shadow-sm sm:p-7">
              <SectionTitle icon={BookOpen} title="Learn Something New" subtitle="A short lesson picked for you" />
              <div className="mt-5 flex items-center gap-4 rounded-lg bg-learning p-4">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-learning-icon text-learning-icon-foreground"><Play className="h-7 w-7 fill-current" /></div>
                <div className="min-w-0 flex-1"><h3 className="font-bold leading-5 text-learning-foreground">How to explain Solar Lamps to customers</h3><p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground"><Clock3 className="h-4 w-4" />8 minutes</p></div>
              </div>
              <button type="button" onClick={() => setModal("training")} className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"><Play className="h-4 w-4 fill-current" />Start Training</button>
              <p className="mt-3 text-center text-xs font-semibold text-primary">Complete training to earn +10 Skill Points</p>
            </section>
          </div>

          <section id="achievements" aria-labelledby="achievements-title" className="scroll-mt-6 pt-8">
            <SectionTitle icon={Award} title="My Achievements" subtitle="Celebrate every step forward" />
            <div className="mt-4 rounded-lg border border-border bg-card p-5 shadow-sm sm:p-7">
              <div className="grid gap-3 sm:grid-cols-3">
                <BadgeButton label="First Sale" unlocked icon={CheckCircle2} onClick={() => { setSelectedBadge("First Sale"); setModal("achievement"); }} />
                <BadgeButton label="10 Households Reached" unlocked icon={House} onClick={() => { setSelectedBadge("10 Households Reached"); setModal("achievement"); }} />
                <BadgeButton label="50 Products Sold" icon={Award} onClick={() => { setSelectedBadge("50 Products Sold"); setModal("achievement"); }} />
              </div>
              <div className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-highlight px-4 py-3 text-center text-sm font-bold text-highlight-foreground"><Target className="h-4 w-4 shrink-0" />8 more sales to unlock the next badge!</div>
            </div>
          </section>
        </div>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-card/95 px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-mobile-nav backdrop-blur lg:hidden" aria-label="Mobile navigation">
        {navItems.map((item) => { const Icon = item.icon; const selected = activeNav === item.target; return <button key={item.target} type="button" onClick={() => goTo(item.target)} className={`flex min-w-0 flex-col items-center gap-1 px-1 py-1 text-[10px] font-bold transition-colors ${selected ? "text-primary" : "text-muted-foreground"}`}><span className={`grid h-8 w-10 place-items-center rounded-full ${selected ? "bg-primary-soft" : ""}`}><Icon className="h-5 w-5" /></span><span className="w-full truncate">{item.label}</span></button>; })}
      </nav>

      {modal && <Dialog type={modal} selectedBadge={selectedBadge} onClose={() => setModal(null)} />}
    </div>
  );
}

function Brand() { return <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground"><Leaf className="h-5 w-5" /></span><div><p className="text-base font-bold leading-tight text-foreground">DLE Work Hub</p><p className="text-[11px] font-semibold text-muted-foreground">DHARMALIFE FOUNDATION</p></div></div>; }

function SectionTitle({ icon: Icon, title, subtitle }: { icon: LucideIcon; title: string; subtitle: string }) { return <div className="flex items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span><div className="min-w-0"><h2 className="text-xl font-bold sm:text-2xl">{title}</h2><p className="text-xs text-muted-foreground sm:text-sm">{subtitle}</p></div></div>; }

function EarningLine({ label, amount }: { label: string; amount: string }) { return <div className="flex items-center justify-between"><span className="opacity-80">{label}</span><strong>{amount}</strong></div>; }

function ImpactStat({ icon: Icon, value, label }: { icon: LucideIcon; value: string; label: string }) { return <div className="text-center"><span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-impact-icon text-impact-icon-foreground"><Icon className="h-5 w-5" /></span><p className="mt-3 text-2xl font-bold text-impact-foreground">{value}</p><p className="mt-1 text-[11px] font-semibold leading-4 text-muted-foreground sm:text-xs">{label}</p></div>; }

function BadgeButton({ label, unlocked = false, icon: Icon, onClick }: { label: string; unlocked?: boolean; icon: LucideIcon; onClick: () => void }) { return <button type="button" onClick={onClick} className={`flex min-h-24 items-center gap-4 rounded-lg border p-4 text-left transition-transform hover:-translate-y-0.5 ${unlocked ? "border-achievement-border bg-achievement" : "border-border bg-muted/45"}`}><span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${unlocked ? "bg-achievement-icon text-achievement-icon-foreground" : "bg-muted text-muted-foreground"}`}><Icon className="h-6 w-6" /></span><span className="min-w-0"><span className="block text-sm font-bold text-foreground">{label}</span><span className={`mt-1 block text-xs font-semibold ${unlocked ? "text-primary" : "text-muted-foreground"}`}>{unlocked ? "Unlocked ✓" : "Locked · 25/50"}</span></span></button>; }

function Dialog({ type, selectedBadge, onClose }: { type: Exclude<Modal, null>; selectedBadge: string; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 grid place-items-end bg-overlay p-0 sm:place-items-center sm:p-5" role="presentation" onMouseDown={onClose}><div role="dialog" aria-modal="true" aria-labelledby="dialog-title" onMouseDown={(event) => event.stopPropagation()} className="w-full max-w-md rounded-t-lg bg-card p-6 shadow-dialog sm:rounded-lg">
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4"><div>{type === "earnings" && <><p className="text-xs font-bold uppercase text-primary">September earnings</p><h2 id="dialog-title" className="mt-1 text-2xl font-bold">₹4,850 earned</h2></>}{type === "training" && <><p className="text-xs font-bold uppercase text-primary">8 minute lesson</p><h2 id="dialog-title" className="mt-1 text-xl font-bold">Solar Lamps Training</h2></>}{type === "achievement" && <><p className="text-xs font-bold uppercase text-primary">Achievement progress</p><h2 id="dialog-title" className="mt-1 text-xl font-bold">{selectedBadge}</h2></>}</div><button type="button" aria-label="Close" onClick={onClose} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted text-foreground hover:bg-secondary"><X className="h-5 w-5" /></button></div>
    {type === "earnings" && <div className="mt-6 space-y-4"><div className="rounded-lg bg-primary-soft p-4"><p className="text-sm font-bold text-primary">81% of your monthly goal</p><div className="mt-3 h-2 overflow-hidden rounded-full bg-card"><div className="h-full w-[81%] bg-primary" /></div></div><div className="space-y-3"><DetailRow label="Product Sales" value="₹3,600" /><DetailRow label="Household Surveys" value="₹900" /><DetailRow label="Performance Bonus" value="₹350" /></div></div>}
    {type === "training" && <div className="mt-6"><div className="grid aspect-video place-items-center rounded-lg bg-learning"><span className="grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground"><Play className="h-7 w-7 fill-current" /></span></div><p className="mt-4 text-sm leading-6 text-muted-foreground">Learn three simple ways to explain the benefits of solar lamps to families.</p><button type="button" onClick={onClose} className="mt-5 w-full rounded-md bg-primary px-4 py-3 text-sm font-bold text-primary-foreground">Begin Lesson</button></div>}
    {type === "achievement" && <div className="mt-6 text-center"><span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-achievement-icon text-achievement-icon-foreground"><Award className="h-10 w-10" /></span><p className="mt-4 font-bold">{selectedBadge === "50 Products Sold" ? "25 of 50 products sold" : "Achievement unlocked!"}</p><p className="mt-2 text-sm text-muted-foreground">{selectedBadge === "50 Products Sold" ? "Keep going — you are halfway there." : "Your consistent work made this possible."}</p></div>}
  </div></div>;
}

function DetailRow({ label, value }: { label: string; value: string }) { return <div className="flex items-center justify-between border-b border-border pb-3 text-sm"><span className="text-muted-foreground">{label}</span><strong>{value}</strong></div>; }