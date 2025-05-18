"use client";
import Menus from "@/context/Menu";
import Card from "./Card";
import { User, type Packing } from "@/type/interfaces";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deletePackingWay } from "@/server/actions";
import toast from "react-hot-toast";
import { useState } from "react";
import { useConfirm } from "./useConfirm";
import { redirect, useParams } from "next/navigation";
import { Lang } from "@/i18n.config";

interface CardsGridProps {
  items: Packing[];
  user: User | null; // Use proper user type from your auth system
  options: {
    edit: string;
    del: string;
    cancel: string;
    confirm: string;
    cardOption: {
      delete_packing_way: string;
      delete_confirmation: string;
    };
  };
}

export default function CardsGrid({ items, user, options }: CardsGridProps) {
  const confirm = useConfirm();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { lang } = useParams() as { lang: Lang };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      const result = await deletePackingWay(id);
      if (result.success) {
        toast.success("Item deleted successfully");
      } else {
        toast.error(result.message || "Failed to delete item");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Menus>
        {items.map((item) =>
          user ? (
            <Menus.Menu key={item.id}>
              <Card
                image={item.image_url}
                title={item.title[lang]}
                description={item.description[lang]}
                updated_at={item.updated_at}
              >
                <Menus.Toggle id={item.id.toString()} />
                <Menus.List id={item.id.toString()}>
                  <Menus.Button
                    icon={<FaEdit className="h-5 w-5" />}
                    onClick={() =>
                      redirect(`/${lang}/packing-way/update/${item.id}`)
                    }
                  >
                    {options.edit}
                  </Menus.Button>
                  <Menus.Button
                    icon={<MdDelete className="h-5 w-5" />}
                    disabled={deletingId === item.id}
                    onClick={() =>
                      confirm({
                        title: options.cardOption.delete_packing_way,
                        message: `${options.cardOption.delete_confirmation} ${item.title[lang]} ?`,
                        onConfirm: () => handleDelete(item.id),
                        confirmText: options.confirm,
                        cancelText: options.cancel,
                      })
                    }
                  >
                    {options.del}
                  </Menus.Button>
                </Menus.List>
              </Card>
            </Menus.Menu>
          ) : (
            <Card
              key={item.id}
              image={item.image_url}
              title={item.title[lang]}
              description={item.description[lang]}
              updated_at={item.updated_at}
            />
          ),
        )}
      </Menus>
    </div>
  );
}
