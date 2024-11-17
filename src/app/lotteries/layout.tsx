import Navbar from "src/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <Navbar />
      {children}
    </div>
  );
}
