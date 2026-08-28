import Link from 'next/link';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export default function NavLink({ href, children, className }: NavLinkProps) {
  return (
    <Link href={href} className={className || "hover:text-blue-500 transition-colors"}>
      {children}
    </Link>
  );
}