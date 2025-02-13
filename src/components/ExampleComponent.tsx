"use client";
import Menus from "@/context/Menu";

export default function ExampleComponent() {
  return (
    <Menus>
      <Menus.Menu>
        <Menus.Toggle id="example-menu" />
        <Menus.List id="example-menu">
          <Menus.Button onClick={() => console.log("Edit")}>
            Edit Item
          </Menus.Button>
          <Menus.Button onClick={() => console.log("Delete")}>
            Delete Item
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Menus>
  );
}
