import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import { ModeToggle } from '@/shared/components/mode-toggle';

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            Dinemagik
          </Link>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <div className="flex items-center gap-2">
              <Link to="/auth">
                <Button variant="ghost">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container pt-32">
        <div className="flex flex-col items-center text-center gap-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Manage Your Orders
            <span className="text-primary block">With Confidence</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-[600px]">
            Effortless Orders, Delightful Dining
          </p>
          <div className="flex items-center gap-4">
            <Link target="_blank" to="https://dinemagik.net/">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-semibold mb-2">Orders realtime</h3>
            <p className="text-muted-foreground">Effortless Orders, Delightful Dining</p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-semibold mb-2">Dashboard summary</h3>
            <p className="text-muted-foreground">Effortless Orders, Delightful Dining</p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-xl font-semibold mb-2">Order status realtime</h3>
            <p className="text-muted-foreground">Effortless Orders, Delightful Dining</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
