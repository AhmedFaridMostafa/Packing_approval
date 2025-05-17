import { notFound } from "next/navigation";
import { createAdminClient, createClient } from "./supabase";
import { User } from "@/type/interfaces";
import hasPermission from "./handlePermissions";

export async function getCurrentUser() {
  const supabase = await createClient();
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data.user.user_metadata;
}

export async function getAllCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();

    const filteredData = data.map(
      (country: {
        name: { common: string };
        translations: { ara?: { common?: string } };
        flags: { svg: string };
      }) => ({
        name_en: country.name.common, // English name
        name_ar: country.translations?.ara?.common || "N/A", // Arabic name
        flag: country.flags.svg, // Flag URL
      }),
    );

    return filteredData;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw Error(error instanceof Error ? error.message : "countries not found");
  }
}

export async function getCountries() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("country").select("*");
  if (error) {
    console.error(error);
    notFound();
  }
  return data;
}

export async function getPackingWay(id: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("packing")
    .select("*, categories(*), country(*), updated_at")
    .eq("region_id", id)
    .order("category_id", { ascending: true });
  if (error) {
    console.error(error);
    notFound();
  }
  return data;
}

export async function thePackingWay(id: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("packing")
    .select("id, title, description, image_url, updated_at")
    .eq("id", id)
    .single();
  if (error) {
    console.error(error);
    notFound();
  }
  return data;
}

export async function getCategories() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("categories").select("*");
  if (error) {
    console.error(error);
    notFound();
  }
  return data;
}

export async function getPackingHistory(
  sort: boolean,
  filter: {
    countryId?: number;
    action?: "delete" | "add" | "edit";
    email?: string;
  },
) {
  const { role } = (await getCurrentUser()) as User;
  if (!hasPermission(role, "view:packing_history"))
    throw new Error("Insufficient permissions");
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("packing_history")
    .select("*, country(*), categories(*)")
    .match(filter)
    .order("change_timestamp", { ascending: sort });
  if (error) throw new Error(error.message);
  return data;
}

interface UserMetadata {
  avatar_url?: string;
  full_name?: string;
  role?: string;
}

export async function getAllUsers() {
  const { role } = (await getCurrentUser()) as User;
  if (!hasPermission(role, "view:usersList"))
    throw new Error("Insufficient permissions");
  const supabaseAdmin = await createAdminClient();
  const {
    data: { users },
    error,
  } = await supabaseAdmin.auth.admin.listUsers();
  if (error) throw new Error(error.message);
  return users.map((user) => {
    const metadata: UserMetadata = user.user_metadata || {};

    return {
      id: user.id,
      email: user.email,
      avatar_url: metadata.avatar_url,
      full_name: metadata.full_name,
      role: metadata.role || "user",
    };
  });
}
