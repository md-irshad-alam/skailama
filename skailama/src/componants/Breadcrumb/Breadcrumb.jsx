"use client"; // If you're using the app directory

import Link from "next/link";
import { usePathname } from "next/navigation"; // for app dir

export default function Breadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="breadcrumb" style={{ margin: "16px 0" }}>
      <ol
        style={{
          display: "flex",
          flexWrap: "wrap",
          listStyle: "none",
          padding: 0,
        }}
      >
        <li>
          <Link href="/" style={{ textDecoration: "underline", color: "blue" }}>
            Home
          </Link>
          {pathSegments.length > 0 && (
            <span style={{ margin: "0 8px" }}>/</span>
          )}
        </li>

        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/");
          const label =
            segment.charAt(0).toUpperCase() +
            segment.slice(1).replace(/-/g, " ");

          return (
            <li key={href}>
              <Link
                href={href}
                style={{ textDecoration: "underline", color: "blue" }}
              >
                {label}
              </Link>
              {index < pathSegments.length - 1 && (
                <span style={{ margin: "0 8px" }}>/</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
