import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { Plus, Users } from "lucide-react";

import { Link } from "@/i18n/navigation";

import { api } from "@/lib/api";
import { getApiAuthSession } from "@/lib/auth-helpers";
import { ROUTES } from "@/constants/routes";

import { Button } from "@/components/ui/button";
import Pagination from "@/components/shared/Pagination";
import GlobalSearch from "@/components/shared/GlobalSearch";
import ErrorState from "@/components/shared/ErrorState";
import AdminUsersTable from "@/components/admin/users/AdminUsersTable";

export async function generateMetadata() {
  const t = await getTranslations("AdminUsersPage.meta_data");
  return {
    title: t("title"),
    description: t("description"),
  };
}

interface AdminUsersPageProps {
  searchParams: Promise<{ search_query?: string; page?: string }>;
}

const AdminUsersPage = async ({ searchParams }: AdminUsersPageProps) => {
  const [{ search_query, page }, requestHeaders, t] = await Promise.all([
    searchParams,
    headers(),
    getTranslations("AdminUsersPage"),
  ]);

  const session = await getApiAuthSession(requestHeaders);
  const currentUserId = session?.user.id ?? null;

  const currentPage = page ? parseInt(page, 10) : 1;

  const result = await api.users.getUsers(requestHeaders, {
    q: search_query,
    page: !isNaN(currentPage) && currentPage > 0 ? currentPage : 1,
  });

  if (!result.success) {
    return (
      <ErrorState
        layout="page"
        status={result.status}
        message={result.error.message}
      />
    );
  }

  const { users, totalPages } = result.data;

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-heading text-on-surface text-2xl font-bold sm:text-3xl">
              {t("title")}
            </h1>
            <p className="text-body-base text-on-surface-variant mt-0.5">
              {t("subtitle")}
            </p>
          </div>
        </div>

        <Button
          asChild
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex h-11 shrink-0 items-center gap-2 rounded-xl font-semibold shadow-xs"
        >
          <Link href={ROUTES.ADMIN_USERS_CREATE}>
            <Plus className="h-5 w-5" />
            {t("add_user")}
          </Link>
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <GlobalSearch searchPlaceholder={t("search_placeholder")} />
        <span className="text-on-surface-variant text-caption font-medium">
          {users.length > 0 && t("shown_count", { count: users.length })}
        </span>
      </div>

      {/* Users Table or Empty State */}
      {users.length === 0 ? (
        <div className="border-border bg-card flex flex-col items-center justify-center rounded-2xl border py-20 text-center shadow-sm">
          <Users className="text-on-surface-variant/30 mb-4 h-16 w-16" />
          <h2 className="font-heading text-on-surface mb-1 text-xl font-bold">
            {t("empty.title")}
          </h2>
          <p className="text-on-surface-variant text-body-base max-w-sm">
            {t("empty.description")}
          </p>
        </div>
      ) : (
        <AdminUsersTable t={t} users={users} currentUserId={currentUserId} />
      )}

      {/* Pagination */}
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
};

export default AdminUsersPage;
