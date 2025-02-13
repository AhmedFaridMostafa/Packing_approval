"use client";
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "@/context/Table";
import { User } from "@/type/interfaces";
import Avatar from "../header/Avatar";
import Badges from "../Badges";
import Menus from "@/context/Menu";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useConfirm } from "../useConfirm";
import toast from "react-hot-toast";
import { useState } from "react";
import Modal from "@/context/Modal";
import Form from "../form/Form";
import SpinnerMini from "../SpinnerMini";
import { deleteUser, updateUserRole } from "@/server/actions";

interface UserTableProps {
  users: User[];
  usersPage: {
    userTable: {
      headers: {
        user: string;
        role: string;
        email: string;
        actions: string;
      };
      actions: {
        edit: string;
        delete: string;
        deleteConfirmTitle: string;
        deleteConfirmMessage: string;
      };
    };
    form: {
      email: {
        label: string;
      };
      role: {
        label: string;
        placeholder: string;
      };
      updateButton: string;
    };
    role: {
      user: string;
      moderator: string;
      admin: string;
    };
  };
}
export default function UserTable({ users, usersPage }: UserTableProps) {
  const { userTable, form, role } = usersPage;
  const buttonData = {
    value: form.updateButton,
    className: "w-full",
    loading: <SpinnerMini />,
  };
  const confirm = useConfirm();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const color: { [key: string]: "yellow" | "blue" | "gray" } = {
    admin: "yellow",
    moderator: "blue",
    user: "gray",
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const result = await deleteUser(id);
      if (result.success) {
        toast.success(result.message || "user deleted successfully");
      } else {
        toast.error(result.message || "Failed to delete user");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error?.message
          : "An unexpected error occurred",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableHeaderCell>{userTable.headers.user}</TableHeaderCell>
        <TableHeaderCell>{userTable.headers.role}</TableHeaderCell>
        <TableHeaderCell>{userTable.headers.email}</TableHeaderCell>
        <TableHeaderCell>{userTable.headers.actions}</TableHeaderCell>
      </TableHeader>

      <TableBody>
        <Menus>
          {users.map((user, index) => (
            <TableRow key={user.id} isLast={index === users.length - 1}>
              <TableCell isHeader>
                <div className="flex items-center gap-2">
                  <Avatar user={user} />
                </div>
              </TableCell>
              <TableCell>
                <Badges text={role[user.role]} color={color[user.role]} />
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Modal>
                  <Menus.Menu>
                    <Menus.Toggle id={user.id!} />
                    <Menus.List id={user.id!}>
                      <Modal.Open name="edit_user">
                        <Menus.Button icon={<FaEdit className="h-5 w-5" />}>
                          {userTable.actions.edit}
                        </Menus.Button>
                      </Modal.Open>
                      <Menus.Button
                        icon={<MdDelete className="h-5 w-5" />}
                        disabled={deletingId === user.id!}
                        onClick={() =>
                          confirm({
                            title: userTable.actions.deleteConfirmTitle,
                            message: `${userTable.actions.deleteConfirmMessage}:"${user.full_name}"?`,
                            onConfirm: () => handleDelete(user.id!),
                          })
                        }
                      >
                        {userTable.actions.delete}
                      </Menus.Button>
                    </Menus.List>
                  </Menus.Menu>
                  <Modal.Window name="edit_user">
                    <Form
                      buttonData={buttonData}
                      formFields={[
                        { id: "userId", type: "hidden", value: user.id },
                        {
                          id: "email",
                          label: form.email.label,
                          type: "email",
                          defaultValue: user.email,
                          disabled: true,
                        },
                        {
                          label: form.role.label,
                          placeholder: form.role.placeholder,
                          type: "select",
                          name: "newRole",
                          options: [
                            { value: "admin", label: role.admin },
                            { value: "moderator", label: role.moderator },
                            { value: "user", label: role.user },
                          ],
                          required: true,
                        },
                      ]}
                      formAction={updateUserRole}
                    />
                  </Modal.Window>
                </Modal>
              </TableCell>
            </TableRow>
          ))}
        </Menus>
      </TableBody>
    </Table>
  );
}
