"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EditButton({ blog }) {
  const { data: session } = useSession();

  // Only render if logged in and user is author or admin
  if (
    !session ||
    !session.user ||
    (session.user.role !== "admin" && // not admin
      session.user.email !== blog.authorEmail) // not author
  ) {
    return null;
  }

  return (
    <div className="mb-4 flex justify-end">
      <Link href={`/edit/${blog.slug}`}>
        <Button variant="outline" className="text-sm">
          Edit Blog
        </Button>
      </Link>
    </div>
  );
}
