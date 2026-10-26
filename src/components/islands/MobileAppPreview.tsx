import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Search,
  Plus,
  House,
  Layers,
  Ellipsis,
  ShoppingBag,
  Coffee,
  Car,
  Sun,
  CalendarDays,
  Wallet,
  ChartNoAxesCombined,
} from "lucide-react";
import type { ReactNode } from "react";

type Screen = "dashboard" | "activity" | "plan" | "events" | "insights";
// Recreated from the mobile app's Dashboard, Transactions, BudgetPlan,
// EventsList and Insights screens. All figures here are fictional preview data.
function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`app-card ${className}`}>{children}</div>;
}
function Row({
  icon,
  name,
  detail,
  amount,
}: {
  icon: ReactNode;
  name: string;
  detail: string;
  amount: string;
}) {
  return (
    <div className="app-ledger-row">
      <span className="app-glyph">{icon}</span>
      <div>
        <strong>{name}</strong>
        <small>{detail}</small>
      </div>
      <b>{amount}</b>
    </div>
  );
}
function MoneyPair({ activity = false }: { activity?: boolean }) {
  return (
    <div className="app-money-pair">
      <div>
        <small>
          <ArrowDownLeft /> {activity ? "Money in" : "Income"}
        </small>
        <strong>Rs. 80,000</strong>
      </div>
      <div>
        <small>
          <ArrowUpRight /> {activity ? "Money out" : "Spending"}
        </small>
        <strong>Rs. 24,850</strong>
      </div>
    </div>
  );
}
function Header({ title, back = false }: { title: string; back?: boolean }) {
  return (
    <div className="app-page-header">
      {back && <ChevronLeft />}
      <h3>{title}</h3>
      <span>{back ? <Ellipsis /> : <Plus />}</span>
    </div>
  );
}
function Progress({ value }: { value: number }) {
  return (
    <div className="app-progress">
      <span style={{ width: `${value}%` }} />
    </div>
  );
}
function Dashboard() {
  return (
    <>
      <div className="app-home-header">
        <div>
          <b>
            Dotzie<span>.</span>
          </b>
          <small>Good morning, Maya</small>
        </div>
        <Sun />
        <span className="app-avatar">M</span>
      </div>
      <Card className="app-balance">
        <small>Account balance</small>
        <h4>
          Rs. 55,150<span>.00</span>
        </h4>
        <span className="app-subtle">A little clarity for your day.</span>
      </Card>
      <MoneyPair />
      <div className="app-section-label">At a glance</div>
      <div className="app-tile-pair">
        <Card>
          <Wallet />
          <strong>Everyday spending</strong>
          <small>62% used</small>
          <Progress value={62} />
        </Card>
        <Card>
          <Layers />
          <strong>Who owes what</strong>
          <small>Owed to you</small>
          <b>Rs. 1,200</b>
        </Card>
      </div>
      <div className="app-section-label">
        Recent activity <ChevronRight />
      </div>
      <Card>
        <Row icon={<ShoppingBag />} name="Groceries" detail="Today · Food" amount="− 3,200" />
        <Row icon={<Coffee />} name="Coffee" detail="Today · Dining" amount="− 650" />
      </Card>
    </>
  );
}
function Activity() {
  return (
    <>
      <Header title="Activity" />
      <div className="app-search">
        <Search /> Search activity <SlidersHorizontal />
      </div>
      <Card>
        <div className="app-inline">
          <small>Net movement</small>
          <span className="app-tag">This month</span>
        </div>
        <h4>Rs. 55,150</h4>
        <MoneyPair activity />
      </Card>
      <div className="app-section-label">
        Today <small>Rs. 4,300</small>
      </div>
      <Card>
        <Row icon={<ShoppingBag />} name="Groceries" detail="Food · 10:24 AM" amount="− 3,200" />
        <Row icon={<Coffee />} name="Coffee" detail="Dining · 9:10 AM" amount="− 650" />
        <Row icon={<Car />} name="Transport" detail="Travel · 8:30 AM" amount="− 450" />
      </Card>
      <div className="app-section-label">Yesterday</div>
      <Card>
        <Row icon={<Wallet />} name="Salary" detail="Income · Monthly" amount="+ 80,000" />
      </Card>
    </>
  );
}
function Plan() {
  return (
    <>
      <Header title="Everyday spending" back />
      <div className="app-plan-period">
        October 2026 <span>Monthly</span>
      </div>
      <div className="app-budget-ring">
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="49" />
          <circle cx="60" cy="60" r="49" pathLength="100" strokeDasharray="62.125 100" />
        </svg>
        <div>
          <strong>62%</strong>
          <small>used this month</small>
        </div>
      </div>
      <div className="app-plan-total">
        <strong>Rs. 15,150 left</strong>
        <small>of your Rs. 40,000 limit</small>
      </div>
      <Card>
        <div className="app-inline">
          <strong>Categories</strong>
          <small>Spent / limit</small>
        </div>
        {[
          ["Food", "12,000 / 20,000", 60],
          ["Transport", "4,500 / 8,000", 56],
          ["Everyday extras", "8,350 / 12,000", 70],
        ].map(([name, amount, value]) => (
          <div className="app-category" key={name}>
            <div className="app-inline">
              <span>{name}</span>
              <small>{amount}</small>
            </div>
            <Progress value={value as number} />
          </div>
        ))}
      </Card>
    </>
  );
}
function Events() {
  return (
    <>
      <Header title="Events" />
      <div className="app-search">
        <Search /> Search events <SlidersHorizontal />
      </div>
      <div className="app-mini-tabs">
        <span className="selected">Active · 2</span>
        <span>History</span>
      </div>
      <div className="app-section-label">
        Happening now <small>1</small>
      </div>
      <Card>
        <div className="app-event-title">
          <span className="app-glyph">
            <CalendarDays />
          </span>
          <div>
            <strong>Weekend in Galle</strong>
            <small>24 to 25 Oct · 4 people</small>
          </div>
          <ChevronRight />
        </div>
        <div className="app-inline app-event-amount">
          <small>Your share</small>
          <strong>Rs. 3,600</strong>
        </div>
        <small className="app-subtle">6 expenses · Split with friends</small>
      </Card>
      <div className="app-section-label">
        Upcoming <small>1</small>
      </div>
      <Card>
        <div className="app-event-title">
          <span className="app-glyph">
            <Coffee />
          </span>
          <div>
            <strong>Birthday dinner</strong>
            <small>30 Oct · 5 people</small>
          </div>
          <ChevronRight />
        </div>
        <small className="app-subtle">No expenses yet</small>
      </Card>
      <div className="app-section-label">
        Recent history <ChevronRight />
      </div>
      <Card>
        <div className="app-inline">
          <strong>Sunday brunch</strong>
          <span className="app-tag">Settled</span>
        </div>
      </Card>
    </>
  );
}
function Insights() {
  return (
    <>
      <Header title="Maya’s Insights" back />
      <div className="app-mini-tabs">
        <span className="selected">This month ⌄</span>
      </div>
      <Card>
        <small>This month so far</small>
        <p className="app-story">
          You’ve spent <b>Rs. 24,850</b> this month.
        </p>
        <MoneyPair />
        <small className="app-subtle">Rs. 55,150 more in than out.</small>
      </Card>
      <Card>
        <strong>Where your money went</strong>
        {[
          ["Food", "Rs. 12,000", 48],
          ["Everyday extras", "Rs. 8,350", 34],
          ["Transport", "Rs. 4,500", 18],
        ].map(([label, amount, value]) => (
          <div className="app-category" key={label}>
            <div className="app-inline">
              <span>{label}</span>
              <small>{amount}</small>
            </div>
            <Progress value={value as number} />
          </div>
        ))}
      </Card>
      <Card>
        <div className="app-inline">
          <ChartNoAxesCombined />
          <strong>Small habits, clearer picture.</strong>
        </div>
        <small className="app-subtle">Food makes up 48% of your spending.</small>
      </Card>
    </>
  );
}
export function MobileAppPreview({ screen }: { screen: Screen }) {
  const views = {
    dashboard: <Dashboard />,
    activity: <Activity />,
    plan: <Plan />,
    events: <Events />,
    insights: <Insights />,
  };
  return (
    <div className="mobile-app-preview">
      <div className="app-status">
        <span>9:41</span>
        <span>••• ▰</span>
      </div>
      <div className="app-preview-content">{views[screen]}</div>
      <div className="app-bottom-nav" aria-hidden="true">
        <span className={screen === "dashboard" ? "selected" : ""}>
          <House />
          Home
        </span>
        <span className={screen === "activity" || screen === "plan" ? "selected" : ""}>
          <Layers />
          Records
        </span>
        <span className={screen === "events" || screen === "insights" ? "selected" : ""}>
          <Ellipsis />
          More
        </span>
      </div>
      <div className="app-home-indicator" />
    </div>
  );
}
