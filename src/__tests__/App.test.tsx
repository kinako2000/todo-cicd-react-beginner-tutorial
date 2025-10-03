import { describe, expect, test } from "vitest";
import { fireEvent, render, screen, within} from "@testing-library/react";
import App from "../App";

describe("App", () => {
    test("アプリ表示がされている",() => {
        render(<App />);
        expect(
            screen.getByRole("heading", { name: "Todoアプリ" })
        ).toBeInTheDocument();
    });

    test("Todoを追加することができる",() => {
        render(<App />);

        const input = screen.getByRole("textbox",{name:"新しいタスクを入力"})
        const addButton = screen.getByRole("button", {name: "追加"});

        fireEvent.change(input, {target: {value: "テストタスク"}})
        fireEvent.click(addButton);

        const list = screen.getByRole("list");
        expect(within(list).getByText("テストタスク")).toBeInTheDocument();
    })

    test("追加した機能を完了できる",()=> {
        render(<App />);

        const input = screen.getByRole("textbox",{name:"新しいタスクを入力"})
        const addButton = screen.getByRole("button", {name: "追加"});

        fireEvent.change(input, {target: {value: "テストタスク"}})
        fireEvent.click(addButton);

        const checkbox = screen.getAllByRole("checkbox")[0];
        fireEvent.click(checkbox);

        expect(checkbox).toBeChecked();
    })

    test("完了したTODOの数が表示される",() => {
        render(<App />);

        const input = screen.getByRole("textbox",{name:"新しいタスクを入力"})
        const addButton = screen.getByRole("button", {name: "追加"});

        fireEvent.change(input, {target: {value: "テストタスク1"}})
        fireEvent.click(addButton);

        fireEvent.change(input, {target: {value: "テストタスク2"}})
        fireEvent.click(addButton);

        const checkboxes = screen.getAllByRole("checkbox")[1];
        fireEvent.click(checkboxes);

        expect( screen.getByText("完了済み: 1 / 2") ).toBeInTheDocument();

    })


    test("Todoがない場合それを示すメッセージが表示される", () => {
        render(<App />);

        expect(screen.getByText("タスクがありません")).toBeInTheDocument();
        expect(screen.getByText("新しいタスクを追加してください")).toBeInTheDocument();

    })

    test("空のTodoは追加できない", () => {
        render(<App />);

        const input = screen.getByRole("textbox",{name:"新しいタスクを入力"})
        const addButton = screen.getByRole("button", {name: "追加"});

        fireEvent.change(input, {target: {value: ""}})
        fireEvent.click(addButton);

        expect(screen.getByText("タスクがありません")).toBeInTheDocument();

    })
})